const questions = [
    {
        question: "What type of star is The Sun?",
        answers: [
            { text: "white dwarf", correct: false},
            { text: "brown giant", correct: false},
            { text: "blue giant", correct: false},
            { text: "yellow dwarf", correct: true},
        ]
    },
    {
        question: "you cannot walk on which of these planets?",
        answers: [
            { text: "mars", correct: false},
            { text: "venus", correct: false},
            { text: "jupiter", correct: true},
            { text: "mercury", correct: false},
        ]
    },
    {
        question: "What color are sunsets on mars?",
        answers: [
            { text: "yellow", correct: false},
            { text: "blue", correct: true},
            { text: "green", correct: false},
            { text: "red", correct: false},
        ] 
    },
    {
        question: "Which of the following has the highest density?",
        answers: [
            { text: "neutron star", correct: true},
            { text: "nebulae", correct: false},
            { text: "giant stars", correct: false},
            { text: "earth", correct: false},
        ] 
    },
    {
        question: "what term is used to descibe the physical change that would happen to you if you fell into a black hole?",
        answers: [
            { text: "compression", correct: false},
            { text: "spagghetification", correct: true},
            { text: "apastron", correct: false},
            { text: "occulation", correct: false},
        ] 
    },
    {
        question: "which of these is the coldest planet in the solar system?",
        answers: [
            { text: "jupiter", correct: false},
            { text: "saturn", correct: false},
            { text: "uranus", correct: true},
            { text: "neptune", correct: false},
        ] 
    },
    {
        question: "Since its discovery, how many times has neptune orbitted the sun?",
        answers: [
            { text: "100", correct: false},
            { text: "50", correct: false},
            { text: "10", correct: false},
            { text: "1", correct: true},
        ] 
    }
];
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("options");
const nextBtn = document.getElementById("next");

let qIndex = 0;
let score = 0;
function startQuiz(){
    qIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[qIndex];
    let qNo = qIndex + 1;
    questionElement.innerHTML = qNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAns);
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAns(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score is ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function fnNextBtn(){
    qIndex++;
    if(qIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(qIndex < questions.length){
        fnNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();