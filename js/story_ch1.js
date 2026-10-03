/* =========================================================
 * 제1장 · 박정희 정부 (1961–1979)
 * ========================================================= */
Object.assign(Game.PHOTOS, {
  p_516: {
    ch: 1, title: '5·16 군사 정변', year: '1961', hint: '1961년 새벽, 서울 거리의 탱크',
    desc: '1961년 5월 16일, 박정희 소장을 중심으로 한 군인들이 한강을 건너 서울을 장악했다. 4·19 혁명 뒤 들어선 장면 정부는 무너졌고 국가재건최고회의가 권력을 쥐었다. 박정희는 1963년 대통령 선거에서 당선되었다.',
  },
  p_export: {
    ch: 1, title: '수출 주도 경제 개발', year: '1960년대', hint: '가발 공장의 선적 마감',
    desc: '1962년부터 정부는 경제 개발 5개년 계획을 추진했다. 가발·섬유·신발 같은 경공업 제품을 수출하며 1964년 수출 1억 달러를 달성했다. 그 뒤에는 저임금과 장시간 노동을 견딘 어린 노동자들이 있었다.',
  },
  p_hanil: {
    ch: 1, title: '6·3 시위와 한일 협정', year: '1964–1965', bonus: true, hint: '공장 옆 대학생들의 현수막',
    desc: '1964년 6월 3일, 굴욕적인 한일 회담에 반대하는 학생 시위가 크게 일어났다. 정부는 계엄령을 선포하고 1965년 한일 기본 조약을 체결했다. 받은 자금은 경제 개발에 쓰였지만 식민 지배에 대한 사과와 배상 문제는 오늘날까지 논란으로 남았다.',
  },
  p_vietnam: {
    ch: 1, title: '베트남 파병', year: '1964–1973', bonus: true, hint: '파병을 앞둔 군인들',
    desc: '1964년부터 1973년까지 약 32만 명의 국군이 베트남 전쟁에 파병되었다. 미국의 지원과 파병 수당 등으로 들어온 외화는 경제 성장에 보탬이 되었지만, 5천여 명의 전사자와 고엽제 피해 등 큰 아픔을 남겼다.',
  },
  p_highway: {
    ch: 1, title: '경부고속도로 개통', year: '1970', hint: '1970년, 고속도로 개통식 테이프',
    desc: '1970년 7월 7일 서울과 부산을 잇는 428km의 경부고속도로가 개통되었다. 전국이 일일생활권으로 묶이며 산업화의 대동맥이 되었다. 2년 5개월의 공사 기간에 77명의 노동자가 목숨을 잃었다.',
  },
  p_saemaul: {
    ch: 1, title: '새마을 운동', year: '1970~', bonus: true, hint: '고속도로 아래 마을',
    desc: '1970년 시작된 새마을 운동은 근면·자조·협동을 내세워 지붕 개량, 마을길 넓히기 등을 추진했다. 농촌 환경이 크게 바뀌었지만, 정부 주도로 이루어지며 정권 홍보에도 활용되었다는 평가를 받는다.',
  },
  p_jeon: {
    ch: 1, title: '전태일과 평화시장', year: '1970', hint: '평화시장 다락방 작업장',
    desc: '평화시장 재단사 전태일은 어린 여성 노동자들의 열악한 노동 환경을 고발하다 1970년 11월 13일 "근로기준법을 준수하라"고 외치며 분신했다. 그의 죽음은 노동 운동이 본격적으로 일어나는 계기가 되었다.',
  },
  p_yushin: {
    ch: 1, title: '10월 유신', year: '1972', hint: '전파사 앞 TV',
    desc: '1972년 10월 17일 박정희 대통령은 비상계엄을 선포하고 국회를 해산했다. 이어 만든 유신 헌법은 대통령 간선제, 6년 임기와 중임 제한 철폐, 긴급 조치권 등으로 대통령에게 막강한 권력을 몰아주었다.',
  },
  p_74: {
    ch: 1, title: '7·4 남북 공동 성명', year: '1972', bonus: true, hint: '전파사 근처 신문 가판대',
    desc: '1972년 7월 4일 남과 북은 서울과 평양에서 동시에 공동 성명을 발표하고 자주·평화·민족 대단결의 통일 3대 원칙에 합의했다. 그러나 이후 남북 모두 독재 체제를 강화하는 데 이용되었다는 평가도 받는다.',
  },
  p_100: {
    ch: 1, title: '수출 100억 달러', year: '1977', bonus: true, hint: '1979년 거리의 광고판',
    desc: '1970년대 정부는 철강·조선·화학 등 중화학 공업을 집중 육성했다. 1973년 포항제철이 첫 쇳물을 쏟아냈고, 1977년 수출 100억 달러를 달성했다.',
  },
  p_1026: {
    ch: 1, title: '부마 민주 항쟁과 10·26', year: '1979', hint: '신문팔이 소년의 호외',
    desc: '1979년 YH 사건과 김영삼 신민당 총재 제명에 이어 부산·마산에서 유신 반대 시위(부마 민주 항쟁)가 일어났다. 10월 26일 박정희 대통령이 김재규 중앙정보부장에게 피살되며 유신 체제는 막을 내렸다.',
  },
});

const LOOK_JEON = { hair: HAIR.black, top: '#f0ece0', pants: '#3a3a48' };

