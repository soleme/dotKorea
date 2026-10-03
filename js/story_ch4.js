/* =========================================================
 * 제4장 · 노태우 정부 (1988–1993)
 * ========================================================= */
Object.assign(Game.PHOTOS, {
  p_vote: {
    ch: 4, title: '16년 만의 대통령 직선제', year: '1987', hint: '눈 내리는 투표소',
    desc: '1987년 12월 16일, 16년 만에 국민이 직접 대통령을 뽑는 선거가 치러졌다. 야권의 김영삼·김대중 후보가 단일화에 실패한 가운데 민주정의당 노태우 후보가 36.6%를 얻어 당선되었다.',
  },
  p_olympic: {
    ch: 4, title: '서울 올림픽', year: '1988', hint: '올림픽 주경기장 개막식',
    desc: '1988년 9월 17일 서울 올림픽이 개막했다. 냉전으로 반쪽이 되었던 앞선 두 대회와 달리 동서 진영 160개국이 참가해 화합의 무대가 되었다. 개막식의 \'굴렁쇠 소년\'은 고요 속의 평화를 상징하는 장면으로 남았다.',
  },
  p_hearing: {
    ch: 4, title: '5공 청문회', year: '1988', bonus: true, hint: '거리 다방의 TV',
    desc: '1988년 여소야대 국회는 제5공화국의 비리와 광주 민주화 운동의 진상을 따지는 청문회를 열었다. TV로 생중계된 청문회에 국민의 관심이 쏠렸고, 전두환 전 대통령은 대국민 사과 뒤 강원도 백담사로 떠났다.',
  },
  p_merge: {
    ch: 4, title: '3당 합당', year: '1990', hint: '거리의 기자 회견',
    desc: '1988년 총선 결과 여당 의석이 과반에 못 미치는 \'여소야대\'가 되자, 1990년 노태우의 민주정의당, 김영삼의 통일민주당, 김종필의 신민주공화당이 합쳐 거대 여당 민주자유당을 만들었다.',
  },
  p_local: {
    ch: 4, title: '지방 의회 선거', year: '1991', bonus: true, hint: '거리 공원의 선거 벽보',
    desc: '5·16 군사 정변 뒤 중단되었던 지방 자치가 30년 만에 되살아나 1991년 지방 의회 의원 선거가 치러졌다. 1995년에는 단체장까지 뽑는 전면적인 지방 자치가 시작되었다.',
  },
  p_travel: {
    ch: 4, title: '해외여행 전면 자유화', year: '1989', bonus: true, hint: '공항의 가족 여행객',
    desc: '1989년 1월 1일부터 해외여행이 전면 자유화되었다. 그전까지는 나이와 목적에 따라 여권 발급이 엄격히 제한되었다. 올림픽 뒤 높아진 소득과 개방 분위기 속에 해외여행객이 크게 늘었다.',
  },
  p_north: {
    ch: 4, title: '북방 외교', year: '1990–1992', hint: '공항의 외교관',
    desc: '노태우 정부는 냉전이 끝나 가는 흐름 속에서 공산권 국가와 관계를 넓히는 북방 외교를 펼쳤다. 1990년 소련, 1992년 중국과 국교를 맺었다.',
  },
  p_un: {
    ch: 4, title: '남북한 유엔 동시 가입', year: '1991', hint: '유엔 본부의 깃발',
    desc: '1991년 9월 17일 남한과 북한은 유엔에 동시 가입했다. 같은 해 12월 남북은 서로의 체제를 인정하고 침략하지 않으며 교류·협력하기로 한 \'남북 기본 합의서\'를 채택하고 \'한반도 비핵화 공동 선언\'에 합의했다.',
  },
});

const FLAGS_UN = [['#d8342a', '#f8f8f4'], ['#2a4ab8', '#f8f8f4', '#d8342a'], ['#3a9a4a', '#f8f8f4', '#e8783a'], ['#f8f8f4', '#d8342a'], ['#e8c840', '#2a4ab8'], ['#2a2a2a', '#d8342a', '#e8c840'], ['#4aa8e8', '#f8f8f4'], ['#d8342a', '#2a4ab8']];

