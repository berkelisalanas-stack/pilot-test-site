const introScreen = document.getElementById("introScreen");
const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.onclick = () => {
   const assessment = document.querySelector(".assessment");

assessment.classList.remove("intro-active");
assessment.classList.add("assessment-active");

current = 0;
loadQuestion();

  };
}


const questions = [
  {
    text: "During recent duty periods, how often have you continued operating despite feeling cognitively slowed or less alert than normal?",
    options: [
      "Not observed",
      "Occasionally",
      "Frequently",
      "Consistently"
    ]
  },
  {
    text: "How would you rate your sleep quality prior to early or late duty start times?",
    options: [
      "Consistently adequate",
      "Generally adequate",
      "Often inadequate",
      "Severely inadequate"
    ]
  },
  {
    text: "How often do you notice increased effort required to maintain situational awareness?",
    options: [
      "Rarely",
      "Sometimes",
      "Often",
      "Almost every duty period"
    ]
  },
  {
    text: "During routine operations, how often do you need to consciously slow yourself down to avoid errors?",
    options: [
      "Rarely",
      "Occasionally",
      "Frequently",
      "Almost always"
    ]
  },
  {
    text: "How often do you experience difficulty recalling standard procedures without reference?",
    options: [
      "Never",
      "Occasionally",
      "Frequently",
      "Very frequently"
    ]
  },
  {
    text: "How would you describe your alertness during the final sectors of multi-leg duty days?",
    options: [
      "Fully alert",
      "Slightly reduced",
      "Noticeably reduced",
      "Significantly impaired"
    ]
  },
  {
    text: "How often do you continue a task despite recognizing reduced performance effectiveness?",
    options: [
      "Never",
      "Occasionally",
      "Frequently",
      "Almost every duty period"
    ]
  },
  {
    text: "How often do you feel that recovery between duty periods is insufficient?",
    options: [
      "Rarely",
      "Sometimes",
      "Often",
      "Almost always"
    ]
  },
  {
    text: "During high workload phases, how often do you rely on habit rather than deliberate cross-checking?",
    options: [
      "Rarely",
      "Sometimes",
      "Often",
      "Almost always"
    ]
  },
  {
    text: "How frequently do you notice delayed recognition of minor deviations or errors?",
    options: [
      "Never",
      "Occasionally",
      "Frequently",
      "Very frequently"
    ]
  }
];

const domainMap = [
  "sleep",       // Q1
  "sleep",       // Q2
  "cognitive",   // Q3
  "cognitive",   // Q4
  "cognitive",   // Q5
  "sleep",       // Q6
  "decision",    // Q7
  "recovery",    // Q8
  "decision",    // Q9
  "cognitive"    // Q10
];


let current = 0;
const answers = [];

const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const stepText = document.getElementById("stepText");


function loadQuestion() {
  questionText.textContent = questions[current].text;
  answersDiv.innerHTML = "";
  nextBtn.classList.remove("enabled");
  nextBtn.disabled = true;

  stepText.textContent = `Assessment ${current + 1} of ${questions.length}`;
  progressBar.style.width = `${(current / questions.length) * 100}%`;

  questions[current].options.forEach(option => {
    const div = document.createElement("div");
    div.className = "answer";
    div.textContent = option;
    div.onclick = () => selectAnswer(div, option);
    answersDiv.appendChild(div);
  });
}

function selectAnswer(element, value) {
  document.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
  element.classList.add("selected");
  answers[current] = value;
  nextBtn.classList.add("enabled");
  nextBtn.disabled = false;
}

