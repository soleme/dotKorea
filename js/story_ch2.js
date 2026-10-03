/* =========================================================
 * 제2장 · 최규하 정부와 서울의 봄 (1979–1980)
 * ========================================================= */
Object.assign(Game.PHOTOS, {
  p_choi: {
    ch: 2, title: '최규하 대통령 선출', year: '1979', bonus: true, hint: '12·12 밤거리의 TV',
    desc: '10·26 사태 이후 국무총리였던 최규하가 대통령 권한 대행을 맡았고, 1979년 12월 6일 통일주체국민회의에서 제10대 대통령으로 선출되었다. 그는 헌법을 고치겠다고 약속했지만 실권은 곧 신군부에게 넘어갔다.',
  },
  p_1212: {
    ch: 2, title: '12·12 군사 반란', year: '1979', hint: '1979년 12월 밤의 탱크',
    desc: '1979년 12월 12일 전두환 보안사령관과 노태우 등 군 안의 사조직 하나회 중심의 신군부가 대통령의 재가 없이 정승화 계엄사령관을 체포하고 군권을 장악했다. 최규하 정부는 사실상 힘을 잃었다.',
  },
  p_spring: {
    ch: 2, title: '서울의 봄', year: '1980', hint: '서울역 광장의 학생들',
    desc: '10·26 이후 민주화 요구가 분출한 1980년 봄을 \'서울의 봄\'이라 부른다. 5월 15일 서울역 광장에는 10만여 명의 학생과 시민이 모여 계엄 해제와 민주화를 외쳤다.',
  },
  p_518: {
    ch: 2, title: '5·18 광주 민주화 운동', year: '1980', hint: '금남로의 주먹밥',
    desc: '1980년 5월 18일 광주에서 비상계엄 확대에 반대하는 시위가 일어났다. 계엄군의 무자비한 진압에 맞서 시민들은 주먹밥을 나누고 헌혈하며 서로를 지켰다. 5월 27일 계엄군의 무력 진압으로 수많은 희생자가 발생했다.',
  },
  p_blood: {
    ch: 2, title: '헌혈 행렬', year: '1980', bonus: true, hint: '광주의 병원 앞',
    desc: '부상자가 늘어 병원에 피가 모자라자 광주 시민들은 병원 앞에 길게 줄을 서서 헌혈했다. 학생, 노동자, 상인, 노인까지 너나없이 나섰다.',
  },
  p_chun: {
    ch: 2, title: '체육관 선거', year: '1980', hint: '1980년 8월, TV 중계',
    desc: '최규하 대통령이 물러난 뒤 1980년 8월 27일 통일주체국민회의는 단독 후보 전두환을 대통령으로 선출했다. 10월에는 7년 단임 간선제 헌법이 만들어졌고, 이듬해 다시 대통령에 뽑히며 제5공화국이 시작되었다.',
  },
});