Game.CHAPTERS.push({
  id: 4,
  title: '제4장 · 노태우 정부',
  short: '제4장 노태우 정부',
  tab: '4장 1988–93',
  card: ['제4장', '노태우 정부 · 1988–1993'],
  filter: 'sepia(.1)',
  bgm: 'ch4',
  height: 14,
  start: { x: 1, y: 8, dir: 'right' },
  summary: '노태우 정부 5년. 올림픽으로 세계에 이름을 알리고, 공산권과도 손을 잡았어. 한편 12·12와 5·18의 책임 문제는 아직 풀리지 않은 숙제로 남았지.',
  quiz: [
    { q: '1988년 동서 진영 160개국이 참가한 국제 대회는?', a: ['한일 월드컵', '서울 아시안게임', '서울 올림픽', '대전 엑스포'], ok: 2, why: '굴렁쇠 소년 기억나지?' },
    { q: '1990년 소련, 1992년 중국과 국교를 맺은 노태우 정부의 외교 정책은?', a: ['북방 외교', '햇볕 정책', '쇄국 정책', '신탁 통치'], ok: 0, why: '공산권 나라들과 관계를 넓힌 북방 외교야.' },
    { q: '1991년 남한과 북한이 함께 한 일은?', a: ['남북 정상 회담', '유엔 동시 가입', '금강산 관광', '월드컵 단일팀'], ok: 1, why: '9월 17일, 남북이 나란히 유엔 회원국이 되었지.' },
  ],
  intro: async () => {
    await narr('1987년 12월 16일, 서울.');
    await C('6월 항쟁 덕분에 헌법이 바뀌었어! 대통령을 국민이 직접 뽑고, 임기는 5년 한 번뿐이야. 지금 우리가 쓰는 헌법이지.');
    await C('오늘은 16년 만에 국민이 직접 대통령을 뽑는 날이야. 투표소에 가 보자!');
  },
  zones: [
    /* ---------- 1987.12 투표소 ---------- */
    {
      id: 'zvote', year: '1987년 12월 16일', place: '서울 · 초등학교 투표소', hud: '1987.12', weather: 'snow', goal: 'p_vote',
      hint: () => {
        const n = ['c4_v1', 'c4_v2', 'c4_v3'].filter(F).length;
        if (n < 3) return `줄 선 유권자들의 이야기를 들어 보자. (${n}/3)`;
        if (!photoTaken('p_vote')) return '한도윤 기자에게 말을 걸어 보자.';
        return '오른쪽으로 가자. 1988년이야!';
      },
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGG',
        'CwwCwwCwwCDDCwwCwwCwwCww',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'dddddddddddddddddddddddd',
        'FFFFFFFFFFFFFFFFFFFFFFFF',
        '......t.....t......t....',
        'TTTTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('poster1', 2, 2, 'posters', undefined, async () => {
          await narr('선거 벽보. 기호 1번 노태우(민주정의당), 2번 김영삼(통일민주당), 3번 김대중(평화민주당), 4번 김종필(신민주공화당)…');
        }),
        obj('poster2', 4, 2, 'posters', undefined, async () => {
          await narr('후보들의 얼굴과 공약이 빼곡히 붙어 있다. "보통 사람의 시대", "군정 종식", "평화적 정권 교체"…');
        }),
        obj('booth1', 8, 3, 'booth'), obj('booth2', 10, 3, 'booth'), obj('booth3', 12, 3, 'booth'),
        obj('ballot', 10, 5, 'ballot', undefined, async () => { await narr('투표함. 한 표 한 표가 차곡차곡 쌓인다.'); }),
        npc('official', 13, 5, LOOK.staff, 'left', '선거 사무원', async () => {
          await say('선거 사무원', '신분증 확인하고, 기표소에서 도장을 찍은 다음 투표함에 넣으시면 됩니다.');
          await say('선거 사무원', '학생은 아직 투표권이 없지? 허허. 스무 살이 되면 꼭 하세요!');
        }),
        npc('v1', 15, 6, LOOK.oldman, 'left', '할아버지', async () => {
          setF('c4_v1');
          await say('할아버지', '1971년 이후 16년 만에 내 손으로 대통령을 뽑는구먼! 새벽부터 줄을 섰다오.');
          await say('할아버지', '이 한 표를 얻으려고 학생들이 얼마나 피를 흘렸는지… 허투루 찍을 수가 없지.');
        }),
        npc('vx1', 16, 6, LOOK.man, 'left', '유권자', async () => { await say('유권자', '추운데도 줄이 길구먼.'); }),
        npc('v2', 17, 6, LOOK.student, 'left', '대학생', async () => {
          setF('c4_v2');
          await say('대학생', '김영삼, 김대중 두 분이 후보를 하나로 합쳤으면 좋았을 텐데… 결국 둘 다 나왔어.');
          await say('대학생', '야당 표가 갈리면 여당 후보가 이길지도 몰라. 그래도 이번 선거는 우리가 싸워서 얻은 거야.');
        }),
        npc('vx2', 18, 6, LOOK.womanB, 'left', '유권자', async () => { await say('유권자', '첫 투표라 떨려요!'); }),
        npc('v3', 19, 6, LOOK.mother, 'left', '주부', async () => {
          setF('c4_v3');
          await say('주부', '저는 무엇보다 나라가 시끄럽지 않고 안정됐으면 좋겠어요. 내년엔 올림픽도 있잖아요.');
          await say('주부', '바뀌어야 한다는 사람, 안정이 먼저라는 사람… 이렇게 생각이 다른 게 바로 민주주의 아니겠어요?');
        }),
        npc('hd', 6, 8, LOOK.hd80, 'right', HD, async () => {
          const n = ['c4_v1', 'c4_v2', 'c4_v3'].filter(F).length;
          if (photoTaken('p_vote')) { await say(HD, '결과야 어떻든, 국민이 직접 뽑았다는 게 중요하지.'); return; }
          if (n < 3) {
            await say(HD, '줄 선 사람들 이야기를 들어 보게. 다들 생각이 다르다네. 그게 선거지.');
            return;
          }
          await say(HD, '1961년 그 새벽 이후… 이 줄을 보려고 26년을 기다렸네.');
          await say(HD, '이 줄을 찍어 두게. 국민이 직접 대통령을 뽑는 날이야.');
          await snap('p_vote');
          await narr('개표 결과 노태우 36.6%, 김영삼 28.0%, 김대중 27.0%, 김종필 8.1%.');
          await narr('야권 표가 갈린 사이 민주정의당 노태우 후보가 당선되었다.');
          await C('6·29 선언을 발표한 노태우가 국민의 직접 선거로 대통령이 된 거야. 1988년 2월, 제6공화국이 시작돼.');
        }),
      ],
    },

    /* ---------- 1988 서울 올림픽 ---------- */
    {
      id: 'zolympic', year: '1988년 9월 17일', place: '서울 올림픽 주경기장', hud: '1988', goal: 'p_olympic',
      hint: () => !F('c4_boy') ? '흰옷을 입은 소년에게 말을 걸어 보자.'
        : (!has('hoop') && !photoTaken('p_olympic')) ? '트랙 오른쪽 아래로 굴러간 굴렁쇠를 찾아보자.'
          : has('hoop') ? '굴렁쇠를 소년에게 돌려주자!' : '오른쪽으로 가자.',
      rows: [
        'SSSSSSSSSSSSSSSSSSSSSSSSSSSS',
        'SSSSSSSSSSSSSSSSSSSSSSSSSSSS',
        'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'a' + 'g'.repeat(26) + 'a',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
        'SSSSSSSSSSSSSSSSSSSSSSSSSSSS',
      ],
      ents: [
        obj('f1', 3, 3, 'flag', { cols: FLAGS_UN[0] }), obj('f2', 6, 3, 'flag', { cols: FLAGS_UN[1] }),
        obj('f3', 9, 3, 'flag', { cols: FLAGS_UN[2] }), obj('tg1', 11, 3, 'taegukgi'),
        obj('torch', 14, 3, 'torch', undefined, async () => { await narr('성화대에 불꽃이 활활 타오른다.'); }),
        obj('tg2', 17, 3, 'taegukgi'), obj('f4', 19, 3, 'flag', { cols: FLAGS_UN[3] }),
        obj('f5', 22, 3, 'flag', { cols: FLAGS_UN[4] }), obj('f6', 25, 3, 'flag', { cols: FLAGS_UN[5] }),
        npc('boy', 6, 8, { hair: HAIR.black, top: '#f8f8f4', pants: '#f8f8f4', kid: true, shoes: '#f8f8f4' }, 'right', '굴렁쇠 소년', async (e) => {
          if (photoTaken('p_olympic')) { await say('굴렁쇠 소년', '굴렁쇠 굴리는 거 재밌어요!'); return; }
          if (has('hoop')) {
            take('hoop');
            await say('굴렁쇠 소년', '내 굴렁쇠! 고맙습니다! 이제 개막식에 나갈 수 있어요!');
            await narr('1988년 9월 17일, 서울 올림픽 개막식.');
            await narr('왁자지껄하던 경기장이 갑자기 고요해졌다. 넓은 잔디밭에 하얀 옷을 입은 소년이 굴렁쇠를 굴리며 나타났다.');
            const hoop = Game.spawn({ id: 'hoopRun', x: 7, y: 8, prop: 'hoop', solid: false }, 'zolympic');
            const m = walk(e, 'RRRRRRRRRR', { force: true, speed: 1 });
            walk(hoop, 'RRRRRRRRRR', { force: true, speed: 1 });
            await wait(1500);
            await snap('p_olympic');
            await m;
            despawn('hoopRun');
            setF('c4_ran');
            sfx('cheer');
            await C('전쟁의 폐허였던 나라에서 열린 평화의 축제. 12년 만에 동서 진영이 모두 모인 올림픽이었어!');
            return;
          }
          if (!F('c4_boy')) {
            setF('c4_boy');
            await say('굴렁쇠 소년', '제 굴렁쇠가 없어졌어요! 개막식에서 굴려야 하는데…');
            await say('굴렁쇠 소년', '아까 연습하다가 트랙 오른쪽 아래로 굴러갔어요. 찾아 주세요!');
          } else {
            await say('굴렁쇠 소년', '트랙 오른쪽 아래쪽으로 굴러갔어요!');
          }
        }, { at: () => F('c4_ran') ? [16, 8, 'right'] : null }),
        pickup('hoop', 25, 11, 'hoop', 'hoop', { if: () => F('c4_boy') && !photoTaken('p_olympic') }),
        npc('vol', 4, 5, LOOK.staff, 'down', '자원봉사자', async () => {
          await say('자원봉사자', '160개국 선수단이 서울에 왔어요! 저는 통역 자원봉사를 해요. 영어 공부한 보람이 있네요.');
        }),
        npc('athA', 18, 6, LOOK.athleteA, 'left', '선수', async () => {
          await say('선수', '1980년 모스크바 대회엔 서방 국가들이, 1984년 LA 대회엔 동구권이 불참했었죠.');
          await say('선수', '서울에서 12년 만에 동서 진영이 다 모였어요! 소련 선수도, 미국 선수도요.');
        }),
        npc('athB', 19, 9, LOOK.athleteB, 'left', '선수', async () => {
          await say('선수', '한국 사람들 정말 친절해요. 서울이 이렇게 큰 도시인 줄 몰랐어요!');
        }),
        npc('hodori', 22, 6, LOOK.hodori, 'down', '호돌이(인형 탈)', async () => {
          await say('호돌이(인형 탈)', '안녕하세요! 저는 서울 올림픽 마스코트 호돌이예요! 상모를 쓴 호랑이랍니다. 어흥!');
        }),
        npc('hd', 3, 10, LOOK.hd80, 'right', HD, async () => {
          await say(HD, '전쟁의 폐허였던 나라가 올림픽을 열다니. 1961년의 내가 들었으면 믿지 않았을 걸세.');
        }),
      ],
    },

    /* ---------- 1988~1991 거리 ---------- */
    {
      id: 'zmerge', year: '1988 ~ 1991', place: '서울 · 정당 사무실 앞 거리', hud: '1990', goal: 'p_merge',
      hint: () => !photoTaken('p_merge') ? '기자들이 모인 연단을 조사하자.' : '오른쪽으로 가자. 공항이야!',
      rows: [
        'RRRRRRGGGGGGRRRRRRGGGGGG',
        'RRRRRRGGGGGGRRRRRRGGGGGG',
        'BWBWBWCwwCwwBWBWBWCwCwwC',
        'BWDWBWCwDwwCBVVVVBCDwwCC',
        '::::::::::::::::::::::::',
        '::::::::::::::::::::::::',
        '========================',
        '------------------------',
        '========================',
        '========================',
        '::::::::::::::::::::::::',
        'TT..t...,,..t...,,..t.TT',
        '......,,........,,......',
        'TTTTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('tvH', 3, 4, 'tv', undefined, async () => {
          await narr('(TV) "…국회 5공 비리 특별 위원회 청문회 생중계입니다. 증인은 질문에 성실히 답해 주십시오…"');
          if (!photoTaken('p_hearing')) {
            await C('온 국민이 TV 앞에 모였던 청문회야. 보너스 사진으로 남겨 두자.');
            await snap('p_hearing', { noFog: true });
          }
        }),
        npc('tvOwner', 2, 4, LOOK.vendor, 'right', '다방 주인', async () => {
          await say('다방 주인', '1988년 겨울엔 다들 청문회 보느라 장사가 안 됐다니까. 5공 비리와 광주 문제를 국회에서 따졌거든.');
          await say('다방 주인', '전두환 전 대통령은 국민에게 사과하고 백담사라는 절로 들어갔지.');
        }),
        obj('flagR', 11, 4, 'flag', { cols: ['#d8342a'] }),
        obj('flagB', 12, 4, 'flag', { cols: ['#2a4ab8'] }),
        obj('flagG', 16, 4, 'flag', { cols: ['#3a9a4a'] }),
        npc('spokes', 14, 4, LOOK.suitG, 'down', '대변인', async () => {
          await say('대변인', '곧 중대 발표가 있습니다. 연단 앞으로 모여 주십시오.');
        }),
        obj('podium', 14, 5, 'podium', undefined, async () => {
          if (photoTaken('p_merge')) { await narr('연단 위에 \'민주자유당\'이라고 적힌 새 현수막이 걸려 있다.'); return; }
          await say('대변인', '발표하겠습니다. 민주정의당, 통일민주당, 신민주공화당 세 당은 하나로 합쳐 [민주자유당]을 창당하기로 했습니다.');
          await narr('1990년 1월 22일. 노태우의 민주정의당, 김영삼의 통일민주당, 김종필의 신민주공화당이 합쳐 거대 여당이 탄생했다.');
          ['rep1', 'rep2', 'hd'].forEach(id => emote(id, '!', 1500));
          await snap('p_merge');
          await C('1988년 총선에서 여당이 과반을 얻지 못하자, 야당 둘과 손을 잡은 거야. 이렇게 김영삼은 여당의 대통령 후보가 되는 길을 열었지.');
        }),
        npc('rep1', 12, 6, LOOK.man, 'up', '기자', async () => { await say('기자', '여소야대가 하루아침에 거대 여당으로…!'); }),
        npc('rep2', 16, 6, LOOK.womanB, 'up', '기자', async () => { await say('기자', '야당 총재가 여당과 합친다고요? 특종이다!'); }),
        npc('hd', 10, 6, LOOK.hd80, 'up', HD, async () => {
          await say(HD, '1988년 총선에서 여당이 과반을 못 얻었거든. 여소야대 국회에 밀리자 야당 둘을 끌어들인 거지.');
          await say(HD, '김영삼 총재는 "호랑이를 잡으려면 호랑이 굴에 들어가야 한다"고 했다더군.');
        }),
        npc('angry', 6, 10, LOOK.protester, 'up', '대학생', async () => {
          await say('대학생', '국민이 만들어 준 여소야대를 정치인들 마음대로 뒤집다니! 이건 야합이야!');
        }),
        npc('calm', 9, 5, LOOK.suit, 'down', '회사원', async () => {
          await say('회사원', '정치가 시끄러운 것보다야 안정되는 게 낫지 않나? 경제가 먼저야.');
        }),
        obj('locPoster', 19, 11, 'posters', undefined, async () => {
          await narr('「지방 의회 의원 선거 ― 1991년」 우리 동네 일꾼을 우리 손으로!');
          if (!photoTaken('p_local')) {
            await C('30년 만에 되살아난 지방 선거야. 보너스 사진으로 찍어 두자!');
            await snap('p_local', { noFog: true });
          }
        }),
        npc('locVoter', 18, 11, LOOK.mother, 'right', '주민', async () => {
          await say('주민', '5·16 이후 30년 만에 지방 의회 선거를 한대요. 이제 동네 일도 우리가 뽑은 사람이 맡는 거죠.');
        }),
      ],
    },

    /* ---------- 김포공항 ---------- */
    {
      id: 'zairport', year: '1989 ~ 1992', place: '김포 국제공항', hud: '1990', goal: 'p_north',
      hint: () => !F('c4_dip') ? '공항 가운데의 외교관에게 말을 걸어 보자.'
        : (!has('treaty') && !photoTaken('p_north')) ? '오른쪽 체크인 카운터 직원에게 문서를 받아 오자.'
          : has('treaty') ? '문서를 외교관에게 전해 주자!' : '오른쪽으로 가자. 뉴욕이야!',
      rows: [
        'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'UUUUUUUUUUUUUUUUUUUUUUUUUU',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuKKKKuuuuuuuuuuuKKKKuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuuuu',
        'XXXXXXXXXXXXXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXXXXXXXXXXXXX',
      ],
      ents: [
        obj('plane', 11, 1, 'plane'),
        npc('staffL', 4, 2, LOOK.teller, 'down', '항공사 직원', async () => {
          await say('항공사 직원', '1989년 1월 1일부터 [해외여행 전면 자유화]가 시행됐어요. 이젠 누구나 여권을 만들어 여행할 수 있답니다!');
        }),
        npc('staffR', 19, 2, LOOK.teller, 'down', '항공사 직원', async () => {
          if (F('c4_dip') && !has('treaty') && !photoTaken('p_north')) {
            await say('항공사 직원', '이 서류 가방 말씀이시죠? 외교관님이 두고 가셨어요. 전해 주세요!');
            give('treaty');
          } else {
            await say('항공사 직원', '모스크바행, 베이징행 노선도 곧 생긴대요. 상상도 못 했던 일이죠!');
          }
        }),
        npc('dip', 13, 6, LOOK.suitG, 'down', '외교관', async () => {
          if (photoTaken('p_north')) { await say('외교관', '이제 냉전의 벽을 넘어설 때입니다.'); return; }
          if (has('treaty')) {
            take('treaty');
            await say('외교관', '오, 이 문서요! 정말 고맙소. 자, 출국 전 기자 회견을 시작하겠소.');
            await narr('1990년 9월 30일 대한민국은 소련과, 1992년 8월 24일에는 중국과 국교를 맺었다.');
            await say('외교관', '6·25 전쟁 때 총을 겨누었던 나라들과 이제 손을 잡는 것이오.');
            await snap('p_north');
            await C('냉전이 끝나 가던 시절, 공산권 나라들과 관계를 넓힌 [북방 외교]야. 덕분에 중국과 러시아에 사는 우리 동포들과도 오갈 수 있게 됐지.');
            return;
          }
          if (!F('c4_dip')) {
            setF('c4_dip');
            await say('외교관', '나는 외교부에서 일하오. 곧 공산권 나라들과 국교를 맺는 서명식에 가야 하오. 실제 서명식은 뉴욕과 베이징에서 열리지.');
            await say('외교관', '그런데 큰일이오! 서명식 문서를 오른쪽 체크인 카운터에 두고 왔소. 좀 받아다 주겠소?');
          } else {
            await say('외교관', '문서는 오른쪽 카운터 직원이 맡고 있을 거요.');
          }
        }),
        obj('signtable', 12, 8, 'signtable', { flags: [['#f8f8f4'], ['#d8342a']] }),
        npc('trav', 7, 9, LOOK.hatman, 'right', '여행객 아빠', async () => {
          await say('여행객 아빠', '우리 가족 첫 해외여행이에요! 예전엔 나이 제한도 있고 여권 받기가 하늘의 별 따기였죠.');
          if (!photoTaken('p_travel')) {
            await C('설레는 첫 해외여행! 보너스 사진으로 남겨 두자.');
            await snap('p_travel', { noFog: true });
          }
        }),
        npc('travKid', 8, 9, LOOK.kidB, 'up', '아이', async () => { await say('아이', '비행기 처음 타 봐요! 구름 위로 날아간대요!'); }),
        npc('travMom', 6, 9, LOOK.woman, 'right', '여행객 엄마', async () => { await say('여행객 엄마', '여권 사진 찍느라 미용실까지 다녀왔어요. 호호.'); }),
        npc('koryo', 21, 7, { hair: HAIR.white, top: '#5a5a62', pants: '#3a3a42', acc: ['cap'], accColor: '#6a6a72', skin: '#e0b08a' }, 'left', '고려인 할아버지', async () => {
          await say('고려인 할아버지', '할아버지의 고향 땅을 처음 밟아 봅니다. 1937년 스탈린 때 연해주에서 중앙아시아로 강제로 옮겨졌지요.');
          await say('고려인 할아버지', '우리말은 서툴러도 김치 맛은 잊지 않았다오.');
        }),
        npc('joseon', 22, 10, LOOK.mother, 'left', '중국 동포', async () => {
          await say('중국 동포', '중국 연변에서 왔어요. 국교가 맺어지고 나서 친척을 만나러 오기가 훨씬 쉬워졌어요.');
        }),
      ],
    },

    /* ---------- 1991 유엔 ---------- */
    {
      id: 'zun', year: '1991년 9월 17일', place: '미국 뉴욕 · 유엔 본부', hud: '1991', goal: 'p_un',
      hint: () => !photoTaken('p_un') ? '유엔 직원에게 말을 걸어 보자.' : '오른쪽 끝의 시간의 문으로 가자!',
      rows: [
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        '########################',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'vvvvvvvvvvvvvvvvvvvvvvvv',
        'vvvvvvvvvvvvvvvvvvvvvvvv',
        'vvvvvvvvvvvvvvvvvvvvvvvv',
        'vvvvvvvvvvvvvvvvvvvvvvvv',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'uuuuuuuuuuuuuuuuuuuuuuuu',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
      ],
      ents: [
        ...[2, 4, 6, 8, 16, 18, 20].map((x, i) => obj('unf' + i, x, 2, 'flag', { cols: FLAGS_UN[(i + 3) % FLAGS_UN.length] })),
        obj('poleN', 11, 2, 'flag', { cols: [] }, null, { show: () => !F('c4_flags') }),
        obj('poleS', 13, 2, 'flag', { cols: [] }, null, { show: () => !F('c4_flags') }),
        obj('flagN', 11, 2, 'flag', { cols: ['#2a4ab8', '#d8342a', '#2a4ab8'] }, null, { show: () => F('c4_flags') }),
        obj('flagS', 13, 2, 'taegukgi', undefined, null, { show: () => F('c4_flags') }),
        npc('unstaff', 12, 4, { hair: HAIR.brown, top: '#5a9ad8', pants: '#2a3a5a', skin: '#f8d8c0', acc: ['tie'] }, 'down', '유엔 직원', async () => {
          if (photoTaken('p_un')) { await say('유엔 직원', 'Welcome to the United Nations! 축하합니다.'); return; }
          await say('유엔 직원', '오늘 총회에서 남한과 북한의 유엔 가입이 함께 승인되었습니다. 이제 두 깃발을 게양할 차례예요.');
          await say('유엔 직원', '유엔에서는 회원국 깃발을 영어 나라 이름의 알파벳 순서로 겁니다.');
          for (;;) {
            const r = await ask('유엔 직원', '북한(Democratic People\'s Republic of Korea)과 대한민국(Republic of Korea). 어느 깃발이 먼저일까요?', ['북한 (D로 시작)', '대한민국 (R로 시작)']);
            if (r === 0) { sfx('correct'); break; }
            sfx('wrong');
            await say('유엔 직원', '음, 알파벳 순서를 다시 생각해 보세요. D와 R 중 어느 쪽이 먼저죠?');
          }
          await say('유엔 직원', '정답! 자, 게양합니다!');
          setF('c4_flags');
          sfx('cheer');
          ['dipS', 'dipX', 'hd'].forEach(id => emote(id, '♪', 1500));
          await wait(400);
          await snap('p_un');
          await narr('1991년 9월 17일, 남과 북은 나란히 유엔 회원국이 되었다.');
          await narr('같은 해 12월, 남북은 서로의 체제를 인정하고 침략하지 않기로 한 [남북 기본 합의서]를 채택하고, [한반도 비핵화 공동 선언]에도 합의했다.');
          await C('전쟁으로 갈라진 남과 북이 한자리에 선 날이야. 통일은 아직 먼 길이지만 말이야.');
        }),
        npc('dipS', 8, 5, LOOK.suit, 'down', '한국 외교관', async () => {
          await say('한국 외교관', '건국 이후 40년 넘게 유엔 가입을 꿈꿔 왔습니다. 드디어 오늘입니다!');
        }),
        npc('dipX', 17, 5, LOOK.athleteB, 'down', '외국 외교관', async () => {
          await say('외국 외교관', 'Congratulations! 두 코리아가 대화를 이어 가길 바랍니다.');
        }),
        npc('hd', 4, 8, LOOK.hd90, 'right', HD, async () => {
          await say(HD, '남과 북이 같은 날 유엔에 들어가다니. 1950년 전쟁 때는 상상도 못 했지.');
          await say(HD, '자네는… 여전히 그대로군. 나는 이렇게 머리가 셌는데. 허허.');
        }),
        gateDef(23, 7),
      ],
    },
  ],
});
