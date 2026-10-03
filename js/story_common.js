/* =========================================================
 * 공통: 외모 · 아이템 · 도우미 · 프롤로그 · 엔딩
 * ========================================================= */
const HAIR = { black: '#231a1a', dark: '#2e2420', brown: '#5a3a28', gray: '#8e8a84', white: '#e6e2da', blond: '#e8cc78' };
const LOOK_PLAYER = { hair: '#3a2a20', top: '#d8443a', pants: '#34477a', shoes: '#f0f0f0' };

const LOOK = {
  // 한도윤 (할아버지)의 나이별 모습
  hd61: { hair: HAIR.black, top: '#6a6a78', pants: '#3a3a48', shoes: '#2a2020', acc: ['camera'] },
  hd70: { hair: HAIR.black, top: '#7a6a58', pants: '#4a4038', acc: ['camera'] },
  hd80: { hair: '#3a3434', top: '#5a6a7a', pants: '#3a4048', acc: ['glasses', 'camera'] },
  hd90: { hair: '#7a7670', top: '#6a5a4a', pants: '#3a3430', acc: ['glasses', 'camera'] },
  hdNow: { hair: HAIR.white, top: '#8a6a4a', pants: '#5a5048', skin: '#ecbe96', acc: ['glasses'] },

  soldier: { hair: HAIR.black, top: '#5a6a3a', pants: '#4a5a32', shoes: '#2a2a2a', acc: ['helmet'], accColor: '#4a5a32' },
  officer: { hair: HAIR.black, top: '#5a6a3a', pants: '#4a5a32', shoes: '#2a2a2a', acc: ['cap'], accColor: '#4a5a32' },
  riot: { top: '#3a4a6a', pants: '#2a3450', shoes: '#1a1a1a', acc: ['helmet'], accColor: '#2a3448' },
  police: { top: '#2a3a5a', pants: '#2a3a5a', acc: ['cap'], accColor: '#1e2a44' },
  student60: { hair: HAIR.black, top: '#1e1e2a', pants: '#1e1e2a', acc: ['cap'], accColor: '#1e1e2a' },
  student: { hair: HAIR.black, top: '#e8e4dc', pants: '#3a3a4a' },
  studentB: { hair: HAIR.dark, top: '#7a8a6a', pants: '#3a3a4a', acc: ['glasses'] },
  protester: { hair: HAIR.black, top: '#e8e4dc', pants: '#3a3a4a', acc: ['headband'] },
  protesterB: { hair: HAIR.dark, top: '#4a6a9a', pants: '#2a2a3a', acc: ['headband'] },
  protesterW: { hair: HAIR.black, top: '#e8d8b8', pants: '#3a3a4a', skirt: true, acc: ['longhair', 'headband'] },
  workerGirl: { hair: HAIR.black, top: '#c8d8e8', pants: '#5a6a8a', skirt: true, acc: ['longhair'] },
  sida: { hair: HAIR.black, top: '#d8c8b0', pants: '#6a5a4a', kid: true, skirt: true, acc: ['bun'] },
  worker: { hair: HAIR.black, top: '#8a96a0', pants: '#4a5a6a' },
  builder: { hair: HAIR.black, top: '#c8a060', pants: '#5a4a3a', acc: ['helmet'], accColor: '#e8c840' },
  farmer: { hair: HAIR.gray, top: '#e8e0c8', pants: '#7a6a4a', skin: '#dca47c' },
  oldman: { hair: HAIR.white, top: '#ece8dc', pants: '#cfc8b8', skin: '#e0b08a' },
  oldwoman: { hair: HAIR.gray, top: '#f0ece0', pants: '#5a4a6a', skirt: true, acc: ['bun'], skin: '#e0b08a' },
  woman: { hair: HAIR.black, top: '#e87a8a', pants: '#3a3a5a', skirt: true, acc: ['longhair'] },
  womanB: { hair: HAIR.brown, top: '#8ab0d8', pants: '#4a4a6a', skirt: true, acc: ['longhair'] },
  mother: { hair: HAIR.black, top: '#c8a8c8', pants: '#5a4a5a', skirt: true, acc: ['bun'] },
  man: { hair: HAIR.black, top: '#a88a6a', pants: '#4a4a52' },
  manB: { hair: HAIR.dark, top: '#5a7a5a', pants: '#3a3a42' },
  hatman: { hair: HAIR.black, top: '#7a6a5a', pants: '#3a3a42', acc: ['helmet'], accColor: '#4a3a2a' },
  suit: { hair: HAIR.black, top: '#3a3a48', pants: '#2a2a38', acc: ['tie'] },
  suitG: { hair: HAIR.gray, top: '#4a4a58', pants: '#2a2a38', acc: ['tie', 'glasses'] },
  agent: { hair: HAIR.black, top: '#2a2a30', pants: '#1e1e24', acc: ['glasses'], shoes: '#111' },
  kid: { hair: HAIR.black, top: '#e8c84a', pants: '#3a5a9a', kid: true },
  kidB: { hair: HAIR.brown, top: '#e86a5a', pants: '#3a5a3a', kid: true },
  girl: { hair: HAIR.black, top: '#f0a0b8', pants: '#5a4a8a', kid: true, skirt: true, acc: ['longhair'] },
  newsboy: { hair: HAIR.black, top: '#8a7a5a', pants: '#5a4a3a', kid: true, acc: ['cap'], accColor: '#5a4a3a' },
  vendor: { hair: HAIR.black, top: '#c8a888', pants: '#5a4a3a', acc: ['apron'], skirt: true },
  vendorM: { hair: HAIR.black, top: '#9a8a6a', pants: '#4a3a2a', acc: ['apron'] },
  nurse: { hair: HAIR.black, top: '#f4f4f0', pants: '#f4f4f0', skirt: true, acc: ['cap', 'bun'], accColor: '#f4f4f0' },
  priest: { hair: HAIR.dark, top: '#1e1e24', pants: '#1e1e24', acc: ['tie'], tie: '#f4f4f0' },
  fire: { hair: HAIR.black, top: '#e0802a', pants: '#3a3a42', acc: ['helmet'], accColor: '#e8c840' },
  foreigner: { hair: HAIR.blond, top: '#8a7a5a', pants: '#3a3a42', skin: '#f8d8c0', acc: ['camera'] },
  athleteA: { hair: HAIR.brown, top: '#d83a3a', pants: '#d83a3a', skin: '#f8d8c0' },
  athleteB: { hair: HAIR.dark, top: '#3a5ab8', pants: '#f4f4f0', skin: '#a8704a' },
  hodori: { hair: '#1e1e24', top: '#f0902a', pants: '#f0902a', skin: '#f0902a', shoes: '#f0902a', acc: ['helmet'], accColor: '#1e1e24' },
  baseballW: { hair: HAIR.black, top: '#f4f4f0', pants: '#f4f4f0', acc: ['cap'], accColor: '#2a4ab8' },
  baseballB: { hair: HAIR.black, top: '#3a6ac8', pants: '#e8e8e0', acc: ['cap'], accColor: '#2a4ab8' },
  umpire: { hair: HAIR.black, top: '#1e1e2a', pants: '#5a5a62', acc: ['cap'], accColor: '#1e1e2a' },
  staff: { hair: HAIR.black, top: '#2a5aa8', pants: '#2a2a3a', acc: ['tie'] },
  teller: { hair: HAIR.black, top: '#3a6aa8', pants: '#2a3a5a', skirt: true, acc: ['bun'] },
};

