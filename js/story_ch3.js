/* =========================================================
 * 제3장 · 전두환 정부 (1980–1988)
 * ========================================================= */
Object.assign(Game.PHOTOS, {
  p_press: {
    ch: 3, title: '언론 통제와 보도지침', year: '1980년대', hint: '신문사 편집국의 서류',
    desc: '전두환 정부는 1980년 언론사를 강제로 통폐합하고 1천 명 가까운 언론인을 해직시켰다. 정부는 \'보도지침\'을 내려 기사의 내용과 크기까지 통제했고, 1986년 한 기자의 폭로로 그 실체가 드러났다.',
  },
  p_baseball: {
    ch: 3, title: '프로야구 출범과 통금 해제', year: '1982', hint: '야구장 개막전',
    desc: '1982년 프로야구가 출범하고, 37년간 이어진 야간 통행금지가 해제되었다. 컬러 TV 방송, 교복 자율화 등 생활에도 변화가 찾아왔다. 한편 이런 정책이 국민의 관심을 정치에서 돌리려는 의도였다는 비판도 있다.',
  },
  p_family: {
    ch: 3, title: '이산가족을 찾습니다', year: '1983', hint: '여의도 방송국 앞 벽보',
    desc: '1983년 KBS는 \'이산가족을 찾습니다\' 특별 생방송을 진행했다. 138일 동안 이어진 방송으로 1만여 명의 이산가족이 다시 만났으며, 그 기록물은 2015년 유네스코 세계기록유산에 등재되었다.',
  },
  p_asiad: {
    ch: 3, title: '서울 아시안게임과 3저 호황', year: '1986', bonus: true, hint: '대학가의 기념품 노점',
    desc: '저유가·저금리·저달러의 \'3저 호황\'으로 1986~1988년 한국 경제는 높은 성장과 무역 흑자를 기록했다. 1986년에는 서울 아시안게임이 열렸다.',
  },
  p_park: {
    ch: 3, title: '박종철과 이한열', year: '1987', hint: '대학가 담벼락의 대자보',
    desc: '1987년 1월 서울대생 박종철이 경찰의 물고문으로 숨졌다. 정부의 축소·은폐가 드러나고 직선제 개헌 요구를 거부한 4·13 호헌 조치까지 겹치며 분노가 커졌다. 6월 9일에는 연세대생 이한열이 시위 중 최루탄에 맞아 쓰러졌다.',
  },
  p_june: {
    ch: 3, title: '6월 민주 항쟁', year: '1987', hint: '시청 앞 광장의 시민들',
    desc: '1987년 6월, "호헌 철폐, 독재 타도"를 외치며 학생과 넥타이 부대 회사원, 상인, 주부, 택시 기사까지 전국 곳곳에서 거리로 나섰다. 수백만 명이 참여한 6월 민주 항쟁이다.',
  },
  p_629: {
    ch: 3, title: '6·29 민주화 선언', year: '1987', hint: '시청 앞 가게의 TV',
    desc: '1987년 6월 29일 민주정의당 대표 노태우는 대통령 직선제 개헌과 김대중 사면·복권 등을 약속하는 6·29 민주화 선언을 발표했다. 이후 여야 합의로 5년 단임 대통령 직선제 헌법이 만들어졌다. 지금 우리가 쓰는 헌법이다.',
  },
});

const DESK_ROW = 'ookkookkookkookkooookkoo';

