const questions = [
  {
    question: "which is the largest animal in this world",
    answers: [
      { text: "shark", correct: "false" },
      { text: "Blue Whale", correct: "true" },
      { text: "Elephant", correct: "false" },
      { text: "Girafee", correct: "false" },
    ],
  },
  {
    question: "which is the largest desert in this world",
    answers: [
      { text: "kalahari", correct: "false" },
      { text: "Gobi", correct: "false" },
      { text: "Sahara", correct: "false" },
      { text: "Antartica", correct: "true" },
    ],
  },
  {
    question: "which is the smallest country in this world",
    answers: [
      { text: "vatican city", correct: "true" },
      { text: "Bhuta", correct: "false" },
      { text: "Nepal", correct: "false" },
      { text: "Shri Lanka", correct: "false" },
    ],
  },
  {
    question: "which is the smallest continent in this world",
    answers: [
      { text: "Asia", correct: "false" },
      { text: "Australia", correct: "true" },
      { text: "Artic", correct: "false" },
      { text: "Africa", correct: "false" },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("inCorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = ` You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = `Play Again`;
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