const ME = '하람';
const HD = '한도윤 기자';
const C = t => say('찰칵이', t);

Object.assign(Game.ITEMS, {
  camera: { name: '낡은 사진기' },
  album: { name: '빈 사진첩' },
  box: { name: '수출품 상자' },
  scissors: { name: '개통식 가위' },
  coin: { name: '전태일의 버스비' },
  bbang: { name: '풀빵 한 봉지' },
  extra: { name: '호외' },
  rice: { name: '쌀 한 포대' },
  ball: { name: '시구용 야구공' },
  poster: { name: '대자보' },
  glue: { name: '풀' },
  hoop: { name: '굴렁쇠' },
  treaty: { name: '수교 문서' },
  idcard: { name: '주민등록증' },
  flower: { name: '흰 국화' },
  ring: { name: '돌 반지' },
});

/* ---------------- 정의 도우미 ---------------- */
function npc(id, x, y, look, dir, name, talk, extra = {}) {
  return { id, x, y, look, dir, name, talk, ...extra };
}
function obj(id, x, y, prop, arg, talk, extra = {}) {
  return { id, x, y, prop, arg, talk, ...extra };
}
// 바닥에 떨어진 아이템: 조사하거나 밟으면 줍는다
function pickup(id, x, y, prop, itemId, extra = {}) {
  const cond = extra.if || (() => true);
  const get = async () => {
    if (!cond()) return;
    setF('got_' + id);
    give(itemId);
    if (extra.after) await extra.after();
  };
  return { id, x, y, prop, solid: false, show: () => !F('got_' + id) && cond(), talk: get, step: get, ...extra };
}
// 말은 걸 수 있지만 보이지 않는 조사 지점
function spot(id, x, y, talk, extra = {}) {
  return { id, x, y, talk, solid: false, ...extra };
}
function photoTaken(id) { return Game.state.photos[id] !== undefined; }
// 주인공을 현재 구역 기준 좌표로 옮긴다
function placePlayer(lx, ly, dir) {
  const P = Game.player;
  const z = Game.zoneAt(P.x);
  P.x = lx + (z ? z.x0 : 0); P.y = ly;
  P.px = P.x * 16; P.py = P.y * 16;
  P.moving = false; P.queue.length = 0;
  if (dir) P.dir = dir;
}

