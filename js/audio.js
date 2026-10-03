/* =========================================================
 * 칩튠 BGM & 효과음 (WebAudio)
 * ?mute=1 로 열면 오디오를 아예 만들지 않는다
 * ========================================================= */
const Sound = (() => {
  const params = new URLSearchParams(location.search);
  const disabled = params.has('mute') || params.has('nobgm');
  let ctx = null, master = null, bgmGain = null, sfxGain = null;
  let enabled = true;
  let current = null;      // 현재 곡 이름
  let wanted = null;       // 재생하려는 곡 이름 (컨텍스트 생성 전 대기용)
  let seq = null;          // 시퀀서 상태
  let timer = null;

  try { enabled = localStorage.getItem('dotkorea_sound') !== 'off'; } catch (e) { /* 저장소 불가 */ }

  const NOTE = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
  function freq(n) {
    const m = /^([A-G]#?)(-?\d)$/.exec(n);
    if (!m) return 0;
    const midi = (parseInt(m[2], 10) + 1) * 12 + NOTE[m[1]];
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
  function parse(str) {
    return str.replace(/\|/g, ' ').trim().split(/\s+/).map(tok => {
      const [n, l] = tok.split(':');
      return { n, len: parseInt(l || '4', 10) };
    });
  }

  const rep = (s, n) => Array(n).fill(s).join(' ');
  const TRACKS = {
    title: {
      bpm: 84,
      mel: 'E5:4 G5:2 A5:2 G5:4 | E5:4 D5:2 E5:2 G5:4 | A5:4 C6:2 A5:2 G5:4 | E5:8 R:4 | D5:4 E5:2 G5:2 E5:4 | D5:4 C5:2 D5:2 E5:4 | G5:4 E5:2 D5:2 C5:4 | C5:8 R:4',
      bass: 'C3:12 | A2:12 | F2:12 | C3:12 | G2:12 | A2:12 | F2:6 G2:6 | C3:12',
    },
    ch1: {
      bpm: 112,
      mel: 'C5:2 C5:2 G4:2 C5:2 E5:4 D5:4 | C5:2 D5:2 E5:2 G5:2 A5:4 G5:4 | E5:2 E5:2 D5:2 C5:2 D5:4 A4:4 | C5:2 D5:2 E5:2 D5:2 C5:8 | A4:2 C5:2 D5:2 E5:2 G5:4 E5:4 | D5:2 E5:2 G5:2 A5:2 G5:8 | E5:2 G5:2 A5:2 G5:2 E5:4 D5:4 | C5:4 D5:4 C5:8',
      bass: 'C3:4 G2:4 C3:4 G2:4 | F2:4 C3:4 F2:4 C3:4 | A2:4 E2:4 F2:4 G2:4 | C3:4 G2:4 C3:8 | A2:4 E3:4 A2:4 E3:4 | G2:4 D3:4 G2:4 D3:4 | F2:4 C3:4 G2:4 D3:4 | C3:4 G2:4 C3:8',
      drum: rep('K:4 S:4 K:4 S:4', 8),
    },
    ch2: {
      bpm: 76,
      mel: 'A4:6 C5:2 B4:4 A4:4 | E5:8 D5:4 C5:4 | B4:6 C5:2 D5:4 B4:4 | A4:12 R:4 | C5:6 D5:2 E5:4 G5:4 | F5:8 E5:4 D5:4 | C5:4 B4:4 G4:4 B4:4 | A4:12 R:4',
      bass: 'A2:16 | F2:16 | G2:16 | A2:8 E2:8 | C3:16 | F2:16 | G2:16 | A2:16',
    },
    ch3: {
      bpm: 120,
      mel: 'D5:2 F5:2 A5:2 F5:2 D5:2 F5:2 A5:4 | C5:2 E5:2 G5:2 E5:2 C5:2 E5:2 G5:4 | A#4:2 D5:2 F5:2 D5:2 A#4:2 D5:2 F5:4 | A4:2 C#5:2 E5:2 G5:2 A5:8 | D5:4 E5:4 F5:4 G5:4 | A5:6 G5:2 F5:4 E5:4 | F5:4 E5:4 D5:4 C#5:4 | D5:12 R:4',
      bass: 'D3:4 D3:4 D3:4 D3:4 | C3:4 C3:4 C3:4 C3:4 | A#2:4 A#2:4 A#2:4 A#2:4 | A2:4 A2:4 A2:4 A2:4 | D3:4 D3:4 C3:4 C3:4 | A#2:4 A#2:4 A2:4 A2:4 | A#2:4 A#2:4 A2:4 A2:4 | D3:8 D3:8',
      drum: rep('K:2 H:2 S:2 H:2 K:2 K:2 S:2 H:2', 8),
    },
    ch4: {
      bpm: 128,
      mel: 'G4:2 B4:2 D5:2 G5:2 F#5:4 D5:4 | E5:2 G5:2 E5:2 C5:2 D5:8 | C5:2 E5:2 G5:2 E5:2 D5:2 B4:2 G4:4 | A4:2 B4:2 C5:2 D5:2 E5:4 F#5:4 | G5:4 F#5:2 E5:2 D5:4 B4:4 | C5:4 E5:4 D5:8 | E5:2 D5:2 C5:2 B4:2 A4:4 D5:4 | G4:12 R:4',
      bass: 'G2:4 D3:4 G2:4 D3:4 | C3:4 G2:4 D3:4 A2:4 | C3:4 G2:4 G2:4 D3:4 | D3:4 A2:4 D3:4 F#2:4 | G2:4 D3:4 B2:4 D3:4 | C3:4 E3:4 D3:4 F#2:4 | C3:4 G2:4 D3:4 D3:4 | G2:8 G2:8',
      drum: rep('K:4 S:4 K:2 K:2 S:4', 8),
    },
    ch5: {
      bpm: 96,
      mel: 'A4:4 C5:4 F5:4 E5:4 | D5:6 C5:2 A4:8 | A#4:4 D5:4 G5:4 F5:4 | E5:12 R:4 | F5:4 E5:4 D5:4 C5:4 | A#4:4 A4:4 G4:8 | A4:4 C5:4 D5:4 E5:4 | F5:12 R:4',
      bass: 'F2:8 C3:8 | D3:8 A2:8 | A#2:8 F2:8 | C3:8 C3:8 | D3:8 A2:8 | A#2:8 C3:8 | F2:8 A#2:8 | F2:16',
      drum: rep('K:8 H:4 H:4', 8),
    },
    home: {
      bpm: 72,
      mel: 'E5:4 G5:2 A5:2 G5:4 | E5:4 D5:2 E5:2 G5:4 | A5:4 C6:2 A5:2 G5:4 | E5:8 R:4 | D5:4 E5:2 G5:2 E5:4 | D5:4 C5:2 D5:2 E5:4 | G5:4 E5:2 D5:2 C5:4 | C5:8 R:4',
      bass: 'C3:6 G3:6 | A2:6 E3:6 | F2:6 C3:6 | C3:6 G3:6 | G2:6 D3:6 | A2:6 E3:6 | F2:6 G2:6 | C3:12',
    },
    tense: {
      bpm: 100,
      mel: 'R:16 | R:16 | R:16 | R:16',
      bass: 'D2:2 R:2 D2:2 R:2 D2:2 R:2 D#2:2 R:2 | D2:2 R:2 D2:2 R:2 D2:2 R:2 C2:2 R:2 | D2:2 R:2 D2:2 R:2 D2:2 R:2 D#2:2 R:2 | D2:2 R:2 D2:2 R:2 F2:2 R:2 D#2:2 R:2',
      drum: rep('K:4 R:4 K:4 R:2 K:2', 4),
    },
  };
  Object.values(TRACKS).forEach(t => {
    t.chans = [];
    if (t.mel) t.chans.push({ type: 'square', vol: 0.09, notes: parse(t.mel) });
    if (t.bass) t.chans.push({ type: 'triangle', vol: 0.22, notes: parse(t.bass) });
    if (t.drum) t.chans.push({ type: 'drum', vol: 0.12, notes: parse(t.drum) });
  });

  function ensure() {
    if (disabled) return false;
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = enabled ? 0.6 : 0; master.connect(ctx.destination);
      bgmGain = ctx.createGain(); bgmGain.gain.value = 1; bgmGain.connect(master);
      sfxGain = ctx.createGain(); sfxGain.gain.value = 1; sfxGain.connect(master);
    } catch (e) { ctx = null; return false; }
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    });
    return true;
  }

  let noiseBuf = null;
  function noise() {
    if (noiseBuf) return noiseBuf;
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }

  function tone(dest, type, f, t, dur, vol, slideTo) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.setValueAtTime(vol, t + Math.max(0.01, dur * 0.7));
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function hit(dest, kind, t, vol) {
    const src = ctx.createBufferSource();
    src.buffer = noise();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    let dur = 0.08;
    if (kind === 'K') { f.type = 'lowpass'; f.frequency.value = 180; dur = 0.14; tone(dest, 'sine', 120, t, 0.12, vol * 1.6, 45); }
    else if (kind === 'S') { f.type = 'bandpass'; f.frequency.value = 1800; dur = 0.1; }
    else { f.type = 'highpass'; f.frequency.value = 7000; dur = 0.03; vol *= 0.6; }
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f); f.connect(g); g.connect(dest);
    src.start(t); src.stop(t + dur + 0.02);
  }

  function startSeq(name) {
    const tr = TRACKS[name];
    if (!tr) return;
    const now = ctx.currentTime + 0.08;
    seq = {
      name, tr,
      step: 60 / tr.bpm / 4,
      chans: tr.chans.map(c => ({ c, i: 0, t: now })),
    };
    if (!timer) timer = setInterval(pump, 40);
  }
  function pump() {
    if (!seq || !ctx) return;
    const ahead = ctx.currentTime + 0.25;
    for (const ch of seq.chans) {
      let guard = 0;
      while (ch.t < ahead && guard++ < 64) {
        const nt = ch.c.notes[ch.i];
        const dur = nt.len * seq.step;
        if (nt.n !== 'R') {
          if (ch.c.type === 'drum') hit(bgmGain, nt.n, ch.t, ch.c.vol);
          else tone(bgmGain, ch.c.type, freq(nt.n), ch.t, dur * 0.92, ch.c.vol);
        }
        ch.t += dur;
        ch.i = (ch.i + 1) % ch.c.notes.length;
      }
    }
  }

  const SFX = {
    blip: t => tone(sfxGain, 'square', 900, t, 0.025, 0.035),
    select: t => tone(sfxGain, 'square', 660, t, 0.05, 0.08, 990),
    ok: t => { tone(sfxGain, 'square', 784, t, 0.05, 0.08); tone(sfxGain, 'square', 1175, t + 0.05, 0.07, 0.08); },
    cancel: t => tone(sfxGain, 'square', 440, t, 0.08, 0.08, 300),
    bump: t => tone(sfxGain, 'triangle', 120, t, 0.06, 0.2),
    item: t => { [1047, 1319, 1568, 2093].forEach((f, i) => tone(sfxGain, 'square', f, t + i * 0.06, 0.08, 0.07)); },
    shutter: t => { hit(sfxGain, 'S', t, 0.4); hit(sfxGain, 'H', t + 0.07, 0.5); tone(sfxGain, 'square', 2400, t, 0.02, 0.05); },
    photo: t => { [784, 988, 1175, 1568].forEach((f, i) => tone(sfxGain, 'square', f, t + 0.2 + i * 0.09, 0.12, 0.07)); },
    fog: t => {
      const src = ctx.createBufferSource(); src.buffer = noise();
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2;
      f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(3000, t + 1);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0, t); g.gain.linearRampToValueAtTime(0.25, t + 0.3); g.gain.linearRampToValueAtTime(0, t + 1.1);
      src.connect(f); f.connect(g); g.connect(sfxGain); src.start(t); src.stop(t + 1.2);
    },
    gate: t => tone(sfxGain, 'square', 220, t, 0.8, 0.07, 1760),
    correct: t => { tone(sfxGain, 'square', 1047, t, 0.08, 0.08); tone(sfxGain, 'square', 1568, t + 0.09, 0.14, 0.08); },
    wrong: t => { tone(sfxGain, 'sawtooth', 160, t, 0.12, 0.08); tone(sfxGain, 'sawtooth', 120, t + 0.13, 0.18, 0.08); },
    boom: t => { hit(sfxGain, 'K', t, 0.5); hit(sfxGain, 'S', t, 0.3); },
    honk: t => { tone(sfxGain, 'square', 392, t, 0.18, 0.06); tone(sfxGain, 'square', 494, t, 0.18, 0.05); tone(sfxGain, 'square', 392, t + 0.25, 0.25, 0.06); tone(sfxGain, 'square', 494, t + 0.25, 0.25, 0.05); },
    cheer: t => {
      const src = ctx.createBufferSource(); src.buffer = noise(); src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1200; f.Q.value = 0.8;
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.18, t + 0.3); g.gain.linearRampToValueAtTime(0, t + 1.6);
      src.connect(f); f.connect(g); g.connect(sfxGain); src.start(t); src.stop(t + 1.7);
    },
    door: t => { tone(sfxGain, 'triangle', 200, t, 0.06, 0.15); tone(sfxGain, 'triangle', 150, t + 0.08, 0.08, 0.15); },
  };

  return {
    get disabled() { return disabled; },
    get enabled() { return enabled; },
    unlock() {
      if (!ensure()) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (wanted && wanted !== current) this.bgm(wanted);
    },
    setEnabled(on) {
      enabled = on;
      try { localStorage.setItem('dotkorea_sound', on ? 'on' : 'off'); } catch (e) { /* 무시 */ }
      if (master) master.gain.setTargetAtTime(on ? 0.6 : 0, ctx.currentTime, 0.05);
    },
    bgm(name) {
      wanted = name;
      if (!ctx) return;
      if (name === current) return;
      current = name;
      const t = ctx.currentTime;
      bgmGain.gain.cancelScheduledValues(t);
      bgmGain.gain.setValueAtTime(bgmGain.gain.value, t);
      bgmGain.gain.linearRampToValueAtTime(0, t + 0.3);
      const old = bgmGain;
      setTimeout(() => {
        try { old.disconnect(); } catch (e) { /* 무시 */ }
      }, 600);
      bgmGain = ctx.createGain();
      bgmGain.gain.value = 0;
      bgmGain.connect(master);
      bgmGain.gain.setValueAtTime(0, t + 0.3);
      bgmGain.gain.linearRampToValueAtTime(1, t + 0.8);
      seq = null;
      if (name) setTimeout(() => { if (current === name) startSeq(name); }, 320);
    },
    sfx(name) {
      if (!ctx || !enabled || !SFX[name]) return;
      try { SFX[name](ctx.currentTime + 0.005); } catch (e) { /* 무시 */ }
    },
  };
})();