Game.CHAPTERS.push({
  id: 3,
  title: '제3장 · 전두환 정부',
  short: '제3장 전두환 정부',
  tab: '3장 1980–88',
  card: ['제3장', '전두환 정부 · 1980–1988'],
  filter: 'sepia(.2) saturate(.95)',
  bgm: 'ch3',
  height: 14,
  start: { x: 1, y: 7, dir: 'right' },
  summary: '전두환 정부 7년. 경제는 호황을 누렸지만 언론과 정치는 꽁꽁 묶였어. 결국 평범한 시민들이 함께 외쳐서 대통령을 직접 뽑을 권리를 되찾았지!',
  quiz: [
    { q: '1982년, 37년 만에 해제된 제도는?', a: ['교복 착용', '야간 통행금지', '언론 통폐합', '통일주체국민회의'], ok: 1, why: '1945년부터 이어진 야간 통행금지가 풀렸어.' },
    { q: '1983년 138일 동안 이어지며 1만여 명의 상봉을 이끈 KBS 생방송은?', a: ['전국노래자랑', '이산가족을 찾습니다', '9시 뉴스', '동물의 왕국'], ok: 1, why: '그 기록물은 유네스코 세계기록유산이 되었지.' },
    { q: '1987년 6월 민주 항쟁의 결과로 발표된, 대통령 직선제를 약속한 선언은?', a: ['7·4 남북 공동 성명', '4·13 호헌 조치', '6·29 민주화 선언', '10월 유신'], ok: 2, why: '그 결과 지금의 헌법이 만들어졌어.' },
  ],
  intro: async () => {
    await narr('1980년대 초, 서울.');
    await C('1981년 3월, 전두환 대통령이 새 헌법(7년 단임, 간접 선거)으로 다시 취임하며 [제5공화국]이 시작됐어.');
    await C('경제는 좋아지고 즐길 거리도 많아지지만, 언론과 정치는 꽁꽁 묶여 있지. 먼저 기자 아저씨의 신문사를 찾아가 보자.');
  },
  zones: [
    /* ---------- 신문사 편집국 ---------- */
    {
      id: 'zpress', year: '1980년대 초', place: '서울 · 신문사 편집국', hud: '1981', goal: 'p_press',
      hint: () => !F('c3_hd') ? '책상에 앉은 한도윤 기자에게 말을 걸어 보자.'
        : !photoTaken('p_press') ? '오른쪽 아래 책상의 보도지침을 찍자. 감시원이 왼쪽을 볼 때(? 표시 전)가 기회야!' : '오른쪽으로 가자.',
      tick: (f) => {
        const a = ent('agent');
        if (!a) return;
        const t = f % 200;
        if (t === 0) a.dir = a.dir === 'left' ? 'right' : 'left';
        if (t === 150 && a.dir === 'left') emote(a, '?', 800);
      },
      rows: [
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        '##bb###ww###ww###ww#bb##',
        'oooooooooooooooooooooooo',
        DESK_ROW,
        'oooooooooooooooooooooooo',
        'oooooooooooooooooooooooo',
        'oooooooooooooooooooooooo',
        'oooooooooooooooooooooooo',
        'oooooooooooooooooooooooo',
        'oooooooooooooooooooooooo',
        DESK_ROW,
        'oooooooooooooooooooooooo',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXXXXXXXXXXX',
      ],
      ents: [
        npc('rep1', 2, 2, LOOK.man, 'down', '기자', async () => {
          await say('기자', '1980년 겨울, 신문사와 방송사가 강제로 합쳐졌어. 64곳이 18곳으로 줄었지.');
          await say('기자', '정부에 밉보인 동료들은 해직됐고. 천 명 가까이 쫓겨났다더군.');
        }),
        npc('rep2', 6, 2, LOOK.womanB, 'down', '기자', async () => {
          await say('기자', 'TV 9시 뉴스는 \'땡\' 하는 시보와 함께 "전두환 대통령은 오늘…"로 시작해요. 그래서 \'땡전 뉴스\'라고들 하죠.');
        }),
        npc('hd', 10, 2, LOOK.hd80, 'down', HD, async () => {
          if (!F('c3_hd')) {
            setF('c3_hd');
            await say(HD, '자네, 여기까지 어떻게 들어왔나? …뭐, 이제 놀랍지도 않군.');
            await say(HD, '매일 아침 정부 문화공보부에서 [보도지침]이 내려온다네. 무엇을 쓰고, 무엇을 쓰지 말지, 기사를 몇 단으로 실을지까지.');
            await say(HD, '오른쪽 아래 책상 위에 오늘 치 지침이 있어. 언젠가 이 사실을 세상에 알리려면 증거가 필요해.');
            await say(HD, '자네 사진기로 찍어 줄 수 있겠나? 단, 저 검은 양복 감시원 눈에 띄면 안 되네.');
            await C('감시원은 왼쪽과 오른쪽을 번갈아 봐. 머리 위에 [?]가 뜨면 곧 오른쪽으로 돌아선다는 뜻이야. 왼쪽을 보고 있을 때 재빨리!');
          } else if (!photoTaken('p_press')) {
            await say(HD, '감시원이 등을 돌렸을 때를 노리게.');
          } else {
            await say(HD, '잘했네. 1986년, 한 기자가 이 보도지침을 몰래 폭로하게 되지. 진실은 결국 드러나는 법이야.');
          }
        }),
        npc('rep3', 14, 2, LOOK.manB, 'down', '기자', async () => {
          await say('기자', '[삼청교육대] 이야기는 한 줄도 못 썼어. 수만 명이 끌려가 혹독한 훈련을 받았다는데…');
        }),
        npc('rep4', 2, 11, LOOK.suitG, 'up', '편집장', async () => {
          await say('편집장', '"이 기사는 빼시오. 이 사진은 1단으로." 기자 생활 30년에 이런 시절은 처음일세.');
        }),
        npc('rep5', 6, 11, LOOK.studentB, 'up', '수습기자', async () => {
          await say('수습기자', '그래도 경제 기사는 마음껏 쓸 수 있어요. 요즘 경기가 아주 좋거든요.');
        }),
        npc('agent', 17, 7, LOOK.agent, 'left', '감시원', async () => {
          await say('감시원', '문화공보부에서 나왔소. 오늘 보도지침, 토씨 하나 틀리지 않게 지키시오.');
        }),
        obj('guide', 21, 10, 'papers', undefined, async () => {
          if (photoTaken('p_press')) { await narr('「보도지침」 ― 오늘 실으면 안 되는 기사 목록이 빼곡하다.'); return; }
          if (!F('c3_hd')) { await narr('책상 위에 서류 뭉치가 있다.'); return; }
          const a = ent('agent');
          if (a && a.dir === 'right') {
            emote(a, '!', 1200);
            await say('감시원', '거기! 뭐 하는 거야! 저리 가!');
            await fadeOut(300);
            placePlayer(13, 7, 'right');
            await fadeIn(300);
            await C('들켰다! 감시원이 왼쪽을 볼 때 다시 도전하자.');
            return;
          }
          await narr('「보도지침」 ― "○○ 사건은 보도하지 말 것", "야당 집회 사진 사용 불가"…');
          await snap('p_press');
          await C('찍었다! 들키기 전에 빠져나가자.');
        }, { solid: false }),
      ],
    },

    /* ---------- 1982 야구장 ---------- */
    {
      id: 'zball', year: '1982년 3월 27일', place: '서울 · 동대문 야구장', hud: '1982', goal: 'p_baseball',
      hint: () => !F('c3_ump') ? '심판에게 말을 걸어 보자.'
        : (!has('ball') && !photoTaken('p_baseball')) ? '왼쪽 아래 외야 쪽으로 굴러간 공을 찾아보자.'
          : has('ball') ? '공을 심판에게 갖다주자!' : '오른쪽으로 가자.',
      rows: [
        'SSSSSSSSSSSSSSSSSSSSSSSSSS',
        'SSSSSSSSSSSSSSSSSSSSSSSSSS',
        'SSSSSSSSSSSSSSSSSSSSSSSSSS',
        'IIIIIIIIIIIIIIIIIIIIIIIIII',
        'gggggggggggggggggggggggggg',
        'ggggggggaaaaaaaaaggggggggg',
        'aaaaaaaaaaggggaaaaaaaaaaaa',
        'aaaaaaaaaaggggaaaaaaaaaaaa',
        'aaaaaaaaaaggggaaaaaaaaaaaa',
        'aaaaaaaaaaggggaaaaaaaaaaaa',
        'ggggggggaaaaaaaaaggggggggg',
        'gggggggggggggggggggggggggg',
        'IIIIIIIIIIIIIIIIIIIIIIIIII',
        'SSSSSSSSSSSSSSSSSSSSSSSSSS',
      ],
      ents: [
        obj('home', 8, 8, 'base'), obj('b1', 12, 10, 'base'), obj('b2', 16, 8, 'base'), obj('b3', 12, 5, 'base'),
        npc('pitcher', 12, 7, LOOK.baseballB, 'left', '투수', async () => {
          await say('투수', '삼성 라이온즈 투수입니다. 오늘이 우리나라 프로야구 첫 경기예요. 손이 다 떨리네요!');
        }),
        npc('catcher', 7, 8, LOOK.baseballW, 'right', '포수', async () => {
          await say('포수', 'MBC 청룡! 서울 팬들이 꽉 찼어요!');
        }),
        npc('batter', 9, 7, LOOK.baseballW, 'right', '타자', async () => {
          await say('타자', '언젠가 이 경기장에서 끝내기 홈런을 치는 게 꿈입니다!');
        }),
        npc('ump', 6, 8, LOOK.umpire, 'right', '심판', async () => {
          if (photoTaken('p_baseball')) { await say('심판', '역사적인 개막전이었소!'); return; }
          if (has('ball')) {
            take('ball');
            await say('심판', '오, 시구용 공! 찾아 줘서 고맙소. 자, 플레이 볼!');
            await narr('1982년 3월 27일, 서울 동대문 야구장. 프로야구 개막전, MBC 청룡 대 삼성 라이온즈.');
            await narr('전두환 대통령의 시구로 시작된 경기는 엎치락뒤치락 연장전까지 이어졌다.');
            await narr('연장 10회 말, MBC 청룡 이종도의 끝내기 만루 홈런!');
            sfx('cheer');
            ['catcher', 'batter', 'kid', 'fan2'].forEach(id => emote(id, '♪', 2000));
            emote('pitcher', '…', 2000);
            await wait(300);
            await snap('p_baseball');
            await C('프로야구, 컬러 TV, 통금 해제… 생활은 확 달라졌어. 하지만 이게 사람들의 눈을 정치에서 돌리려는 거라는 비판도 있었지.');
            return;
          }
          if (!F('c3_ump')) {
            setF('c3_ump');
            await say('심판', '큰일이오! 개막전 시구용 공이 없어졌소! 연습하다 외야 쪽으로 굴러간 것 같은데…');
            await say('심판', '학생, 왼쪽 아래 잔디밭 쪽을 좀 찾아봐 주겠소?');
          } else {
            await say('심판', '공은 왼쪽 아래 외야 잔디밭 어딘가에 있을 거요.');
          }
        }),
        pickup('ball', 2, 11, 'ball', 'ball', { if: () => F('c3_ump') && !photoTaken('p_baseball') }),
        npc('kid', 3, 4, LOOK.kid, 'down', '어린이 팬', async () => {
          await say('어린이 팬', '프로야구가 생겼어요! 저는 MBC 청룡 어린이 회원이에요! 점퍼도 받았어요!');
        }),
        npc('fan2', 20, 4, LOOK.hatman, 'down', '아저씨', async () => {
          await say('아저씨', '1월부터 [야간 통행금지]가 풀렸어! 1945년부터 37년 만이야. 이젠 밤 12시가 넘어도 집에 안 가도 된다고!');
        }),
        npc('stu', 22, 11, LOOK.girl, 'up', '중학생', async () => {
          await say('중학생', '내년부터는 교복 대신 사복을 입고 학교에 간대요. [교복 자율화]래요!');
          await say('중학생', '머리 모양도 자유래요. 1983년부터요!');
        }),
        npc('cstu', 17, 11, LOOK.studentB, 'up', '대학생', async () => {
          await say('대학생', '스포츠(Sports), 영화(Screen), 섹스(Sex)… 사람들이 정치에 관심을 덜 갖게 하려는 \'3S 정책\'이라는 말도 있어.');
          await say('대학생', '그래도 야구는 재밌지만 말이야. 하하.');
        }),
      ],
    },

    /* ---------- 1983 KBS ---------- */
    {
      id: 'zfamily', year: '1983년 여름', place: '서울 · 여의도 방송국 앞', hud: '1983', goal: 'p_family',
      hint: () => !F('c3_gm') ? '왼쪽 할머니에게 말을 걸어 보자.'
        : !F('c3_clue') ? '벽보를 하나씩 읽고 할머니의 동생을 찾아보자. (흥남, 왼쪽 귀 밑 점)'
          : !photoTaken('p_family') ? '벽보에 적힌 곳으로 가서 김순자 씨를 찾아보자.' : '오른쪽으로 가자. 1987년이야.',
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGGGG',
        'UUUUUUUUUUUUUUUUUUUUUUUUUU',
        'UUUUUUUUUUUEEEUUUUUUUUUUUU',
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
        ...[
          [2, '「아버지를 찾습니다」 1·4 후퇴 때 평양에서 헤어진 아버지 박영철. 당시 35세. ― 아들 박만수'],
          [4, '「딸을 찾습니다」 1951년 부산 국제시장에서 잃어버린 딸 김순자. 오른쪽 손등에 흉터가 있음.'],
          [6, '「오빠를 찾습니다」 서울 영등포 고아원에서 자랐습니다. 오빠 이름은 이영수. ― 이영희'],
          [8, '「가족을 찾습니다」 황해도 연백에서 온 최씨네 막내 최덕수입니다.'],
          [16, '「동생을 찾습니다」 함흥에서 피란길에 헤어진 동생 정만복. ― 형 정만석'],
          [18, '「언니를 찾습니다」 흥남 부두에서 언니 손을 놓쳤습니다. 언니 이름은 김순옥. 저는 김순자, 왼쪽 귀 밑에 점이 있어요. 지금 방송국 앞 마당 오른쪽 끝에 있습니다.'],
          [20, '「아들을 찾습니다」 6·25 때 의용군으로 끌려간 아들 김철수. ― 어머니'],
          [22, '「동생을 찾습니다」 흥남에서 헤어진 동생 김순례. 오른쪽 귀 밑에 점. ― 언니 김말순'],
        ].map(([x, text], i) => obj('board' + i, x, 4, 'board', { seed: i + 3 }, async () => {
          await narr(text);
          if (x === 18 && F('c3_gm') && !F('c3_clue')) {
            setF('c3_clue');
            await C('흥남, 왼쪽 귀 밑의 점, 언니 이름 김순옥! 할머니가 찾던 동생이야! 마당 오른쪽 끝으로 가 보자!');
          }
          if (x === 22 && F('c3_gm') && !F('c3_clue')) await C('흥남이긴 한데… 오른쪽 귀, 이름도 달라. 다른 벽보를 찾아보자.');
          if (x === 4 && F('c3_gm') && !F('c3_clue')) await C('이름은 같지만 부산, 손등의 흉터… 할머니 동생은 아닌 것 같아.');
        })),
        npc('gm', 5, 7, LOOK.oldwoman, 'up', '할머니', async () => {
          if (photoTaken('p_family')) { await say('할머니', '고맙수, 정말 고마워…'); return; }
          if (!F('c3_gm')) {
            setF('c3_gm');
            await say('할머니', '동생을 찾고 있어요. 6·25 때 흥남 부두에서 피란선을 타다가 손을 놓쳤지…');
            await say('할머니', '이름은 [김순자]. 왼쪽 귀 밑에 점이 있었어. 그때 일곱 살이었으니 지금은 마흔 살이겠구먼.');
            await say('할머니', '눈이 어두워서 벽보를 읽을 수가 없어요. 학생이 좀 찾아 줄 수 있겠수?');
          } else {
            await say('할머니', '흥남 부두… 왼쪽 귀 밑의 점… 우리 순자를 꼭 찾고 싶어요.');
          }
        }),
        npc('sunja', 24, 9, LOOK.womanB, 'left', '아주머니', async (e) => {
          if (photoTaken('p_family')) { await say('김순자', '33년 만이에요… 꿈만 같아요.'); return; }
          if (!F('c3_clue')) {
            await say('아주머니', '저도 가족을 찾고 있어요. 언니를요… 벽보를 붙여 놓았는데, 아직 아무 연락이 없네요.');
            return;
          }
          await say(ME, '혹시… 김순자 씨세요? 흥남에서 언니 손을 놓치신?');
          await say('아주머니', '네? 네! 제가 김순자예요! 우리 언니를… 아세요?');
          await say(ME, '저쪽에 김순옥 할머니가 기다리고 계세요!');
          await walkTo(e, 6, 8, { force: true });
          face(e, 'up');
          const gm = ent('gm');
          face(gm, 'down');
          await say('김순옥', '…순자야? 우리 순자 맞니? 귀 밑에 점… 맞구나, 맞아!');
          await say('김순자', '언니! 언니이…!');
          emote(gm, '♥', 2500); emote(e, '♥', 2500);
          await narr('두 사람은 서로의 얼굴을 한참 바라보다가, 말없이 끌어안았다. 33년 만이었다.');
          sfx('cheer');
          ['crowd1', 'crowd2', 'crowd3', 'kbs'].forEach(id => emote(id, '!', 1500));
          await snap('p_family');
          await C('이 방송으로 1만 189명의 이산가족이 다시 만났어. 전쟁이 남긴 상처가 얼마나 깊었는지 보여 주지.');
        }, { at: () => photoTaken('p_family') ? [6, 8, 'up'] : null }),
        npc('kbs', 12, 3, LOOK.staff, 'down', '방송국 직원', async () => {
          await say('방송국 직원', '6월 30일 밤, 처음엔 95분짜리 특별 방송이었어요. 그런데 사람들이 몰려들어 끝낼 수가 없었죠.');
          await say('방송국 직원', '결국 11월까지 138일, 453시간이 넘게 이어졌답니다. 여의도가 온통 벽보로 뒤덮였어요.');
        }),
        npc('crowd1', 9, 6, LOOK.man, 'up', '아저씨', async () => {
          await say('아저씨', '벌써 사흘째 밤을 새웠소. 혹시 형님이 TV를 보고 연락할까 봐…');
        }),
        npc('crowd2', 14, 8, LOOK.mother, 'up', '아주머니', async () => {
          await say('아주머니', '방금 저쪽에서 30년 만에 남매가 만났대요. 다들 같이 울었어요.');
        }),
        npc('crowd3', 19, 6, LOOK.oldman, 'up', '할아버지', async () => {
          await say('할아버지', '북에 두고 온 가족은… 이 벽보로도 찾을 수가 없지. 휴전선이 가로막고 있으니.');
        }),
        npc('hd', 2, 10, LOOK.hd80, 'right', HD, async () => {
          await say(HD, '이 광장은 매일이 눈물바다야. 기쁨의 눈물, 그리움의 눈물…');
          await say(HD, '이런 기사라면 얼마든지 쓸 수 있지. 정치 기사만 아니면 말이야.');
        }),
      ],
    },

    /* ---------- 1987 신촌 ---------- */
    {
      id: 'zpark', year: '1987년 1월 ~ 6월', place: '서울 · 신촌 대학가', hud: '1987', weather: 'smoke', goal: 'p_park',
      hint: () => !F('c3_poster') ? '교문 안 대학생에게 말을 걸어 보자.'
        : (!has('glue') && !F('c3_posted')) ? '왼쪽 아래 문방구에서 풀을 구하자.'
          : !F('c3_posted') ? '교문 오른쪽 담벼락(반짝이는 곳)에 대자보를 붙이자.' : '오른쪽으로 가자. 시청 앞이야!',
      rows: [
        'TTTTTTTTGGGGGGGGGGTTTTTTTT',
        'TTTTTTTTGGGGGGGGGGTTTTTTTT',
        '...t..t.CwwwwwwwwC.t..t...',
        '........CwwwDDwwwC........',
        'pppppppppppppppppppppppppp',
        'llllllllppppppppppllllllll',
        '::::::::::::::::::::::::::',
        '==========================',
        '--------------------------',
        '==========================',
        '::::::::::::::::::::::::::',
        'RRRRRRGGGGGGRRRRRRGGGGGGRR',
        'RRRRRRGGGGGGRRRRRRGGGGGGRR',
        'RRRRRRGGGGGGRRRRRRGGGGGGRR',
      ],
      ents: [
        npc('stuA', 12, 4, LOOK.protester, 'down', '대학생', async () => {
          if (F('c3_posted')) { await say('대학생', '진실은 덮을 수 없어. 모두가 알게 될 거야.'); return; }
          if (!F('c3_poster')) {
            setF('c3_poster');
            await say('대학생', '서울대생 [박종철]이 남영동 대공분실에서 조사를 받다 숨졌어.');
            await say('대학생', '경찰은 "책상을 탁 치니 억 하고 죽었다"고 발표했지. 하지만 물고문 때문이었다는 게 드러났어.');
            await say('대학생', '이 대자보를 담벼락에 붙여서 모두에게 알리고 싶어. 그런데 풀이 다 떨어졌네…');
            give('poster');
            await say('대학생', '왼쪽 아래 문방구에서 풀을 구해서, 교문 오른쪽 담벼락에 붙여 줄래?');
          } else {
            await say('대학생', '풀은 왼쪽 아래 문방구에 있을 거야. 담벼락은 교문 오른쪽이야!');
          }
        }),
        npc('stuB', 16, 4, LOOK.studentB, 'down', '대학생', async () => {
          await say('대학생', '4월 13일엔 대통령이 "지금 헌법대로 다음 대통령을 뽑겠다"고 발표했어. [4·13 호헌 조치]야.');
          await say('대학생', '국민이 직접 대통령을 뽑게 해 달라는 요구를 대놓고 거부한 거지.');
        }),
        obj('stationery', 3, 10, 'stall', { color: '#e8b030', goods: ['#3a7ad8', '#f4f0e4', '#d8342a'] }),
        npc('stOwner', 5, 10, LOOK.vendorM, 'left', '문방구 주인', async () => {
          if (has('poster') && !has('glue')) {
            give('glue');
            await say('문방구 주인', '풀? 대자보 붙이려고? …돈은 됐다. 학생들 고생이 많구먼. 조심하고.');
          } else {
            await say('문방구 주인', '요즘 학생들이 매직이랑 전지를 엄청 사 가.');
          }
        }),
        obj('souv', 8, 10, 'stall', { color: '#d8342a', goods: ['#f0902a', '#f0902a', '#e8c84a'] }),
        obj('hodoriDoll', 10, 10, 'hodori'),
        npc('souvMan', 11, 10, LOOK.vendorM, 'up', '기념품 상인', async () => {
          await say('기념품 상인', '작년 서울 아시안게임 때 이 호돌이 인형이 불티나게 팔렸지! 내년엔 올림픽이고!');
          await say('기념품 상인', '요즘은 기름값 싸고, 이자 싸고, 달러도 싼 [3저 호황]이라 장사가 잘돼.');
          if (!photoTaken('p_asiad')) {
            await C('경제는 사상 최고의 호황이었어. 보너스 사진으로 남겨 두자!');
            await snap('p_asiad', { noFog: true });
          }
        }),
        npc('priest', 16, 10, LOOK.priest, 'up', '신부', async () => {
          await say('신부', '5월 18일, 천주교정의구현전국사제단이 박종철 군 사건이 축소·조작되었다는 사실을 폭로했습니다.');
          await say('신부', '진실은 덮을 수 없습니다.');
        }),
        { id: 'wallSpark', x: 21, y: 6, prop: 'coin', solid: false, show: () => F('c3_poster') && !F('c3_posted') },
        spot('wallSpot', 21, 5, async () => {
          if (F('c3_posted')) { await narr('대자보: 「박종철을 살려내라! 고문 정권 물러가라!」'); return; }
          if (!has('poster')) { await narr('오래된 돌담이다.'); return; }
          if (!has('glue')) { await C('풀이 있어야 붙일 수 있어. 문방구에 가 보자.'); return; }
          take('poster'); take('glue');
          setF('c3_posted');
          sfx('ok');
          await narr('담벼락에 대자보를 붙였다.\n「박종철을 살려내라! 고문 정권 물러가라!」');
          await wait(300);
          ['rd1', 'rd2', 'rd3'].forEach(id => emote(id, '!', 1500));
          await say('학생', '세상에… 물고문이라니!');
          await C('사람들이 모여들고 있어. 이 순간을 기록하자.');
          await snap('p_park');
          await fadeOut(800);
          await narr('1987년 6월 9일, 이곳 연세대 정문 앞.');
          await narr('시위에 나섰던 연세대생 [이한열]이 경찰이 쏜 최루탄에 머리를 맞고 쓰러졌다. 그는 끝내 7월 5일 세상을 떠났다.');
          await fadeIn(800);
          await C('이 소식에 분노는 전국으로 번졌어. 이제 시청 앞으로 가자!');
        }),
        obj('wallposter', 21, 5, 'wallposter', undefined, null, { show: () => F('c3_posted') }),
        npc('rd1', 20, 6, LOOK.student, 'up', '학생', async () => { await say('학생', '이걸 모두에게 알려야 해!'); }, { show: () => F('c3_posted') }),
        npc('rd2', 22, 6, LOOK.protesterW, 'up', '학생', async () => { await say('학생', '경찰이 거짓말을 했던 거야.'); }, { show: () => F('c3_posted') }),
        npc('rd3', 19, 6, LOOK.man, 'up', '시민', async () => { await say('시민', '내 아들 같은 학생이… 가만있을 수 없구먼.'); }, { show: () => F('c3_posted') }),
        npc('riot1', 25, 6, LOOK.riot, 'left', '전투 경찰', async () => { await say('전투 경찰', '…최루탄 냄새에 우리도 눈물이 납니다.'); }),
        npc('riot2', 25, 10, LOOK.riot, 'left', '전투 경찰', async () => { await say('전투 경찰', '해산하시오!'); }),
      ],
    },

    /* ---------- 1987.6 시청 앞 ---------- */
    {
      id: 'zjune', year: '1987년 6월', place: '서울 · 시청 앞 광장', hud: '1987.6', goal: 'p_629',
      hint: () => {
        const n = ['c3_j1', 'c3_j2', 'c3_j3'].filter(F).length;
        if (!photoTaken('p_june')) return n < 3 ? `아래쪽 길가의 시민들을 설득해 함께하자. (${n}/3) 다 모이면 학생 대표에게!` : '학생 대표에게 말을 걸자!';
        if (!photoTaken('p_629')) return '오른쪽 아래 가게 TV에서 중대 발표가 나온대!';
        return '오른쪽 끝의 시간의 문으로 가자!';
      },
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGGGGGG',
        'CwwCwwCwwCwwCDDCwwCwwCwwCwwC',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        'pppppppppppppppppppppppppppp',
        '::::::::::::::::::::::::::::',
        '============================',
        '============================',
      ],
      ents: [
        obj('banA', 6, 2, 'banner'),
        obj('banB', 20, 2, 'banner'),
        npc('leader', 14, 3, LOOK.protester, 'down', '학생 대표', async () => {
          if (photoTaken('p_june')) { await say('학생 대표', '우리가 해냈어요… 아니, 모두가 해낸 거예요!'); return; }
          const n = ['c3_j1', 'c3_j2', 'c3_j3'].filter(F).length;
          if (n < 3) {
            await say('학생 대표', '6월 10일, 전국에서 \'박종철 고문 살인 은폐 규탄 및 호헌 철폐 국민대회\'가 열려요!');
            await say('학생 대표', `학생들만으론 부족해요. 더 많은 시민이 함께해야 해요. 아래쪽 길가의 시민들을 설득해 줄래요? (${n}/3)`);
            return;
          }
          await say('학생 대표', '회사원, 상인, 택시 기사님까지! 이제 모두 함께 외쳐요!');
          await say('모두', '"호헌 철폐! 독재 타도! 직선제 쟁취!"');
          sfx('cheer');
          setF('c3_rally');
          await wait(300);
          await snap('p_june', { noFog: true });
          await C('학생만이 아니었어. 넥타이를 맨 회사원, 상인, 주부, 택시 기사… 수백만 명이 거리로 나섰지. 이게 [6월 민주 항쟁]이야.');
          await C('오른쪽 아래 가게 TV에서 곧 중대 발표가 있대. 가 보자!');
        }),
        npc('c1', 9, 4, LOOK.protester, 'up', '대학생', async () => { await say('대학생', '"호헌 철폐! 독재 타도!"'); }, { cheer: true }),
        npc('c2', 11, 4, LOOK.protesterW, 'up', '대학생', async () => { await say('대학생', '한열이 형을 살려내라!'); }, { cheer: true }),
        npc('c3', 17, 4, LOOK.protesterB, 'up', '대학생', async () => { await say('대학생', '이번엔 절대 물러서지 않을 거예요.'); }, { cheer: true }),
        npc('c4', 19, 4, LOOK.protester, 'up', '대학생', async () => { await say('대학생', '저녁 6시, 국기 하강식 때 전국에서 동시에 모이기로 했어요!'); }, { cheer: true }),
        npc('tie', 4, 11, LOOK.suit, 'up', '회사원', async (e) => {
          if (F('c3_j1')) { await say('회사원', '넥타이 부대의 힘을 보여 주자고!'); return; }
          await say('회사원', '나도 마음은 같지만… 회사에 찍히면 어쩌나. 처자식도 있고.');
          const r = await ask('회사원', '…', ['함께하면 두렵지 않아요!', '그냥 지나가세요.']);
          if (r !== 0) { await say('회사원', '…그래, 미안하네.'); return; }
          await say('회사원', '…그래. 박종철 군도, 이한열 군도 우리 아들 또래야. 넥타이 부대가 뭔지 보여 주지!');
          await walkTo(e, 12, 6, { force: true }); face(e, 'up');
          setF('c3_j1');
          e.cheer = true;
        }, { at: () => F('c3_j1') ? [12, 6, 'up'] : null, cheer: false }),
        npc('vend', 9, 11, LOOK.vendor, 'up', '상인 아주머니', async (e) => {
          if (F('c3_j3')) { await say('상인 아주머니', '물이랑 김밥 넉넉히 싸 왔어!'); return; }
          await say('상인 아주머니', '아이고, 최루탄 때문에 눈이 따가워서 장사도 못 해.');
          const r = await ask('상인 아주머니', '…', ['학생들에게 물 한 잔 주실래요?', '가게 문 닫으세요.']);
          if (r !== 0) { await say('상인 아주머니', '그래야겠다. 에휴.'); return; }
          await say('상인 아주머니', '그래, 우리 애들 같은 학생들인데. 물이랑 김밥 좀 싸 가자!');
          await walkTo(e, 16, 6, { force: true }); face(e, 'up');
          setF('c3_j3');
          e.cheer = true;
        }, { at: () => F('c3_j3') ? [16, 6, 'up'] : null }),
        obj('taxi', 20, 12, 'car', { color: '#e8c840' }),
        npc('taximan', 22, 11, LOOK.manB, 'up', '택시 기사', async () => {
          if (F('c3_j2')) { await say('택시 기사', '빵빵! 이게 시민의 소리다!'); sfx('honk'); return; }
          await say('택시 기사', '손님 태우느라 바쁜데… 근데 박종철 군 얘기 들으면 피가 거꾸로 솟아.');
          const r = await ask('택시 기사', '…', ['경적으로 응원해 주세요!', '운전 조심하세요.']);
          if (r !== 0) { await say('택시 기사', '그래, 고맙다.'); return; }
          sfx('honk');
          await say('택시 기사', '빵빵! 좋아, 오늘은 장사 접고 경적으로 응원이다! 동료들한테도 무전 돌리지!');
          ['c1', 'c2', 'c3', 'c4'].forEach(id => emote(id, '♪', 1500));
          setF('c3_j2');
        }),
        obj('tv', 25, 10, 'tv', undefined, async () => {
          if (!photoTaken('p_june')) { await narr('(뉴스) "…오늘도 전국 곳곳에서 시위가 이어졌습니다…"'); return; }
          if (photoTaken('p_629')) { await narr('(뉴스) "…여야는 대통령 직선제 개헌안 협상에 들어갔습니다…"'); return; }
          await narr('(뉴스 속보) 1987년 6월 29일. 민주정의당 대표 노태우가 특별 선언을 발표했다.');
          await narr('"…대통령 직선제로 개헌하여 1988년 2월 평화적 정부 이양을 실현하고, 김대중 씨를 사면·복권하며, 언론의 자유를 보장하겠습니다…"');
          sfx('cheer');
          ['shopkeeper', 'hd'].forEach(id => emote(id, '!', 1500));
          await say('가게 주인', '직선제래! 우리가 이겼어!');
          await snap('p_629');
          await C('국민의 힘으로 대통령을 직접 뽑을 권리를 되찾은 거야! 그해 10월, 5년 단임 직선제 헌법이 만들어져. 지금 우리가 쓰는 헌법이지.');
        }),
        npc('shopkeeper', 26, 10, LOOK.man, 'left', '가게 주인', async () => {
          await say('가게 주인', '테레비 앞에 모여 봐요! 뭔가 중대 발표가 있대요!');
        }),
        npc('hd', 2, 5, LOOK.hd80, 'right', HD, async () => {
          await say(HD, '이번엔 다르구먼. 학생만이 아니야. 넥타이 맨 회사원들까지 나왔어.');
          await say(HD, '나도 오늘은 기자이기 전에 시민일세.');
        }),
        gateDef(27, 7),
      ],
    },
  ],
});
