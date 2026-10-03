/* =========================================================
 * 게임 엔진: 맵 · 이동 · 대화 · 스크립트 · 사진첩 · 저장
 * ========================================================= */
const Game = (() => {
  const W = 320, H = 192, T = 16;
  const params = new URLSearchParams(location.search);
  const $ = id => document.getElementById(id);
  const canvas = $('screen');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const CHAPTERS = [];     // story 파일에서 채움
  const PHOTOS = {};       // id -> {ch, title, year, desc, bonus, hint}
  const ITEMS = {};        // id -> {name}
  const SAVE_KEY = 'dotkorea_save_v1';

  /* ---------------- 화면 맞춤 ---------------- */
  const isTouch = matchMedia('(pointer: coarse)').matches || params.has('touch');
  function fit() {
    const land = isTouch && window.innerWidth > window.innerHeight;
    document.body.classList.toggle('land', land);
    const touchH = isTouch && !land ? 200 : 0;
    const touchW = land ? 330 : 0;
    const aw = window.innerWidth - 12 - touchW, ah = window.innerHeight - 12 - touchH;
    let s = Math.min(aw / W, ah / H);
    s = s >= 2 ? Math.floor(s) : Math.max(1, Math.floor(s * 4) / 4);
    document.documentElement.style.setProperty('--s', s);
    $('touch').classList.toggle('hidden', !isTouch);
  }
  window.addEventListener('resize', fit);
  fit();

  /* ---------------- 상태 ---------------- */
  let S = freshState();
  function freshState() {
    return { ch: 0, x: 0, y: 0, dir: 'down', flags: {}, items: [], photos: {}, seen: {}, cleared: [] };
  }
  let chapter = null;       // 현재 챕터 정의
  let map = null;           // 현재 맵
  let ents = [];
  let player = null;
  let busy = false;
  let mode = 'boot';        // boot | title | play
  let frame = 0;
  let camX = 0, camY = 0, camTarget = null, shakeT = 0;
  let curZone = -1;
  const pending = [];
  let spiritOn = false, spiritPos = { x: 0, y: 0 };
  const trail = [];
  let titlePan = 0;

  /* ---------------- 입력 ---------------- */
  const held = new Set();
  const pressed = new Set();
  const handlers = [];
  let lastDir = null;
  const KEYMAP = {
    ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
    Space: 'ok', Enter: 'ok', KeyZ: 'ok', KeyJ: 'ok', NumpadEnter: 'ok',
    Escape: 'cancel', KeyX: 'cancel', KeyK: 'cancel', Backspace: 'cancel',
    Tab: 'album', KeyP: 'album', KeyH: 'hint',
    ShiftLeft: 'run', ShiftRight: 'run', KeyQ: 'prev', KeyE: 'next', KeyM: 'mute',
  };
  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

  function keyDown(k, repeat) {
    Sound.unlock();
    if (k === 'mute' && !repeat) { toggleSound(); return; }
    if (DIRS[k]) { held.add(k); lastDir = k; }
    if (k === 'run') { held.add('run'); return; }
    if (repeat && !DIRS[k]) return;
    if (handlers.length) { handlers[handlers.length - 1](k); return; }
    if (!DIRS[k]) pressed.add(k);
  }
  function keyUp(k) {
    held.delete(k);
    if (lastDir === k) lastDir = [...held].filter(d => DIRS[d]).pop() || null;
  }
  window.addEventListener('keydown', e => {
    const k = KEYMAP[e.code];
    if (!k) return;
    e.preventDefault();
    keyDown(k, e.repeat);
  });
  window.addEventListener('keyup', e => {
    const k = KEYMAP[e.code];
    if (k) keyUp(k);
  });
  window.addEventListener('blur', () => { held.clear(); lastDir = null; });
  document.querySelectorAll('#touch button').forEach(b => {
    const k = b.dataset.k;
    const down = e => { e.preventDefault(); b.classList.add('on'); keyDown(k, false); };
    const up = e => { e.preventDefault(); b.classList.remove('on'); keyUp(k); };
    b.addEventListener('pointerdown', down);
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
    b.addEventListener('pointerleave', up);
  });
  $('game').addEventListener('pointerdown', () => Sound.unlock());

  function pushH(fn) { handlers.push(fn); }
  function popH(fn) { const i = handlers.lastIndexOf(fn); if (i >= 0) handlers.splice(i, 1); }

  /* ---------------- 유틸 ---------------- */
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const nextFrame = () => new Promise(r => requestAnimationFrame(r));
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function F(k) { return S.flags[k]; }
  function setF(k, v = true) { S.flags[k] = v; }
  function has(id) { return S.items.includes(id); }

  /* ---------------- 저장 ---------------- */
  function save() {
    if (!player || !chapter) return;
    S.x = player.x; S.y = player.y; S.dir = player.dir; S.ch = chapter.id;
    const data = { ...S, photos: Object.keys(S.photos) };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch (e) { /* 저장 불가 */ }
  }
  function savePhoto(id, url) {
    try { localStorage.setItem('dotkorea_photo_' + id, url); } catch (e) { /* 용량 부족: 이미지 없이 진행 */ }
  }
  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const d = JSON.parse(raw);
      const photos = {};
      (d.photos || []).forEach(id => { photos[id] = localStorage.getItem('dotkorea_photo_' + id) || ''; });
      return { ...freshState(), ...d, photos };
    } catch (e) { return null; }
  }
  function hasSave() { try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; } }
  function wipeSave() {
    try {
      Object.keys(localStorage).filter(k => k.startsWith('dotkorea_photo_')).forEach(k => localStorage.removeItem(k));
      localStorage.removeItem(SAVE_KEY);
    } catch (e) { /* 무시 */ }
  }

  /* ---------------- 맵 구성 ---------------- */
  function buildMap(ch) {
    const Hh = ch.height || 14;
    const rows = Array.from({ length: Hh }, () => '');
    const zones = [];
    let x0 = 0;
    ch.zones.forEach((z, i) => {
      const w = z.rows[0].length;
      if (z.rows.length !== Hh) console.warn('zone rows', z.id, z.rows.length);
      z.rows.forEach((r, ri) => {
        if (r.length !== w) console.warn('row width', z.id, ri, r.length, w);
        rows[ri] += r.padEnd(w, 'X').slice(0, w);
      });
      zones.push({ def: z, i, x0, x1: x0 + w - 1, w });
      x0 += w;
    });
    const m = { w: x0, h: Hh, rows, zones, fogs: [] };
    zones.forEach((z, i) => {
      if (i === 0 || ch.noFog) return;
      const prev = zones[i - 1].def;
      const open = !prev.goal || S.photos[prev.goal] !== undefined || (prev.open && prev.open());
      m.fogs.push({ zone: i, x0: z.x0, x1: z.x0 + 1, alpha: open ? 0 : 1, solid: !open });
    });
    // 미리 그린 배경 캔버스 (물 애니메이션용 2장)
    m.canvas = [0, 1].map(f => {
      const c = SPR.mk(m.w * T, m.h * T);
      const g = c.getContext('2d');
      for (let y = 0; y < m.h; y++)
        for (let x = 0; x < m.w; x++) {
          const chr = m.rows[y][x];
          let img;
          const below = y + 1 < m.h ? m.rows[y + 1][x] : chr;
          const above = y > 0 ? m.rows[y - 1][x] : chr;
          const curbOk = chr !== ':' || '=-z'.includes(below);
          if (SPR.ANIM[chr]) img = (above !== chr && SPR.TILES_T[chr]) ? SPR.TILES_T[chr] : SPR.ANIM[chr][f];
          else if (below !== chr && SPR.TILES_B[chr] && curbOk) img = SPR.TILES_B[chr];
          else if (above !== chr && SPR.TILES_T[chr]) img = SPR.TILES_T[chr];
          else {
            const vs = SPR.TILES[chr] || SPR.TILES['X'];
            img = vs[(((x * 7 + y * 13) ^ (x * y)) >>> 0) % vs.length];
          }
          g.drawImage(img, x * T, y * T);
        }
      return c;
    });
    m.hasWater = m.rows.some(r => r.includes('~'));
    return m;
  }

  function makeEnt(def, ox, zi) {
    const pd = def.prop ? SPR.PROPS[def.prop] : null;
    const e = {
      def, id: def.id, name: def.name,
      x: def.x + ox, y: def.y, dir: def.dir || 'down',
      look: def.look, prop: def.prop, arg: def.arg,
      fw: def.fw || (pd ? pd.fw : 1), fh: def.fh || (pd ? pd.fh : 1),
      solid: def.solid !== undefined ? def.solid : (pd ? pd.solid : true),
      talk: def.talk, step: def.step, show: def.show,
      queue: [], moving: false, frame: 0, walkT: 0,
      emote: null, emoteT: 0, zone: zi,
      wander: def.wander || 0, wanderT: 60 + Math.random() * 120,
      cheer: def.cheer, speed: def.speed || 2,
    };
    if (def.at) { const p = def.at(); if (p) { e.x = p[0] + ox; e.y = p[1]; if (p[2]) e.dir = p[2]; } }
    e.home = { x: e.x, y: e.y };
    e.px = e.x * T; e.py = e.y * T;
    return e;
  }

  function loadChapter(ch, pos) {
    chapter = ch;
    map = buildMap(ch);
    ents = [];
    map.zones.forEach(z => (z.def.ents || []).forEach(d => ents.push(makeEnt(d, z.x0, z.i))));
    const st = pos || ch.start;
    player = makeEnt({ id: 'player', x: st.x, y: st.y, dir: st.dir || 'right', look: LOOK_PLAYER }, 0, 0);
    player.isPlayer = true;
    ents.push(player);
    spiritPos = { x: player.px - 10, y: player.py - 12 };
    trail.length = 0;
    curZone = -1;
    camTarget = null;
    canvas.style.filter = ch.filter || 'none';
    snapCamera();
  }

  function visible(e) { return !e.show || e.show(); }
  function zoneAt(x) {
    if (!map) return null;
    return map.zones.find(z => x >= z.x0 && x <= z.x1) || null;
  }
  function solidAt(x, y, self) {
    if (x < 0 || y < 0 || x >= map.w || y >= map.h) return true;
    if (SPR.SOLID.has(map.rows[y][x])) return true;
    for (const f of map.fogs) if (f.solid && x >= f.x0 && x <= f.x1) return 'fog';
    for (const e of ents) {
      if (e === self || !e.solid || !visible(e)) continue;
      if (x >= e.x && x < e.x + e.fw && y >= e.y && y < e.y + e.fh) return true;
      if (e.moving && e.tx !== undefined && x === e.tx && y === e.ty) return true;
    }
    return false;
  }
  function entAt(x, y, filter) {
    for (let i = ents.length - 1; i >= 0; i--) {
      const e = ents[i];
      if (e.isPlayer || !visible(e)) continue;
      if (filter && !filter(e)) continue;
      if (x >= e.x && x < e.x + e.fw && y >= e.y && y < e.y + e.fh) return e;
    }
    return null;
  }

  /* ---------------- 이동 ---------------- */
  function startMove(e, dir, force) {
    const [dx, dy] = DIRS[dir];
    e.dir = dir;
    const nx = e.x + dx, ny = e.y + dy;
    if (!force) {
      const s = solidAt(nx, ny, e);
      if (s) return s;
    }
    e.moving = true; e.tx = nx; e.ty = ny;
    return false;
  }
  function stepEnt(e) {
    if (!e.moving) {
      if (e.queue.length) {
        const q = e.queue[0];
        if (q.dir) {
          const blocked = startMove(e, q.dir, q.force);
          if (!blocked) { e.queue.shift(); }
          else if (++q.tries > 90) { e.queue.shift(); }
        } else if (q.face) { e.dir = q.face; e.queue.shift(); }
        if (!e.queue.length && !e.moving && e.onIdle) { const f = e.onIdle; e.onIdle = null; f(); }
      }
      if (!e.moving) return;
    }
    const sp = e.isPlayer && held.has('run') && !busy ? 4 : e.speed;
    const tx = e.tx * T, ty = e.ty * T;
    e.px += Math.sign(tx - e.px) * Math.min(sp, Math.abs(tx - e.px));
    e.py += Math.sign(ty - e.py) * Math.min(sp, Math.abs(ty - e.py));
    e.walkT += sp;
    e.frame = (Math.floor(e.walkT / 8) % 2) + 1;
    if (e.px === tx && e.py === ty) {
      e.x = e.tx; e.y = e.ty; e.moving = false;
      if (e.isPlayer) onPlayerStep();
      if (!e.queue.length) {
        e.frame = 0;
        if (e.onIdle) { const f = e.onIdle; e.onIdle = null; f(); }
      }
    }
  }
  function walk(e, path, opts = {}) {
    e = typeof e === 'string' ? ent(e) : e;
    if (!e) return Promise.resolve();
    const map2 = { U: 'up', D: 'down', L: 'left', R: 'right' };
    for (const ch of path) if (map2[ch]) e.queue.push({ dir: map2[ch], tries: 0, force: opts.force });
    if (opts.speed) e.speed = opts.speed;
    return new Promise(res => {
      if (!e.queue.length && !e.moving) return res();
      e.onIdle = res;
    });
  }
  function walkTo(e, x, y, opts = {}) {
    e = typeof e === 'string' ? ent(e) : e;
    if (!e) return Promise.resolve();
    const z = opts.global ? null : zoneAt(e.x);
    const gx = z ? x + z.x0 : x;
    let path = '';
    let cx = e.x, cy = e.y;
    const hx = () => { while (cx !== gx) { path += gx > cx ? 'R' : 'L'; cx += gx > cx ? 1 : -1; } };
    const vy = () => { while (cy !== y) { path += y > cy ? 'D' : 'U'; cy += y > cy ? 1 : -1; } };
    if (opts.vFirst) { vy(); hx(); } else { hx(); vy(); }
    return walk(e, path, opts);
  }

  function handlePlayer() {
    if (player.moving || player.queue.length) return;
    if (pressed.has('ok')) { pressed.delete('ok'); interact(); return; }
    if (pressed.has('cancel')) { pressed.delete('cancel'); openMenu(); return; }
    if (pressed.has('album')) { pressed.delete('album'); openAlbum(); return; }
    if (pressed.has('hint')) { pressed.delete('hint'); run(askSpirit); return; }
    pressed.clear();
    const dir = lastDir && held.has(lastDir) ? lastDir : null;
    if (!dir) return;
    const blocked = startMove(player, dir);
    if (blocked) {
      player.frame = 0;
      if (frame - (player.bumpT || -99) > 20) {
        player.bumpT = frame;
        Sound.sfx('bump');
        if (blocked === 'fog' && frame - (player.fogT || -999) > 240) {
          player.fogT = frame;
          toast('시간의 안개가 길을 막고 있다. 이 시대의 사진을 먼저 찍자!');
        }
      }
    }
  }
  function frontTile() {
    const [dx, dy] = DIRS[player.dir];
    return [player.x + dx, player.y + dy];
  }
  function interactTarget() {
    const [fx, fy] = frontTile();
    let e = entAt(fx, fy, e => e.talk);
    if (!e) {
      // 카운터 너머 대화 (책상·카운터 한 칸 건너)
      const chr = map.rows[fy] && map.rows[fy][fx];
      if (chr === 'K' || chr === 'k') {
        const [dx, dy] = DIRS[player.dir];
        e = entAt(fx + dx, fy + dy, e => e.talk && e.look);
      }
    }
    if (!e) e = entAt(player.x, player.y, e => e.talk);
    return e;
  }
  function interact() {
    const e = interactTarget();
    if (!e) return;
    run(async () => {
      if (e.look && !e.def.noTurn) {
        const dx = player.x - e.x, dy = player.y - e.y;
        e.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      }
      await e.talk(e);
    });
  }
  function onPlayerStep() {
    trail.push({ x: player.x, y: player.y });
    if (trail.length > 4) trail.shift();
    const e = entAt(player.x, player.y, e => e.step);
    if (e && !busy) run(() => e.step(e));
    const z = zoneAt(player.x);
    if (z) {
      for (const tr of z.def.triggers || []) {
        const lx = player.x - z.x0;
        if (lx >= tr.x && lx < tr.x + (tr.w || 1) && player.y >= tr.y && player.y < tr.y + (tr.h || 1)) {
          if (tr.once && F(tr.once)) continue;
          if (tr.if && !tr.if()) continue;
          if (tr.once) setF(tr.once);
          queueScript(tr.run);
        }
      }
    }
  }

  /* ---------------- 스크립트 ---------------- */
  async function run(fn, ...args) {
    if (busy) return;
    busy = true;
    pressed.clear();
    try { await fn(...args); }
    catch (e) { console.error(e); }
    finally {
      hideDialog();
      busy = false;
      pressed.clear();
      updateHud();
    }
  }
  function queueScript(fn) { pending.push(fn); }

  /* ---------------- 대화창 ---------------- */
  const dlg = { segs: [], n: 0, done: true, res: null, el: $('dialog') };
  function parseText(t) {
    const segs = [];
    let cls = '';
    for (const c of t) {
      if (c === '[') { cls = 'hl'; continue; }
      if (c === '{') { cls = 'rd'; continue; }
      if (c === '<') { cls = 'bl'; continue; }
      if (c === ']' || c === '}' || c === '>') { cls = ''; continue; }
      segs.push({ c, cls });
    }
    return segs;
  }
  function renderSegs(segs, n) {
    let html = '', cur = null, buf = '';
    const flush = () => { if (buf) html += cur ? `<span class="${cur}">${esc(buf)}</span>` : esc(buf); buf = ''; };
    for (let i = 0; i < n && i < segs.length; i++) {
      if (segs[i].cls !== cur) { flush(); cur = segs[i].cls; }
      buf += segs[i].c;
    }
    flush();
    return html;
  }
  const NAME_COL = { '찰칵이': '#f7a8c4', '하람': '#9fd4ff' };
  function showDialog(name, text, narration) {
    const el = dlg.el;
    el.classList.remove('hidden', 'done');
    el.classList.toggle('narration', !!narration);
    const nm = $('dlgName');
    if (name) {
      nm.textContent = name;
      nm.style.background = NAME_COL[name] || '';
      nm.classList.remove('hidden');
    } else nm.classList.add('hidden');
    dlg.segs = parseText(text);
    dlg.n = 0; dlg.done = false;
    $('dlgText').innerHTML = '';
  }
  function hideDialog() {
    dlg.el.classList.add('hidden');
    $('choices').classList.add('hidden');
  }
  function updateDialog() {
    if (dlg.done) return;
    const before = Math.floor(dlg.n);
    dlg.n += 1.25;
    const n = Math.floor(dlg.n);
    if (n !== before) {
      $('dlgText').innerHTML = renderSegs(dlg.segs, n);
      if (n % 3 === 0 && dlg.segs[n - 1] && dlg.segs[n - 1].c.trim()) Sound.sfx('blip');
    }
    if (n >= dlg.segs.length) finishTyping();
  }
  function finishTyping() {
    dlg.n = dlg.segs.length;
    dlg.done = true;
    $('dlgText').innerHTML = renderSegs(dlg.segs, dlg.n);
    dlg.el.classList.add('done');
    if (dlg.onDone) { const f = dlg.onDone; dlg.onDone = null; f(); }
  }
  function say(name, text, opts = {}) {
    return new Promise(res => {
      showDialog(name, text, opts.narration);
      if (opts.noWait) {
        dlg.el.classList.add('done');
        const h = k => { if (k === 'ok' || k === 'cancel') finishTyping(); };
        dlg.onDone = () => { popH(h); dlg.el.classList.remove('done'); res(); };
        pushH(h);
        return;
      }
      const h = k => {
        if (k !== 'ok' && k !== 'cancel') return;
        if (!dlg.done) { finishTyping(); return; }
        popH(h);
        Sound.sfx('blip');
        res();
      };
      pushH(h);
    });
  }
  const narr = (text) => say(null, text, { narration: true });
  async function sayAll(name, lines) { for (const l of lines) await say(name, l); }

  function choose(options, opts = {}) {
    return new Promise(res => {
      const box = $('choices');
      box.classList.remove('hidden');
      box.classList.toggle('quiz', !!opts.quiz);
      let sel = 0;
      const draw = () => {
        box.innerHTML = options.map((o, i) => `<div class="${i === sel ? 'sel' : ''}">${esc(o)}</div>`).join('');
      };
      draw();
      const h = k => {
        if (k === 'up') { sel = (sel + options.length - 1) % options.length; Sound.sfx('select'); draw(); }
        else if (k === 'down') { sel = (sel + 1) % options.length; Sound.sfx('select'); draw(); }
        else if (k === 'ok') { popH(h); Sound.sfx('ok'); box.classList.add('hidden'); res(sel); }
        else if (k === 'cancel' && opts.cancel !== undefined) { popH(h); Sound.sfx('cancel'); box.classList.add('hidden'); res(opts.cancel); }
      };
      pushH(h);
    });
  }
  async function ask(name, text, options, opts = {}) {
    await say(name, text, { noWait: true, narration: !name });
    return choose(options, opts);
  }

  /* ---------------- 연출 ---------------- */
  let toastT = null;
  function toast(text, ms = 2600) {
    const el = $('toast');
    el.textContent = text;
    el.classList.remove('hidden');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.add('hidden'), ms);
  }
  function zoneCard(year, place, big) {
    const el = $('zoneCard');
    el.classList.add('hidden');
    void el.offsetWidth;
    el.querySelector('.year').textContent = year;
    el.querySelector('.place').textContent = place;
    el.classList.toggle('big', !!big);
    el.classList.remove('hidden');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.add('hidden'), big ? 4200 : 3300);
  }
  function fadeOut(ms = 600) { const f = $('fade'); f.style.transition = `opacity ${ms}ms`; f.style.opacity = 1; return wait(ms + 30); }
  function fadeIn(ms = 600) { const f = $('fade'); f.style.transition = `opacity ${ms}ms`; f.style.opacity = 0; return wait(ms + 30); }
  function flash() { const f = $('flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }
  function shake(ms = 400) { shakeT = Math.max(shakeT, Math.round(ms / 16)); }
  function emote(e, sym, ms = 1200) {
    e = typeof e === 'string' ? ent(e) : e;
    if (!e) return;
    e.emote = sym; e.emoteT = Math.round(ms / 16);
  }
  function face(e, dir) { e = typeof e === 'string' ? ent(e) : e; if (e) e.dir = dir; }
  function faceTo(e, other) {
    e = typeof e === 'string' ? ent(e) : e;
    other = typeof other === 'string' ? ent(other) : (other || player);
    if (!e || !other) return;
    const dx = other.x - e.x, dy = other.y - e.y;
    e.dir = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
  }
  function ent(id) { return ents.find(e => e.id === id); }
  function spawn(def, zoneId) {
    const z = zoneId !== undefined ? map.zones.find(zz => zz.def.id === zoneId) : zoneAt(player.x);
    const e = makeEnt(def, z ? z.x0 : 0, z ? z.i : 0);
    ents.push(e);
    return e;
  }
  function despawn(id) { const i = ents.findIndex(e => e.id === id); if (i >= 0) ents.splice(i, 1); }
  function camTo(x, y, local = true) {
    const z = zoneAt(player.x);
    camTarget = { x: (local && z ? x + z.x0 : x) * T + 8, y: y * T + 8 };
    return wait(700);
  }
  function camFollow() { camTarget = null; }

  function give(id, silent) {
    if (!has(id)) S.items.push(id);
    if (!silent) { Sound.sfx('item'); toast(`'${(ITEMS[id] || { name: id }).name}'을(를) 얻었다!`); }
    save();
  }
  function take(id) { S.items = S.items.filter(i => i !== id); }

  function clearFog(zoneIdx) {
    for (const f of map.fogs) {
      if (f.zone === zoneIdx && f.solid) {
        f.solid = false; f.clearing = true;
        Sound.sfx('fog');
        toast('시간의 안개가 걷혔다! 다음 시대로 →', 3000);
      }
    }
  }
  function checkGoals() {
    map.zones.forEach((z, i) => {
      if (z.def.goal && S.photos[z.def.goal] !== undefined) clearFog(i + 1);
    });
  }

  /* ---------------- 사진 ---------------- */
  async function snap(id, opts = {}) {
    const ph = PHOTOS[id];
    if (!ph) { console.warn('photo?', id); return; }
    if (S.photos[id] !== undefined) return;
    hideDialog();
    await wait(150);
    Sound.sfx('shutter');
    render();
    let url = '';
    try { url = canvas.toDataURL('image/png'); } catch (e) { url = ''; }
    flash();
    await wait(650);
    S.photos[id] = url;
    savePhoto(id, url);
    save();
    Sound.sfx('photo');
    const card = $('photoCard');
    $('zoneCard').classList.add('hidden');
    $('pcImg').src = url || '';
    $('pcTitle').textContent = `${ph.title} (${ph.year})`;
    $('pcDesc').textContent = ph.desc;
    card.querySelector('.pc-label').textContent = ph.bonus ? '찰칵! 보너스 사진을 얻었다' : '찰칵! 사진을 얻었다';
    card.classList.remove('hidden');
    updateHud();
    await new Promise(res => {
      const h = k => { if (k === 'ok' || k === 'cancel') { popH(h); Sound.sfx('ok'); res(); } };
      pushH(h);
    });
    card.classList.add('hidden');
    if (!opts.noFog) checkGoals();
  }
  function photosOf(ch) { return Object.entries(PHOTOS).filter(([, p]) => p.ch === ch).map(([id, p]) => ({ id, ...p })); }

  /* ---------------- HUD ---------------- */
  function updateHud() {
    const hud = $('hud');
    if (mode !== 'play' || !chapter || chapter.noHud) { hud.classList.add('hidden'); return; }
    hud.classList.remove('hidden');
    const z = zoneAt(player.x);
    $('hudChapter').textContent = `${chapter.short || chapter.title}${z && z.def.hud ? ' · ' + z.def.hud : ''}`;
    const list = photosOf(chapter.id);
    const req = list.filter(p => !p.bonus);
    const got = req.filter(p => S.photos[p.id] !== undefined).length;
    const bon = list.filter(p => p.bonus && S.photos[p.id] !== undefined).length;
    $('hudPhotos').textContent = list.length ? `사진 ${got}/${req.length}${bon ? ` +보너스 ${bon}` : ''}` : '';
  }

  /* ---------------- 메뉴 ---------------- */
  function toggleSound() {
    Sound.setEnabled(!Sound.enabled);
    toast(Sound.enabled ? '소리 켜짐' : '소리 꺼짐', 1200);
  }
  function openMenu() {
    if (busy) return;
    busy = true;
    const el = $('menu');
    let sel = 0;
    const items = () => [
      ['사진첩 보기', () => { close(); openAlbum(); }],
      ['찰칵이에게 묻기 (H)', () => { close(); run(askSpirit); }],
      ['저장하기', () => { save(); toast('저장했습니다.', 1500); }],
      [`소리: ${Sound.disabled ? '사용 안 함' : (Sound.enabled ? '켜짐' : '꺼짐')} (M)`, () => { if (!Sound.disabled) toggleSound(); }],
      ['타이틀로', () => { save(); close(); goTitle(); }],
      ['닫기', () => close()],
    ];
    const draw = () => {
      const its = items();
      const inv = S.items.length ? S.items.map(i => `<b>${esc((ITEMS[i] || { name: i }).name)}</b>`).join(', ') : '없음';
      el.innerHTML = `<div class="m-title">메뉴</div>` +
        its.map((it, i) => `<div class="m-item ${i === sel ? 'sel' : ''}">${esc(it[0])}</div>`).join('') +
        `<div class="m-items">소지품: ${inv}</div>`;
    };
    const close = () => { popH(h); el.classList.add('hidden'); busy = false; pressed.clear(); };
    const h = k => {
      const its = items();
      if (k === 'up') { sel = (sel + its.length - 1) % its.length; Sound.sfx('select'); draw(); }
      else if (k === 'down') { sel = (sel + 1) % its.length; Sound.sfx('select'); draw(); }
      else if (k === 'ok') { Sound.sfx('ok'); its[sel][1](); if (!el.classList.contains('hidden')) draw(); }
      else if (k === 'cancel') { Sound.sfx('cancel'); close(); }
    };
    pushH(h);
    el.classList.remove('hidden');
    draw();
  }

  async function askSpirit() {
    if (!spiritOn) { await narr('(아직 아무도 대답하지 않는다.)'); return; }
    const z = zoneAt(player.x);
    const hint = z && (typeof z.def.hint === 'function' ? z.def.hint() : z.def.hint);
    await say('찰칵이', hint || '주변 사람들과 이야기해 보자! 이 시대를 알아야 좋은 사진을 찍을 수 있어.');
  }

  /* ---------------- 사진첩 ---------------- */
  function openAlbum(onClose) {
    const wasBusy = busy;
    busy = true;
    const el = $('album');
    const chs = CHAPTERS.filter(c => photosOf(c.id).length);
    let ci = Math.max(0, chs.findIndex(c => chapter && c.id === chapter.id));
    let sel = 0;
    const draw = () => {
      $('albumTabs').innerHTML = chs.map((c, i) => `<div class="${i === ci ? 'sel' : ''}">${esc(c.tab || c.short)}</div>`).join('');
      const list = photosOf(chs[ci].id);
      sel = Math.min(sel, list.length - 1);
      $('albumGrid').innerHTML = list.map((p, i) => {
        const got = S.photos[p.id] !== undefined;
        const img = got && S.photos[p.id] ? `<img src="${S.photos[p.id]}" alt="">` : (got ? '📷' : '?');
        return `<div class="slot ${p.bonus ? 'bonus' : ''} ${i === sel ? 'sel' : ''}">${img}<div class="yr">${esc(p.year)}</div></div>`;
      }).join('');
      const p = list[sel];
      const got = S.photos[p.id] !== undefined;
      $('albumDetail').innerHTML = got
        ? `<h3>${esc(p.title)}</h3><div class="meta">${esc(p.year)}${p.bonus ? ' · 보너스' : ''}</div>${esc(p.desc)}`
        : `<h3>${p.bonus ? '보너스 사진' : '아직 찍지 못한 사진'}</h3><div class="meta">${esc(p.year)}</div>${p.hint ? '힌트: ' + esc(p.hint) : '그 시대로 가서 직접 기록해 보자.'}`;
      const req = list.filter(q => !q.bonus);
      $('albumDetail').innerHTML += `<div class="meta" style="margin-top:6px">이 장의 사진: ${req.filter(q => S.photos[q.id] !== undefined).length}/${req.length} · 보너스 ${list.filter(q => q.bonus && S.photos[q.id] !== undefined).length}/${list.filter(q => q.bonus).length}</div>`;
    };
    const close = () => { popH(h); el.classList.add('hidden'); busy = wasBusy; pressed.clear(); if (onClose) onClose(); };
    const h = k => {
      const n = photosOf(chs[ci].id).length;
      if (k === 'left') sel = (sel + n - 1) % n;
      else if (k === 'right') sel = (sel + 1) % n;
      else if (k === 'up') sel = Math.max(0, sel - 4);
      else if (k === 'down') sel = Math.min(n - 1, sel + 4);
      else if (k === 'prev') { ci = (ci + chs.length - 1) % chs.length; sel = 0; }
      else if (k === 'next' || k === 'album') { ci = (ci + 1) % chs.length; sel = 0; }
      else if (k === 'cancel' || k === 'ok') { Sound.sfx('cancel'); close(); return; }
      Sound.sfx('select');
      draw();
    };
    pushH(h);
    el.classList.remove('hidden');
    draw();
  }

  /* ---------------- 챕터 전환 ---------------- */
  async function gotoChapter(id, opts = {}) {
    const ch = CHAPTERS.find(c => c.id === id);
    if (!ch) return;
    const was = busy;
    busy = true;
    await fadeOut(800);
    hideDialog();
    $('title').classList.add('hidden');
    mode = 'play';
    loadChapter(ch, opts.pos);
    S.ch = id;
    Sound.bgm(ch.bgm);
    updateHud();
    render();
    await fadeIn(800);
    if (!opts.pos) {
      if (ch.card) { zoneCard(ch.card[0], ch.card[1], true); await wait(1500); }
      save();
      try { if (ch.intro) await ch.intro(); } catch (e) { console.error(e); }
      hideDialog();
    }
    busy = was;
    pressed.clear();
    updateHud();
  }
  async function startNew() {
    S = freshState();
    wipeSave();
    spiritOn = false;
    await gotoChapter(CHAPTERS[0].id);
  }
  async function continueGame() {
    const d = loadSave();
    if (!d) return startNew();
    S = d;
    spiritOn = !!S.flags.spirit;
    await gotoChapter(S.ch, { pos: { x: S.x, y: S.y, dir: S.dir } });
    toast('이어서 시작합니다.', 1500);
  }
  async function debugChapter(id) {
    S = freshState();
    S.flags.spirit = true;
    spiritOn = true;
    await gotoChapter(id);
  }

  /* ---------------- 타이틀 ---------------- */
  let titleH = null;
  function goTitle() {
    mode = 'title';
    handlers.length = 0;
    busy = false;
    hideDialog();
    ['menu', 'album', 'photoCard', 'hud'].forEach(id => $(id).classList.add('hidden'));
    const tch = CHAPTERS.find(c => c.id === 1) || CHAPTERS[0];
    S = loadSave() || freshState();
    loadChapter(tch);
    spiritOn = false;
    titlePan = 0;
    canvas.style.filter = 'sepia(.55) brightness(.75)';
    Sound.bgm('title');
    const el = $('title');
    el.classList.remove('hidden');
    let sel = 0;
    const items = () => {
      const its = [['처음부터', () => run2(startNew)]];
      if (hasSave()) its.unshift(['이어하기', () => run2(continueGame)]);
      if (Object.keys(S.photos).length) its.push(['사진첩', () => openAlbum()]);
      its.push([`소리: ${Sound.disabled ? '사용 안 함' : (Sound.enabled ? '켜짐' : '꺼짐')}`, () => { if (!Sound.disabled) toggleSound(); }]);
      return its;
    };
    const draw = () => {
      el.innerHTML = `<div class="t-main">도트 코리아</div><div class="t-sub">1961 – 1998 · 사진기를 든 시간 여행</div>` +
        `<div class="t-items">${items().map((it, i) => `<div class="t-item ${i === sel ? 'sel' : ''}">${esc(it[0])}</div>`).join('')}</div>` +
        `<div class="t-foot">방향키 이동 · Space 결정 · X 메뉴 · Shift 달리기</div>`;
    };
    const run2 = async fn => { popH(titleH); await fn(); };
    titleH = k => {
      const its = items();
      if (k === 'up') { sel = (sel + its.length - 1) % its.length; Sound.sfx('select'); }
      else if (k === 'down') { sel = (sel + 1) % its.length; Sound.sfx('select'); }
      else if (k === 'ok') { Sound.sfx('ok'); its[sel][1](); }
      draw();
    };
    pushH(titleH);
    draw();
    fadeIn(800);
  }

  /* ---------------- 카메라 ---------------- */
  function snapCamera() {
    const c = camGoal();
    camX = c.x; camY = c.y;
  }
  function camGoal() {
    let tx, ty;
    if (mode === 'title') { tx = titlePan + W / 2; ty = map.h * T / 2; }
    else if (camTarget) { tx = camTarget.x; ty = camTarget.y; }
    else { tx = player.px + 8; ty = player.py + 8; }
    const mw = map.w * T, mh = map.h * T;
    let x = tx - W / 2, y = ty - H / 2;
    x = mw <= W ? (mw - W) / 2 : Math.max(0, Math.min(mw - W, x));
    y = mh <= H ? (mh - H) / 2 : Math.max(0, Math.min(mh - H, y));
    return { x, y };
  }
  function updateCamera() {
    const g = camGoal();
    if (camTarget || mode === 'title') {
      camX += (g.x - camX) * 0.12; camY += (g.y - camY) * 0.12;
    } else { camX = g.x; camY = g.y; }
  }

  /* ---------------- 업데이트 ---------------- */
  function update() {
    frame++;
    updateDialog();
    if (!map) return;
    if (mode === 'title') {
      titlePan += 0.35;
      if (titlePan > map.w * T - W) titlePan = 0;
    }
    for (const e of ents) {
      if (!visible(e)) continue;
      stepEnt(e);
      if (e.emoteT > 0 && --e.emoteT === 0) e.emote = null;
      if (e.wander && !busy && !e.moving && !e.queue.length && --e.wanderT <= 0) {
        e.wanderT = 90 + Math.random() * 150;
        const ds = Object.keys(DIRS);
        const d = ds[Math.floor(Math.random() * 4)];
        const [dx, dy] = DIRS[d];
        if (Math.abs(e.x + dx - e.home.x) <= e.wander && Math.abs(e.y + dy - e.home.y) <= e.wander) {
          if (!solidAt(e.x + dx, e.y + dy, e) && !(player.x === e.x + dx && player.y === e.y + dy)) e.queue.push({ dir: d, tries: 80 });
        } else e.dir = d;
      }
    }
    if (mode === 'play') {
      if (!busy && !handlers.length) {
        if (pending.length) { const fn = pending.shift(); run(fn); }
        else handlePlayer();
      }
      const z = zoneAt(player.x);
      if (z && z.def.tick && !busy && !handlers.length) z.def.tick(frame);
      if (z && z.i !== curZone && !busy && !handlers.length) {
        curZone = z.i;
        updateHud();
        if (z.def.bgm || chapter.bgm) Sound.bgm(z.def.bgm || chapter.bgm);
        const key = chapter.id + ':' + z.def.id;
        if (!S.seen[key] && z.def.year) {
          S.seen[key] = 1;
          zoneCard(z.def.year, z.def.place);
          if (z.def.enter) queueScript(z.def.enter);
          save();
        }
      }
    }
    for (const f of map.fogs) if (f.clearing) { f.alpha -= 0.012; if (f.alpha <= 0) { f.alpha = 0; f.clearing = false; } }
    if (spiritOn && player) {
      const tx = player.px + (player.dir === 'left' ? 12 : -10);
      const ty = player.py - 12;
      spiritPos.x += (tx - spiritPos.x) * 0.08;
      spiritPos.y += (ty - spiritPos.y) * 0.08;
    }
    updateCamera();
    if (shakeT > 0) shakeT--;
  }

  /* ---------------- 렌더 ---------------- */
  const TINT = {
    night: '#3c4a8c', dawn: '#b4a4cc', dusk: '#e8a888', gray: '#a8a8b0', dim: '#8a8a9a',
  };
  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0d0b14';
    ctx.fillRect(0, 0, W, H);
    if (!map) return;
    let ox = Math.round(camX), oy = Math.round(camY);
    if (shakeT > 0) { ox += Math.round(Math.random() * 4 - 2); oy += Math.round(Math.random() * 4 - 2); }
    const bg = map.canvas[map.hasWater ? Math.floor(frame / 30) % 2 : 0];
    ctx.drawImage(bg, ox, oy, W, H, 0, 0, W, H);

    // 엔티티 (y 정렬)
    const list = ents.filter(e => visible(e)).sort((a, b) => (a.py + a.fh * T) - (b.py + b.fh * T) || (a.isPlayer ? 1 : -1));
    for (const e of list) { if (mode === 'title' && e.isPlayer) continue; drawEnt(e, ox, oy); }

    // 대화 가능 표시
    if (mode === 'play' && !busy && !player.moving) {
      const t = interactTarget();
      if (t) {
        const bx = Math.round(t.px + t.fw * T / 2 - ox);
        let top = t.py - oy - (t.prop ? SPR.PROPS[t.prop].h - t.fh * T : 4) - 6 + Math.round(Math.sin(frame / 8) * 1.5);
        if (t.look) top = t.py - oy - 10 + Math.round(Math.sin(frame / 8) * 1.5);
        ctx.fillStyle = '#1e1826';
        ctx.fillRect(bx - 3, top - 1, 7, 1); ctx.fillRect(bx - 4, top, 9, 2); ctx.fillRect(bx - 3, top + 2, 7, 1); ctx.fillRect(bx - 2, top + 3, 5, 1); ctx.fillRect(bx - 1, top + 4, 3, 1);
        ctx.fillStyle = '#ffcf4a';
        ctx.fillRect(bx - 3, top, 7, 2); ctx.fillRect(bx - 2, top + 2, 5, 1); ctx.fillRect(bx - 1, top + 3, 3, 1);
      }
    }

    // 찰칵이
    if (spiritOn && mode === 'play') {
      const bob = Math.round(Math.sin(frame / 14) * 2);
      ctx.drawImage(SPR.spirit[Math.floor(frame / 40) % 2], Math.round(spiritPos.x - ox), Math.round(spiritPos.y - oy + bob));
    }

    // 색조 · 조명 · 날씨
    for (const z of map.zones) {
      const zx = z.x0 * T - ox, zw = z.w * T;
      if (zx > W || zx + zw < 0) continue;
      const tint = z.def.tint;
      if (tint) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = TINT[tint] || tint;
        ctx.fillRect(zx, 0, zw, H);
        ctx.globalCompositeOperation = 'lighter';
        for (const e of list) {
          if (e.zone !== z.i) continue;
          const pd = e.prop && SPR.PROPS[e.prop];
          const lightCol = (pd && pd.light) || e.def.light;
          if (!lightCol) continue;
          const lx = e.px + e.fw * T / 2 - ox, ly = e.py - oy + (pd ? -pd.h + e.fh * T + 6 : 0);
          const g = ctx.createRadialGradient(lx, ly, 2, lx, ly, 40);
          g.addColorStop(0, lightCol + '55'); g.addColorStop(1, lightCol + '00');
          ctx.fillStyle = g;
          ctx.fillRect(lx - 40, ly - 40, 80, 80);
        }
        ctx.globalCompositeOperation = 'source-over';
      }
      if (z.def.weather) drawWeather(z.def.weather, zx, zw);
    }

    // 시간의 안개
    for (const f of map.fogs) {
      if (f.alpha <= 0) continue;
      const fx = f.x0 * T - ox;
      if (fx > W + 20 || fx + 2 * T < -20) continue;
      ctx.globalAlpha = f.alpha * 0.55;
      ctx.fillStyle = '#e8e2f4';
      ctx.fillRect(fx, 0, 2 * T, H);
      ctx.globalAlpha = f.alpha * 0.9;
      for (let i = 0; i < 14; i++) {
        const py = ((i * 37 + frame * 0.3) % (map.h * T + 24)) - 12 - oy;
        const px = fx + 4 + Math.sin(frame / 40 + i) * 6 + (i % 2) * 10;
        ctx.drawImage(SPR.fogPuff, Math.round(px - 6), Math.round(py));
      }
      ctx.globalAlpha = 1;
    }
  }
  function drawWeather(kind, zx, zw) {
    ctx.save();
    ctx.beginPath(); ctx.rect(zx, 0, zw, H); ctx.clip();
    if (kind === 'snow' || kind === 'petals') {
      for (let i = 0; i < 46; i++) {
        const x = ((i * 53 + frame * (0.3 + (i % 3) * 0.15) + Math.sin(frame / 50 + i) * 8) % (W + 10) + W + 10) % (W + 10) - 5;
        const y = ((i * 97 + frame * (0.5 + (i % 4) * 0.2)) % (H + 10)) - 5;
        ctx.fillStyle = kind === 'snow' ? '#ffffff' : (i % 2 ? '#f8c8d8' : '#ffe4ec');
        ctx.fillRect(Math.round(x), Math.round(y), i % 3 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1);
      }
    } else if (kind === 'smoke') {
      ctx.globalAlpha = 0.28;
      for (let i = 0; i < 10; i++) {
        const x = ((i * 71 + frame * 0.25) % (W + 60)) - 30;
        const y = 40 + (i * 37) % 120 + Math.sin(frame / 60 + i) * 6;
        ctx.drawImage(SPR.fogPuff, Math.round(x), Math.round(y), 48, 48);
      }
      ctx.globalAlpha = 1;
    } else if (kind === 'rain') {
      ctx.fillStyle = 'rgba(200,220,255,.5)';
      for (let i = 0; i < 60; i++) {
        const x = (i * 41 + frame * 1.5) % W;
        const y = (i * 67 + frame * 5) % H;
        ctx.fillRect(Math.round(x), Math.round(y), 1, 4);
      }
    }
    ctx.restore();
  }
  function drawEnt(e, ox, oy) {
    const x = Math.round(e.px - ox), y = Math.round(e.py - oy);
    if (x < -96 || x > W + 32 || y < -80 || y > H + 32) return;
    if (e.look) {
      ctx.fillStyle = 'rgba(0,0,0,.22)';
      ctx.fillRect(x + 4, y + 13, 8, 2); ctx.fillRect(x + 3, y + 14, 10, 1);
      const sheet = SPR.charSheet(e.look);
      let bob = 0;
      if (e.cheer) bob = (Math.floor((frame + e.x * 7) / 12) % 2) ? -1 : 0;
      ctx.drawImage(sheet[e.dir][e.moving ? e.frame : 0], x, y - 2 + bob);
    } else if (e.prop) {
      const pd = SPR.PROPS[e.prop];
      const img = SPR.propImage(e.prop, e.arg, Math.floor(frame / 20));
      if (img) ctx.drawImage(img, x + Math.floor((e.fw * T - pd.w) / 2), y + e.fh * T - pd.h);
    }
    if (e.emote && SPR.EMOTE[e.emote]) {
      const top = e.look ? y - 13 : y + e.fh * T - SPR.PROPS[e.prop].h - 11;
      ctx.drawImage(SPR.EMOTE[e.emote], x + Math.floor(e.fw * T / 2) - 4, top);
    }
  }

  /* ---------------- 루프 ---------------- */
  let last = performance.now(), acc = 0;
  function loop(now) {
    acc += Math.min(100, now - last);
    last = now;
    while (acc >= 1000 / 60) { update(); acc -= 1000 / 60; }
    render();
    requestAnimationFrame(loop);
  }

  /* ---------------- 퀴즈 ---------------- */
  async function quiz(qs, who = '찰칵이') {
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      for (;;) {
        const idx = await ask(who, `[문제 ${i + 1}/${qs.length}] ${q.q}`, q.a, { quiz: true });
        if (idx === q.ok) {
          Sound.sfx('correct');
          await say(who, `정답! ${q.why || ''}`);
          break;
        }
        Sound.sfx('wrong');
        await say(who, `음… 아니야. ${q.hint || '사진첩(Tab)을 다시 떠올려 봐!'}`);
      }
    }
  }

  async function chapterClear() {
    const id = chapter.id;
    if (!S.cleared.includes(id)) S.cleared.push(id);
    const list = photosOf(id);
    const req = list.filter(p => !p.bonus);
    const bon = list.filter(p => p.bonus);
    Sound.sfx('gate');
    flash();
    await narr(`${chapter.title} 완료!\n사진 ${req.filter(p => S.photos[p.id] !== undefined).length}/${req.length} · 보너스 ${bon.filter(p => S.photos[p.id] !== undefined).length}/${bon.length}`);
    const idx = CHAPTERS.findIndex(c => c.id === id);
    const next = CHAPTERS[idx + 1];
    if (next) await gotoChapter(next.id);
  }

  async function credits(lines) {
    const el = $('title');
    hideDialog();
    $('hud').classList.add('hidden');
    el.classList.add('credits');
    el.innerHTML = `<div class="cr-body">${lines.map(l => l.startsWith('#') ? `<div class="cr-h">${esc(l.slice(1))}</div>` : `<div>${esc(l) || '&nbsp;'}</div>`).join('')}</div>`;
    el.classList.remove('hidden');
    await fadeIn(900);
    await new Promise(res => {
      const h = k => { if (k === 'ok' || k === 'cancel') { popH(h); res(); } };
      setTimeout(() => pushH(h), 800);
    });
    el.classList.remove('credits');
  }

  /* ---------------- 시작 ---------------- */
  function boot() {
    requestAnimationFrame(loop);
    const dbg = parseInt(params.get('ch'), 10);
    if (!isNaN(dbg) && CHAPTERS.find(c => c.id === dbg)) {
      mode = 'play';
      debugChapter(dbg);
    } else goTitle();
  }

  const api = {
    CHAPTERS, PHOTOS, ITEMS, W, H, T,
    boot, render, run, say, narr, sayAll, ask, choose, snap, give, take, has, F, setF, wait,
    walk, walkTo, face, faceTo, emote, ent, spawn, despawn, shake, flash, toast, zoneCard,
    fadeOut, fadeIn, clearFog, gotoChapter, chapterClear, quiz, camTo, camFollow, credits, goTitle,
    openAlbum, photosOf, save, updateHud,
    sfx: n => Sound.sfx(n), bgm: n => Sound.bgm(n),
    setSpirit(on) { spiritOn = on; setF('spirit', on); if (player) spiritPos = { x: player.px - 10, y: player.py - 12 }; },
    get player() { return player; },
    get map() { return map; },
    get chapter() { return chapter; },
    get state() { return S; },
    get busy() { return busy; },
    get mode() { return mode; },
    zoneAt, nextFrame,
  };
  return api;
})();

// 스토리 스크립트에서 쓰기 편하도록 전역으로 노출
const { say, narr, sayAll, ask, choose, snap, give, take, has, F, setF, wait, walk, walkTo, face, faceTo,
  emote, ent, spawn, despawn, shake, flash, toast, fadeOut, fadeIn, clearFog, quiz, camTo, camFollow } = Game;
const sfx = n => Sound.sfx(n);
