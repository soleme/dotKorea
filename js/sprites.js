/* =========================================================
 * 도트 그래픽: 타일 · 캐릭터 · 소품을 코드로 그린다
 * ========================================================= */
const SPR = (() => {
  const T = 16;

  function mk(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  }
  function rng(seed) {
    let s = (seed * 2654435761) >>> 0 || 1;
    return () => {
      s ^= s << 13; s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5; s >>>= 0;
      return (s % 100000) / 100000;
    };
  }
  function P(ctx) {
    return {
      ctx,
      r(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); },
      p(x, y, c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); },
      circle(cx, cy, rad, c) {
        ctx.fillStyle = c;
        for (let y = -rad; y <= rad; y++)
          for (let x = -rad; x <= rad; x++)
            if (x * x + y * y <= rad * rad + rad * 0.6) ctx.fillRect(cx + x, cy + y, 1, 1);
      },
      speck(n, c, seed, x0 = 0, y0 = 0, w = T, h = T) {
        const R = rng(seed);
        ctx.fillStyle = c;
        for (let i = 0; i < n; i++) ctx.fillRect(x0 + Math.floor(R() * w), y0 + Math.floor(R() * h), 1, 1);
      },
      // 문자열 픽셀 아트
      art(rows, pal, ox = 0, oy = 0) {
        rows.forEach((row, y) => {
          for (let x = 0; x < row.length; x++) {
            const col = pal[row[x]];
            if (col) { ctx.fillStyle = col; ctx.fillRect(ox + x, oy + y, 1, 1); }
          }
        });
      },
    };
  }
  function tile(fn) {
    const c = mk(T, T);
    fn(P(c.getContext('2d')));
    return c;
  }

  /* ---------------- 바닥 타일 ---------------- */
  const grass = (p, v = 0) => {
    p.r(0, 0, T, T, '#5c9e3e');
    p.speck(16, '#4e8c34', 11 + v);
    p.speck(7, '#74b652', 37 + v);
    const R = rng(91 + v);
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(R() * 14) + 1, y = Math.floor(R() * 13) + 2;
      p.p(x, y, '#3f7a2a'); p.p(x + 1, y - 1, '#3f7a2a');
    }
  };
  const asphalt = (p, v = 0) => {
    p.r(0, 0, T, T, '#5e5e66');
    p.speck(18, '#54545c', 21 + v);
    p.speck(10, '#6c6c74', 47 + v);
  };
  const concreteWall = (p) => {
    p.r(0, 0, T, T, '#cfc7b6');
    p.r(0, 7, T, 1, '#bdb5a4');
    p.r(0, 15, T, 1, '#a89f8c');
    p.speck(10, '#c2baa8', 5);
    p.speck(4, '#ddd6c6', 6);
  };
  const brickWall = (p) => {
    p.r(0, 0, T, T, '#a8573e');
    for (let y = 0; y < T; y += 4) {
      p.r(0, y + 3, T, 1, '#7e3e2c');
      const off = (y / 4) % 2 ? 4 : 0;
      for (let x = off; x < T; x += 8) p.r(x, y, 1, 3, '#7e3e2c');
      for (let x = off + 1; x < T; x += 8) p.r(x, y, 6, 1, '#b8664c');
    }
  };
  const windowOn = (p, x = 3, y = 3, w = 10, h = 9, lit = false) => {
    p.r(x, y, w, h, '#3a3040');
    p.r(x + 1, y + 1, w - 2, h - 2, lit ? '#f4d878' : '#8ec0e4');
    p.r(x + 1, y + 1 + Math.floor((h - 2) / 2), w - 2, 1, '#3a3040');
    p.r(x + Math.floor(w / 2), y + 1, 1, h - 2, '#3a3040');
    if (!lit) { p.p(x + 2, y + 2, '#d4ecf8'); p.p(x + 3, y + 2, '#d4ecf8'); p.p(x + 2, y + 3, '#d4ecf8'); }
    p.r(x - 1, y + h, w + 2, 1, '#6a6070');
  };

  const TILES = {};     // char -> [variants]
  const TILES_B = {};   // 아래 타일이 다를 때(처마, 연석)
  const TILES_T = {};   // 위 타일이 다를 때(물가)
  const ANIM = {};      // char -> [frame0, frame1]
  const SOLID = new Set();

  function def(ch, solid, variants, opts = {}) {
    TILES[ch] = variants.map(fn => tile(fn));
    if (solid) SOLID.add(ch);
    if (opts.b) TILES_B[ch] = tile(opts.b);
    if (opts.t) TILES_T[ch] = tile(opts.t);
  }

  def('.', 0, [0, 1, 2, 3].map(v => p => grass(p, v)));
  def(',', 0, [0, 1].map(v => p => {
    grass(p, v + 5);
    const R = rng(300 + v);
    const cols = ['#f4f0e0', '#f0c040', '#e86070', '#c890e8'];
    for (let i = 0; i < 3; i++) {
      const x = 2 + Math.floor(R() * 11), y = 2 + Math.floor(R() * 11);
      const c = cols[Math.floor(R() * cols.length)];
      p.p(x, y - 1, c); p.p(x - 1, y, c); p.p(x + 1, y, c); p.p(x, y + 1, c); p.p(x, y, '#f8e070');
    }
  }));
  def('"', 0, [p => {
    p.r(0, 0, T, T, '#4e8c34');
    const R = rng(77);
    for (let i = 0; i < 12; i++) {
      const x = Math.floor(R() * 15), y = 3 + Math.floor(R() * 12);
      p.r(x, y - 3, 1, 3, '#3a7228'); p.p(x, y - 4, '#6aa848');
    }
  }]);
  def('=', 0, [0, 1, 2].map(v => p => asphalt(p, v)));
  def('-', 0, [p => { asphalt(p, 4); p.r(1, 7, 9, 2, '#e8cc4a'); }]);
  def('z', 0, [p => { asphalt(p, 5); for (let y = 1; y < T; y += 5) p.r(0, y, T, 3, '#e8e8e0'); }]);
  const sidewalk = (p) => {
    p.r(0, 0, T, T, '#c2b59c');
    p.r(0, 7, T, 1, '#ab9e86'); p.r(0, 15, T, 1, '#ab9e86');
    p.r(7, 0, 1, 7, '#ab9e86'); p.r(15, 8, 1, 7, '#ab9e86');
    p.speck(6, '#b6a990', 8);
  };
  def(':', 0, [sidewalk], { b: p => { sidewalk(p); p.r(0, 13, T, 1, '#e0d6c0'); p.r(0, 14, T, 2, '#8a8070'); } });
  def('d', 0, [0, 1].map(v => p => {
    p.r(0, 0, T, T, '#b48c5c');
    p.speck(16, '#a07a4c', 61 + v);
    p.speck(6, '#c8a070', 62 + v);
  }));
  def('c', 0, [p => {
    p.r(0, 0, T, T, '#b8b4ac');
    p.r(0, 15, T, 1, '#a6a29a'); p.r(15, 0, 1, T, '#a6a29a');
    p.speck(10, '#aeaaa2', 71); p.speck(5, '#c6c2ba', 72);
  }]);
  def('o', 0, [p => {
    p.r(0, 0, T, T, '#b8885a');
    for (let y = 0; y < T; y += 4) {
      p.r(0, y + 3, T, 1, '#9a6c42');
      p.r(((y / 4) % 2) ? 5 : 11, y, 1, 3, '#9a6c42');
    }
    p.speck(6, '#c4966a', 81);
  }]);
  def('n', 0, [p => {
    p.r(0, 0, T, T, '#e2ba62');
    p.r(0, 7, T, 1, '#c99e4a'); p.r(0, 15, T, 1, '#c99e4a');
    p.r(7, 0, 1, T, '#c99e4a'); p.r(15, 0, 1, T, '#c99e4a');
    p.speck(5, '#ecc878', 82);
  }]);
  def('g', 0, [p => { p.r(0, 0, T, 8, '#4e9c3e'); p.r(0, 8, T, 8, '#5aac4a'); p.speck(8, '#478f38', 83); }]);
  def('a', 0, [p => { p.r(0, 0, T, T, '#c47c52'); p.speck(14, '#b06a44', 84); p.speck(6, '#d49068', 85); }]);
  def('v', 0, [p => {
    p.r(0, 0, T, T, '#a82c2c');
    for (let i = 0; i < T; i += 4) { p.p(i, i % 8, '#982424'); p.p(i + 2, (i + 4) % 8 + 8, '#982424'); }
  }]);
  def('u', 0, [p => {
    p.r(0, 0, T, T, '#e6e4dc');
    p.r(0, 0, 8, 8, '#d2d0c6'); p.r(8, 8, 8, 8, '#d2d0c6');
  }]);
  def('p', 0, [p => {
    p.r(0, 0, T, T, '#c8c0b0');
    p.r(0, 7, T, 1, '#b0a898'); p.r(0, 15, T, 1, '#b0a898');
    p.r(4, 0, 1, 7, '#b0a898'); p.r(12, 8, 1, 7, '#b0a898');
    p.speck(6, '#d2cabb', 86);
  }]);

  /* ---------------- 막힌 타일 ---------------- */
  def('T', 1, [0, 1].map(v => p => {
    grass(p, v);
    p.r(7, 11, 2, 5, '#6a4428'); p.p(9, 12, '#523218');
    for (let y = -7; y <= 7; y++)
      for (let x = -7; x <= 7; x++) {
        const d = x * x + y * y;
        if (d > 50) continue;
        let c = '#2e8a36';
        if (d > 38) c = '#1e5a24';
        else if (x + y < -4) c = '#4aa84a';
        else if (x + y > 5) c = '#22702a';
        p.p(8 + x, 7 + y, c);
      }
    p.p(5, 4, '#6cc068'); p.p(6, 3, '#6cc068');
    if (v) { p.p(10, 6, '#e8506a'); p.p(5, 9, '#e8506a'); }
  }));
  def('t', 1, [p => {
    grass(p, 2);
    for (let y = -5; y <= 5; y++)
      for (let x = -6; x <= 6; x++) {
        const d = x * x / 36 + y * y / 25;
        if (d > 1) continue;
        p.p(8 + x, 9 + y, d > 0.75 ? '#1e5a24' : (x + y < -2 ? '#4aa84a' : '#2e8a36'));
      }
  }]);
  def('F', 1, [p => {
    grass(p, 3);
    p.r(0, 5, T, 2, '#a87848'); p.r(0, 7, T, 1, '#6a4428');
    p.r(0, 10, T, 2, '#a87848'); p.r(0, 12, T, 1, '#6a4428');
    p.r(2, 3, 2, 12, '#8a6038'); p.r(12, 3, 2, 12, '#8a6038');
    p.r(2, 3, 2, 1, '#c09060'); p.r(12, 3, 2, 1, '#c09060');
  }]);
  def('I', 1, [p => {
    grass(p, 1);
    p.r(0, 5, T, 2, '#d8dce0'); p.r(0, 7, T, 1, '#7a8088');
    p.r(0, 10, T, 2, '#d8dce0'); p.r(0, 12, T, 1, '#7a8088');
    p.r(3, 4, 2, 11, '#5a6068'); p.r(11, 4, 2, 11, '#5a6068');
  }]);
  def('L', 1, [p => {
    asphalt(p, 6);
    p.r(0, 6, T, 4, '#dfe3e6'); p.r(0, 7, T, 1, '#b8bec4'); p.r(0, 10, T, 1, '#6a7078');
    p.r(2, 10, 2, 5, '#5a6068'); p.r(10, 10, 2, 5, '#5a6068');
  }]);
  const water = (f) => p => {
    p.r(0, 0, T, T, '#3a78c8');
    const off = f ? 4 : 0;
    for (let y = 2; y < T; y += 5) {
      const x = ((y * 7 + off) % 12);
      p.r(x, y, 4, 1, '#5a98e0');
      p.r((x + 8) % 14, y + 2, 3, 1, '#5a98e0');
    }
    p.p((5 + off * 2) % 16, 4, '#b0d8f8'); p.p((12 + off) % 16, 11, '#b0d8f8');
  };
  ANIM['~'] = [tile(water(0)), tile(water(1))];
  TILES['~'] = [ANIM['~'][0]];
  SOLID.add('~');
  TILES_T['~'] = tile(p => {
    water(0)(p);
    p.r(0, 0, T, 3, '#9a8a68'); p.r(0, 3, T, 1, '#6a5c44'); p.r(0, 4, T, 1, '#2e62a8');
    p.r(3, 1, 4, 1, '#b0a080'); p.r(10, 0, 3, 1, '#b0a080');
  });
  def('P', 1, [p => {
    p.r(0, 0, T, T, '#6e8c50');
    p.speck(10, '#5a7a3e', 90);
    for (let y = 2; y < T; y += 5)
      for (let x = (y % 2) * 2 + 1; x < T; x += 5) {
        p.p(x, y, '#9ad064'); p.p(x - 1, y - 1, '#9ad064'); p.p(x + 1, y - 1, '#9ad064'); p.p(x, y + 1, '#4a6a30');
      }
  }]);
  def('B', 1, [brickWall]);
  def('W', 1, [p => { brickWall(p); windowOn(p); }]);
  def('C', 1, [concreteWall]);
  def('w', 1, [p => { concreteWall(p); windowOn(p); }]);
  def('y', 1, [p => { concreteWall(p); windowOn(p, 3, 3, 10, 9, true); }]);
  def('D', 1, [p => {
    concreteWall(p);
    p.r(3, 2, 10, 14, '#4a3020'); p.r(4, 3, 8, 13, '#8a5a34');
    p.r(5, 4, 6, 4, '#7a4c2a'); p.r(5, 9, 6, 5, '#7a4c2a');
    p.p(10, 9, '#f0d060');
  }]);
  def('E', 1, [p => {
    concreteWall(p);
    p.r(1, 1, 14, 15, '#2a3a4a'); p.r(2, 2, 12, 14, '#6aa8d8');
    p.r(7, 2, 2, 14, '#2a3a4a');
    p.p(3, 3, '#c8e4f4'); p.p(4, 3, '#c8e4f4'); p.p(3, 4, '#c8e4f4');
    p.p(10, 3, '#c8e4f4'); p.p(11, 3, '#c8e4f4');
  }]);
  const roofRed = p => {
    p.r(0, 0, T, T, '#b83c30');
    for (let y = 0; y < T; y += 4) {
      p.r(0, y, T, 1, '#d0584a');
      p.r(0, y + 3, T, 1, '#8e2c24');
      const off = (y / 4) % 2 ? 3 : 0;
      for (let x = off; x < T; x += 6) p.r(x, y + 1, 1, 2, '#9a3228');
    }
  };
  def('R', 1, [roofRed], { b: p => { roofRed(p); p.r(0, 12, T, 2, '#7a2418'); p.r(0, 14, T, 2, '#3a1410'); } });
  const roofSlate = p => {
    p.r(0, 0, T, T, '#6c7c8e');
    for (let x = 0; x < T; x += 4) { p.r(x, 0, 1, T, '#56667a'); p.r(x + 1, 0, 1, T, '#8494a4'); }
  };
  def('G', 1, [roofSlate], { b: p => { roofSlate(p); p.r(0, 13, T, 1, '#3e4a58'); p.r(0, 14, T, 2, '#262e38'); } });
  const roofHanok = p => {
    p.r(0, 0, T, T, '#4a4a58');
    for (let y = 0; y < T; y += 4)
      for (let x = ((y / 4) % 2) * 2; x < T; x += 4) {
        p.r(x, y, 3, 1, '#62626e'); p.p(x, y + 1, '#5a5a66'); p.p(x + 2, y + 1, '#5a5a66');
        p.r(x, y + 3, 4, 1, '#30303c');
      }
  };
  def('H', 1, [roofHanok], { b: p => { roofHanok(p); p.r(0, 11, T, 1, '#e8e4dc'); p.r(0, 12, T, 2, '#30303c'); p.r(0, 14, T, 2, '#1a1a22'); } });
  const roofThatch = p => {
    p.r(0, 0, T, T, '#c8a058');
    const R = rng(95);
    for (let i = 0; i < 26; i++) {
      const x = Math.floor(R() * 16), y = Math.floor(R() * 15);
      p.p(x, y, '#a8803c'); p.p(x + 1, y + 1, '#a8803c');
    }
    p.speck(10, '#e2c070', 96);
  };
  def('Y', 1, [roofThatch], { b: p => { roofThatch(p); for (let x = 0; x < T; x += 2) p.r(x, 12 + (x % 4 ? 1 : 0), 2, 4, '#8a6a30'); } });
  def('h', 1, [p => {
    p.r(0, 0, T, T, '#ece6d8');
    p.r(0, 0, T, 2, '#7a5030'); p.r(0, 0, 2, T, '#7a5030'); p.r(14, 0, 2, T, '#7a5030');
    p.r(0, 14, T, 2, '#9a8a70');
    p.r(5, 4, 6, 7, '#c8b088');
    p.r(7, 4, 1, 7, '#8a6a48'); p.r(5, 7, 6, 1, '#8a6a48');
  }]);
  def('q', 1, [p => {
    p.r(0, 0, T, T, '#8a96a0');
    for (let x = 0; x < T; x += 2) p.r(x, 0, 1, T, '#74808a');
    p.r(0, 0, T, 1, '#a8b4bc'); p.speck(5, '#a0705a', 97);
  }]);
  def('Q', 1, [p => {
    p.r(0, 0, T, T, '#3a3e48');
    p.r(1, 1, 14, 15, '#7a8490');
    for (let y = 2; y < T; y += 2) p.r(1, y, 14, 1, '#66707c');
  }]);
  def('#', 1, [p => {
    p.r(0, 0, T, T, '#e6dcc4');
    for (let y = 1; y < 10; y += 4) for (let x = (y % 8 === 1 ? 1 : 5); x < T; x += 8) p.p(x, y, '#d4c8ac');
    p.r(0, 10, T, 1, '#8a6440'); p.r(0, 11, T, 5, '#a07850'); p.r(0, 15, T, 1, '#6a4a2c');
  }]);
  def('b', 1, [p => {
    p.r(0, 0, T, T, '#5a3a22');
    p.r(1, 1, 14, 14, '#3a2414');
    const cols = ['#c84a3a', '#3a6ac8', '#e8c84a', '#4aa85a', '#e8e0d0', '#8a4ab8'];
    const R = rng(98);
    for (const sy of [1, 8]) {
      for (let x = 1; x < 15;) {
        const w = 1 + Math.floor(R() * 2);
        const h = 5 + Math.floor(R() * 2);
        p.r(x, sy + (6 - h), w, h, cols[Math.floor(R() * cols.length)]);
        x += w;
      }
      p.r(0, sy + 6, T, 1, '#6a4428');
    }
  }]);
  def('k', 1, [p => {
    p.r(0, 0, T, T, '#8a5a30');
    p.r(0, 0, T, 12, '#b07848'); p.r(0, 0, T, 1, '#c89060');
    p.r(0, 12, T, 1, '#5a3a1c');
  }, p => {
    p.r(0, 0, T, T, '#8a5a30');
    p.r(0, 0, T, 12, '#b07848'); p.r(0, 0, T, 1, '#c89060');
    p.r(3, 2, 7, 8, '#f4f0e4'); p.r(4, 4, 5, 1, '#9a9a9a'); p.r(4, 6, 4, 1, '#9a9a9a');
    p.r(0, 12, T, 1, '#5a3a1c');
  }]);
  def('K', 1, [p => {
    p.r(0, 0, T, T, '#4a5a6a');
    p.r(0, 0, T, 8, '#7a8a9a'); p.r(0, 0, T, 1, '#9aaaba'); p.r(0, 8, T, 1, '#33404c');
    p.r(2, 11, 12, 1, '#5a6a7a');
  }]);
  def('S', 1, [p => {
    p.r(0, 0, T, T, '#8a8a92');
    for (let y = 0; y < T; y += 4) {
      p.r(0, y + 3, T, 1, '#6a6a72');
      for (let x = 0; x < T; x += 4) p.r(x + 1, y, 3, 3, (y / 4) % 2 ? '#3a6ac8' : '#c83a3a');
    }
  }]);
  def('x', 1, [p => {
    grass(p, 2);
    p.r(1, 4, 14, 5, '#f0c830');
    for (let x = 1; x < 15; x += 4) p.r(x, 4, 2, 5, '#2a2a2a');
    p.r(2, 9, 2, 6, '#7a7a7a'); p.r(12, 9, 2, 6, '#7a7a7a');
  }]);
  def('X', 1, [p => p.r(0, 0, T, T, '#0d0b14')]);
  def('U', 1, [p => {
    p.r(0, 0, T, T, '#3e6a9e');
    for (let y = 0; y < T; y += 8) for (let x = 0; x < T; x += 8) {
      p.r(x + 1, y + 1, 6, 6, '#6e9cd0'); p.p(x + 2, y + 2, '#b8d8f4');
    }
  }]);
  def('V', 1, [0, 1, 2].map(v => p => {
    concreteWall(p);
    const c = ['#d84a3a', '#3a7ad8', '#e8b030'][v];
    p.r(0, 2, T, 6, c); p.r(0, 8, T, 1, '#3a3040');
    p.r(3, 4, 3, 2, '#fff8e8'); p.r(8, 4, 2, 2, '#fff8e8'); p.r(11, 4, 3, 2, '#fff8e8');
    windowOn(p, 4, 10, 8, 5);
  }));
  def('O', 1, [0, 1].map(v => p => {
    p.r(0, 0, T, T, '#6e7e5e');
    const R = rng(99 + v);
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(R() * 12), y = Math.floor(R() * 12);
      p.r(x, y, 4, 3, '#8a9a76'); p.r(x, y + 3, 4, 1, '#4e5a42');
    }
  }));
  def('l', 1, [p => {
    p.r(0, 0, T, T, '#8a867c');
    const rows = [[0, 5], [5, 5], [10, 6]];
    rows.forEach(([y, h], i) => {
      for (let x = (i % 2) * 4 - 4; x < T; x += 8) {
        p.r(x + 1, y + 1, 6, h - 1, '#b0aca0');
        p.r(x + 1, y + 1, 6, 1, '#c8c4b8');
      }
    });
  }]);

  /* ---------------- 캐릭터 ---------------- */
  const HEAD = {
    down: [
      '................',
      '.....oooooo.....',
      '....ohhhhhho....',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '...ohssssssho...',
      '...ossessesso...',
      '...ossssssssо...'.replace('о', 'o'),
      '....osssssso....',
    ],
    up: [
      '................',
      '.....oooooo.....',
      '....ohhhhhho....',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '....ohhhhhho....',
    ],
    left: [
      '................',
      '.....oooooo.....',
      '....ohhhhhho....',
      '...ohhhhhhhho...',
      '...ohhhhhhhho...',
      '...ossssshhho...',
      '...osessshhho...',
      '...ossssshhho...',
      '....osssssho....',
    ],
  };
  const BODY = {
    down: [
      '...occccccccо...'.replace('о', 'o'),
      '..occccccccccо..'.replace('о', 'o'),
      '..osccccccccso..',
      '...oppppppppo...',
    ],
    left: [
      '....occcccco....',
      '....occcccco....',
      '....occcscco....',
      '....oppppppo....',
    ],
  };
  BODY.up = BODY.down;
  const LEGS = {
    down: [
      ['....oppooppo....', '....okkookko....', '....ooo..ooo....'],
      ['....oppooppo....', '....okkooooo....', '....ooo.........'],
      ['....oppooppo....', '....oooookko....', '.........ooo....'],
    ],
    left: [
      ['.....oppppo.....', '.....okkkko.....', '.....oooooo.....'],
      ['....oppooppo....', '...okko..okko...', '...ooo....ooo...'],
      ['.....oppppo.....', '.....okkkko.....', '.....oooooo.....'],
    ],
  };
  LEGS.up = LEGS.down;
  const SKIRT = {
    down: [
      ['...oppppppppo...', '.....oso..oso...', '.....oko..oko...'],
      ['...oppppppppo...', '.....oso..ooo...', '.....oko........'],
      ['...oppppppppo...', '.....ooo..oso...', '..........oko...'],
    ],
    left: [
      ['....oppppppo....', '.....osso.......', '.....okko.......'],
      ['....oppppppo....', '....oso.oso.....', '....oko.oko.....'],
      ['....oppppppo....', '.....osso.......', '.....okko.......'],
    ],
  };
  SKIRT.up = SKIRT.down;

  // 액세서리 오버레이 (방향별, '.'은 그대로)
  const ACC = {
    helmet: {
      down: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '..aaaaaaaaaaaa..'],
      up: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '..aaaaaaaaaaaa..'],
      left: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '.aaaaaaaaaaaa...'],
    },
    cap: {
      down: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '...aaaaaaaaaa...', '...oaaaaaaaao...'],
      up: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '...aaaaaaaaaa...'],
      left: ['.....aaaaaa.....', '....aaaaaaaa....', '...aaaaaaaaaa...', '.aaaaaaaaaaaa...'],
    },
    headband: {
      down: ['', '', '', '', '...owwwrwwwwo...'],
      up: ['', '', '', '', '...owwwwwwwwo...'],
      left: ['', '', '', '', '...owrwwwwwwo...'],
    },
    longhair: {
      down: ['', '', '', '', '', '..oh........ho..', '..oh........ho..', '..oh........ho..', '..ohh......hho..', '..ohh......hho..', '..oh........ho..'],
      up: ['', '', '', '', '', '', '', '', '...ohhhhhhhho...', '...ohhhhhhhho...', '...ohhhhhhhho...'],
      left: ['', '', '', '', '', '........hhhho...', '........hhhho...', '........hhhho...', '.......hhhhho...', '.......hhhho....', '........hhho....'],
    },
    glasses: {
      down: ['', '', '', '', '', '', '.....g.gg.g.....'],
      left: ['', '', '', '', '', '', '....g.g.........'],
      up: [],
    },
    camera: {
      down: ['', '', '', '', '', '', '', '', '', '', '......mmmm......', '......mlbm......'],
      left: ['', '', '', '', '', '', '', '', '', '', '...mmm..........', '...mlm..........'],
      up: [],
    },
    tie: {
      down: ['', '', '', '', '', '', '', '', '', '.......TT.......', '.......TT.......', '.......T........'],
      left: [],
      up: [],
    },
    apron: {
      down: ['', '', '', '', '', '', '', '', '', '', '....wwwwwwww....', '...wwwwwwwwww...', '...wwwwwwwwww...'],
      left: ['', '', '', '', '', '', '', '', '', '', '....www.........', '....wwww........', '....wwww........'],
      up: [],
    },
    armband: {
      down: ['', '', '', '', '', '', '', '', '', '', '..or............'],
      left: ['', '', '', '', '', '', '', '', '', '', '.........r......'],
      up: ['', '', '', '', '', '', '', '', '', '', '............ro..'],
    },
    bun: {
      down: ['......oooo......'],
      up: ['......oooo......', '.....ohhhho.....'],
      left: ['', '..........ooo...', '..........ohho..'],
    },
  };
  function buildFrame(dir, f, look) {
    const head = HEAD[dir];
    const body = BODY[dir];
    const legs = (look.skirt ? SKIRT : LEGS)[dir][f];
    let rows = [...head, ...body, ...legs].map(r => r.split(''));
    for (const a of look.acc || []) {
      const ov = ACC[a] && ACC[a][dir];
      if (!ov) continue;
      ov.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) if (row[x] !== '.' && rows[y]) rows[y][x] = row[x];
      });
    }
    if (look.kid) rows = [Array(16).fill('.'), Array(16).fill('.'), ...rows.slice(0, 11), ...rows.slice(13)];
    return rows.map(r => r.join(''));
  }

  const charCache = new Map();
  function charSheet(look) {
    const key = JSON.stringify(look);
    if (charCache.has(key)) return charCache.get(key);
    const pal = {
      o: '#1e1826', e: '#1e1826',
      s: look.skin || '#f4c8a0',
      h: look.hair || '#2a2020',
      c: look.top || '#e8e0d0',
      p: look.pants || '#3a4a6a',
      k: look.shoes || '#3a2a20',
      a: look.accColor || '#4a5a32',
      w: '#f6f4ee', r: '#d8342a', g: '#2a2a34',
      m: '#c8c8d0', l: '#3a3a48', b: '#8ec0e4',
      T: look.tie || '#c83a3a',
    };
    const sheet = {};
    for (const dir of ['down', 'up', 'left']) {
      sheet[dir] = [0, 1, 2].map(f => {
        const c = mk(16, 16);
        const p = P(c.getContext('2d'));
        p.art(buildFrame(dir, f, look), pal);
        // 오른쪽 면 음영
        return c;
      });
    }
    sheet.right = sheet.left.map(src => {
      const c = mk(16, 16);
      const ctx = c.getContext('2d');
      ctx.translate(16, 0); ctx.scale(-1, 1); ctx.drawImage(src, 0, 0);
      return c;
    });
    charCache.set(key, sheet);
    return sheet;
  }

  /* ---------------- 소품 ---------------- */
  const PROPS = {};
  // fw, fh: 충돌 영역(타일), 이미지 크기 w,h(px). 이미지는 영역 아래쪽에 맞춰 그림
  function prop(name, w, h, fw, fh, fn, opts = {}) {
    PROPS[name] = { w, h, fw, fh, fn, cache: new Map(), anim: opts.anim || 0, solid: opts.solid !== false, light: opts.light };
  }
  function propImage(name, arg, frame = 0) {
    const d = PROPS[name];
    if (!d) return null;
    const key = (arg === undefined ? '' : JSON.stringify(arg)) + '|' + (d.anim ? frame % d.anim : 0);
    if (d.cache.has(key)) return d.cache.get(key);
    const c = mk(d.w, d.h);
    d.fn(P(c.getContext('2d')), arg, d.anim ? frame % d.anim : 0);
    d.cache.set(key, c);
    return c;
  }
  const OL = '#1e1826';

  prop('tank', 48, 30, 3, 2, (p, a) => {
    const flip = a && a.dir === 'right';
    p.ctx.save();
    if (flip) { p.ctx.translate(48, 0); p.ctx.scale(-1, 1); }
    p.r(2, 18, 44, 11, OL); p.r(3, 19, 42, 9, '#2e3226');
    for (let x = 6; x < 44; x += 6) { p.r(x, 21, 4, 4, '#4a4e40'); p.p(x + 1, 22, '#6a6e5c'); }
    p.r(1, 10, 46, 10, OL); p.r(2, 11, 44, 8, '#5a6a3a'); p.r(2, 11, 44, 2, '#6e8048');
    p.r(14, 3, 22, 10, OL); p.r(15, 4, 20, 8, '#62743e'); p.r(15, 4, 20, 2, '#7a8c52');
    p.r(0, 6, 15, 3, OL); p.r(0, 7, 14, 1, '#4a5a30');
    p.r(28, 1, 6, 3, OL); p.r(29, 2, 4, 1, '#4a5a30');
    p.r(18, 14, 4, 2, '#f0f0e8'); p.r(19, 13, 2, 4, '#f0f0e8');
    p.ctx.restore();
  });
  prop('jeep', 32, 22, 2, 1, (p) => {
    p.r(1, 8, 30, 10, OL); p.r(2, 9, 28, 8, '#5a6a3a'); p.r(2, 9, 28, 2, '#728450');
    p.r(8, 2, 14, 8, OL); p.r(9, 3, 12, 6, '#8ec0e4'); p.r(9, 3, 12, 1, '#c8e4f4');
    p.r(3, 15, 8, 7, OL); p.r(4, 16, 6, 5, '#2a2a2a'); p.p(6, 18, '#8a8a8a');
    p.r(21, 15, 8, 7, OL); p.r(22, 16, 6, 5, '#2a2a2a'); p.p(24, 18, '#8a8a8a');
    p.r(13, 11, 4, 3, '#f0f0e8');
  });
  prop('car', 32, 20, 2, 1, (p, a) => {
    const col = (a && a.color) || '#e8d8a0';
    const flip = a && a.dir === 'left';
    p.ctx.save();
    if (flip) { p.ctx.translate(32, 0); p.ctx.scale(-1, 1); }
    p.r(1, 7, 30, 9, OL); p.r(2, 8, 28, 7, col); p.r(2, 8, 28, 1, 'rgba(255,255,255,.35)');
    p.r(7, 1, 17, 8, OL); p.r(8, 2, 15, 6, col); p.r(9, 3, 6, 4, '#8ec0e4'); p.r(16, 3, 6, 4, '#8ec0e4');
    p.r(29, 9, 2, 2, '#f8f0a0'); p.r(1, 9, 2, 2, '#d83a2a');
    p.r(4, 13, 7, 7, OL); p.r(5, 14, 5, 5, '#2a2a2a'); p.p(7, 16, '#9a9a9a');
    p.r(21, 13, 7, 7, OL); p.r(22, 14, 5, 5, '#2a2a2a'); p.p(24, 16, '#9a9a9a');
    p.ctx.restore();
  });
  prop('truck', 48, 26, 3, 1, (p) => {
    p.r(0, 4, 32, 15, OL); p.r(1, 5, 30, 13, '#8a6a3a');
    for (let x = 2; x < 30; x += 7) { p.r(x, 6, 6, 5, '#c89a5a'); p.r(x, 6, 6, 1, '#d8b070'); p.r(x + 1, 12, 6, 5, '#b88a4a'); }
    p.r(32, 7, 15, 12, OL); p.r(33, 8, 13, 10, '#3a6ab8'); p.r(38, 9, 7, 4, '#8ec0e4');
    p.r(4, 17, 8, 8, OL); p.r(5, 18, 6, 6, '#2a2a2a'); p.r(20, 17, 8, 8, OL); p.r(21, 18, 6, 6, '#2a2a2a');
    p.r(36, 17, 8, 8, OL); p.r(37, 18, 6, 6, '#2a2a2a');
  });
  prop('bus', 48, 26, 3, 1, (p, a) => {
    const col = (a && a.color) || '#3a8a5a';
    p.r(0, 2, 48, 18, OL); p.r(1, 3, 46, 16, col); p.r(1, 12, 46, 2, '#f0e8d0');
    for (let x = 3; x < 44; x += 7) { p.r(x, 5, 5, 6, '#8ec0e4'); p.p(x, 5, '#c8e4f4'); }
    p.r(4, 17, 9, 9, OL); p.r(5, 18, 7, 7, '#2a2a2a'); p.r(34, 17, 9, 9, OL); p.r(35, 18, 7, 7, '#2a2a2a');
  });
  prop('tv', 16, 22, 1, 1, (p, a, f) => {
    p.r(1, 3, 14, 13, OL); p.r(2, 4, 12, 11, '#8a5a34'); p.r(2, 4, 12, 1, '#a87048');
    p.r(3, 5, 8, 8, '#1a1a1a');
    p.r(4, 6, 6, 6, f ? '#b8d8c0' : '#9cc4ac');
    if (f) { p.r(4, 8, 6, 1, '#e0f0e4'); } else { p.r(4, 10, 6, 1, '#d0e8d8'); }
    p.r(12, 6, 1, 1, '#e8c860'); p.r(12, 9, 1, 1, '#e8c860');
    p.p(5, 0, OL); p.p(6, 1, OL); p.p(7, 2, OL); p.p(11, 0, OL); p.p(10, 1, OL); p.p(9, 2, OL);
    p.r(3, 16, 2, 5, '#5a3a1c'); p.r(11, 16, 2, 5, '#5a3a1c');
  }, { anim: 2 });
  prop('radio', 16, 16, 1, 1, (p) => {
    p.r(1, 10, 14, 6, '#6a4428'); p.r(1, 10, 14, 1, '#8a5a34');
    p.r(2, 3, 12, 8, OL); p.r(3, 4, 10, 6, '#a86a3a');
    p.r(4, 5, 4, 4, '#d8c8a0');
    for (let y = 5; y < 9; y += 2) p.r(4, y, 4, 1, '#8a7a5a');
    p.r(9, 5, 3, 2, '#f0e0a0'); p.p(10, 8, '#2a2a2a'); p.p(12, 2, OL); p.p(13, 1, OL);
  });
  prop('papers', 16, 16, 1, 1, (p) => {
    p.r(2, 7, 12, 8, '#9a9a9a'); p.r(2, 6, 12, 8, '#f4f0e4'); p.r(3, 5, 11, 8, '#fbf8ef');
    p.r(4, 6, 6, 1, '#2a2a2a'); p.r(4, 8, 8, 1, '#8a8a8a'); p.r(4, 10, 7, 1, '#8a8a8a');
    p.r(11, 6, 2, 2, '#c83a3a');
  });
  prop('paper', 16, 16, 1, 1, (p) => {
    p.r(3, 8, 10, 6, 'rgba(0,0,0,.25)');
    p.r(3, 6, 10, 7, '#fbf8ef'); p.r(4, 7, 5, 1, '#2a2a2a'); p.r(4, 9, 7, 1, '#9a9a9a'); p.r(4, 11, 6, 1, '#9a9a9a');
  }, { solid: false });
  prop('sign', 16, 16, 1, 1, (p) => {
    p.r(7, 8, 2, 8, '#6a4428');
    p.r(1, 2, 14, 8, OL); p.r(2, 3, 12, 6, '#d8b878'); p.r(2, 3, 12, 1, '#e8cc90');
    p.r(4, 5, 8, 1, '#7a5a38'); p.r(4, 7, 6, 1, '#7a5a38');
  });
  prop('yearsign', 16, 24, 1, 1, (p) => {
    p.r(7, 10, 2, 14, '#5a5a62');
    p.r(0, 1, 16, 11, OL); p.r(1, 2, 14, 9, '#2a5aa8'); p.r(1, 2, 14, 1, '#4a7ac8');
    p.r(3, 4, 10, 1, '#f0f0e8'); p.r(3, 6, 8, 1, '#f0f0e8'); p.r(3, 8, 10, 1, '#f0f0e8');
  });
  prop('sewing', 16, 16, 1, 1, (p) => {
    p.r(1, 6, 14, 6, '#8a5a30'); p.r(1, 6, 14, 1, '#a87040');
    p.r(2, 12, 2, 4, '#4a3020'); p.r(12, 12, 2, 4, '#4a3020');
    p.r(4, 1, 9, 2, '#1e1e26'); p.r(11, 1, 2, 7, '#1e1e26'); p.r(4, 3, 2, 4, '#1e1e26');
    p.p(6, 2, '#e8c860'); p.r(12, 2, 2, 2, '#b8b8c0');
    p.r(2, 8, 5, 3, '#e8e0f0');
  });
  prop('cart', 32, 26, 2, 1, (p, a) => {
    const c1 = (a && a.color) || '#d83a2a';
    p.r(1, 0, 30, 7, OL);
    for (let x = 2; x < 30; x += 4) p.r(x, 1, 2, 5, c1), p.r(x + 2, 1, 2, 5, '#f4f0e4');
    p.r(3, 7, 1, 8, '#4a3020'); p.r(28, 7, 1, 8, '#4a3020');
    p.r(1, 14, 30, 8, OL); p.r(2, 15, 28, 6, '#a87040'); p.r(2, 15, 28, 1, '#c89060');
    p.r(6, 11, 20, 4, '#3a3a3a');
    for (let x = 8; x < 25; x += 4) p.r(x, 12, 3, 2, '#e0a050');
    p.r(4, 21, 5, 5, OL); p.r(5, 22, 3, 3, '#5a4a3a'); p.r(23, 21, 5, 5, OL); p.r(24, 22, 3, 3, '#5a4a3a');
  });
  prop('stall', 32, 28, 2, 1, (p, a) => {
    const c1 = (a && a.color) || '#3a7ad8';
    p.r(0, 0, 32, 8, OL);
    for (let x = 1; x < 31; x += 6) p.r(x, 1, 3, 6, c1), p.r(x + 3, 1, 3, 6, '#f4f0e4');
    for (let x = 1; x < 31; x += 6) p.r(x, 7, 3, 2, c1);
    p.r(2, 9, 1, 8, '#4a3020'); p.r(29, 9, 1, 8, '#4a3020');
    p.r(1, 16, 30, 12, OL); p.r(2, 17, 28, 10, '#9a6a3a'); p.r(2, 17, 28, 2, '#b88450');
    const goods = (a && a.goods) || ['#e8e0d0', '#e8c84a', '#c84a3a'];
    goods.forEach((g, i) => { p.r(4 + i * 9, 13, 7, 4, g); p.r(4 + i * 9, 13, 7, 1, 'rgba(255,255,255,.4)'); });
  });
  prop('basket', 16, 16, 1, 1, (p, a) => {
    const n = a && a.empty ? 0 : 5;
    p.r(1, 7, 14, 8, OL); p.r(2, 8, 12, 6, '#c89a50');
    for (let x = 2; x < 14; x += 3) p.r(x, 8, 1, 6, '#a87a38');
    for (let i = 0; i < n; i++) { const x = 3 + (i % 3) * 3 + (i > 2 ? 1 : 0), y = i > 2 ? 3 : 5; p.r(x, y, 4, 4, '#f8f6ee'); p.p(x + 1, y + 2, '#2a2a2a'); }
  });
  prop('sack', 16, 16, 1, 1, (p) => {
    p.r(3, 3, 10, 12, OL); p.r(4, 4, 8, 10, '#e8dcc0'); p.r(4, 4, 8, 1, '#f4ecd8'); p.r(6, 1, 4, 3, OL); p.r(7, 2, 2, 1, '#c8b890');
    p.r(6, 8, 4, 3, '#c83a3a');
  });
  prop('podium', 16, 22, 1, 1, (p) => {
    p.r(2, 8, 12, 14, OL); p.r(3, 9, 10, 12, '#8a5a30'); p.r(3, 9, 10, 2, '#a87040');
    p.r(6, 13, 4, 4, '#e8c860');
    p.r(7, 2, 1, 7, '#3a3a3a'); p.r(6, 0, 3, 3, '#2a2a2a');
  });
  const flagPole = (p) => { p.r(1, 0, 2, 32, '#8a8a92'); p.r(1, 0, 2, 1, '#e8c860'); };
  prop('taegukgi', 16, 32, 1, 1, (p, a, f) => {
    flagPole(p);
    const y = f ? 2 : 3;
    p.r(3, y, 13, 9, '#f8f8f4'); p.r(3, y + 9, 13, 1, '#c8c8c4');
    p.r(8, y + 3, 3, 1, '#d8342a'); p.r(8, y + 4, 3, 1, '#d8342a'); p.r(8, y + 5, 3, 1, '#2a4ab8'); p.r(8, y + 4, 1, 1, '#2a4ab8');
    p.p(5, y + 1, '#1a1a1a'); p.p(13, y + 1, '#1a1a1a'); p.p(5, y + 7, '#1a1a1a'); p.p(13, y + 7, '#1a1a1a');
    p.r(1, 30, 3, 2, '#5a5a62');
  }, { anim: 2 });
  prop('flag', 16, 32, 1, 1, (p, a, f) => {
    flagPole(p);
    const y = f ? 2 : 3;
    const cols = (a && a.cols) || ['#d8342a'];
    const h = Math.ceil(9 / cols.length);
    cols.forEach((c, i) => p.r(3, y + i * h, 13, Math.min(h, 9 - i * h), c));
    if (a && a.emblem) { p.r(7, y + 3, 4, 3, a.emblem); }
    p.r(1, 30, 3, 2, '#5a5a62');
  }, { anim: 2 });
  prop('banner', 32, 26, 2, 1, (p, a) => {
    const col = (a && a.color) || '#f4f0e4';
    p.r(1, 0, 2, 26, '#6a4428'); p.r(29, 0, 2, 26, '#6a4428');
    p.r(3, 2, 26, 12, OL); p.r(3, 3, 26, 10, col);
    const tc = (a && a.text) || '#c8342a';
    for (let x = 5; x < 27; x += 4) { p.r(x, 5, 3, 2, tc); p.r(x + 1, 8, 2, 3, tc); }
  });
  prop('ballot', 16, 16, 1, 1, (p) => {
    p.r(2, 4, 12, 11, OL); p.r(3, 5, 10, 9, '#e8e4dc'); p.r(3, 5, 10, 2, '#f8f6f0');
    p.r(5, 5, 6, 1, '#2a2a2a'); p.r(6, 9, 4, 3, '#2a5aa8');
  });
  prop('booth', 16, 26, 1, 1, (p) => {
    p.r(0, 2, 16, 24, OL); p.r(1, 3, 14, 22, '#e8e4dc');
    p.r(1, 3, 14, 4, '#2a5aa8');
    p.r(2, 8, 12, 17, '#c8c4bc'); for (let x = 3; x < 14; x += 3) p.r(x, 8, 1, 17, '#aeaaa2');
  });
  prop('posters', 16, 22, 1, 1, (p) => {
    p.r(0, 2, 16, 18, '#7a7a82'); p.r(1, 3, 14, 16, '#9a9aa2');
    const cols = ['#e8e4dc', '#f0e0c0', '#e0e8f0', '#f0e8e0'];
    cols.forEach((c, i) => {
      const x = 2 + (i % 2) * 6, y = 4 + Math.floor(i / 2) * 7;
      p.r(x, y, 5, 6, c); p.r(x + 1, y + 1, 3, 3, '#c8a888'); p.r(x + 1, y + 4, 3, 1, '#2a2a2a');
    });
    p.r(3, 20, 2, 2, '#5a5a62'); p.r(11, 20, 2, 2, '#5a5a62');
  });
  prop('torch', 16, 32, 1, 1, (p, a, f) => {
    p.r(3, 18, 10, 14, OL); p.r(4, 19, 8, 12, '#c8c8d0'); p.r(4, 19, 8, 2, '#e8e8f0');
    p.r(1, 13, 14, 6, OL); p.r(2, 14, 12, 4, '#e8c860');
    const fl = f ? [[5, 6, 6, 7], [6, 3, 4, 4], [7, 1, 2, 3]] : [[4, 7, 8, 6], [6, 4, 4, 4], [7, 2, 3, 3]];
    p.r(fl[0][0], fl[0][1], fl[0][2], fl[0][3], '#e8502a'); p.r(fl[1][0], fl[1][1], fl[1][2], fl[1][3], '#f8a030'); p.r(fl[2][0], fl[2][1], fl[2][2], fl[2][3], '#f8e070');
  }, { anim: 2, light: '#ffb050' });
  prop('hoop', 16, 16, 1, 1, (p) => {
    for (let a = 0; a < 64; a++) {
      const t = a / 64 * Math.PI * 2;
      p.p(Math.round(8 + Math.cos(t) * 5), Math.round(9 + Math.sin(t) * 5), '#c8c8d0');
    }
    p.r(11, 3, 1, 7, '#8a6a48'); p.r(10, 9, 3, 1, '#8a6a48');
  }, { solid: false });
  prop('flowers', 16, 16, 1, 1, (p, a) => {
    const n = (a && a.n) || 5;
    p.r(2, 12, 12, 3, '#4a8a3a');
    const spots = [[4, 9], [8, 8], [12, 9], [6, 6], [10, 6], [3, 5], [13, 5], [8, 4]];
    for (let i = 0; i < Math.min(n, spots.length); i++) {
      const [x, y] = spots[i];
      p.r(x - 1, y - 1, 3, 3, '#f8f8f0'); p.p(x, y, '#e8d870'); p.r(x, y + 2, 1, 3, '#3a7a2a');
    }
  }, { solid: false });
  prop('altar', 32, 26, 2, 1, (p) => {
    p.r(0, 12, 32, 14, OL); p.r(1, 13, 30, 12, '#f4f2ea'); p.r(1, 13, 30, 2, '#ffffff');
    p.r(11, 0, 10, 13, OL); p.r(12, 1, 8, 10, '#d8d4c8'); p.r(14, 3, 4, 4, '#8a8a8a'); p.r(13, 8, 6, 2, '#5a5a5a');
    p.r(11, 0, 2, 2, '#1a1a1a'); p.r(19, 0, 2, 2, '#1a1a1a');
    p.r(4, 8, 2, 5, '#f8f4e0'); p.p(4, 7, '#f8b040'); p.r(26, 8, 2, 5, '#f8f4e0'); p.p(26, 7, '#f8b040');
  }, { light: '#ffd890' });
  prop('goldbox', 16, 16, 1, 1, (p) => {
    p.r(1, 6, 14, 9, OL); p.r(2, 7, 12, 7, '#8a5a30'); p.r(2, 7, 12, 1, '#a87040');
    p.r(4, 4, 3, 3, '#f8d040'); p.r(8, 3, 3, 3, '#f8d040'); p.r(6, 5, 3, 2, '#e8b830'); p.p(5, 4, '#fff4b0'); p.p(9, 3, '#fff4b0');
    p.r(5, 9, 6, 3, '#f4f0e4');
  });
  prop('camera', 16, 16, 1, 1, (p) => {
    p.r(2, 5, 12, 9, OL); p.r(3, 6, 10, 7, '#3a3a48'); p.r(3, 6, 10, 2, '#c8c8d0');
    p.r(4, 3, 4, 3, OL); p.r(5, 4, 2, 1, '#c8c8d0');
    p.circle(8, 10, 2, OL); p.r(7, 9, 2, 2, '#8ec0e4'); p.p(7, 9, '#e0f0fa');
    p.r(11, 4, 2, 2, '#e8e8f0');
  }, { solid: false });
  prop('box', 16, 16, 1, 1, (p) => {
    p.r(2, 4, 12, 11, OL); p.r(3, 5, 10, 9, '#c8965a'); p.r(3, 5, 10, 2, '#d8aa70'); p.r(7, 5, 2, 9, '#e8d8a8');
    p.r(4, 10, 3, 2, '#c83a3a');
  });
  prop('chest', 16, 16, 1, 1, (p) => {
    p.r(1, 4, 14, 11, OL); p.r(2, 5, 12, 9, '#7a4a28'); p.r(2, 5, 12, 3, '#9a6234'); p.r(2, 8, 12, 1, OL);
    p.r(7, 7, 2, 3, '#e8c860');
  });
  prop('lamp', 16, 32, 1, 1, (p) => {
    p.r(7, 6, 2, 26, '#4a4a52'); p.r(5, 30, 6, 2, '#3a3a42');
    p.r(4, 2, 8, 5, OL); p.r(5, 3, 6, 3, '#f8e8a0');
  }, { light: '#fff0b0' });
  prop('board', 16, 26, 1, 1, (p, a) => {
    p.r(0, 0, 16, 22, '#6a4428'); p.r(1, 1, 14, 20, '#d8c8a0');
    const R = rng((a && a.seed) || 3);
    for (let i = 0; i < 6; i++) {
      const x = 1 + Math.floor(R() * 9), y = 1 + Math.floor(R() * 14);
      p.r(x, y, 5, 6, '#fbf8ef'); p.r(x + 1, y + 1, 3, 1, '#2a2a2a'); p.r(x + 1, y + 3, 2, 1, '#8a8a8a');
    }
    p.r(2, 22, 2, 4, '#4a3020'); p.r(12, 22, 2, 4, '#4a3020');
  });
  prop('placard', 16, 20, 1, 1, (p, a) => {
    p.r(7, 10, 2, 10, '#6a4428');
    p.r(1, 0, 14, 12, OL); p.r(2, 1, 12, 10, (a && a.color) || '#fbf8ef');
    p.r(3, 2, 10, 2, '#2a2a2a'); p.r(3, 5, 8, 1, '#5a5a5a'); p.r(3, 7, 9, 1, '#5a5a5a'); p.r(3, 9, 6, 1, '#5a5a5a');
  });
  prop('dome', 80, 64, 5, 3, (p, a) => {
    const spire = !(a && a.noSpire);
    p.r(0, 30, 80, 34, OL); p.r(1, 31, 78, 32, '#c8c0aa');
    for (let x = 4; x < 76; x += 8) { p.r(x, 36, 4, 8, '#3a3040'); p.r(x, 48, 4, 8, '#3a3040'); }
    p.r(1, 31, 78, 3, '#ddd6c0'); p.r(1, 44, 78, 2, '#b0a890');
    p.r(32, 50, 16, 14, '#4a3a30');
    p.r(26, 18, 28, 14, OL); p.r(27, 19, 26, 12, '#c0b8a2');
    for (let x = 29; x < 52; x += 5) p.r(x, 21, 2, 8, '#8a8270');
    for (let y = 0; y < 10; y++) {
      const hw = Math.round(Math.sqrt(100 - (10 - y) * (10 - y)) * 1.3);
      p.r(40 - hw, 8 + y, hw * 2, 1, y < 2 ? '#7ab0a0' : '#5a9a88');
    }
    if (spire) { p.r(39, 0, 2, 9, '#4a7a6a'); p.r(38, 6, 4, 2, '#5a9a88'); }
  });
  prop('crane', 48, 64, 1, 1, (p, a, f) => {
    p.r(40, 6, 4, 58, '#e8b830');
    for (let y = 8; y < 62; y += 4) { p.p(40, y, OL); p.p(43, y + 2, OL); }
    p.r(0, 3, 48, 3, '#e8b830'); for (let x = 2; x < 46; x += 4) p.p(x, 4, OL);
    p.r(44, 1, 4, 6, '#5a5a62'); p.r(36, 7, 8, 6, '#3a3a42'); p.r(37, 8, 3, 3, '#8ec0e4');
    const hold = a && a.hold;
    const hy = hold ? 10 : (f ? 18 : 20);
    p.r(8, 6, 1, hy - 6, '#3a3a3a'); p.r(6, hy, 5, 3, '#d8342a');
    if (hold) { p.r(7, hy + 3, 2, 9, '#4a7a6a'); p.r(6, hy + 9, 4, 2, '#5a9a88'); }
  }, { anim: 2, solid: false });
  prop('phone', 16, 26, 1, 1, (p) => {
    p.r(1, 0, 14, 26, OL); p.r(2, 1, 12, 24, '#e8902a'); p.r(2, 1, 12, 3, '#f8b050');
    p.r(4, 6, 8, 12, '#8ec0e4'); p.r(6, 9, 4, 6, '#3a3a48');
  });
  prop('bench', 16, 16, 1, 1, (p) => {
    p.r(1, 5, 14, 3, '#a87040'); p.r(1, 9, 14, 3, '#a87040'); p.r(1, 8, 14, 1, '#6a4428');
    p.r(2, 12, 2, 4, '#4a4a52'); p.r(12, 12, 2, 4, '#4a4a52');
  });
  prop('jars', 16, 16, 1, 1, (p) => {
    const jar = (x, y, s) => { p.r(x, y, s, s + 1, OL); p.r(x + 1, y + 1, s - 2, s - 1, '#7a4a2a'); p.p(x + 2, y + 2, '#a87048'); p.r(x + 1, y, s - 2, 1, '#3a2418'); };
    jar(1, 6, 7); jar(8, 4, 7); jar(5, 9, 6);
  });
  prop('ribbon', 48, 20, 3, 1, (p, a) => {
    const cut = a && a.cut;
    p.r(1, 2, 3, 18, '#e8e4dc'); p.r(44, 2, 3, 18, '#e8e4dc');
    if (!cut) { p.r(4, 6, 40, 3, '#d8342a'); p.circle(24, 7, 3, '#e8483a'); p.p(23, 6, '#f88878'); }
    else { p.r(4, 6, 8, 3, '#d8342a'); p.r(36, 6, 8, 3, '#d8342a'); p.r(11, 9, 2, 6, '#d8342a'); p.r(35, 9, 2, 6, '#d8342a'); }
  }, { solid: true });
  prop('ribbonv', 16, 72, 1, 4, (p, a) => {
    const cut = a && a.cut;
    p.r(6, 0, 4, 10, '#e8e4dc'); p.r(6, 62, 4, 10, '#e8e4dc'); p.r(6, 0, 4, 1, '#ffffff');
    if (!cut) { p.r(7, 10, 2, 52, '#d8342a'); p.circle(8, 36, 3, '#e8483a'); p.p(7, 35, '#f88878'); }
    else { p.r(7, 10, 2, 10, '#d8342a'); p.r(7, 52, 2, 10, '#d8342a'); p.r(9, 19, 2, 4, '#d8342a'); p.r(5, 49, 2, 4, '#d8342a'); }
  });
  prop('base', 16, 16, 1, 1, (p) => { p.r(5, 6, 6, 6, '#f8f8f0'); p.r(5, 11, 6, 1, '#c8c8c0'); }, { solid: false });
  prop('treaty', 16, 16, 1, 1, (p) => {
    p.r(3, 5, 10, 9, OL); p.r(4, 6, 8, 7, '#1e3a6a'); p.r(6, 8, 4, 3, '#e8c860');
  }, { solid: false });
  const item = (fn) => (p, a, f) => {
    fn(p);
    if (f) { p.p(13, 2, '#fff8c0'); p.p(12, 3, '#fff8c0'); p.p(14, 3, '#fff8c0'); p.p(13, 4, '#fff8c0'); }
    else { p.p(2, 4, '#fff8c0'); }
  };
  prop('scissors', 16, 16, 1, 1, item(p => {
    p.circle(5, 11, 2, '#d8342a'); p.circle(10, 11, 2, '#d8342a'); p.p(5, 11, '#5c9e3e'); p.p(10, 11, '#5c9e3e');
    p.r(6, 4, 1, 6, '#c8c8d0'); p.r(9, 4, 1, 6, '#c8c8d0'); p.p(7, 8, '#8a8a92'); p.p(8, 8, '#8a8a92');
  }), { anim: 2, solid: false });
  prop('ball', 16, 16, 1, 1, item(p => {
    p.circle(8, 10, 3, '#f8f8f0'); p.p(6, 9, '#d8342a'); p.p(6, 11, '#d8342a'); p.p(10, 9, '#d8342a'); p.p(10, 11, '#d8342a');
  }), { anim: 2, solid: false });
  prop('coin', 16, 16, 1, 1, item(p => {
    p.circle(8, 10, 3, '#c8a040'); p.circle(8, 10, 2, '#e8c860'); p.p(7, 9, '#fff4b0');
  }), { anim: 2, solid: false });
  prop('passport', 16, 16, 1, 1, item(p => {
    p.r(4, 6, 8, 9, OL); p.r(5, 7, 6, 7, '#2a5a3a'); p.r(7, 9, 2, 2, '#e8c860');
  }), { anim: 2, solid: false });
  prop('idcard', 16, 16, 1, 1, item(p => {
    p.r(3, 8, 10, 7, OL); p.r(4, 9, 8, 5, '#e8eef4'); p.r(5, 10, 3, 3, '#9ab0c8'); p.r(9, 10, 2, 1, '#5a5a5a'); p.r(9, 12, 2, 1, '#5a5a5a');
  }), { anim: 2, solid: false });
  prop('ring', 16, 16, 1, 1, item(p => {
    p.circle(8, 11, 3, '#e8b830'); p.circle(8, 11, 1, '#5c9e3e'); p.p(6, 9, '#fff4b0');
  }), { anim: 2, solid: false });
  prop('glue', 16, 16, 1, 1, item(p => {
    p.r(5, 6, 6, 9, OL); p.r(6, 7, 4, 7, '#f4f0e4'); p.r(6, 9, 4, 3, '#3a7ad8'); p.r(7, 4, 2, 3, '#d8342a');
  }), { anim: 2, solid: false });
  prop('flower1', 16, 16, 1, 1, item(p => {
    p.r(7, 9, 1, 6, '#3a7a2a'); p.p(6, 11, '#4a9a3a'); p.r(5, 5, 5, 5, '#f8f8f0'); p.r(6, 6, 3, 3, '#f0e0a0'); p.p(7, 7, '#e8c040');
  }), { anim: 2, solid: false });
  prop('rice', 16, 16, 1, 1, item(p => {
    p.r(4, 6, 8, 9, OL); p.r(5, 7, 6, 7, '#e8dcc0'); p.r(6, 4, 4, 3, OL); p.r(6, 9, 4, 2, '#c83a3a');
  }), { anim: 2, solid: false });
  prop('note', 16, 16, 1, 1, item(p => {
    p.r(4, 6, 9, 8, OL); p.r(5, 7, 7, 6, '#fbf8ef'); p.r(6, 8, 4, 1, '#5a5a5a'); p.r(6, 10, 5, 1, '#5a5a5a');
  }), { anim: 2, solid: false });
  prop('poster', 16, 16, 1, 1, item(p => {
    p.r(3, 7, 10, 7, OL); p.r(4, 8, 8, 5, '#fbf8ef'); p.r(5, 9, 6, 1, '#c8342a'); p.r(5, 11, 4, 1, '#2a2a2a');
  }), { anim: 2, solid: false });
  prop('wallposter', 16, 16, 1, 1, (p, a) => {
    p.r(1, 1, 14, 13, '#fbf8ef'); p.r(1, 13, 14, 1, '#c8c4b8');
    for (let y = 3; y < 12; y += 2) for (let x = 2; x < 14; x += 3) p.r(x, y, 2, 1, (y === 3) ? '#c8342a' : '#2a2a2a');
  }, { solid: false });
  prop('nameplate', 16, 16, 1, 1, (p) => {
    p.r(1, 6, 14, 8, OL); p.r(2, 7, 12, 6, '#d8b878'); p.r(4, 9, 8, 2, '#3a2a1a');
  });
  prop('plane', 72, 30, 4, 1, (p) => {
    p.r(4, 10, 62, 12, OL); p.r(5, 11, 60, 10, '#f4f4f0'); p.r(5, 18, 60, 3, '#d8d8d4');
    p.r(64, 12, 7, 8, OL); p.r(65, 13, 5, 6, '#f4f4f0');
    p.r(0, 2, 12, 12, OL); p.r(1, 3, 10, 10, '#2a5aa8'); p.r(2, 4, 3, 8, '#d8342a');
    for (let x = 14; x < 60; x += 5) p.r(x, 13, 3, 3, '#4a6a8a');
    p.r(26, 20, 20, 4, OL); p.r(27, 21, 18, 2, '#c8c8c4');
    p.r(30, 23, 6, 7, '#5a5a62');
  });
  prop('signtable', 48, 24, 3, 1, (p, a) => {
    p.r(0, 8, 48, 14, OL); p.r(1, 9, 46, 12, '#2a6a3a'); p.r(1, 9, 46, 2, '#3a8a4a');
    const fl = (a && a.flags) || [['#f8f8f4'], ['#d8342a']];
    fl.forEach((cols, i) => {
      const x = i ? 36 : 8;
      p.r(x, 0, 1, 9, '#8a8a92');
      const h = Math.ceil(5 / cols.length);
      cols.forEach((c, j) => p.r(x + 1, 1 + j * h, 6, Math.min(h, 5 - j * h), c));
    });
    p.r(18, 10, 12, 6, '#fbf8ef'); p.r(20, 12, 8, 1, '#5a5a5a');
  });
  prop('gate', 16, 32, 1, 1, (p, a, f) => {
    const cols = ['#ffcf4a', '#e8706a', '#8a6ae8', '#4ac8e8'];
    for (let r = 7; r >= 1; r--) {
      const c = cols[(r + f) % 4];
      for (let t = 0; t < 40; t++) {
        const ang = t / 40 * Math.PI * 2;
        p.p(Math.round(8 + Math.cos(ang) * r * 0.9), Math.round(16 + Math.sin(ang) * r * 1.6), c);
      }
    }
    p.r(7, 14, 2, 4, '#ffffff');
  }, { anim: 4, light: '#c8a0ff' });
  prop('sofa', 32, 20, 2, 1, (p) => {
    p.r(0, 2, 32, 16, OL); p.r(1, 3, 30, 6, '#5a7aa8'); p.r(1, 9, 30, 8, '#6a8ab8'); p.r(1, 9, 30, 1, '#8aaad8');
    p.r(0, 6, 4, 12, '#4a6a98'); p.r(28, 6, 4, 12, '#4a6a98'); p.r(2, 18, 2, 2, '#3a2a1a'); p.r(28, 18, 2, 2, '#3a2a1a');
  });
  prop('plant', 16, 20, 1, 1, (p) => {
    p.r(4, 12, 8, 8, OL); p.r(5, 13, 6, 6, '#c86a3a');
    p.circle(8, 7, 5, '#2e8a36'); p.p(6, 5, '#4aa84a'); p.p(9, 4, '#4aa84a'); p.p(10, 8, '#1e6a24');
  });
  prop('ladder', 16, 26, 1, 1, (p) => {
    p.r(3, 0, 2, 26, '#8a6038'); p.r(11, 0, 2, 26, '#8a6038');
    for (let y = 3; y < 26; y += 5) p.r(3, y, 10, 2, '#a87848');
  });
  prop('flattv', 32, 22, 2, 1, (p) => {
    p.r(1, 0, 30, 18, OL); p.r(2, 1, 28, 16, '#1a2a3a'); p.r(3, 2, 10, 5, '#2a4a6a');
    p.r(13, 18, 6, 2, '#2a2a32'); p.r(8, 20, 16, 2, '#2a2a32');
  });
  prop('chair', 16, 18, 1, 1, (p) => {
    p.r(2, 0, 12, 10, OL); p.r(3, 1, 10, 8, '#8a5a30'); p.r(3, 1, 10, 1, '#a87040');
    p.r(1, 9, 14, 5, OL); p.r(2, 10, 12, 3, '#a87040');
    for (let x = 1; x < 15; x++) p.p(x, 16 + Math.round(Math.sin(x / 3) * 0.6), '#6a4428');
    p.r(2, 13, 2, 3, '#6a4428'); p.r(12, 13, 2, 3, '#6a4428');
  });
  prop('album', 16, 16, 1, 1, item(p => {
    p.r(3, 5, 10, 10, OL); p.r(4, 6, 8, 8, '#8a2a1e'); p.r(5, 7, 6, 2, '#e8c860');
  }), { anim: 2, solid: false });
  prop('bigsign', 48, 30, 3, 1, (p, a) => {
    const col = (a && a.color) || '#2a5aa8';
    p.r(4, 18, 2, 12, '#5a5a62'); p.r(42, 18, 2, 12, '#5a5a62');
    p.r(0, 0, 48, 20, OL); p.r(1, 1, 46, 18, col); p.r(1, 1, 46, 2, 'rgba(255,255,255,.3)');
    for (let x = 5; x < 44; x += 5) { p.r(x, 6, 3, 3, '#f8f6ee'); p.r(x, 11, 3, 3, '#f8f6ee'); }
  });
  prop('wig', 16, 16, 1, 1, (p) => {
    p.r(2, 9, 12, 6, '#8a5a30'); p.r(2, 9, 12, 1, '#a87040');
    p.circle(5, 7, 2, '#2a1a12'); p.circle(11, 7, 2, '#3a2418'); p.r(4, 8, 3, 3, '#2a1a12'); p.r(10, 8, 3, 3, '#3a2418');
  });
  prop('machine', 32, 28, 2, 1, (p) => {
    p.r(0, 4, 32, 24, OL); p.r(1, 5, 30, 22, '#5a7a8a'); p.r(1, 5, 30, 3, '#7a9aaa');
    p.r(4, 10, 10, 8, '#3a4a54'); p.circle(23, 15, 4, '#2a3a44'); p.circle(23, 15, 2, '#9aaab4');
    p.r(4, 20, 24, 2, '#e8c840'); p.r(2, 0, 4, 5, '#4a5a64');
  });
  prop('crowdbarrier', 16, 16, 1, 1, (p) => {
    p.r(0, 6, 16, 2, '#e8e8f0'); p.r(0, 10, 16, 2, '#e8e8f0');
    p.r(1, 4, 2, 12, '#3a5aa8'); p.r(13, 4, 2, 12, '#3a5aa8');
  });
  prop('tank_small', 32, 22, 2, 1, (p) => {
    p.r(1, 13, 30, 9, OL); p.r(2, 14, 28, 7, '#2e3226');
    for (let x = 4; x < 30; x += 5) p.r(x, 16, 3, 3, '#4a4e40');
    p.r(0, 7, 32, 8, OL); p.r(1, 8, 30, 6, '#5a6a3a');
    p.r(9, 1, 14, 8, OL); p.r(10, 2, 12, 6, '#62743e'); p.r(0, 3, 10, 2, OL);
  });
  prop('teacup', 16, 16, 1, 1, (p) => {
    p.r(1, 9, 14, 6, '#6a4428'); p.r(1, 9, 14, 1, '#8a5a34');
    p.r(5, 5, 6, 5, OL); p.r(6, 6, 4, 3, '#f4f0e4'); p.r(11, 6, 2, 2, OL);
  });
  prop('hodori', 16, 16, 1, 1, (p) => {
    p.circle(8, 6, 4, '#f0902a'); p.r(5, 9, 7, 6, '#f0902a'); p.p(6, 5, OL); p.p(10, 5, OL); p.r(7, 7, 3, 1, '#f8f0e0');
    p.r(4, 2, 2, 2, '#f0902a'); p.r(10, 2, 2, 2, '#f0902a'); p.r(5, 3, 7, 1, '#2a2a2a'); p.r(6, 1, 5, 2, '#2a2a2a');
    p.r(5, 10, 7, 1, '#2a2a2a');
  });
  prop('rubble', 32, 16, 2, 1, (p) => {
    const R = rng(7);
    for (let i = 0; i < 14; i++) {
      const x = Math.floor(R() * 26), y = 4 + Math.floor(R() * 9);
      p.r(x, y, 6, 4, OL); p.r(x + 1, y + 1, 4, 2, ['#9a948a', '#b0aaa0', '#7a746a'][i % 3]);
    }
    p.r(6, 2, 2, 8, '#6a6a72'); p.r(20, 1, 1, 9, '#6a6a72');
  });

  /* ---------------- 찰칵이 & 감정 말풍선 ---------------- */
  const spirit = [0, 1].map(f => {
    const c = mk(14, 12);
    const p = P(c.getContext('2d'));
    p.r(1, 3, 12, 9, OL); p.r(2, 4, 10, 7, '#3a3a48'); p.r(2, 4, 10, 2, '#d0d0d8');
    p.r(2, 1, 4, 3, OL); p.r(3, 2, 2, 1, f ? '#fff4a0' : '#e8e8f0');
    p.circle(7, 8, 2, OL); p.r(6, 7, 3, 3, '#8ec0e4'); p.p(6, 7, '#ffffff');
    p.p(3, 7, '#ffffff'); p.p(11, 7, '#ffffff');
    p.p(3, 9, '#f08a9a'); p.p(11, 9, '#f08a9a');
    p.ctx.clearRect(0, 0, 1, 1);
    return c;
  });
  const EMOTE = {};
  const emo = (k, rows, col) => {
    const c = mk(10, 10);
    const p = P(c.getContext('2d'));
    p.r(0, 0, 10, 8, OL); p.r(1, 1, 8, 6, '#fbf8ef'); p.r(3, 8, 2, 1, OL); p.p(3, 9, OL);
    p.art(rows, { x: col }, 1, 1);
    EMOTE[k] = c;
  };
  emo('!', ['...x....', '...x....', '...x....', '........', '...x....', '........'], '#d8342a');
  emo('?', ['..xxx...', '....x...', '...x....', '........', '...x....', '........'], '#2a5aa8');
  emo('…', ['........', '........', '........', '.x.x.x..', '........', '........'], '#2a2a2a');
  emo('♪', ['...xxx..', '...x.x..', '...x....', '.xxx....', '.xx.....', '........'], '#8a3ab8');
  emo('♥', ['.xx.xx..', 'xxxxxxx.', 'xxxxxxx.', '.xxxxx..', '..xxx...', '...x....'], '#e8485a');

  // 안개
  const fogPuff = (() => {
    const c = mk(24, 24);
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(12, 12, 1, 12, 12, 12);
    g.addColorStop(0, 'rgba(240,236,250,.95)');
    g.addColorStop(1, 'rgba(240,236,250,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 24, 24);
    return c;
  })();

  return {
    T, mk, rng, P, TILES, TILES_B, TILES_T, ANIM, SOLID, PROPS,
    charSheet, propImage, spirit, EMOTE, fogPuff,
  };
})();
