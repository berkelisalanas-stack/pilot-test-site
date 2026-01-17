const introScreen = document.getElementById("introScreen");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = () => {
  introScreen.classList.add("hidden");
  document.getElementById("card").classList.remove("hidden");
  loadQuestion();
};


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

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    questionText.textContent = "System processing assessment data...";
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";
    progressBar.style.width = "100%";
  }
};
