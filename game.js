console.log("quiz app- play")

const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
// console.log(choices);
// dataset --> it is a custom property and anything that's prefix with data will  basically become a property on that node so its strips are data-part
const progressText = document.getElementById("progressText")
const ScoreText = document.getElementById("score")
const progressBarFull = document.getElementById("progressBarFull")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []

fetch("questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions)
        questions = loadedQuestions
        startGame()
    });

// constants
const correct_bonus = 10
const max_questions = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [ ...questions]
    // console.log(availableQuestions);
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = 'Question  ' + questionCounter + '/' + max_questions
    console.log(questionCounter/max_questions * 100) ;
    // update the progress bar
    progressBarFull.style.width = `${(questionCounter/max_questions * 100)}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionIndex, 1) //it will take the available and splice so that it will get rid out of the current question or available question
    // console.log(availableQuestions);
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = 'incorrect'
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct'
        }
        // console.log(classToApply);

        if(classToApply === 'correct')  {
            incrementScore(correct_bonus)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
        

        
        
    })
})
incrementScore = num => {
    score += num;
    ScoreText.innerText = score
}


