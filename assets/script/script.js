//Start by creating variables for our elements on the page for the quiz
var timerText = document.getElementById('timer');
var startButtonEl = document.getElementById('start-btn');
var nextButtonEl = document.getElementById('next-btn');
var questionContainerEl = document.getElementById('question-container');
var shuffle, currentQuestionIndex;
var questionEl = document.getElementById('question');
var answerButtonEl = document.getElementById('answer-btn');
startButtonEl.addEventListener('click', startTimer);
startButtonEl.addEventListener('click', startGame);
nextButtonEl.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})
var scoreboardEl = document.getElementById('scoreboard');
var score = 0;
var scoreboardList = [];
renderScores();

//Create a countdown timer to countdown from 60.  When 0 is reached, end the game.
function startTimer() {
var timer = setInterval(function () {
        (timerText.innerText)--;
        if (timerText.innerText <= 0){
            clearInterval(timer);
            endGame();
            enterScores();
        }
    }, 1000);
}

//start the game
function startGame() {
    timerText.innerText = 60;
    startButtonEl.classList.add('hide');
    //shuffle the questions so the questions provided to the screen are random each time
    shuffle = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

// When the next button is selected, clear the fields and show the next question
function setNextQuestion() {
    //clear the deafult items in the HTML
    resetState();
    //show a random question to the screen
    showQuestion(shuffle[currentQuestionIndex]);

}
//Show the question
function showQuestion(question) {
    //update question element text with the question from array
    questionEl.innerText = question.question;
    //populate the 4 answers from the answers section of the array
    question.answers.forEach(answers => {
        var button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonEl.appendChild(button);
        
    });
}

// clear the default items in the HTML
function resetState() {
    clearStatusClass(document.body);
    nextButtonEl.classList.add('hide');
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    }
}

//When the answer is selected
function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (!selectedButton.dataset.correct){
        timerText.innerText = (timerText.innerText - 10);
    }
    else {
        score++;
        console.log(score);
    }
    if (shuffle.length > currentQuestionIndex + 1) {

    nextButtonEl.classList.remove('hide');
    }
    else {
        resetState();
        questionEl.innerText = "Great job! Play again?";
        startButtonEl.innertext = "Play Again";
    }
 
}

//Set the status of the elements to correct or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

//Clear the correct and wrong status from the answers/body
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endGame () {
    resetState();
    questionEl.innerText = "Great job! Play again?";
    startButtonEl.innertext = "Play Again";
    startButtonEl.classList.remove('hide');
}

//prompt user for their name and add them to the Scoreboard
function enterScores () {
    var username = prompt("Enter your name to the Scoreboard!");
    var scoreData = (username + ': ' + score);
    scoreboardList.push(scoreData);
    score = 0;
    console.log(scoreboardList);
    renderScores();
}

function renderScores() {
     scoreboardEl.innerHTML = ""
     for (var i = 0; i < scoreboardList.length; i++) {
         var scoreResults = scoreboardList[i];

         var scorecard = document.createElement('li');
         scorecard.textContent = scoreResults;
         scoreboardEl.appendChild(scorecard);
     }

}


//List of questions here
const questions = [
    {
    question: 'Who is the cutest bird? (Hint: Its Tiny Bird)',
    answers: [
            { text: 'Tiny Bird', correct: true },
            { text: 'Sora', correct: false },
            { text: 'Piper', correct: false },
            { text: 'Turk', correct: false }

        ]
    
    },
    {
        question: 'Macaws come from which continent?',
        answers: [
                { text: 'Asia', correct: false },
                { text: 'South America', correct: true },
                { text: 'North America', correct: false },
                { text: 'Africa', correct: false }
    
            ]
        
        },
            {
    question: 'How many Species of parrots are there?',
    answers: [
            { text: '350', correct: true },
            { text: '250', correct: false },
            { text: '500', correct: false },
            { text: '400', correct: false }

        ]
    
    },
    {
        question: 'How many toes dos a parrot have?',
        answers: [
                { text: '3', correct: false },
                { text: '4', correct: true },
                { text: '5', correct: false }
    
            ]
        
        },
            {
    question: 'With most species of parrots you cannot tell the difference between male and female without performing a dna test',
    answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false }

        ]
    
    },
    {
        question: 'When are birds the most vocal?',
        answers: [
                { text: 'sunset & noon', correct: false },
                { text: 'dawn & noon', correct: false },
                { text: 'noon & midnight', correct: false },
                { text: 'dawn & sunset', correct: true }
    
            ]
        
        },
    {
        question: 'Which of these parrots is LEAST likely to learn to talk?',
        answers: [
                { text: 'Afrigan Grey', correct: false },
                { text: 'Indian Ringneck', correct: false },
                { text: 'Sun Conure', correct: true },
                { text: 'Quaker Parrot', correct: false }

            ]
    
    },
    {
        question: 'How long is the largest parrot from beak to Tail?',
        answers: [
                { text: '32 inches', correct: false },
                { text: '40 inches', correct: true },
                { text: '24 inches', correct: false },
                { text: '50 inches', correct: false }
    
            ]
        
    },
    {
        question: 'Which of these parrots are not endangered in the wild',
        answers: [
                { text: 'Hyacinth Macaw', correct: false },
                { text: 'Red and Blue Lory', correct: false },
                { text: 'Green-Cheeked Amazon', correct: false },
                { text: 'Blue-Winged Macaw', correct: true }
    
            ]
        
    },
    {
        question: 'Which of these species DO NOT originate from Australia',
        answers: [
                { text: 'Caique', correct: true },
                { text: 'Budgerigar', correct: false },
                { text: 'Rosella', correct: false },
                { text: 'Cockatoo', correct: false }
    
            ]
        
    },
    {
        question: 'The bite of a parrot is about as strong as the bite of which of these animals?',
        answers: [
                { text: 'Crocodile', correct: false },
                { text: 'Dog', correct: true },
                { text: 'Hippo', correct: false },
                { text: 'Human', correct: false }
    
            ]
        
    },    
    
]