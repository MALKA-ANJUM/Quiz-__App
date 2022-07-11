console.log("high scores");

const highScoreList = document.getElementById("highScoreList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

//console.log(highScores);

highScoreList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')


// through map we will get the reference of each high score and do something with each of the score