Game.CHAPTERS.push({
  id: 1,
  title: '제1장 · 박정희 정부',
  short: '제1장 박정희 정부',
  tab: '1장 1961–79',
  card: ['제1장', '박정희 정부 · 1961–1979'],
  filter: 'sepia(.45) saturate(.8)',
  bgm: 'ch1',
  height: 14,
  start: { x: 1, y: 8, dir: 'right' },
  summary: '박정희 정부 18년. 굶주림에서 벗어날 만큼 경제는 크게 성장했지만, 민주주의와 노동자의 권리는 크게 억눌렸어. 빛과 그림자를 함께 기억하자!',
  quiz: [
    { q: '1961년 5·16 군사 정변을 주도한 인물은?', a: ['박정희', '이승만', '장면', '윤보선'], ok: 0, why: '박정희 소장이 이끈 군인들이 정권을 잡았어.' },
    { q: '1970년 "근로기준법을 준수하라"고 외치며 노동 현실을 고발한 평화시장 재단사는?', a: ['안중근', '전태일', '이한열', '박종철'], ok: 1, why: '전태일의 죽음은 노동 운동의 불씨가 되었지.' },
    { q: '1972년 대통령 간선제와 긴급 조치권 등으로 대통령에게 권력을 몰아준 헌법은?', a: ['제헌 헌법', '사사오입 개헌', '유신 헌법', '6·29 헌법'], ok: 2, why: '10월 유신으로 만들어진 유신 헌법이야.' },
  ],
  intro: async () => {
    await narr('1961년 5월 16일 새벽, 서울.');
    await C('도착! 여기는 1961년이야. 6·25 전쟁이 끝난 지 8년, 우리나라는 세계에서 가장 가난한 나라 가운데 하나였어.');
    await C('1년 전 [4·19 혁명]으로 이승만 정부가 물러나고 새 정부가 들어섰지만… 오늘 새벽, 심상치 않은 일이 벌어지고 있어.');
    await C('저기 사진기를 멘 젊은 기자에게 말을 걸어 보자!');
  },
  zones: [
    /* ---------- 1961.5.16 ---------- */
    {
      id: 'z516', year: '1961년 5월 16일', place: '서울 · 새벽의 거리', hud: '1961', tint: 'dawn', goal: 'p_516',
      hint: () => !F('c1_met') ? '사진기를 멘 젊은 기자에게 말을 걸어 보자.'
        : !F('c1_radio') ? '다방 앞 라디오에서 무슨 방송이 나오는지 들어 보자.'
          : !photoTaken('p_516') ? '탱크 앞에서 Space를 눌러 사진을 찍자!' : '오른쪽으로 가면 다음 시대야!',
      rows: [
        'GGGGGGRRRRRRGGGGGGRRRRRR',
        'GGGGGGRRRRRRGGGGGGRRRRRR',
        'wCwwCwWWWWWWCwwCwCWBWWBW',
        'CwCDCwVVVVVVCwDwwCBWDWBB',
        '::::::::::::::::::::::::',
        '::::::::::::::::::::::::',
        '========================',
        '------------------------',
        '========================',
        '========================',
        '::::::::::::::::::::::::',
        'IIIIIIIIIIIIIIIIIIIIIIII',
        '~~~~~~~~~~~~~~~~~~~~~~~~',
        '~~~~~~~~~~~~~~~~~~~~~~~~',
      ],
      ents: [
        obj('lamp1', 1, 4, 'lamp'),
        obj('lamp2', 13, 10, 'lamp'),
        obj('lamp3', 22, 10, 'lamp'),
        npc('hd', 4, 4, LOOK.hd61, 'right', HD, async () => {
          if (!F('c1_met')) {
            setF('c1_met');
            await say(HD, '이봐, 학생! 이 새벽에 여기서 뭐 하나? 아직 통행금지 시간인데.');
            await say(ME, '(이 아저씨… 어디서 본 얼굴 같은데?)');
            await say(HD, '나는 한도윤. 신문사 수습기자일세. 한강 다리 쪽에서 총소리가 났다는 제보를 받고 달려왔지.');
            await say(HD, '저 탱크들 좀 보게. 군인들이 한강을 건너 서울로 들어왔어.');
            await say(HD, '작년 [4·19 혁명]으로 이승만 정부가 무너지고 장면 정부가 들어섰지만 혼란이 계속됐거든. 그 틈을 탄 걸까…');
            await say(HD, '저 다방 앞 라디오에서 곧 무슨 발표가 나올 거야. 한번 들어 보게.');
          } else if (!F('c1_radio')) {
            await say(HD, '다방 앞 라디오를 들어 보게. 무슨 일인지 알 수 있을 거야.');
          } else {
            await say(HD, '기자는 기록하는 사람이야. 오늘 이 장면을 잊지 말게.');
            await say(HD, '자네도 사진기가 있군? 그럼 저 탱크를 찍어 두라고. 역사는 기록하는 사람의 것이니까.');
          }
        }),
        obj('radio', 8, 4, 'radio', undefined, async () => {
          await narr('(지지직…) 라디오에서 단호한 목소리가 흘러나온다.');
          await narr('"친애하는 애국 동포 여러분! 은인자중하던 군부는 드디어 금조 미명을 기해서 일제히 행동을 개시하여 국가의 행정·입법·사법의 3권을 완전히 장악하고…"');
          await narr('이어서 "반공을 국시의 제일의로 삼고…"로 시작하는 [혁명 공약]이 읽혔다.');
          if (!F('c1_radio')) {
            setF('c1_radio');
            await C('1961년 5월 16일. [박정희] 소장을 중심으로 한 군인들이 정변을 일으켰어. 바로 [5·16 군사 정변]이야.');
            await C('군인들은 \'국가재건최고회의\'를 만들어 권력을 잡았고, 박정희는 1963년 대통령 선거에 나가 당선돼. 그 뒤 18년 동안 나라를 이끌지.');
            await C('이제 저 탱크를 찍어 보자! 이 새벽을 기록하는 거야.');
          }
        }),
        npc('madam', 9, 4, LOOK.vendor, 'down', '다방 주인', async () => {
          await say('다방 주인', '새벽부터 라디오 소리에 다들 깼지 뭐유. 군인들이 방송국까지 차지했다나 봐.');
        }),
        npc('lis1', 7, 5, LOOK.hatman, 'up', '아저씨', async () => {
          await say('아저씨', '4·19 때 학생들이 피 흘려 얻은 민주주의인데… 1년 만에 군인이라니.');
        }),
        npc('lis2', 10, 5, LOOK.man, 'up', '청년', async () => {
          await say('청년', '솔직히 요즘 너무 어수선했어요. 차라리 군인들이 질서를 잡아 주면 좋겠다는 사람도 있더라고요.');
          await say('청년', '…그래도 총으로 정권을 바꾸는 게 옳은 일일까요?');
        }),
        obj('tank', 12, 6, 'tank', { dir: 'left' }, async () => {
          if (!F('c1_radio')) {
            await say('군인', '거기 서! 탱크에 가까이 오지 마라!');
            await C('무슨 일이 일어나는지 먼저 알아봐야 해. 다방 앞 라디오를 들어 보자.');
            return;
          }
          if (photoTaken('p_516')) { await narr('탱크의 엔진 소리가 새벽 공기를 흔든다.'); return; }
          await C('지금이야! 이 새벽을 기록하자!');
          await snap('p_516');
          await C('첫 번째 사진이야! 시간의 안개가 걷혔어. 오른쪽으로 가 보자.');
        }),
        obj('jeep', 18, 8, 'jeep'),
        npc('sol1', 11, 9, LOOK.soldier, 'left', '군인', async () => {
          await say('군인', '통행금지 시간이다. 어서 집으로 돌아가!');
        }),
        npc('sol2', 16, 6, LOOK.soldier, 'right', '군인', async () => {
          await say('군인', '…명령에 따를 뿐이다. 물러서라.');
        }),
        npc('sol3', 20, 9, LOOK.soldier, 'left', '군인', async () => {
          await say('군인', '한강 다리는 이미 우리가 장악했다.');
        }),
        npc('cit1', 15, 4, LOOK.hatman, 'down', '신사', async () => {
          await say('신사', '라디오에서 \'혁명 공약\'인가 뭔가를 읽더군. 부패를 없애고 경제를 살리겠다고…');
          await say('신사', '약속대로 일을 마치면 군대로 돌아간다는데, 과연 그럴까?');
        }),
        npc('cit2', 19, 5, LOOK.mother, 'left', '아주머니', async () => {
          await say('아주머니', '보릿고개에 굶는 집이 수두룩한데… 누가 정권을 잡든 배곯지 않게만 해 줬으면 좋겠어요.');
        }),
        npc('stu1', 6, 10, LOOK.student60, 'up', '학생', async () => {
          await say('학생', '어젯밤 한강 다리에서 총소리가 났대요. 헌병들이 막아섰지만 결국 다 건너왔다고…');
        }),
      ],
    },

    /* ---------- 1960년대 수출 공단 ---------- */
    {
      id: 'zexport', year: '1960년대', place: '서울 · 구로 수출 공단', hud: '1960년대', goal: 'p_export',
      hint: () => !F('c1_boss') ? '공장 안의 공장장에게 말을 걸어 보자.'
        : (!has('box') && !photoTaken('p_export')) ? '공장 구석에서 수출품 상자를 찾아보자.'
          : has('box') ? '상자를 트럭 기사에게 갖다주자!' : '오른쪽으로 가자! 아래쪽 군인들과 대학생들도 이야기를 들려줄 거야.',
      rows: [
        'GGGGGGGGGGGGGRRRRRRRRRTT',
        'q###########qBWBWDBWBWTT',
        'qcccccccccccq:::::::::.T',
        'qcccccccccccq:::::::::.T',
        'qcccccccccccq:::::::::..',
        'qqqqqccqqqqqqccccccccccc',
        'cccccccccccccccccccccccc',
        'cccccccccccccccccccccccc',
        '========================',
        '========================',
        '::::::::::::::::::::::::',
        '...t.....,,.......,,....',
        '..,,..t.........t.......',
        'TTTTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('wig1', 2, 3, 'wig'), obj('wig2', 4, 3, 'wig'), obj('sew1', 6, 3, 'sewing'),
        obj('wig3', 8, 3, 'wig'), obj('wig4', 10, 3, 'wig'),
        npc('g1', 2, 2, LOOK.workerGirl, 'down', '여공', async () => {
          await say('여공', '열여섯 살에 전라도에서 올라왔어요. 동생들 학비를 대려면 열심히 벌어야죠.');
        }),
        npc('g2', 4, 2, LOOK.sida, 'down', '어린 여공', async () => {
          await say('어린 여공', '하루 열두 시간 넘게 머리카락을 한 올 한 올 심어요. 눈이 빠질 것 같아요.');
        }),
        npc('g3', 6, 2, LOOK.workerGirl, 'down', '여공', async () => {
          await say('여공', '월급날엔 시골집에 돈을 부쳐요. 그 돈으로 오빠가 대학에 다녀요.');
        }),
        npc('g4', 8, 2, LOOK.womanB, 'down', '여공', async () => {
          await say('여공', '우리 같은 여공들이 나라 수출을 다 한다고들 하던데… 그런데 왜 월급은 이렇게 적을까요?');
        }),
        npc('g5', 10, 2, LOOK.sida, 'down', '어린 여공', async () => {
          await say('어린 여공', '기숙사 방 하나를 여덟 명이 같이 써요. 그래도 언니들이 잘해 줘요.');
        }),
        npc('boss', 8, 4, LOOK.worker, 'down', '공장장', async () => {
          if (!F('c1_boss')) {
            setF('c1_boss');
            await say('공장장', '어서 오게! 여긴 가발 공장이야. 우리가 만든 가발은 전부 미국으로 수출된다네.');
            await say('공장장', '정부가 1962년부터 [경제 개발 5개년 계획]을 세우고 수출 기업을 밀어주고 있거든. 가발, 섬유, 신발… 우리 손으로 만든 물건이 바다를 건너간다고!');
            await say('공장장', '그런데 큰일이야. 오늘이 선적 마감인데 마지막 [수출품 상자] 하나가 안 보여.');
            await say('공장장', '공장 안 어딘가에 있을 텐데… 찾아서 밖에 있는 트럭에 실어 주겠나?');
          } else if (!photoTaken('p_export')) {
            await say('공장장', '상자는 공장 구석 어딘가에 있을 거야. 찾으면 트럭 기사에게 갖다주게!');
          } else {
            await say('공장장', '1964년 11월 30일, 우리나라 수출이 처음으로 1억 달러를 넘었지. 그날을 \'수출의 날\'로 정했다네!');
          }
        }),
        pickup('box', 11, 4, 'box', 'box', { if: () => F('c1_boss') && !photoTaken('p_export') }),
        obj('truck', 15, 6, 'truck', undefined, null, { show: () => !F('c1_truck_gone') }),
        npc('driver', 18, 6, LOOK.manB, 'left', '트럭 기사', async () => {
          if (has('box')) {
            take('box');
            await say('트럭 기사', '오, 마지막 상자로군! 이걸로 다 실었다!');
            await narr('트럭에 마지막 상자가 실렸다. 공장 사람들이 박수를 친다.');
            ['boss', 'g1', 'g3'].forEach(id => emote(id, '♪', 1800));
            await C('수출로 일어서던 1960년대! 이 장면을 찍자!');
            await snap('p_export');
            const tr = ent('truck');
            await walk(tr, 'RRRRRRR', { force: true, speed: 2 });
            setF('c1_truck_gone');
            await C('하지만 그 수출 뒤에는 하루 열두 시간 넘게 일하던 어린 노동자들이 있었다는 것도 기억해야 해.');
          } else if (!photoTaken('p_export')) {
            await say('트럭 기사', '부산항까지 가려면 서둘러야 하는데… 마지막 상자가 아직 안 왔어.');
          }
        }, { show: () => !F('c1_truck_gone') }),
        obj('banner', 16, 2, 'banner', undefined, async () => {
          if (!F('c1_hanil') || photoTaken('p_hanil')) {
            await narr('"굴욕적 한일 회담 반대" 라고 적힌 현수막이다.');
            return;
          }
          await C('6·3 시위의 현장이야. 보너스 사진으로 남겨 두자!');
          await snap('p_hanil');
        }),
        npc('pro1', 15, 3, LOOK.protester, 'up', '대학생', async () => {
          setF('c1_hanil');
          await say('대학생', '정부가 일본과 국교를 맺으려 해. 식민 지배에 대한 제대로 된 사과도 배상도 없이, \'경제 협력 자금\'만 받고서 말이야!');
          await say('대학생', '그래서 1964년 6월 3일, 우리는 거리로 나섰지. "굴욕 외교 반대!"');
          if (!photoTaken('p_hanil')) await C('현수막을 조사하면 보너스 사진을 찍을 수 있겠어.');
        }, { cheer: true }),
        npc('pro2', 18, 3, LOOK.protesterB, 'up', '대학생', async () => {
          await say('대학생', '결국 정부는 계엄령을 선포했고, 1965년 [한일 기본 조약]이 체결됐어.');
          await say('대학생', '그 돈이 경제 개발에 쓰인다지만… 상처는 그대로야.');
        }, { cheer: true }),
        obj('jeepV', 12, 11, 'jeep'),
        npc('vsol', 14, 11, LOOK.soldier, 'left', '파병 군인', async () => {
          await say('파병 군인', '다음 주에 베트남으로 떠납니다. 1964년부터 우리 군이 파병되고 있지요.');
          await say('파병 군인', '미국의 지원과 외화가 들어온다지만… 무사히 돌아올 수 있을지.');
          if (!photoTaken('p_vietnam')) {
            await C('전쟁터로 떠나는 사람들. 보너스 사진으로 기억해 두자.');
            await snap('p_vietnam');
          }
        }),
        npc('vsol2', 15, 12, LOOK.soldier, 'left', '파병 군인', async () => {
          await say('파병 군인', '전우들과 함께라 든든합니다. 어머니, 걱정 마세요!');
        }),
        npc('vmom', 11, 12, LOOK.mother, 'right', '어머니', async () => {
          await say('어머니', '몸 성히만 돌아오너라, 아들아…');
        }),
      ],
    },

    /* ---------- 1970 경부고속도로 ---------- */
    {
      id: 'zhighway', year: '1970년 7월 7일', place: '경부고속도로 개통식', hud: '1970', goal: 'p_highway',
      hint: () => !F('c1_mc') ? '개통식 사회자에게 말을 걸어 보자.'
        : (!has('scissors') && !F('c1_cut')) ? '가드레일 왼쪽 틈으로 마을에 내려가 가위를 찾아보자.'
          : has('scissors') ? '가위를 사회자에게 갖다주자!' : '오른쪽으로! 1970년 서울의 시장으로 가 보자.',
      rows: [
        'OOOOOOOOOOOOOOOOOOOOOOOOOO',
        'TTT..TTTT....TTTTT...TTTTT',
        'PPPPPP..PPPPPPP..PPPPPPPPP',
        'PPPPPP..PPPPPPP..PPPPPPPPP',
        '......................,,..',
        'LLLLLLLL.LLLLLLLLLLLLLLLLL',
        '==========================',
        '--------------------------',
        '==========================',
        '==========================',
        'LLLL.LLLLLLLLLLLLLLLLL.LLL',
        '....d.YYYY..GGGG......d...',
        '....d.hhhh..hhhh......d...',
        'TTTTdddddddddddddddddddTTT',
      ],
      ents: [
        obj('ribbon', 17, 6, 'ribbonv', undefined, async () => {
          await narr('빨간 개통식 테이프가 고속도로를 가로막고 있다.');
        }, { show: () => !F('c1_cut') }),
        obj('ribbonCut', 17, 6, 'ribbonv', { cut: true }, null, { show: () => F('c1_cut'), solid: false }),
        npc('off1', 16, 6, LOOK.suit, 'right', '관리', async () => {
          await say('관리', '이제 서울에서 부산까지 하루면 오가는 \'일일생활권\' 시대가 열리는 거요!');
        }),
        npc('off2', 16, 8, LOOK.suitG, 'right', '관리', async () => {
          await say('관리', '공사비가 어마어마했지. 한일 협정 자금과 국민 세금, 그리고 수많은 사람의 땀이 들어갔다네.');
        }),
        npc('mc', 13, 7, LOOK.suit, 'right', '사회자', async () => {
          if (F('c1_cut')) { await say('사회자', '역사적인 날이오! 이 길이 나라를 바꿀 거요.'); return; }
          if (has('scissors')) {
            take('scissors');
            await say('사회자', '오오, 찾았구먼! 고맙네. 자, 개통식을 시작하겠습니다!');
            await narr('1970년 7월 7일.\n서울에서 부산까지 428km, 경부고속도로가 개통되었다.');
            sfx('ok');
            setF('c1_cut');
            sfx('cheer');
            ['off1', 'off2', 'crowd1', 'crowd2', 'crowd3'].forEach(id => emote(id, '♪', 2000));
            const car = Game.spawn({ id: 'car70', x: 11, y: 8, prop: 'car', arg: { color: '#e8d8a0' }, solid: false }, 'zhighway');
            const moving = walk(car, 'RRRRRRRRRRRRRR', { force: true, speed: 2 });
            await wait(450);
            await snap('p_highway');
            await moving;
            despawn('car70');
            await C('전국이 \'일일생활권\'으로 묶이는 순간이야! 다만 공사 중에 77명의 노동자가 목숨을 잃었다는 것도 잊지 말자.');
            return;
          }
          if (!F('c1_mc')) {
            setF('c1_mc');
            await say('사회자', '큰일 났네! 곧 개통식인데 테이프를 자를 가위가 없어졌어!');
            await say('사회자', '아까 저 아래 마을에 들렀을 때 떨어뜨린 것 같은데… 학생, 미안하지만 좀 찾아 주겠나?');
            await say('사회자', '왼쪽 가드레일 틈으로 내려가면 마을이야.');
          } else {
            await say('사회자', '가위를 찾으면 알려 주게! 마을은 왼쪽 가드레일 틈 아래야.');
          }
        }),
        npc('crowd1', 11, 6, LOOK.man, 'right', '구경꾼', async () => {
          await say('구경꾼', '자동차가 쌩쌩 달리는 길이라니, 꿈만 같구먼!');
        }),
        npc('crowd2', 11, 9, LOOK.woman, 'right', '구경꾼', async () => {
          await say('구경꾼', '부산 사는 언니한테 이제 하루 만에 갈 수 있겠네요.');
        }),
        npc('crowd3', 12, 9, LOOK.kid, 'right', '아이', async () => {
          await say('아이', '나중에 크면 이 길에서 자동차를 몰 거예요!');
        }),
        npc('builder', 6, 9, LOOK.builder, 'up', '건설 노동자', async () => {
          await say('건설 노동자', '2년 5개월 만에 428km를 뚫었지. 밤낮없이 공사하느라…');
          await say('건설 노동자', '동료 77명이 목숨을 잃었어. 이 길엔 그들의 땀과 피가 배어 있다네.');
        }),
        npc('farmer', 10, 4, LOOK.farmer, 'down', '농부', async () => {
          await say('농부', '내 논 한가운데로 길이 났지. \'차도 몇 대 없는데 무슨 고속도로냐\'고 반대하는 사람도 많았어.');
          await say('농부', '그래도 이 길로 서울 사는 아들이 하루 만에 내려온다니… 허허.');
        }),
        pickup('scissors', 19, 12, 'scissors', 'scissors', { if: () => F('c1_mc') && !F('c1_cut') }),
        obj('jars', 10, 11, 'jars'),
        npc('saemaul', 17, 12, LOOK.manB, 'left', '새마을 지도자', async () => {
          await say('새마을 지도자', '올해부터 [새마을 운동]이 시작됐어! \'근면·자조·협동!\' 초가지붕을 슬레이트로 바꾸고 마을길도 넓히고 있지.');
          await say('새마을 지도자', '정부가 시멘트를 나눠 주고, 잘하는 마을엔 더 지원해 준다네. 아침마다 마을 스피커에서 노래가 울려 퍼지지.');
          if (!photoTaken('p_saemaul')) {
            await C('새로 얹은 슬레이트 지붕이 보여! 보너스 사진으로 남겨 두자.');
            await snap('p_saemaul');
            await C('새마을 운동으로 농촌이 크게 달라졌지만, 정부가 이끌며 정권 홍보에도 쓰였다는 평가가 있어.');
          }
        }),
        npc('farmer2', 5, 12, LOOK.oldman, 'right', '할아버지', async () => {
          await say('할아버지', '우리 집 초가지붕도 내년엔 슬레이트로 바꾼다오. 비 새는 걱정은 덜겠지.');
        }),
      ],
    },

    /* ---------- 1970 평화시장 ---------- */
    {
      id: 'zjeon', year: '1970년 11월', place: '서울 · 평화시장', hud: '1970', goal: 'p_jeon',
      hint: () => !F('c1_coin') ? '안쪽 재단대 앞의 재단사에게 말을 걸어 보자.'
        : has('coin') ? '밖에 있는 풀빵 장수에게 풀빵을 사자.'
          : has('bbang') ? '배고픈 어린 시다에게 풀빵을 건네자.'
            : !F('c1_jeon_gone') ? '재단사 전태일에게 다시 말을 걸어 보자.'
              : !photoTaken('p_jeon') ? '재단대 위에 남은 책을 조사하자.' : '오른쪽으로 가자.',
      rows: [
        'GGGGGGGGGGGGGGGGGGGGGGGG',
        'C######################C',
        'C' + 'o'.repeat(16) + 'kkk' + 'ooo' + 'C',
        'C' + 'o'.repeat(22) + 'C',
        'C' + 'o'.repeat(22) + 'C',
        'VVVVVoVVVVVVVVVVVVoVVVVV',
        '::::::::::::::::::::::::',
        '========================',
        '========================',
        '::::::::::::::::::::::::',
        'GGGGGGRRRRRRGGGGGGRRRRRR',
        'GGGGGGRRRRRRGGGGGGRRRRRR',
        'GGGGGGRRRRRRGGGGGGRRRRRR',
        'GGGGGGRRRRRRGGGGGGRRRRRR',
      ],
      ents: [
        obj('s1', 2, 3, 'sewing'), obj('s2', 4, 3, 'sewing'), obj('s3', 6, 3, 'sewing'),
        obj('s4', 8, 3, 'sewing'), obj('s5', 10, 3, 'sewing'), obj('s6', 12, 3, 'sewing'),
        npc('w1', 2, 2, LOOK.workerGirl, 'down', '미싱사', async () => {
          await say('미싱사', '천장이 낮아서 허리를 펼 수가 없어요. 하루 종일 구부리고 일해요.');
        }),
        npc('w2', 4, 2, LOOK.sida, 'down', '시다', async () => {
          await say('시다', '먼지 때문에 기침이 멈추질 않아요… 콜록콜록.');
        }),
        npc('w3', 6, 2, LOOK.workerGirl, 'down', '미싱사', async () => {
          await say('미싱사', '잠 안 오는 약을 먹고 밤새 미싱을 돌릴 때도 있어요. 납품 날짜를 맞춰야 하니까요.');
        }),
        npc('w4', 8, 2, LOOK.sida, 'down', '시다', async () => {
          await say('시다', '열세 살이에요. 학교 대신 여기 왔어요.');
        }),
        npc('w5', 10, 2, LOOK.womanB, 'down', '미싱사', async () => {
          await say('미싱사', '햇빛을 못 봐서 다들 얼굴이 하얘요. 눈도 점점 나빠지고요.');
        }),
        npc('w6', 12, 2, LOOK.sida, 'down', '시다', async () => {
          await say('시다', '일요일에도 쉬는 날이 거의 없어요.');
        }),
        npc('owner', 15, 4, LOOK.suit, 'left', '사장', async () => {
          await say('사장', '납품 날짜가 코앞이야. 오늘도 철야다! 놀 시간이 어디 있어?');
        }),
        npc('jeon', 18, 3, LOOK_JEON, 'up', '전태일', async () => {
          if (!F('c1_coin')) {
            setF('c1_coin');
            await say('전태일', '나는 이 작업장의 재단사 전태일이오.');
            await say('전태일', '저 아이들 좀 보시오. 열서너 살 어린 시다들이 햇빛도 안 드는 다락방에서 하루 열네 시간씩 일하오.');
            await say('전태일', '일당은 차 한 잔 값이오. 그것도 허리도 못 펴는 높이에서, 먼지를 마셔 가며.');
            await say('전태일', '나는 버스비로 풀빵을 사서 아이들에게 나눠 주고 집까지 걸어가곤 하지. 오늘도…');
            await say('전태일', '자, 이 돈으로 밖에서 풀빵을 좀 사다 주겠소? 저기 배고픈 아이에게 주고 싶소.');
            give('coin');
            return;
          }
          if (!F('c1_fed')) { await say('전태일', '풀빵 장수는 시장 앞 길가에 있소.'); return; }
          await say('전태일', '고맙소. 하지만 풀빵으로는 아무것도 바뀌지 않소.');
          await say('전태일', '이게 [근로기준법] 책이오. 하루 8시간 노동, 정기 휴일, 건강 검진… 법에는 다 적혀 있는데 여기선 아무도 지키지 않소.');
          await say('전태일', '노동청에 진정도 하고, 신문사에도 찾아갔소. 동료들과 \'바보회\'도 만들었지. 그런데도 세상은 꿈쩍하지 않는구려.');
          await say('전태일', '…나에게 대학생 친구가 하나 있다면 좋겠소. 이 어려운 법전을 함께 읽어 줄.');
          await fadeOut(900);
          await narr('1970년 11월 13일, 평화시장 앞.');
          await narr('전태일은 "근로기준법을 준수하라! 우리는 기계가 아니다! 일요일은 쉬게 하라!"라고 외치며 스스로 몸에 불을 붙였다.');
          await narr('"내 죽음을 헛되이 하지 말라." 그의 나이 스물두 살이었다.');
          setF('c1_jeon_gone');
          await fadeIn(900);
          await C('…');
          await C('그의 죽음 뒤에야 사람들은 화려한 성장 뒤에 가려진 노동자들의 현실을 마주했어. 그의 어머니 이소선 여사는 평생 노동자들 곁을 지켰지.');
          await C('재단대 위에 그가 남긴 근로기준법 책이 있어. 이 장면을… 기록하자.');
        }, { show: () => !F('c1_jeon_gone') }),
        obj('book', 18, 2, 'note', undefined, async () => {
          if (photoTaken('p_jeon')) { await narr('손때 묻은 근로기준법 책. 여러 군데 밑줄이 그어져 있다.'); return; }
          await narr('손때 묻은 근로기준법 책. 여러 군데 밑줄이 그어져 있다.');
          await snap('p_jeon');
        }, { show: () => F('c1_jeon_gone'), solid: false }),
        npc('mourn1', 17, 3, LOOK.workerGirl, 'up', '미싱사', async () => {
          await say('미싱사', '태일 오빠는 늘 우리 편이었어요…');
        }, { show: () => F('c1_jeon_gone') }),
        npc('mourn2', 19, 3, LOOK.man, 'up', '동료 재단사', async () => {
          await say('동료 재단사', '태일이가 남긴 말을 잊지 않을 거요. 우린 기계가 아니오.');
        }, { show: () => F('c1_jeon_gone') }),
        npc('hungry', 21, 3, LOOK.sida, 'left', '어린 시다', async () => {
          if (F('c1_fed')) { await say('어린 시다', '풀빵, 정말 맛있었어요. 고맙습니다!'); return; }
          if (has('bbang')) {
            take('bbang');
            setF('c1_fed');
            await say('어린 시다', '와아… 따끈따끈한 풀빵! 고맙습니다!');
            emote('hungry', '♥', 1800);
            ['w2', 'w4', 'w6'].forEach(id => emote(id, '♪', 1800));
            await say('어린 시다', '언니들이랑 나눠 먹을게요. 태일 오빠한테도 고맙다고 전해 주세요.');
            return;
          }
          setF('c1_sida');
          await say('어린 시다', '배고파요… 아침부터 아무것도 못 먹었어요.');
          await say('어린 시다', '하루 열네 시간을 일하는데, 일당이 차 한 잔 값이래요.');
        }),
        obj('cart', 9, 6, 'cart'),
        npc('vendor', 11, 6, LOOK.vendorM, 'left', '풀빵 장수', async () => {
          if (has('coin')) {
            take('coin');
            give('bbang');
            await say('풀빵 장수', '풀빵 한 봉지! 갓 구워서 따끈따끈하다. 시다 아이들 주려고? 하나 더 넣었다.');
          } else {
            await say('풀빵 장수', '따끈한 풀빵 사려우? 평화시장 아이들이 제일 좋아하지.');
          }
        }),
        npc('hd', 3, 9, LOOK.hd70, 'up', HD, async () => {
          if (!F('c1_jeon_gone')) {
            await say(HD, '자네, 또 만났군! 이상하게 자네를 보면 낯이 익어.');
            await say(HD, '지난달 한 신문에 평화시장의 실태가 실렸지. 잠깐 떠들썩했을 뿐, 바뀐 건 없었어.');
            await say(HD, '나도 기사를 써 봤지만 데스크에서 잘렸네. 이 시절 신문은 정부와 기업의 눈치를 봐야 하거든.');
          } else {
            await say(HD, '…그 청년의 이야기가 이제야 신문 1면에 실렸어. 너무 늦었지.');
            await say(HD, '그의 죽음 뒤로 대학생들이 노동자들을 찾아오기 시작했고, 청계피복노조가 만들어졌다네.');
          }
        }),
      ],
    },

    /* ---------- 1972 10월 유신 ---------- */
    {
      id: 'zyushin', year: '1972년 10월 17일', place: '서울 · 전파사 앞', hud: '1972', goal: 'p_yushin',
      hint: () => !photoTaken('p_yushin') ? '전파사 앞 TV에서 무슨 발표가 나오는지 보자.' : '오른쪽으로 가자! 신문 가판대에도 보너스 사진이 있어.',
      rows: [
        'RRRRRRGGGGGGGGRRRRRRTT',
        'RRRRRRGGGGGGGGRRRRRRTT',
        'BWBWBWCVVVVVVCBWWBWBTT',
        'BWDWBWCEEEEEECBWDWBWTT',
        '::::::::::::::::::::::',
        '::::::::::::::::::::::',
        '======================',
        '----------------------',
        '======================',
        '======================',
        '::::::::::::::::::::::',
        '..t...,,....t...,,..t.',
        '.....,,.........,,....',
        'TTTTTTTTTTTTTTTTTTTTTT',
      ],
      ents: [
        obj('tv', 9, 4, 'tv', undefined, async () => {
          await narr('(TV) 흑백 화면 속에서 대통령 특별 선언이 발표되고 있다.');
          await narr('"…오늘 19시를 기해 전국에 비상계엄을 선포한다. 국회를 해산하고, 정당 및 정치 활동을 중지시킨다…"');
          if (photoTaken('p_yushin')) return;
          await narr('1972년 10월 17일. 이른바 [10월 유신]의 시작이었다.');
          await C('곧 [유신 헌법]이 만들어져. 대통령은 국민이 직접 뽑지 않고 \'통일주체국민회의\'에서 뽑아. 임기는 6년, 몇 번이든 다시 할 수 있지.');
          await C('대통령은 국회의원 3분의 1을 사실상 지명하고, 국회를 해산할 수 있고, [긴급 조치]로 국민의 자유를 제한할 수도 있었어. 권력이 한 사람에게 몰린 거야.');
          await C('TV 앞에 모인 사람들의 모습을 찍어 두자.');
          await snap('p_yushin');
        }),
        npc('kid', 8, 5, LOOK.kidB, 'up', '아이', async () => {
          await say('아이', '아빠, 테레비에서 만화는 언제 나와?');
        }),
        npc('man', 9, 5, LOOK.hatman, 'up', '아저씨', async () => {
          await say('아저씨', '석 달 전엔 남북이 통일하자며 공동 성명을 내더니, 이번엔 계엄이라니… 어리둥절하구먼.');
        }),
        npc('woman', 10, 5, LOOK.woman, 'up', '아주머니', async () => {
          await say('아주머니', '그래도 경제는 쑥쑥 크고 있잖아요. 먹고사는 게 먼저지.');
        }),
        npc('stu', 11, 5, LOOK.student, 'up', '대학생', async () => {
          await say('대학생', '1969년엔 대통령을 세 번까지 할 수 있게 헌법을 고치더니(3선 개헌), 작년 선거에선 [김대중] 후보에게 간신히 이겼지.');
          await say('대학생', '이제는 아예 국민이 대통령을 뽑지 못하게 하겠다는 거야.');
        }),
        npc('shop', 12, 4, LOOK.manB, 'left', '전파사 주인', async () => {
          await say('전파사 주인', '요즘 테레비 사려는 사람이 부쩍 늘었어. 그래도 아직 동네에 몇 대 없으니 이렇게 가게 앞에 모여서 보지.');
        }),
        obj('papers', 3, 10, 'papers', undefined, async () => {
          await narr('신문 1면: 「남북 공동 성명 발표 ― 자주·평화·민족 대단결」 (1972년 7월 4일자)');
          if (!photoTaken('p_74')) {
            await C('석 달 전의 신문이네. 보너스 사진으로 남겨 두자!');
            await snap('p_74');
          }
        }),
        npc('newsman', 4, 10, LOOK.vendorM, 'up', '가판대 주인', async () => {
          await say('가판대 주인', '석 달 전 7월 4일, 남북이 서울과 평양에서 동시에 [7·4 남북 공동 성명]을 발표했지!');
          await say('가판대 주인', '자주, 평화, 민족 대단결. 그날은 정말 통일이 되는 줄 알았다니까.');
        }),
        obj('bench', 14, 12, 'bench'),
        npc('old', 15, 12, LOOK.oldman, 'left', '할아버지', async () => {
          await say('할아버지', '나라가 잘살게 된다면야… 허허. 그런데 요즘은 말 한마디도 조심해야 해.');
          await say('할아버지', '막걸리 마시다 정부 욕 한마디 했다고 잡혀간 사람도 있다네.');
        }),
      ],
    },

    /* ---------- 1979 ---------- */
    {
      id: 'z1026', year: '1979년 10월', place: '서울 · 호외가 뿌려진 거리', hud: '1979', goal: 'p_1026',
      hint: () => {
        const n = ['ex1', 'ex2', 'ex3'].filter(F).length;
        if (!F('c1_newsboy')) return '신문팔이 소년에게 말을 걸어 보자.';
        if (n < 3) return `바람에 날아간 호외 세 장을 찾아보자. (${n}/3)`;
        if (!photoTaken('p_1026')) return '소년에게 호외를 돌려주자.';
        return '오른쪽 끝의 시간의 문으로 가자!';
      },
      rows: [
        'RRRRRRGGGGGGRRRRRRGGGGGGTT',
        'RRRRRRGGGGGGRRRRRRGGGGGGTT',
        'BWBWBWCwwCwwBWBWBWCwCwwCTT',
        'BWDWBWCwDwwCBVVVVBCDwwCCTT',
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
        npc('newsboy', 6, 5, LOOK.newsboy, 'down', '신문팔이 소년', async () => {
          const n = ['ex1', 'ex2', 'ex3'].filter(F).length;
          if (photoTaken('p_1026')) { await say('신문팔이 소년', '호외요, 호외! 세상이 뒤집혔어요!'); return; }
          if (!F('c1_newsboy')) {
            setF('c1_newsboy');
            await say('신문팔이 소년', '호외요, 호외! …으앗, 바람에 호외가 다 날아갔어요!');
            await say('신문팔이 소년', '저기, 세 장만 주워다 줄래요? 길가랑 공원 쪽으로 날아갔어요!');
            return;
          }
          if (n < 3) { await say('신문팔이 소년', `아직 다 못 찾았어요? (${n}/3) 길가랑 공원 쪽으로 날아갔어요!`); return; }
          take('extra');
          await say('신문팔이 소년', '고마워요! 자, 이건 형 거예요. 다들 이 소식을 기다리고 있었어요.');
          await narr('호외 1면: 「박정희 대통령 서거」');
          await narr('10월 26일 밤, 서울 궁정동 안가에서 김재규 중앙정보부장이 쏜 총에 박정희 대통령이 숨졌다.');
          setF('c1_read');
          ['read1', 'read2', 'read3'].forEach(id => emote(id, '!', 1500));
          await wait(600);
          await C('18년간 이어진 박정희 정부가 끝나는 순간이야. 사람들의 표정을 기록하자.');
          await snap('p_1026');
          await C('유신 체제는 끝났어. 사람들은 이제 민주주의가 올 거라 기대했지. 하지만…');
          await C('오른쪽 끝에 [시간의 문]이 열렸어. 준비되면 가 보자!');
        }),
        npc('read1', 5, 5, LOOK.hatman, 'right', '시민', async () => {
          await say('시민', '세상에… 이제 어떻게 되는 거지?');
        }, { show: () => F('c1_read') }),
        npc('read2', 7, 5, LOOK.woman, 'left', '시민', async () => {
          await say('시민', '유신이 끝났으니 이제 대통령을 우리 손으로 뽑을 수 있을까요?');
        }, { show: () => F('c1_read') }),
        npc('read3', 6, 4, LOOK.student, 'down', '대학생', async () => {
          await say('대학생', '민주주의의 봄이 올 거야. 꼭 그래야 해.');
        }, { show: () => F('c1_read') }),
        ...[['ex1', 3, 10], ['ex2', 13, 12], ['ex3', 21, 4]].map(([id, x, y]) => {
          const get = async () => {
            if (F(id)) return;
            setF(id);
            give('extra', true);
            sfx('item');
            const n = ['ex1', 'ex2', 'ex3'].filter(F).length;
            toast(`호외를 주웠다! (${n}/3)`);
            if (n === 3) await C('세 장 다 찾았어! 신문팔이 소년에게 돌아가자.');
          };
          return { id, x, y, prop: 'paper', solid: false, show: () => F('c1_newsboy') && !F(id), talk: get, step: get };
        }),
        npc('yh', 10, 4, LOOK.workerGirl, 'down', 'YH무역 노동자', async () => {
          await say('YH무역 노동자', '8월에 회사가 갑자기 문을 닫는다고 해서, 우리 여성 노동자들은 야당인 신민당 당사에서 농성을 했어요.');
          await say('YH무역 노동자', '그런데 경찰이 들이닥쳐서… 동료 김경숙이 목숨을 잃었어요.');
          await say('YH무역 노동자', '그 뒤 정부와 맞서던 신민당 총재 [김영삼]이 국회의원직에서 제명됐죠.');
        }),
        npc('busan', 15, 10, LOOK.protester, 'up', '부산 대학생', async () => {
          await say('부산 대학생', '김영삼 총재가 제명되자 10월 16일부터 부산에서, 이어 마산에서 "유신 철폐, 독재 타도!" 시위가 크게 일어났어.');
          await say('부산 대학생', '[부마 민주 항쟁]이라고 부르지. 정부는 부산에 비상계엄까지 선포했어.');
          await say('부산 대학생', '이 시위를 어떻게 막을지를 두고 권력 안에서도 다툼이 벌어졌다더군.');
        }),
        obj('sign100', 20, 11, 'bigsign', { color: '#c83a2a' }, async () => {
          await narr('광고판: 「수출 100억 달러 달성! 1977」');
        }),
        npc('biz', 19, 12, LOOK.suit, 'right', '회사원', async () => {
          await say('회사원', '1970년대엔 정부가 철강, 조선, 화학 같은 [중화학 공업]을 밀어줬지. 1973년엔 포항제철에서 첫 쇳물이 나왔고!');
          await say('회사원', '그리고 1977년, 드디어 수출 100억 달러를 넘겼어. 1964년 1억 달러에서 13년 만에 100배라고!');
          if (!photoTaken('p_100')) {
            await C('경제 성장의 상징이야. 보너스 사진으로 찍어 두자!');
            await snap('p_100');
          }
        }),
        npc('mom', 23, 10, LOOK.mother, 'left', '어머니', async () => {
          await say('어머니', '우리 아들이 대학에서 유신 반대 유인물을 돌렸다고 잡혀갔어요. [긴급 조치] 위반이래요.');
          await say('어머니', '1975년엔 \'인혁당 재건위 사건\'으로 여덟 명이 사형 판결을 받은 지 하루도 안 돼 처형되기도 했다우…');
          await C('그분들은 2007년 재심에서 모두 무죄를 선고받았어. 너무 늦은 진실이었지.');
        }),
        npc('police', 12, 5, LOOK.police, 'left', '경찰', async () => {
          await say('경찰', '거기! 머리가 너무 길군. 장발 단속이다! …응? 넌 짧구나. 가 봐.');
          await C('1970년대엔 경찰이 거리에서 긴 머리와 짧은 치마를 단속했어. 나라가 옷차림까지 간섭하던 시절이지.');
        }),
        npc('hd', 2, 5, LOOK.hd70, 'right', HD, async () => {
          if (!photoTaken('p_1026')) {
            await say(HD, '자네… 1961년 그 새벽에 만났던 학생 아닌가? 어떻게 그대로지?');
            await say(HD, '아니, 아닐세. 내가 잘못 봤겠지. 어젯밤 궁정동 쪽이 심상치 않았다는 소문이 돌아. 호외를 기다리는 중이야.');
          } else {
            await say(HD, '18년… 한 시대가 이렇게 끝나는구먼.');
            await say(HD, '나라는 몰라보게 부유해졌어. 굶주림에서 벗어났지. 하지만 그 대가로 많은 사람이 입을 막히고, 잡혀가고, 다쳤어.');
            await say(HD, '역사는 둘 다 기억해야 하네. 빛도, 그림자도.');
          }
        }),
        gateDef(25, 7),
      ],
    },
  ],
});