Game.CHAPTERS.push({
  id: 2,
  title: '제2장 · 최규하 정부와 서울의 봄',
  short: '제2장 서울의 봄',
  tab: '2장 1979–80',
  card: ['제2장', '최규하 정부와 서울의 봄 · 1979–1980'],
  filter: 'sepia(.35) saturate(.85)',
  bgm: 'ch2',
  height: 14,
  start: { x: 1, y: 8, dir: 'right' },
  summary: '최규하 정부 8개월. 민주주의의 봄은 너무 짧았어. 하지만 광주에서 서로를 지킨 사람들의 기억은 꺼지지 않는 불씨가 되지.',
  quiz: [
    { q: '1979년 12월 12일 군사 반란을 일으킨 세력은?', a: ['학생 운동 세력', '전두환 등 신군부', '야당 정치인', '외국 군대'], ok: 1, why: '하나회 중심의 신군부가 군권을 장악했지.' },
    { q: '1980년 5월 15일 서울역에 10만여 명이 모였던, 짧았던 민주화의 시기를 부르는 말은?', a: ['서울의 봄', '문민정부', '10월 유신', '3저 호황'], ok: 0, why: '\'서울의 봄\'이라고 불러.' },
    { q: '1980년 5월 18일, 비상계엄 확대에 맞서 광주 시민들이 일어난 사건은?', a: ['4·19 혁명', '부마 민주 항쟁', '5·18 광주 민주화 운동', '6월 민주 항쟁'], ok: 2, why: '5·18 기록물은 2011년 유네스코 세계기록유산이 되었어.' },
  ],
  intro: async () => {
    await narr('1979년 12월 12일 밤, 서울.');
    await C('유신 체제가 무너진 지 두 달. 사람들은 이제 민주주의가 올 거라 믿었어.');
    await C('그런데 오늘 밤 공기가 심상치 않아. 기자 아저씨를 찾아보자!');
  },
  zones: [
    /* ---------- 1979.12.12 ---------- */
    {
      id: 'z1212', year: '1979년 12월 12일 밤', place: '서울 · 국방부 앞 거리', hud: '1979.12', tint: 'night', bgm: 'tense', goal: 'p_1212',
      hint: () => !F('c2_hd') ? '기자 한도윤을 찾아 말을 걸어 보자.'
        : !photoTaken('p_1212') ? '기자가 말한 오른쪽 길모퉁이(반짝이는 곳)로 가서 숨어 지켜보자.' : '오른쪽으로 가자. 1980년 봄이야.',
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGG',
        'GGGGGGGGGGGGGGGGGGGGGGGG',
        'CwwCwwCwwCDDCwwCwwCwwCww',
        'cccccccccccccccccccccccc',
        'IIIIIIIIIIcccIIIIIIIIIII',
        '::::::::::::::::::::::::',
        '========================',
        '------------------------',
        '========================',
        '========================',
        '::::::::::::::::::::::::',
        'RRRRRRGGGGGGRRRRRRGGGGGG',
        'RRRRRRGGGGGGRRRRRRGGGGGG',
        'RRRRRRGGGGGGRRRRRRGGGGGG',
      ],
      triggers: [
        {
          x: 21, y: 10, once: 'c2_watch', if: () => F('c2_hd'),
          run: async () => {
            const P = Game.player;
            P.dir = 'up';
            await C('쉿, 여기 숨어서 지켜보자…');
            await camTo(15, 7);
            sfx('boom'); shake(500);
            await wait(500);
            sfx('boom'); shake(400);
            await say('군인', '(멀리서) 탕! 탕!');
            const t1 = Game.spawn({ id: 'tankN1', x: 21, y: 6, prop: 'tank', arg: { dir: 'left' }, solid: false }, 'z1212');
            const t2 = Game.spawn({ id: 'tankN2', x: 25, y: 8, prop: 'tank', arg: { dir: 'left' }, solid: false }, 'z1212');
            const m1 = walk(t1, 'LLLLLLLL', { force: true, speed: 1 });
            walk(t2, 'LLLLLLLL', { force: true, speed: 1 });
            await wait(1600);
            await snap('p_1212');
            await m1;
            await camFollow();
            await narr('그날 밤 신군부는 서울 시내로 병력을 끌어들였다. 육군 참모총장이자 계엄사령관 정승화는 체포되었고, 이를 막으려던 군인들은 총에 맞았다.');
            await C('대통령의 허락도 받지 않고 군대를 움직인 거야. [12·12 군사 반란]이지. 이제 진짜 권력은 신군부에게 넘어갔어.');
            despawn('tankN1'); despawn('tankN2');
          },
        },
      ],
      ents: [
        obj('lampA', 2, 5, 'lamp'), obj('lampB', 9, 5, 'lamp'), obj('lampC', 16, 5, 'lamp'), obj('lampD', 13, 10, 'lamp'),
        npc('guard1', 10, 3, LOOK.soldier, 'down', '초병', async () => {
          await say('초병', '오늘 밤은 아무도 들어갈 수 없다. 돌아가!');
        }),
        npc('guard2', 12, 3, LOOK.soldier, 'down', '초병', async () => {
          await say('초병', '…무슨 일이 벌어지고 있는지 우리도 모른다.');
        }),
        npc('check', 11, 5, LOOK.officer, 'down', '장교', async () => {
          await say('장교', '이 길은 통제한다. 민간인은 당장 집으로 돌아가라!');
        }),
        obj('tvN', 5, 10, 'tv', undefined, async () => {
          await narr('(TV) "…12월 6일 통일주체국민회의에서 선출된 최규하 대통령은 \'헌법을 고쳐 국민의 뜻을 따르겠다\'고 밝혔습니다…"');
          if (!photoTaken('p_choi')) {
            await C('10·26 뒤 대통령이 된 최규하야. 보너스 사진으로 남겨 두자.');
            await snap('p_choi', { noFog: true });
          }
        }),
        npc('tvman', 6, 10, LOOK.hatman, 'left', '시민', async () => {
          await say('시민', '10·26 뒤 [최규하] 총리가 대통령 권한 대행을 하다가, 12월 6일 통일주체국민회의에서 대통령으로 뽑혔어.');
          await say('시민', '유신 헌법을 고쳐서 민주주의가 온다던데… 오늘 밤은 왜 이렇게 군용 트럭이 많지?');
        }),
        npc('taxi', 3, 10, LOOK.manB, 'right', '택시 기사', async () => {
          await say('택시 기사', '한강 다리마다 군인들이 막고 있어서 손님을 못 태우겠어. 총소리 같은 것도 들리고…');
        }),
        npc('hd', 19, 10, LOOK.hd80, 'left', HD, async () => {
          if (!F('c2_hd')) {
            setF('c2_hd');
            await say(HD, '자네…! 또 만났군. 1961년에도, 1979년 가을에도… 자넨 어째 늙지를 않나?');
            await say(HD, '아니, 지금은 그게 중요한 게 아니야. 큰일이 벌어지고 있어.');
            await say(HD, '보안사령관 [전두환] 소장과 노태우 소장 같은 군 안의 사조직 [하나회] 세력이 계엄사령관인 정승화 육군 참모총장을 체포했다는 소식이야.');
            await say(HD, '대통령의 재가도 없이 말이야. 지금 전방 부대까지 서울로 들어오고 있대.');
            await say(HD, '저 오른쪽 길모퉁이에 숨어서 지켜보세. 위험하니 절대 나서지 말고.');
            await C('기자 아저씨 오른쪽, 반짝이는 길모퉁이로 가 보자!');
          } else if (!photoTaken('p_1212')) {
            await say(HD, '오른쪽 길모퉁이로 가서 몸을 숨기게!');
          } else {
            await say(HD, '오늘 밤의 일을 신문에 쓸 수 있을까… 아마 한 줄도 못 쓰겠지.');
          }
        }),
        { id: 'spark', x: 21, y: 10, prop: 'coin', solid: false, show: () => F('c2_hd') && !F('c2_watch') },
      ],
    },

    /* ---------- 1980.5.15 서울역 ---------- */
    {
      id: 'zspring', year: '1980년 5월 15일', place: '서울역 광장', hud: '1980.5', weather: 'petals', goal: 'p_spring',
      hint: () => !photoTaken('p_spring') ? '서울역 앞 학생 대표에게 말을 걸어 보자.' : '오른쪽으로 가자. 광주로…',
      rows: [
        'TTTTTTTTppppppppTTTTTTTT',
        'TTTTTTTTppppppppTTTTTTTT',
        't,,t,,t,pppppppp,t,,t,,t',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        'pppppppppppppppppppppppp',
        '::::::::::::::::::::::::',
        '========================',
        '========================',
      ],
      ents: [
        obj('station', 9, 1, 'dome', { noSpire: true }, async () => {
          await narr('서울역. 지방에서 올라온 학생들도 이곳 광장으로 모여들었다.');
        }),
        obj('ban1', 5, 4, 'banner'),
        obj('ban2', 16, 4, 'banner'),
        npc('leader', 11, 5, LOOK.protester, 'down', '학생 대표', async () => {
          if (photoTaken('p_spring')) { await say('학생 대표', '오늘의 선택이 옳았는지는… 역사가 판단하겠지.'); return; }
          await say('학생 대표', '10만 명이 모였어! "비상계엄 해제하라! 유신 잔당은 물러가라!"');
          await say('학생 대표', '그런데 군대가 서울로 들어올 거라는 소문이 돌아. 여기서 더 버티면 군이 개입할 구실을 주는 건 아닐까…');
          const r = await ask('학생 대표', '어떻게 해야 할까?', ['끝까지 버티자!', '오늘은 해산하자.']);
          if (r === 0) await say('학생 대표', '나도 그러고 싶어. 하지만 피를 보게 될까 두렵다…');
          else await say('학생 대표', '…그래. 시민들의 희생만은 막아야 해.');
          await narr('밤늦게 학생 대표들은 해산을 결정했다. 이 일을 \'서울역 회군\'이라고 부른다.');
          await C('민주주의를 바라는 뜨거운 봄, [서울의 봄]이야. 이 광장을 기록하자!');
          await snap('p_spring');
          await narr('이틀 뒤인 5월 17일 밤, 신군부는 비상계엄을 전국으로 확대했다. 국회를 군대로 막고 김대중·김종필 등 정치인과 학생 지도자들을 잡아들였다. 김영삼은 집에 갇혔다.');
          await narr('그리고 5월 18일, 광주에서…');
        }),
        npc('p1', 4, 7, LOOK.protester, 'up', '대학생', async () => {
          await say('대학생', '유신이 끝났는데 왜 아직도 계엄령이야? 우리는 민주주의를 원해!');
        }, { cheer: true }),
        npc('p2', 7, 6, LOOK.protesterW, 'up', '대학생', async () => {
          await say('대학생', '지방에서 기차 타고 올라왔어요. 오늘은 전국의 학생들이 다 모였대요!');
        }, { cheer: true }),
        npc('p3', 14, 6, LOOK.protesterB, 'up', '대학생', async () => {
          await say('대학생', '"계엄 철폐! 전두환 퇴진!"');
        }, { cheer: true }),
        npc('p4', 17, 8, LOOK.protester, 'up', '대학생', async () => {
          await say('대학생', '시민 여러분도 함께해 주세요!');
        }, { cheer: true }),
        npc('p5', 9, 9, LOOK.protesterW, 'up', '대학생', async () => {
          await say('대학생', '봄이 왔잖아요. 이제 민주주의도 꽃필 차례예요.');
        }, { cheer: true }),
        npc('cit', 2, 10, LOOK.hatman, 'right', '시민', async () => {
          await say('시민', '유신이 끝나고 민주주의가 꽃필 줄 알았지. 그래서 \'서울의 봄\'이라고들 불렀는데… 꽃샘추위가 심상치 않구먼.');
        }),
        npc('old', 19, 10, LOOK.oldman, 'left', '할아버지', async () => {
          await say('할아버지', '정치인 [김영삼], [김대중], [김종필]도 다시 활동을 시작했지. 다들 \'3김 시대\'라고 부르더군.');
          await say('할아버지', '이번 겨울 안에 헌법을 고치고 선거를 할 거라는데… 정말 그렇게 될까?');
        }),
        npc('riot1', 21, 6, LOOK.riot, 'left', '전투 경찰', async () => {
          await say('전투 경찰', '…해산하시오. 해산하시오.');
        }),
        npc('riot2', 21, 8, LOOK.riot, 'left', '전투 경찰', async () => {
          await say('전투 경찰', '우리도 같은 또래인데…');
        }),
      ],
    },

    /* ---------- 1980.5 광주 ---------- */
    {
      id: 'z518', year: '1980년 5월', place: '광주 · 금남로', hud: '1980.5', goal: 'p_518',
      hint: () => !F('c2_ask') ? '바구니 옆 주먹밥 아주머니에게 말을 걸어 보자.'
        : (!has('rice') && !F('c2_rice')) ? '왼쪽 아래 시장의 쌀가게에서 쌀을 얻어 오자.'
          : has('rice') ? '쌀을 주먹밥 아주머니에게 갖다주자.' : '오른쪽으로 가자.',
      rows: [
        'GGGGGGRRRRRRGGGGGGGGGGGGRRRR',
        'GGGGGGRRRRRRGGGGGGGGGGGGRRRR',
        'CwwwwCBWBWBWCwwwwwwwwwwCBWBW',
        'CwEEwCBWDWBWCwwwwDDwwwwCBWDW',
        '::::::::::::::::::::::::::::',
        '::::::::::::::::::::::::::::',
        '============================',
        '----------------------------',
        '============================',
        '============================',
        '::::::::::::::::::::::::::::',
        '::::::::::::::::::::::::::::',
        'RRRRRRGGGGGGRRRRRRGGGGGGRRRR',
        'RRRRRRGGGGGGRRRRRRGGGGGGRRRR',
      ],
      ents: [
        npc('nurse', 2, 4, LOOK.nurse, 'right', '간호사', async () => {
          await say('간호사', '병원에 피가 모자란다고 알렸더니 줄이 끝이 없어요. 학생, 상인, 할머니까지… 모두 한마음이에요.');
          if (!photoTaken('p_blood')) {
            await C('헌혈하러 온 사람들의 긴 줄이야. 보너스 사진으로 기억하자.');
            await snap('p_blood', { noFog: true });
          }
        }),
        npc('bl1', 3, 5, LOOK.student, 'left', '대학생', async () => { await say('대학생', '피라도 나눠야죠. 다친 사람들이 너무 많아요.'); }),
        npc('bl2', 4, 5, LOOK.vendor, 'left', '상인', async () => { await say('상인', '장사는 무슨 장사여. 사람이 먼저제.'); }),
        npc('bl3', 5, 5, LOOK.oldman, 'left', '할아버지', async () => { await say('할아버지', '늙은이 피라도 괜찮다면 얼마든지 가져가시오.'); }),
        npc('foreign', 10, 4, LOOK.foreigner, 'down', '외국인 기자', async () => {
          await say('외국인 기자', '저는 독일에서 온 기자 위르겐 힌츠페터입니다.');
          await say('외국인 기자', '이곳 소식은 한국 신문과 방송에 제대로 나오지 않아요. 제가 찍은 필름을 몰래 가지고 나가 세계에 알릴 겁니다.');
        }),
        obj('bulletin', 16, 4, 'wallposter', undefined, async () => {
          await narr('「투사회보」. 시민들이 직접 만든 소식지다.');
          await narr('신문과 방송이 진실을 전하지 않자, 시민들은 스스로 소식을 써서 나눴다.');
        }),
        npc('youth', 24, 5, LOOK.protesterB, 'left', '시민군 청년', async () => {
          await say('시민군 청년', '계엄군이 시민들을 향해 총을 쐈어. 우리는 가족과 이웃을 지키려고 나섰을 뿐이야.');
          await say('시민군 청년', '도청을 지키는 사람들 대부분이 나 같은 평범한 청년이야. 구두닦이, 재수생, 공장 노동자…');
        }),
        obj('taxiA', 19, 8, 'car', { color: '#e8c840' }),
        obj('taxiB', 22, 9, 'car', { color: '#e8c840', dir: 'left' }),
        npc('driver', 21, 10, LOOK.manB, 'up', '택시 기사', async () => {
          await say('택시 기사', '5월 20일 밤, 택시 기사들이 전조등을 켜고 경적을 울리며 금남로로 몰려갔지.');
          await say('택시 기사', '다친 학생들을 병원에 실어 나르다 우리도 맞았거든. 더는 가만있을 수 없었어.');
        }),
        obj('basket', 15, 10, 'basket', { empty: true }, null, { show: () => !F('c2_rice') }),
        obj('basketF', 15, 10, 'basket', undefined, async () => {
          await narr('바구니 가득 하얀 주먹밥이 담겨 있다.');
        }, { show: () => F('c2_rice') }),
        npc('ajumma', 14, 10, LOOK.vendor, 'right', '주먹밥 아주머니', async () => {
          if (F('c2_rice')) {
            await say('주먹밥 아주머니', '많이 먹고 힘내소. 우리가 폭도가 아니라는 거, 세상이 언젠가는 알아줄 거여.');
            return;
          }
          if (has('rice')) {
            take('rice');
            await say('주먹밥 아주머니', '아이고, 쌀을 구해 왔구먼! 고맙다, 고마워.');
            await narr('동네 아주머니들이 모여 뚝딱뚝딱 주먹밥을 빚는다. 하나씩, 둘씩… 금세 바구니가 가득 찼다.');
            setF('c2_rice');
            await say('주먹밥 아주머니', '자, 다들 먹고 힘내소!');
            ['eat1', 'eat2', 'eat3', 'eat4'].forEach(id => emote(id, '♥', 1600));
            await wait(400);
            await C('누가 시키지 않아도 서로 밥을 나누고 피를 나눈 사람들. 이 장면을 꼭 기록하자.');
            await snap('p_518');
            await fadeOut(900);
            await narr('5월 27일 새벽, 계엄군은 탱크와 헬기를 앞세워 전남도청을 무력으로 진압했다.');
            await narr('열흘 동안 수많은 시민이 목숨을 잃거나 다치고 실종되었다.');
            await narr('광주의 진실은 오랫동안 감춰졌다. 그러나 사람들은 결코 잊지 않았고, 그 기억은 한국 민주주의의 뿌리가 되었다.');
            await fadeIn(900);
            await C('1997년 5월 18일은 국가 기념일이 되었고, 2011년 5·18 기록물은 유네스코 세계기록유산이 되었어.');
            await C('그리고 이 기억은 7년 뒤, 1987년 6월로 이어져.');
            return;
          }
          if (!F('c2_ask')) {
            setF('c2_ask');
            await say('주먹밥 아주머니', '아이고, 학생. 시민들 먹일 주먹밥을 만들어야 하는디 쌀이 다 떨어져 부렀어.');
            await say('주먹밥 아주머니', '저기 왼쪽 시장 쌀가게에 가서 쌀 좀 얻어다 주겄냐?');
          } else {
            await say('주먹밥 아주머니', '쌀가게는 왼쪽 아래 길가에 있어.');
          }
        }),
        npc('eat1', 12, 10, LOOK.protester, 'right', '시민', async () => { await say('시민', '아주머니 주먹밥 먹고 나면 힘이 나요.'); }, { show: () => F('c2_rice') }),
        npc('eat2', 13, 11, LOOK.student, 'up', '고등학생', async () => { await say('고등학생', '엄마가 걱정하실 텐데… 그래도 형들을 두고 갈 수 없어요.'); }, { show: () => F('c2_rice') }),
        npc('eat3', 16, 11, LOOK.manB, 'up', '시민', async () => { await say('시민', '서로 돕는 게 사람 사는 도리지.'); }, { show: () => F('c2_rice') }),
        npc('eat4', 17, 10, LOOK.womanB, 'left', '시민', async () => { await say('시민', '이 주먹밥 맛을 평생 못 잊을 거예요.'); }, { show: () => F('c2_rice') }),
        obj('ricestall', 3, 11, 'stall', { color: '#3a8a5a', goods: ['#f4f0e4', '#f4f0e4', '#e8dcc0'] }),
        npc('riceman', 5, 11, LOOK.vendorM, 'left', '쌀가게 주인', async () => {
          if (F('c2_ask') && !has('rice') && !F('c2_rice')) {
            await say('쌀가게 주인', '주먹밥 만든다고? 돈은 됐다. 이럴 때 서로 돕고 살아야제. 다 가져가!');
            give('rice');
          } else {
            await say('쌀가게 주인', '가게 문을 닫은 데가 많지만, 우리는 연다. 다들 굶으면 안 되니께.');
          }
        }),
        npc('hd', 8, 10, LOOK.hd80, 'up', HD, async () => {
          if (!photoTaken('p_518')) {
            await say(HD, '서울 신문들은 이곳 사람들을 \'폭도\', \'불순분자\'라고만 쓰라는 지시를 받았어.');
            await say(HD, '하지만 내 눈으로 본 건 서로 밥을 나누는 평범한 시민들뿐이야. 나는 오늘 본 것을 절대 잊지 않을 거야.');
          } else {
            await say(HD, '자네가 찍은 그 사진… 언젠가 꼭 세상에 나와야 해.');
          }
        }),
      ],
    },

    /* ---------- 1980.8 ---------- */
    {
      id: 'zchun', year: '1980년 8월', place: '서울 · 다방이 있는 거리', hud: '1980.8', goal: 'p_chun',
      hint: () => !photoTaken('p_chun') ? 'TV 앞에서 무슨 중계를 하는지 보자.' : '오른쪽 끝의 시간의 문으로 가자!',
      rows: [
        'RRRRRRGGGGGGRRRRRRTTTT',
        'RRRRRRGGGGGGRRRRRRTTTT',
        'BWBWBWCVVVVCBWBWBWTTTT',
        'BWDWBWCEEEECBWDWBW.TTT',
        '::::::::::::::::::::..',
        '::::::::::::::::::::..',
        '====================..',
        '--------------------..',
        '====================..',
        '====================..',
        '::::::::::::::::::::..',
        '..t...,,....t...,,..TT',
        '.....,,.........,,..TT',
        'TTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('tv', 8, 4, 'tv', undefined, async () => {
          await narr('(TV) 장충체육관. 통일주체국민회의 대의원들이 줄지어 투표하고 있다.');
          await narr('"…대의원 2,525명 가운데 2,524명 찬성, 무효 1표. 전두환 후보가 제11대 대통령에 당선되었습니다."');
          if (photoTaken('p_chun')) return;
          await C('후보는 단 한 명, 찬성 99.9%. 이렇게 전두환이 대통령이 됐어. 사람들은 이걸 \'체육관 선거\'라고 불렀지.');
          await C('10월에는 대통령을 7년 단임 간접 선거로 뽑는 새 헌법이 만들어졌고, 1981년 그 헌법으로 다시 대통령에 뽑히며 [제5공화국]이 시작돼.');
          await snap('p_chun');
        }),
        npc('v1', 7, 5, LOOK.man, 'up', '손님', async () => { await say('손님', '후보가 한 명뿐인 선거를 선거라고 할 수 있나…'); }),
        npc('v2', 9, 5, LOOK.womanB, 'up', '손님', async () => { await say('손님', '쉿, 말조심해요. 요즘은 누가 듣고 있을지 몰라요.'); }),
        npc('clerk', 4, 5, LOOK.suitG, 'right', '공무원', async () => {
          await say('공무원', '최규하 대통령이 8월 16일에 물러나셨네. 재임 8개월…');
          await say('공무원', '5월 말에 [국가보위비상대책위원회], 국보위가 생긴 뒤로 실권은 전부 그쪽에 있었지.');
        }),
        npc('worried', 14, 10, LOOK.mother, 'up', '아주머니', async () => {
          await say('아주머니', '국보위가 \'사회를 깨끗하게 한다\'면서 사람들을 마구 [삼청교육대]로 끌고 갔대요. 우리 옆집 총각도요…');
          await say('아주머니', '군대식 훈련에 매질까지 당하고, 돌아오지 못한 사람도 있다더라고요.');
        }),
        npc('hd', 16, 4, LOOK.hd80, 'down', HD, async () => {
          await say(HD, '신문사들을 강제로 합친다는 소문이 돌아. 비판적인 기자들은 벌써 쫓겨나고 있어.');
          await say(HD, '나도 언제 잘릴지 몰라. 그래도 사진은 계속 찍을 걸세. 언젠가 쓸모가 있겠지.');
        }),
        npc('kid', 10, 10, LOOK.kid, 'up', '아이', async () => {
          await say('아이', '올해 12월부터 컬러 TV 방송을 한대요! 만화가 알록달록하게 나온대요!');
        }),
        gateDef(21, 7),
      ],
    },
  ],
});
