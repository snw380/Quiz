var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var scoreEl = document.getElementById("final-score")

var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

startBtn.onclick = startQuiz;

function startQuiz() {

    $("#start-screen").hide();
    var startScreen = document.getElementById("start-screen");

    startScreen.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestions();
}

function quizEnd() {
    console.log("CALLED QUIZ END", currentQuestionIndex)
    $("#feedback").hide();
    $("#questions").hide();
    $("#end-screen").show();

    if (questions[currentQuestionIndex] === 4 || time === 0) {
        clearInterval(timerId);
        showScore();
    }

    scoreEl.textContent = time;
    clearInterval(timerId);
}

function showScore() {

    $("#end-screen").show();
    $("#intials").hide();


    var initials = initialsEl.value.trim();
    console.log(initials);

    if (initials !== "") {

        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

        var highScoreObject = {
            score: time,
            initials: initials
        }

        highScores.push(highScoreObject);
        localStorage.setItem("highScors", JSON.stringify(highScores));
        console.log(time);
        window.location.href = "index2.html";
    }
}
submitBtn.onclick = showScore;

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, index) {

        var choiceOption = document.createElement("button");
        choiceOption.setAttribute("class", "choice");
        choiceOption.setAttribute("value", choice);

        choiceOption.textContent = index + 1 + ". " + choice;

        choiceOption.onclick = questionClick;

        choicesEl.appendChild(choiceOption);
    });


}
function questionClick() {
    console.log(this);
    console.log(currentQuestionIndex)
    if (this.value !== questions[currentQuestionIndex].answer) {
        feedbackEl.textContent = "Wrong!!";
        time -= 15;
    } else {
        feedbackEl.textContent = "Correct!!";
    }
    currentQuestionIndex++;
    console.log(currentQuestionIndex)
    if (currentQuestionIndex > 4) return quizEnd();

    if (currentQuestionIndex === questions.length) {
        quizEnd();

    } else {
        getQuestions();
    }
}