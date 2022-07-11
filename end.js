const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const max_high_scores = 5;

//console.log(JSON.parse(localStorage.getItem("highScores")));
//console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    console.log("cliccked");
    e.preventDefault()

    const score = {
        score: Math.floor(Math.random() * 100) , //random score will be in order
        name: username.value
    };

    highScores.push(score)
    //console.log(highScores);

    //we gonna sort the highscore and keep only top 5 score and cut the rest score
    highScores.sort((a,b) => {
        return b.score - a.score
    }) // if b score is greater than a score then put b before a
    // this will give us a sorted array which might have more than 5 array for now
    highScores.splice(5)

    //saving it into localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("/")
    
    //console.log(highScores);

}
