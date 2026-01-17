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
  }
];

let current = 0;
const answers = [];

const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const stepText = document.getElementById("stepText");

loadQuestion();

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
