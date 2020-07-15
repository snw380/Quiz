function highScores() {
    var scores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    scores.sort(function (a, b) {
        return b.score - a.score
    });
    scores.forEach(function (score) {
        var liEl = document.createElement("li");
        liEl.textContent = score.initials + ": " + score.score;

        var scoresHigh = document.getElementById("highscores");
        scoresHigh.appendChild(liEl);
    });

}
highScores();