// 챕터 끝의 시간의 문
function gateDef(x, y) {
  return obj('gate', x, y, 'gate', undefined, async () => {
    const ch = Game.chapter;
    const last = ch.zones[ch.zones.length - 1];
    if (last.goal && !photoTaken(last.goal)) {
      await C('아직 이 시대에서 찍어야 할 사진이 남았어! 주변을 더 둘러보자.');
      return;
    }
    sfx('gate');
    await C('시간의 문이야! 다음 시대로 넘어가기 전에, 이 시대를 잘 기억하는지 확인해 볼게.');
    await quiz(ch.quiz);
    if (ch.summary) await C(ch.summary);
    await Game.chapterClear();
  });
}

/* ---------------- 할아버지 댁 (2026) ---------------- */
const HOUSE_ROWS = [
  'XXXXXXXXXXXXXXXXXXXX',
  'X#ww#bb#ww##bb#b##wX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnnooooooo oX'.replace(' ', ''),
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'Xnnnnnnnnnn#oooooooX',
  'XXXXXXXXXXXXXXXXXXXX',
];

Game.CHAPTERS.push({
  id: 0,
  title: '프롤로그',
  short: '2026 · 할아버지 댁',
  tab: '프롤로그',
  bgm: 'home',
  height: 12,
  noFog: true,
  start: { x: 8, y: 9, dir: 'up' },
  zones: [{
    id: 'house',
    rows: HOUSE_ROWS,
    hint: () => F('pro_asked') ? '오른쪽 다락방에 있는 큰 궤짝을 열어 봐!' : '할아버지께 인사부터 드리자.',
    ents: [
      obj('plant1', 1, 2, 'plant'),
      obj('plant2', 10, 2, 'plant'),
      obj('tvnow', 5, 2, 'flattv', undefined, async () => {
        await narr('TV에서 뉴스가 흘러나온다. "…오늘도 광장에는 시민들이 모여…"');
      }),
      obj('sofa', 5, 7, 'sofa'),
      obj('chair', 2, 4, 'chair'),
      npc('grandpa', 3, 4, LOOK.hdNow, 'down', '할아버지', async () => {
        if (!F('pro_asked')) {
          setF('pro_asked');
          await say('할아버지', '왔구나, 우리 하람이! 숙제 때문에 왔다고? \'대한민국 현대사 조사\'라… 허허.');
          await say('할아버지', '그 시절 얘기라면 이 할애비가 좀 알지. 젊을 땐 신문사 사진기자였으니까.');
          await say(ME, '할아버지가 사진기자였어요? 처음 들어요!');
          await say('할아버지', '허허, 말 안 했던가? 다락방 궤짝에 내 낡은 사진기가 있단다. 그걸 좀 가져다주겠니?');
          await say('할아버지', '다락방은 저기 오른쪽 방이야. 큰 궤짝을 열어 보렴.');
        } else if (!has('camera')) {
          await say('할아버지', '다락방은 오른쪽 방이란다. 큰 궤짝을 열어 보렴.');
        }
      }, { noTurn: false }),
      spot('photo', 2, 9, async () => {
        await narr('액자 속 빛바랜 흑백 사진. 사진기를 목에 건 젊은 청년이 웃고 있다.');
        await narr('사진 아래에 작은 글씨가 적혀 있다. "1961년 봄, 수습기자 한도윤"');
      }),
      obj('table', 2, 9, 'papers'),
      obj('box1', 13, 2, 'box'),
      obj('box2', 14, 2, 'box'),
      obj('box3', 18, 9, 'box'),
      obj('ladder', 18, 2, 'ladder'),
      obj('chest', 16, 4, 'chest', undefined, async () => {
        if (has('camera')) { await narr('텅 빈 궤짝이다.'); return; }
        await narr('먼지 쌓인 궤짝을 열었다. 낡은 필름 사진기와 빨간 사진첩이 들어 있다.');
        await narr('사진첩 표지에는 금색 글씨로 \'1961–1998\'이라고 적혀 있다. …그런데 안은 텅 비어 있다.');
        await narr('첫 장에 쪽지가 한 장 붙어 있다.\n「빈칸은 네가 채우렴. ― 도윤」');
        give('camera', true); give('album', true);
        sfx('item');
        await say(ME, '빈칸을… 내가?');
        flash(); sfx('shutter'); shake(300);
        await wait(500);
        Game.setSpirit(true);
        await C('찰칵! 드디어 깨어났다~!');
        await say(ME, '으악! 사, 사진기가 말을 해?!');
        await C('나는 사진기의 정령 [찰칵이]! 이 사진첩은 \'아직 찍히지 않은 시간\'의 사진첩이야.');
        await C('1961년부터 1998년까지. 대한민국이 가장 크게 흔들리고, 가장 빠르게 바뀌던 37년이지.');
        await C('그 시절로 가서 직접 보고, 듣고, 찍어야만 빈칸이 채워져.');
        const r = await ask('찰칵이', '같이 가 볼래?', ['가자!', '잠깐, 할아버지한테 먼저 여쭤 볼래…']);
        if (r === 1) await C('할아버지는… 아마 다 알고 계실걸? 후후. 걱정 마, 꼭 돌아올 수 있어.');
        await C('조작법을 알려 줄게! 방향키로 걷고, [Space]로 말을 걸거나 조사해. [Shift]를 누르면 달릴 수 있어.');
        await C('[X]는 메뉴, [Tab]은 사진첩, 막히면 [H]를 눌러 나한테 물어봐!');
        await C('시대마다 [시간의 안개]가 길을 막고 있어. 그 시대의 중요한 순간을 찍으면 안개가 걷혀.');
        await C('자, 셔터를 누르면 출발이야. 하나, 둘…');
        sfx('gate');
        flash();
        await wait(400);
        await Game.gotoChapter(1);
      }),
    ],
  }],
  intro: async () => {
    await narr('2026년 가을.\n하람은 \'대한민국 현대사\' 조사 숙제를 하러 할아버지 댁에 왔다.');
    toast('방향키로 이동 · Space로 대화', 3500);
  },
});

