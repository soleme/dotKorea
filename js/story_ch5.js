/* =========================================================
 * 제5장 · 김영삼 정부 (1993–1998)
 * ========================================================= */
Object.assign(Game.PHOTOS, {
  p_civil: {
    ch: 5, title: '문민정부 출범', year: '1993', hint: '국회의사당 앞 취임식',
    desc: '1993년 2월 김영삼이 대통령에 취임하며 32년 만에 군인 출신이 아닌 대통령의 정부, \'문민정부\'가 출범했다. 김영삼 정부는 군 안의 사조직 하나회를 해체하고 고위 공직자 재산 공개를 실시했다.',
  },
  p_realname: {
    ch: 5, title: '금융 실명제', year: '1993', hint: '은행 창구',
    desc: '1993년 8월 12일 김영삼 대통령은 긴급 명령으로 금융 실명제를 전격 실시했다. 모든 금융 거래를 실제 이름으로만 하게 하여 불법 자금과 부정부패를 막는 토대를 마련했다.',
  },
  p_memorial: {
    ch: 5, title: '성수대교·삼풍백화점 붕괴', year: '1994–1995', hint: '한강 변 추모 공간',
    desc: '1994년 성수대교가 무너져 32명이, 1995년 삼풍백화점이 무너져 502명이 목숨을 잃었다. 부실 공사와 안전 불감증이 빚은 참사로, 압축 성장의 그늘을 돌아보게 했다.',
  },
  p_rectify: {
    ch: 5, title: '역사 바로 세우기', year: '1995', hint: '경복궁 앞 첨탑',
    desc: '김영삼 정부는 \'역사 바로 세우기\'를 내걸고 광복 50주년인 1995년 조선총독부 건물 철거를 시작했다. 또 5·18 특별법을 만들어 12·12 군사 반란과 5·18 진압의 책임을 물어 전두환·노태우 두 전직 대통령을 구속·처벌했다.',
  },
  p_local95: {
    ch: 5, title: '지방 자치 전면 실시', year: '1995', bonus: true, hint: '경복궁 앞 선거 벽보',
    desc: '1995년 6월 27일 시장·도지사·구청장·군수와 지방 의원을 한꺼번에 뽑는 첫 전국 동시 지방 선거가 치러졌다. 30여 년 만에 지방 자치가 전면적으로 시작되었다.',
  },
  p_oecd: {
    ch: 5, title: 'OECD 가입', year: '1996', bonus: true, hint: '1997년 거리의 광고판',
    desc: '1996년 12월 한국은 경제 협력 개발 기구(OECD)에 29번째 회원국으로 가입했다. 선진국 진입의 상징으로 여겨졌지만, 금융 시장을 서둘러 개방한 것이 외환 위기의 한 원인이 되었다는 지적도 있다.',
  },
  p_gold: {
    ch: 5, title: '외환 위기와 금 모으기 운동', year: '1997–1998', hint: '눈 내리는 거리의 금 모으기',
    desc: '1997년 기업의 연쇄 부도와 외환 부족으로 한국은 IMF에 구제 금융을 신청했다. 많은 사람이 일자리를 잃었지만, 국민들은 금 모으기 운동에 나서 350만여 명이 약 227톤의 금을 내놓았다.',
  },
});

