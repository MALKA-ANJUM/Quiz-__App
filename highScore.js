console.log("high scores");

const highScoreList = document.getElementById("highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

console.log(highScores);