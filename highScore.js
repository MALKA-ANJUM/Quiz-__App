console.log("high scores");

const highScoreList = document.getElementById("highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

//console.log(highScores);

//we made li and joined it to ul in the html
highScoreList.innerHTML = highScores
.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("")


// through map we will get the reference of each high score and do something with each of the score