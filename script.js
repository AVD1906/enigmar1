const questions = [
  {
    features: `
Signal Strength: LOW
Temperature Drop: YES
Radio Pattern: STRUCTURED
EM Distortion: LOW`,
    options: [
      "Demogorgon Alert",
      "Radio Static / Interference",
      "Hawkins Anomaly"
    ],
    correct: "Demogorgon Alert"
  },
  {
    features: `
Signal Strength: HIGH
Temperature Drop: NO
Radio Pattern: RANDOM
EM Distortion: HIGH`,
    options: [
      "Radio Static / Interference",
      "Demogorgon Alert",
      "Unknown Upside Pattern"
    ],
    correct: "Radio Static / Interference"
  },
  {
    features: `
Signal Strength: MEDIUM
Temperature Drop: YES
Radio Pattern: REPEATING
EM Distortion: MEDIUM`,
    options: [
      "Upside Down Rift",
      "Hawkins Anomaly",
      "Radio Static / Interference"
    ],
    correct: "Upside Down Rift"
  },
  {
    features: `
Signal Strength: MEDIUM
Temperature Drop: UNKNOWN
Radio Pattern: STABLE
EM Distortion: LOW`,
    options: [
      "Unknown Upside Pattern",
      "Hawkins Anomaly",
      "Upside Down Rift"
    ],
    correct: "Unknown Upside Pattern"
  },
  {
    features: `
Signal Strength: HIGH
Temperature Drop: YES
Radio Pattern: STABLE
EM Distortion: LOW`,
    options: [
      "Demogorgon Alert",
      "Hawkins Anomaly",
      "Radio Static / Interference"
    ],
    correct: "Demogorgon Alert"
  },
  {
    features: `
Signal Strength: MEDIUM
Temperature Drop: NO
Radio Pattern: IRREGULAR
EM Distortion: MEDIUM`,
    options: [
      "Unknown Upside Pattern",
      "Radio Static / Interference",
      "Upside Down Rift"
    ],
    correct: "Unknown Upside Pattern"
  }
];

let current = 0;
let score = 0;
let timeLeft = 90;
let finished = false;

const featuresEl = document.getElementById("features");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");

function loadQuestion() {
  if (current >= questions.length) {
    endGame();
    return;
  }

  featuresEl.textContent = questions[current].features;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  questions[current].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (finished) return;

  if (choice === questions[current].correct) {
    score++;
    feedbackEl.textContent = "✔ Classification Accepted";
  } else {
    feedbackEl.textContent = "✖ Classification Rejected";
  }

  current++;
  setTimeout(loadQuestion, 900);
}

function endGame() {
  finished = true;
  featuresEl.textContent = "";
  optionsEl.innerHTML = "";

  if (score >= 5) {
    feedbackEl.innerHTML =
      "MODEL STABLE<br><br>FLAG{MODEL_PREDICTS_TRUTH}";
  } else {
    feedbackEl.innerHTML =
      "MODEL FAILED<br>SIGNAL LOST";
  }
}

setInterval(() => {
  if (finished) return;

  timeLeft--;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    endGame();
  }
}, 1000);

loadQuestion();