Game.CHAPTERS.push({
  id: 5,
  title: '제5장 · 김영삼 정부',
  short: '제5장 김영삼 정부',
  tab: '5장 1993–98',
  card: ['제5장', '김영삼 정부 · 1993–1998'],
  filter: 'none',
  bgm: 'ch5',
  height: 14,
  start: { x: 1, y: 8, dir: 'right' },
  summary: '김영삼 정부 5년. 군사 정권의 그림자를 걷어 내는 개혁을 했지만, 마지막에는 외환 위기라는 큰 시련을 맞았어. 그리고 국민들은 또 한 번 힘을 모았지.',
  quiz: [
    { q: '1993년 모든 금융 거래를 실제 이름으로만 하도록 한 제도는?', a: ['토지 개혁', '금융 실명제', '새마을 운동', '국민연금'], ok: 1, why: '가명·차명 계좌로 검은돈을 숨기지 못하게 했지.' },
    { q: '김영삼 정부가 광복 50주년인 1995년에 철거를 시작한 건물은?', a: ['덕수궁 석조전', '서울역', '조선총독부 건물', '독립문'], ok: 2, why: '첨탑은 지금 천안 독립기념관에 전시되어 있어.' },
    { q: '1997년 외환 위기 때 국민들이 나라 빚을 갚는 데 보태려 벌인 운동은?', a: ['국채 보상 운동', '금 모으기 운동', '물산 장려 운동', '브나로드 운동'], ok: 1, why: '1907년 국채 보상 운동과 닮은꼴이라 \'제2의 국채 보상 운동\'이라고도 불렀어.' },
  ],
  intro: async () => {
    await narr('1993년 2월, 서울.');
    await C('1992년 12월 대선에서 민주자유당 김영삼 후보가 당선됐어. 1979년 국회에서 제명당했던 바로 그 사람이야.');
    await C('군인 출신이 아닌 대통령은 32년 만이래. 세상이 또 어떻게 바뀌었을까?');
  },
  zones: [
    /* ---------- 1993 문민정부 ---------- */
    {
      id: 'zcivil', year: '1993년 2월 25일', place: '서울 · 국회의사당 앞', hud: '1993', goal: 'p_civil',
      hint: () => !photoTaken('p_civil') ? '취임식 사회자에게 말을 걸어 보자.' : '오른쪽으로 가자. 은행이야!',
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGG',
        'CCwCCwCCwCCDDCCwCCwCCwCC',
        'pppppppppppppppppppppppp',
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
        obj('tgA', 10, 2, 'taegukgi'), obj('tgB', 14, 2, 'taegukgi'),
        obj('podium', 12, 3, 'podium', undefined, async () => { await narr('취임식 연단. 태극기와 봉황 문양이 걸려 있다.'); }),
        npc('mc', 15, 4, LOOK.staff, 'left', '사회자', async () => {
          if (photoTaken('p_civil')) { await say('사회자', '새 정부의 출범을 축하합니다!'); return; }
          await say('사회자', '지금부터 제14대 대통령 취임식을 거행하겠습니다!');
          await narr('1993년 2월 25일 국회의사당 앞. 김영삼 대통령이 취임 선서를 했다.');
          await narr('1961년 5·16 이후 32년 만에 군인 출신이 아닌 대통령의 정부가 들어섰다.');
          sfx('cheer');
          ['cr1', 'cr2', 'cr3', 'cr4'].forEach(id => emote(id, '♪', 1600));
          await snap('p_civil');
          await C('그래서 이 정부를 [문민정부]라고 불러. \'문민\'은 군인이 아닌 일반 국민이라는 뜻이야.');
        }),
        npc('cr1', 6, 7, LOOK.man, 'up', '시민', async () => { await say('시민', '드디어 군복 입은 대통령 시대가 끝났구먼!'); }, { cheer: true }),
        npc('cr2', 9, 6, LOOK.womanB, 'up', '시민', async () => { await say('시민', '날씨는 추워도 마음은 따뜻하네요.'); }, { cheer: true }),
        npc('cr3', 16, 7, LOOK.student, 'up', '대학생', async () => { await say('대학생', '3당 합당으로 대통령이 됐다는 비판도 있지만, 그래도 군사 정권은 끝났잖아요.'); }, { cheer: true }),
        npc('cr4', 19, 8, LOOK.mother, 'up', '시민', async () => { await say('시민', '부정부패 없는 나라를 만들어 주세요!'); }, { cheer: true }),
        npc('clerk', 3, 4, LOOK.suitG, 'right', '공무원', async () => {
          await say('공무원', '대통령부터 고위 공직자들이 재산을 공개한대요. 숨겨 둔 땅이 들통난 높으신 분들 여럿이 옷을 벗었죠.');
        }),
        npc('officer', 20, 5, LOOK.officer, 'left', '장교', async () => {
          await say('장교', '군 안의 사조직 [하나회]가 해체되고 있소. 12·12 때 군권을 잡았던 바로 그 세력 말이오.');
          await say('장교', '취임 열흘 만에 육군 참모총장부터 바꿔 버렸지. 별(장군)들이 줄줄이 옷을 벗었소. 이제 군이 다시 정치에 나서는 일은 없을 거요.');
        }),
        npc('hd', 2, 8, LOOK.hd90, 'right', HD, async () => {
          await say(HD, '1961년, 이 근처 거리에서 탱크를 봤었지. 32년이 걸렸구먼.');
          await say(HD, '나도 이제 쉰여섯이야. 자네는… 하하, 묻지 않겠네.');
        }),
      ],
    },

    /* ---------- 1993.8 은행 ---------- */
    {
      id: 'zbank', year: '1993년 8월 13일', place: '서울 · 은행 창구', hud: '1993.8', goal: 'p_realname',
      hint: () => !F('c5_gp') ? '은행 안 할아버지에게 말을 걸어 보자.'
        : (!has('idcard') && !photoTaken('p_realname')) ? '할아버지의 주민등록증을 찾아보자. 오른쪽 아래 대기석 쪽?'
          : has('idcard') ? '주민등록증을 할아버지께 드리자.' : '오른쪽으로 가자.',
      rows: [
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        '####ww####ww####ww######',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuKKKKKKKKKKKKKKKKKKKKuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
      ],
      ents: [
        npc('t1', 5, 2, LOOK.teller, 'down', '은행원', async () => {
          await say('은행원', '아침부터 전화가 빗발쳐요. 다들 자기 통장이 어떻게 되는 거냐고요.');
        }),
        npc('t2', 9, 2, LOOK.teller, 'down', '은행원', async () => {
          await say('은행원', '어젯밤(8월 12일) 8시, 대통령 긴급 명령으로 [금융 실명제]가 시행되었습니다.');
          await say('은행원', '이제 다른 사람 이름이나 가짜 이름으로는 금융 거래를 할 수 없어요. 실명을 확인하려면 주민등록증이 꼭 필요해요.');
        }),
        npc('t3', 13, 2, LOOK.staff, 'down', '은행원', async () => {
          await say('은행원', '발표 직전까지 극비였대요. 저희도 TV 뉴스를 보고 알았다니까요!');
        }),
        npc('t4', 17, 2, LOOK.teller, 'down', '은행원', async () => {
          await say('은행원', '차명 계좌에 돈을 숨겨 두었던 사람들은 지금 속이 탈 거예요.');
        }),
        npc('gp', 9, 6, LOOK.oldman, 'up', '할아버지', async (e) => {
          if (photoTaken('p_realname')) { await say('할아버지', '이제 떳떳한 내 이름 통장이오! 허허.'); return; }
          if (has('idcard')) {
            take('idcard');
            await say('할아버지', '오, 내 주민등록증! 고맙구먼. 자, 창구로 가 보세.');
            await walkTo(e, 9, 4); face(e, 'up');
            await say('은행원', '네, 실명 확인되었습니다! 할아버지 이름으로 통장을 바꿔 드렸어요.');
            await say('할아버지', '평생 모은 돈인데, 이제 떳떳하게 내 이름으로 찾는구먼!');
            emote(e, '♥', 1500);
            await snap('p_realname');
            await C('검은돈이 숨을 곳을 없앤 개혁이야. 오늘날 모든 금융 거래가 실명으로 이루어지는 건 이때부터지.');
            return;
          }
          if (!F('c5_gp')) {
            setF('c5_gp');
            await say('할아버지', '평생 모은 돈을 남의 이름으로 된 통장에 넣어 뒀는데… 이제 실명으로 바꿔야 찾을 수 있다는구먼.');
            await say('할아버지', '그런데 주민등록증을 어디 뒀는지 모르겠어. 아까 저쪽 대기석에 앉아 있었는데…');
          } else {
            await say('할아버지', '주민등록증이… 오른쪽 아래 대기석 근처일 텐데.');
          }
        }, { at: () => photoTaken('p_realname') ? [9, 4, 'up'] : null }),
        pickup('idcard', 21, 10, 'idcard', 'idcard', { if: () => F('c5_gp') && !photoTaken('p_realname') }),
        obj('benchA', 4, 9, 'bench'), obj('benchB', 6, 9, 'bench'), obj('benchC', 19, 10, 'bench'),
        npc('cust1', 5, 10, LOOK.mother, 'up', '손님', async () => {
          await say('손님', '우리 같은 서민이야 뭐 숨길 돈이 있나. 오히려 속이 시원하네요.');
        }),
        npc('mgr', 20, 5, LOOK.suitG, 'left', '지점장', async () => {
          await say('지점장', '검은돈, 뇌물, 탈세를 막으려는 거죠. 대통령이 "이것 없이는 개혁도 없다"고 했다더군요.');
        }),
        npc('biz', 14, 8, LOOK.suit, 'up', '회사원', async () => {
          await say('회사원', '처음엔 경제가 얼어붙을 거라고 걱정하는 사람도 많았어요. 그래도 필요한 일이었죠.');
        }),
      ],
    },

    /* ---------- 1994~1995 추모 ---------- */
    {
      id: 'zmemorial', year: '1994 ~ 1995', place: '서울 · 한강 변 추모 공간', hud: '1995', goal: 'p_memorial',
      hint: () => (!has('flower') && !photoTaken('p_memorial')) ? '왼쪽 아래 꽃집에서 흰 국화를 받아 오자.'
        : !photoTaken('p_memorial') ? '추모 제단에 국화를 놓자.' : '오른쪽으로 가자.',
      rows: [
        '~~~~~~~~~~~~~~~~~~~~~~~~',
        'LLLLLLLLL~~~~~LLLLLLLLLL',
        'IIIIIIIIIIIIIIIIIIIIIIII',
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
        obj('altar', 11, 4, 'altar', undefined, async () => {
          if (photoTaken('p_memorial')) { await narr('흰 국화가 제단 앞에 가득하다.'); return; }
          if (!has('flower')) { await narr('희생자들을 기리는 추모 제단이다. 꽃을 바칠 수 있을 것 같다.'); return; }
          take('flower');
          setF('c5_flower');
          await narr('흰 국화 한 송이를 제단 앞에 놓고, 잠시 고개를 숙였다.');
          await snap('p_memorial');
          await C('잊지 말아야 할 이름들이야. 이 일들 이후 건물과 다리의 안전 기준이 훨씬 엄격해졌어.');
        }),
        obj('flowersA', 10, 5, 'flowers', { n: 5 }),
        obj('flowersB', 13, 5, 'flowers', { n: 4 }),
        obj('flowersC', 12, 5, 'flowers', { n: 8 }, null, { show: () => F('c5_flower') }),
        npc('m1', 9, 6, { hair: HAIR.black, top: '#2a2a30', pants: '#2a2a30', skirt: true, acc: ['longhair'] }, 'up', '조문객', async () => {
          await say('조문객', '1994년 10월 21일 아침, 성수대교 상판이 무너져 출근길·등굣길의 32명이 목숨을 잃었어요.');
          await say('조문객', '버스에 탄 학생들도 많았어요…');
        }),
        npc('m2', 14, 6, { hair: HAIR.gray, top: '#2a2a30', pants: '#2a2a30' }, 'up', '조문객', async () => {
          await say('조문객', '이듬해 6월 29일엔 삼풍백화점이 무너졌지. 502명이 희생됐다오. 건물에 금이 가는데도 영업을 계속했다는구려.');
        }),
        obj('florist', 3, 10, 'stall', { color: '#f4f0e4', goods: ['#f8f8f0', '#f8f8f0', '#e8d870'] }),
        npc('flowerLady', 5, 10, LOOK.vendor, 'left', '꽃집 주인', async () => {
          if (!has('flower') && !photoTaken('p_memorial')) {
            await say('꽃집 주인', '헌화하려고? …돈은 됐다. 그냥 가져가렴.');
            give('flower');
          } else {
            await say('꽃집 주인', '요즘은 흰 국화만 팔려요. 마음이 아파서…');
          }
        }),
        npc('fireman', 19, 5, LOOK.fire, 'left', '소방관', async () => {
          await say('소방관', '삼풍백화점이 무너졌을 때 우리는 17일 동안 잔해를 뒤졌습니다.');
          await say('소방관', '열흘이 넘어 기적처럼 구조된 사람들도 있었지만… 끝내 구하지 못한 분들이 훨씬 많았어요.');
        }),
        npc('cit', 7, 8, LOOK.studentB, 'up', '대학생', async () => {
          await say('대학생', '빨리빨리, 더 높이, 더 크게… 그러다 보니 안전은 뒷전이었던 거예요.');
        }),
        npc('hd', 21, 9, LOOK.hd90, 'left', HD, async () => {
          await say(HD, '30년을 앞만 보고 달려왔지. 그 사이 \'안전\'은 어디에 있었나…');
          await say(HD, '사진기자로 산 세월 중에 가장 셔터를 누르기 힘든 현장이었네.');
        }),
      ],
    },

    /* ---------- 1995 역사 바로 세우기 ---------- */
    {
      id: 'zrectify', year: '1995년 8월 15일', place: '서울 · 경복궁 앞', hud: '1995', goal: 'p_rectify',
      hint: () => !photoTaken('p_rectify') ? '경축식 진행 요원에게 말을 걸어 보자.' : '오른쪽으로 가자. 1997년 겨울이야.',
      rows: [
        'HHHHHHHHHpppppppHHHHHHHHHH',
        'hhhhhhhhhppppppphhhhhhhhhh',
        'lllllllllppppppplllllllll' + 'l',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppp',
        '::::::::::::::::::::::::::',
        '==========================',
        '==========================',
      ],
      ents: [
        obj('dome', 10, 1, 'dome', undefined, async () => {
          await narr('조선총독부 건물. 1926년 일제가 경복궁 근정전 앞을 가로막고 세웠다. 광복 뒤에는 \'중앙청\'으로, 이후 국립중앙박물관으로 쓰였다.');
        }, { show: () => !F('c5_spire') }),
        obj('domeCut', 10, 1, 'dome', { noSpire: true }, async () => {
          await narr('첨탑이 사라진 조선총독부 건물. 이듬해까지 모두 철거되고, 그 자리에 경복궁의 옛 모습이 되살아나기 시작했다.');
        }, { show: () => F('c5_spire') }),
        obj('crane', 13, 3, 'crane', undefined, null, { show: () => !F('c5_spire') }),
        obj('craneHold', 13, 3, 'crane', { hold: true }, null, { show: () => F('c5_spire') }),
        obj('tgL', 7, 3, 'taegukgi'), obj('tgR', 18, 3, 'taegukgi'),
        npc('official', 8, 5, LOOK.staff, 'right', '진행 요원', async () => {
          if (photoTaken('p_rectify')) { await say('진행 요원', '광복 50주년, 뜻깊은 날입니다.'); return; }
          await say('진행 요원', '곧 광복 50주년 경축식이 시작됩니다. 오늘 조선총독부 건물의 첨탑을 떼어 냅니다!');
          await narr('1995년 8월 15일. 광복 50주년 경축식.');
          await narr('일제가 경복궁을 가리려 세운 조선총독부 건물 꼭대기의 첨탑이 크레인에 들려 천천히 내려왔다.');
          setF('c5_spire');
          sfx('cheer');
          ['gm', 'cr1', 'cr2', 'cr3'].forEach(id => emote(id, '!', 1600));
          await wait(500);
          await snap('p_rectify');
          await narr('그해 겨울, 12·12 군사 반란과 5·18 진압의 책임을 묻는 [5·18 특별법]이 만들어졌다. 전두환·노태우 두 전직 대통령은 반란·내란과 비자금 혐의로 구속되었다.');
          await C('1997년 대법원은 전두환에게 무기 징역, 노태우에게 징역 17년을 확정했어. 그해 말 특별 사면으로 풀려났지만, \'성공한 쿠데타도 처벌받는다\'는 원칙을 세운 거야.');
        }),
        npc('gm', 5, 7, LOOK.oldwoman, 'up', '할머니', async () => {
          await say('할머니', '일제 강점기엔 저 건물 앞을 지날 때마다 가슴이 답답했지… 오늘을 보려고 오래 살았구먼.');
        }),
        npc('cr1', 11, 6, LOOK.man, 'up', '시민', async () => { await say('시민', '70년 만에 경복궁이 제 모습을 찾는구먼!'); }),
        npc('cr2', 13, 6, LOOK.kid, 'up', '아이', async () => { await say('아이', '저 뾰족한 거 떼면 어디로 가요?'); }),
        npc('cr3', 15, 7, LOOK.womanB, 'up', '시민', async () => { await say('시민', '드디어 근정전이 보이겠네요.'); }),
        npc('stu', 19, 8, LOOK.studentB, 'left', '대학생', async () => {
          await say('대학생', '부끄러운 역사도 역사니까 남겨서 교육 자료로 쓰자는 의견도 있었어요.');
          await say('대학생', '결국 철거하기로 했고, 첨탑은 천안 독립기념관으로 옮겨서 전시한대요.');
        }),
        npc('hd', 21, 5, LOOK.hd90, 'left', HD, async () => {
          await say(HD, '\'역사 바로 세우기\'라… 바로 세우려면 먼저 똑바로 봐야 하는 법이지.');
          await say(HD, '그래서 기록이 중요한 거라네. 자네 사진첩처럼.');
        }),
        obj('locPoster', 3, 10, 'posters', undefined, async () => {
          await narr('「6·27 전국 동시 지방 선거」 시장·도지사·구청장·군수·지방 의원을 한 번에!');
          if (!photoTaken('p_local95')) {
            await C('지방 자치가 활짝 열렸어! 보너스 사진으로 남겨 두자.');
            await snap('p_local95', { noFog: true });
          }
        }),
        npc('locMan', 4, 10, LOOK.hatman, 'left', '주민', async () => {
          await say('주민', '6월 27일엔 우리 동네 구청장까지 직접 뽑았다오! 30여 년 만이래.');
        }),
      ],
    },

    /* ---------- 1997 IMF ---------- */
    {
      id: 'zimf', year: '1997년 12월', place: '서울 · 눈 내리는 거리', hud: '1997', weather: 'snow', goal: 'p_gold',
      hint: () => !F('c5_girl') ? '아래쪽 길가의 여자아이에게 말을 걸어 보자.'
        : (!has('ring') && !photoTaken('p_gold')) ? '공원 쪽에서 돌 반지를 찾아보자.'
          : has('ring') ? '반지를 여자아이에게 돌려주자.' : '오른쪽 끝의 시간의 문으로 가자!',
      rows: [
        'RRRRRRGGGGGGRRRRRRGGGGGGTT',
        'RRRRRRGGGGGGRRRRRRGGGGGGTT',
        'BWBWBWCwwCwwUUUUUUCwCwwCTT',
        'BWDWBWCwDwwCUUEEUUCDwwCCTT',
        '::::::::::::::::::::::::TT',
        '::::::::::::::::::::::::..',
        '========================..',
        '------------------------..',
        '========================..',
        '========================..',
        '::::::::::::::::::::::::..',
        'TT..t...,,..t...,,......TT',
        '......,,........,,.......T',
        'TTTTTTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('goldStall', 13, 4, 'stall', { color: '#d8342a', goods: ['#f8d040', '#f8d040', '#e8b830'] }),
        obj('goldbox', 15, 4, 'goldbox'),
        npc('goldStaff', 16, 4, LOOK.staff, 'left', '진행 요원', async () => {
          await say('진행 요원', '나라 빚을 갚는 데 보태려고 금을 모으고 있어요. 결혼반지, 돌 반지, 금메달을 들고 오신 분도 있어요!');
        }),
        npc('d1', 12, 5, LOOK.oldman, 'right', '할아버지', async () => {
          await say('할아버지', '60년 전 장가갈 때 맞춘 반지요. 나라가 어렵다니 내놓아야지.');
        }),
        npc('d2', 11, 5, LOOK.mother, 'right', '아주머니', async () => {
          await say('아주머니', '남편이 명예퇴직을 했어요. 그래도 아이들 돌 반지는… 나라부터 살려야죠.');
        }),
        npc('d3', 10, 5, LOOK.suit, 'right', '회사원', async () => {
          await say('회사원', '1907년 국채 보상 운동 때도 이랬다면서요? 우리 핏속에 뭔가 있나 봐요.');
        }),
        obj('papers', 3, 5, 'papers', undefined, async () => {
          await narr('신문 1면: 「IMF 구제 금융 신청」 (1997년 11월 22일자)');
          await narr('「한보·기아에 이어 대기업 줄도산」 「환율 폭등, 달러당 2천 원 육박」');
        }),
        npc('newsman', 2, 5, LOOK.vendorM, 'right', '가판대 주인', async () => {
          await say('가판대 주인', '기업들이 빚으로 몸집을 불리고, 외국에서 빌린 돈은 쌓여 가고… 외국 돈이 한꺼번에 빠져나가자 나라 곳간의 달러가 바닥나 버렸지.');
          await say('가판대 주인', '11월 21일, 정부가 결국 IMF(국제 통화 기금)에 구제 금융을 요청했어.');
        }),
        npc('girl', 6, 10, LOOK.girl, 'up', '여자아이', async (e) => {
          if (photoTaken('p_gold')) { await say('여자아이', '내 반지가 나라를 구하는 데 쓰인대요!'); return; }
          if (has('ring')) {
            take('ring');
            await say('여자아이', '내 돌 반지! 찾아 줘서 고마워요!');
            await walkTo(e, 15, 5, { force: true }); face(e, 'up');
            await say('여자아이', '이거… 나라 빚 갚는 데 써 주세요.');
            await say('진행 요원', '고맙구나, 꼬마 아가씨. 이 작은 반지가 큰 힘이 될 거야.');
            ['d1', 'd2', 'd3', 'goldStaff'].forEach(id => emote(id, '♥', 1600));
            emote(e, '♪', 1600);
            await snap('p_gold');
            await narr('1998년 초까지 이어진 금 모으기 운동에는 350만여 명이 참여해 약 227톤의 금을 모았다.');
            await narr('1997년 12월 18일 대선에서는 야당의 김대중 후보가 당선되었다. 헌정 사상 처음으로 선거를 통해 여당에서 야당으로 정권이 바뀐 것이다.');
            await narr('1998년 2월 25일, 김영삼 대통령은 임기를 마쳤다.');
            await C('사진첩이 거의 다 찼어! 오른쪽 끝 시간의 문으로 가면… 집으로 돌아갈 수 있어.');
            return;
          }
          if (!F('c5_girl')) {
            setF('c5_girl');
            await say('여자아이', '엄마가 아빠 회사가 어려워서 나라도 어렵대요. 그래서 제 돌 반지를 내려고 했는데…');
            await say('여자아이', '공원에서 놀다가 떨어뜨렸나 봐요. 오른쪽 공원 쪽이었어요. 찾아 주세요!');
          } else {
            await say('여자아이', '오른쪽 공원 쪽에서 놀았어요!');
          }
        }, { at: () => photoTaken('p_gold') ? [15, 5, 'up'] : null }),
        pickup('ring', 21, 12, 'ring', 'ring', { if: () => F('c5_girl') && !photoTaken('p_gold') }),
        obj('bench', 15, 12, 'bench'),
        npc('jobless', 16, 12, LOOK.suit, 'left', '실직자', async () => {
          await say('실직자', '20년 다닌 회사가 부도났어요. 아침마다 양복을 입고 집을 나서요… 가족한테 차마 말을 못 해서.');
          await say('실직자', '공원에 저 같은 사람이 꽤 많아요. 다들 넥타이를 매고 앉아 있죠.');
        }),
        obj('oecdSign', 19, 11, 'bigsign', { color: '#2a5aa8' }, async () => {
          await narr('광고판: 「축 OECD 가입 ― 선진국으로 가는 길」 (1996)');
          if (!photoTaken('p_oecd')) {
            await C('불과 1년 전의 광고판이야. 보너스 사진으로 남겨 두자.');
            await snap('p_oecd', { noFog: true });
          }
        }),
        npc('oecdMan', 18, 12, LOOK.suitG, 'right', '경제학자', async () => {
          await say('경제학자', '작년 12월 우리나라가 [OECD]에 29번째로 가입했잖아요. \'선진국 클럽\'에 들어갔다고 다들 들떴는데…');
          await say('경제학자', '준비 없이 금융 시장 문을 너무 빨리 연 것도 위기의 원인 중 하나라는 분석이 있어요.');
        }),
        npc('hd', 8, 5, LOOK.hd90, 'down', HD, async () => {
          await say(HD, '12월 18일 대선에서 야당 김대중 후보가 당선됐다네. 선거로 여당에서 야당으로 정권이 바뀐 건 처음이야.');
          await say(HD, '나라 곳간은 비었는데, 사람들은 금반지를 들고 줄을 서는구먼. 이 나라 사람들은 참…');
          await say(HD, '자네, 혹시 다음에 또 만나면… 아니, 아닐세. 왠지 자네가 어디서 왔는지 알 것 같아.');
        }),
        gateDef(25, 7),
      ],
    },
  ],
});