function calculateDomains() {
  const scores = {
    sleep: 0,
    cognitive: 0,
    decision: 0,
    recovery: 0
  };

  answers.forEach((_, index) => {
    // pasirinkimo indeksas = 0..3
    const selected = document.querySelectorAll(".answer.selected")[0];
    // saugiau: remiamės pasirinkimo eiliškumu
    const optionIndex = answers[index] ? document
      .querySelectorAll(".answers .answer.selected").length : 0;

    // paprasčiau: balai = current pasirinkimo indexas (0–3)
    const value = document
      .querySelectorAll(".answers .answer.selected").length;

    // BET mes jau turim answers[] tik tekstams,
    // todėl balus skaičiuosim taip:
    const answerText = answers[index];
    const optionIdx = questions[index].options.indexOf(answerText);
    const points = Math.max(0, optionIdx); // 0–3

    const domain = domainMap[index];
    scores[domain] += points;
  });

  return scores;
}

function riskLevel(value, max) {
  const ratio = value / max;

  if (ratio < 0.34) return "low";
  if (ratio < 0.67) return "moderate";
  return "elevated";
}

function domainAdvice(domain, level) {
  const advice = {
    sleep: {
      low: "Current sleep-related fatigue indicators appear well controlled. Maintain existing rest strategies.",
      moderate: "Review recent sleep duration and circadian alignment, particularly before early or late duty starts.",
      elevated: "High sleep-related fatigue risk detected. Consider delaying non-essential duties and prioritize recovery sleep."
    },
    cognitive: {
      low: "Cognitive performance indicators are within expected operational limits.",
      moderate: "Increased cognitive effort noted. Apply deliberate pacing and structured cross-checking.",
      elevated: "Elevated cognitive fatigue risk. Expect slowed processing and increase reliance on standard operating procedures."
    },
    decision: {
      low: "Decision-making indicators suggest stable operational judgement.",
      moderate: "Decision bias risk observed. Actively challenge continuation bias during time-pressured situations.",
      elevated: "High decision-making risk detected. Avoid discretionary task continuation and seek peer verification."
    },
    recovery: {
      low: "Recovery practices appear adequate between duty periods.",
      moderate: "Recovery effectiveness may be reduced. Reassess rest opportunities and cumulative duty impact.",
      elevated: "Insufficient recovery detected. Immediate recovery prioritization is strongly recommended."
    }
  };

  return advice[domain][level];
}


nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
 } else {
  questionText.textContent = "System processing assessment data...";
  answersDiv.innerHTML = "";
  nextBtn.style.display = "none";
  progressBar.style.width = "100%";

  setTimeout(showResults, 1500);
}

function showResults() {
  const scores = calculateDomains();

  const max = 9; // max per domain (3 balai × ~3 klausimai)
  const sleepLevel = riskLevel(scores.sleep, max);
const cognitiveLevel = riskLevel(scores.cognitive, max);
const decisionLevel = riskLevel(scores.decision, max);
const recoveryLevel = riskLevel(scores.recovery, max);


  
  document.getElementById("card").innerHTML = `
    <div class="question">Fatigue Risk Profile</div>

    ${renderBar("Sleep & Circadian Risk", scores.sleep, max)}
    ${renderBar("Cognitive Performance Risk", scores.cognitive, max)}
    ${renderBar("Operational Decision Risk", scores.decision, max)}
    ${renderBar("Recovery & Mitigation Risk", scores.recovery, max)}

    <div class="recommendations">
  <h4>Operational Guidance</h4>

  <p><strong>Sleep & Circadian:</strong> ${domainAdvice("sleep", sleepLevel)}</p>
  <p><strong>Cognitive Performance:</strong> ${domainAdvice("cognitive", cognitiveLevel)}</p>
  <p><strong>Operational Decision-Making:</strong> ${domainAdvice("decision", decisionLevel)}</p>
  <p><strong>Recovery & Mitigation:</strong> ${domainAdvice("recovery", recoveryLevel)}</p>
</div>

  `;
}

function renderBar(label, value, max) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return `
    <div class="bar-block">
      <div class="bar-label">${label}</div>
      <div class="bar-bg">
        <div class="bar-fill" style="width:${percent}%"></div>
      </div>
    </div>
  `;
}

  
  
};
