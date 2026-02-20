const { getRandomQuote } = require("./quotes");

const MORNING_TEMPLATE = `## 🌅 **아침 점검 (Morning Check-in)**

*"오늘 어떻게 훈련해볼지" - 계획과 준비*

1. **"오늘 하나만큼은 꼭 해내고 싶은 건요?"**
    - 가장 우선순위가 높은 훈련 목표 1개
    - "이것만 되어도 오늘은 성공"이라고 할 수 있는 것
2. **"그게 잘됐다는 건 뭘 보고 알 수 있을까요?"**
    - 구체적이고 측정 가능한 성공 지표
3. **"언제, 어떻게 하시겠어요?"**
    - 구체적인 시간대와 방법
4. **"혹시 걱정되는 게 있나요?"**
    - 예상되는 장애물이나 어려움
    - 과거에 실패했던 패턴들
5. **"그걸 위해 뭘 대비/예방하면 좋을까요?"**
    - 구체적인 대비책과 대안 계획
    - 막혔을 때 활용할 자료나 방법`;

const MIDDAY_TEMPLATE = `## 🍽️ **점심 점검 (Midday Check-in)**

*"잘 되고 있는지, 잘 안된다면 왜 그런지, 어떻게 바꿔볼지" - 중간 조정*

1. **"아침에 계획했던 것은 어떻게 되고 있나요?"**
    - 현재까지의 진행 상황 점검, 성공 지표 대비 현재 위치
2. **"내가 바라던 결과와 어떤 차이가 있나요?"**
    - 예상과 실제 간의 차이점 분석, 더 잘한 부분이나 못한 부분
3. **"지금까지 과정에서 무엇을 배웠나요?"**
    - 새로 발견한 패턴이나 인사이트, 예상치 못한 어려움이나 해결책
4. **"앞으로 어떻게 하시겠어요?"**
    - 오전 경험을 바탕으로 한 조정 계획, 다른 접근법이나 우선순위 변경
5. **"혹시 걱정되는 게 있나요?"**
    - 예상되는 장애물이나 어려움
    - 과거에 실패했던 패턴들
6. **"그걸 위해 뭘 대비/예방하면 좋을까요?"**
    - 구체적인 대비책과 대안 계획
    - 막혔을 때 활용할 자료나 방법`;

const EVENING_TEMPLATE = `## 🌙 **저녁 점검 (Evening Check-in)**

*"평가, 회고, 내일 어떻게 해볼지" - 성찰과 계획*

1. **"오늘 목표했던 것은 어떻게 되었나요?"**
    - 아침에 세운 목표 달성도 평가, 구체적인 성과와 결과물 점검
2. **"내가 바라던 결과와 어떤 차이가 있나요?"**
    - 예상과 실제 간의 차이점 분석, 더 잘한 부분이나 못한 부분
3. **"어떤 패턴을 발견했나요? 어떻게 도식화 해볼 수 있을까요?"**
    - 자주 반복되는 실수나 성공 패턴, 나만의 효과적인 학습 방법 발견
4. **"내일까지 이거 하나만큼은 하면 참 좋겠다 하는 건요?"**
    - 내일의 핵심 목표 1개 설정, 오늘의 연장선상에서 한 단계 더 나아갈 지점
5. **"그걸 위해 어떤 준비를 해둘까요?"**
    - 내일 아침에 바로 시작할 수 있는 환경 설정, 필요한 자료나 도구 준비`;

const TEMPLATE_CONFIG = {
  morning: {
    timeLabel: "아침 점검",
    template: MORNING_TEMPLATE,
    greeting: "좋은 아침이에요! 오늘 하루를 설계할 준비가 되셨나요?",
  },
  midday: {
    timeLabel: "점심 점검",
    template: MIDDAY_TEMPLATE,
    greeting: "오전 수고 많으셨어요! 지금까지의 진행 상황을 점검해볼까요?",
  },
  evening: {
    timeLabel: "저녁 점검",
    template: EVENING_TEMPLATE,
    greeting: "오늘 하루 정말 수고 많으셨어요! 마무리하며 회고해볼까요?",
  },
};

/**
 * 점검 유형에 따른 전체 메시지 생성
 * @param {string} type - 'morning' | 'midday' | 'evening'
 * @param {string} roleMention - '<@&역할ID>' 형태의 멘션 문자열
 * @returns {string} 인사말 + 템플릿 + 랜덤 명언
 */
function buildMessage(type, roleMention) {
  const config = TEMPLATE_CONFIG[type];
  if (!config) {
    throw new Error(`Unknown template type: ${type}`);
  }

  const greeting = `${roleMention} ${config.greeting} ${config.timeLabel} 템플릿을 작성해주세요.`;
  const quote = getRandomQuote();

  return `${greeting}\n\n${config.template}\n\n${quote}`;
}

module.exports = { buildMessage };
