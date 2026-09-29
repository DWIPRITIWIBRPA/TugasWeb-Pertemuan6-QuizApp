const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        answers:[
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Bahasa yang digunakan untuk mengatur tampilan halaman web adalah?",
        answers:[
            "HTML",
            "CSS",
            "JavaScript",
            "PHP"
        ],
        correctAnswer: "CSS"
    },
    {
        question: "Bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif adalah?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correctAnswer: "JavaScript"
    },
    {
        question: "Apa fungsi utama dari CSS?",
        answers: [
            "Mengatur tampilan halaman web",
            "Menyimpan data",
            "Mengelola database",
            "Menjalankan server"
        ],
        correctAnswer: "Mengatur tampilan halaman web"
    },
    {
        question: "Manakah yang digunakan untuk menyimpan data di browser",
        answers: [
            "localStorage",
            "HTML",
            "CSS",
            "createElement"
        ],
        correctAnswer: "localStorage"
    }
];

let currentQuestion = 0;
let score = 0;

const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextButton = document.getElementById("next-button");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("high-score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent = `Soal ${currentQuestion + 1} dari ${questions.length}`;
    question.textContent = current.question;

    answers.innerHTML = "";
    
    current.answers.forEach((answer) => {
        const answerButton = document.createElement("button");

        answerButton.type = "button";
        answerButton.classList.add("answer-button");
        answerButton.textContent = answer;
        answerButton.dataset.answer = answer;

        answers.appendChild(answerButton);
    });

    nextButton.disabled = true;
}

answers.addEventListener("click", (event) => {
    if (!event.target.classList.contains("answer-button")) {
        return;
    }

    const selectedButton = event.target;
    const selectedAnswer = selectedButton.dataset.answer;
    const correctAnswer = questions[currentQuestion].correctAnswer;

    const allAnswerButtons = answers.querySelectorAll(".answer-button");

    allAnswerButtons.forEach((button) => {
        button.disabled = true;

        if (button.dataset.answer === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }
    nextButton.disabled = false;
});

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    scoreText.textContent = `Skor kamu: ${score} dari ${questions.length}`;
    
    const savedHighScore = Number(localStorage.getItem("highScore")) || 0;

    if (score > savedHighScore) {
        localStorage.setItem("highScore", score);
    }

    const highScore = Number(localStorage.getItem("highScore")) || 0;

    highScoreText.textContent = `High Score: ${highScore} dari ${questions.length}`;
} 

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultScreen.hidden = true;
    quizScreen.hidden = false;

    showQuestion();
});

showQuestion();