/* ---------------- 엔딩 (2026) ---------------- */
Game.CHAPTERS.push({
  id: 6,
  title: '에필로그',
  short: '2026 · 다시 할아버지 댁',
  tab: '에필로그',
  bgm: 'home',
  height: 12,
  noFog: true,
  start: { x: 15, y: 6, dir: 'left' },
  zones: [{
    id: 'house2',
    rows: HOUSE_ROWS,
    hint: '할아버지께 사진첩을 보여 드리자.',
    ents: [
      obj('plant1', 1, 2, 'plant'),
      obj('plant2', 10, 2, 'plant'),
      obj('tvnow', 5, 2, 'flattv'),
      obj('sofa', 5, 7, 'sofa'),
      obj('chair', 2, 4, 'chair'),
      obj('table', 2, 9, 'papers'),
      obj('box1', 13, 2, 'box'),
      obj('box2', 14, 2, 'box'),
      obj('box3', 18, 9, 'box'),
      obj('ladder', 18, 2, 'ladder'),
      obj('chest', 16, 4, 'chest'),
      npc('grandpa', 3, 4, LOOK.hdNow, 'right', '할아버지', async () => {
        if (F('end_done')) { await say('할아버지', '언제든 그 사진첩을 펼쳐 보렴. 허허.'); return; }
        await say('할아버지', '…다녀왔구나, 하람아.');
        await say(ME, '할아버지! 저, 정말로 그 시절에 다녀왔어요. 탱크도 보고, 광주도, 시청 앞도…');
        await say('할아버지', '그 사진첩을 좀 보여 주겠니?');
        await narr('할아버지는 돋보기를 쓰고 사진첩을 한 장 한 장 천천히 넘겼다.');
        await say('할아버지', '1961년 새벽의 탱크… 1970년 평화시장… 1980년 금남로… 1987년 시청 앞…');
        await say('할아버지', '그때마다 사진기를 든 낯선 아이가 내 곁에 있었지. 어디서 많이 본 얼굴이다 싶었는데…');
        await say('할아버지', '이제야 알겠구나. 그 아이가 바로 너였어.');
        await say(ME, '할아버지는 처음부터 알고 계셨어요?');
        await say('할아버지', '글쎄다, 허허. 이 사진기가 쪽지를 써 두라고 하더구나.');
        await C('후후, 비밀이야~');
        await say('할아버지', '하람아. 이 사진들 속에는 대통령 이름만 있는 게 아니란다.');
        await say('할아버지', '밤새 가발을 만들고 미싱을 돌린 누이들, 고속도로를 닦은 일꾼들, 거리에서 외친 학생과 넥타이 부대, 주먹밥을 나눈 사람들, 금반지를 내놓은 사람들…');
        await say('할아버지', '눈부신 성장도, 짓밟힌 자유도, 무너진 다리도 모두 우리 역사야. 빛만 기억해서도, 그림자만 기억해서도 안 되지.');
        await say('할아버지', '기록하는 사람의 일은 그 둘을 함께 남기는 거란다.');
        await C('다음 사진첩은 1998년부터야. 그건… 하람이 네가 살아갈 시간과 이어져 있지!');
        setF('end_done');
        Game.save();
        const S = Game.state;
        const all = Object.entries(Game.PHOTOS);
        const req = all.filter(([, p]) => !p.bonus);
        const bon = all.filter(([, p]) => p.bonus);
        await fadeOut(1200);
        await Game.credits([
          '#도트 코리아 1961–1998',
          '',
          `모은 사진 ${req.filter(([id]) => S.photos[id] !== undefined).length} / ${req.length}  ·  보너스 ${bon.filter(([id]) => S.photos[id] !== undefined).length} / ${bon.length}`,
          '',
          '박정희 정부 (1961–1979)',
          '최규하 정부 (1979–1980)',
          '전두환 정부 (1980–1988)',
          '노태우 정부 (1988–1993)',
          '김영삼 정부 (1993–1998)',
          '',
          '실제 역사를 바탕으로 했으며, 하람·한도윤·찰칵이는 가상의 인물입니다.',
          '글꼴: Galmuri (SIL Open Font License) · Lee Minseo',
          '',
          '#THE END',
          'Space를 누르면 타이틀로 돌아갑니다',
        ]);
        await fadeOut(400);
        Game.goTitle();
      }),
    ],
  }],
  intro: async () => {
    Game.setSpirit(true);
    await narr('찰칵―\n눈을 떠 보니, 할아버지 댁 다락방이었다.');
    await C('돌아왔어! 사진첩이 꽉 찼지? 할아버지께 보여 드리자!');
  },
});
