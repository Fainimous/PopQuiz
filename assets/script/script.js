//Start by creating variables for our elements on the page
var startButtonEl = document.getElementById('start-btn')
var nextButtonEl = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var shuffle, currentQuestionIndex
var questionEl = document.getElementById('question')
var answerButtonEl = document.getElementById('answer-btn')
startButtonEl.addEventListener('click', startGame)


//start the game
function startGame() {
    console.log('started'); //please work :D
    startButtonEl.classList.add('hide')
    //shuffle the questions so the questions provided to the screen are random each time
    shuffle = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

// 
function setNextQuestion() {
    //clear the deafult items in the HTML
    resetState()
    //show a random question to the screen
    showQuestion(shuffle[currentQuestionIndex])

}

function showQuestion(question) {
    //update question element text with the question from array
    questionEl.innerText = question.question
    //populate the 4 answers from the answers section of the array
    question.answers.forEach(answers => {
        var button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        //if the button is the correct answer, 
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
        
    });
}

function resetState() {
    nextButtonEl.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}


function selectAnswer() {


}

const questions = [
    {
    question: '    You download an Azure Resource Manager template based on an existing virtual machine. The template will be used todeploy 100 virtual machines. You need to modify the template to reference an administrative password. You must prevent the password from being stored in plain text. \n\n What should you create to store the password?',
    answers: [
            { text: 'Azure Active Directory (AD) Identity Protection and an Azure policy ', correct: false },
            { text: 'a Recovery Services vault and a backup policy', correct: false },
            { text: 'an Azure Key Vault and an access policy', correct: true },
            { text: 'an Azure Storage account and an access policy', correct: false }

        ]
    
    },
    {
        question: '    You have an Azure Active Directory (Azure AD) domain that contains 5,000 user accounts. You create a new user account named AdminUser1. You need to assign the User administrator administrative role to AdminUser1. \n\n What should you do from the user account properties?',
        answers: [
                { text: 'From the Directory role blade, modify the directory role.', correct: true },
                { text: 'From the Groups blade, invite the user account to a new group.', correct: false },
                { text: 'From the Licenses blade, assign a new license. ', correct: false },
                { text: 'From the Users blade, reset the user’s password.', correct: false }
    
            ]
        
    },
    {
        question: '    You configure Azure AD Connect for Azure Active Directory Seamless Single Sign-On (Azure AD Seamless SSO) for an on-premises network. Users report that when they attempt to access myapps.microsoft.com, they are prompted multiple times to sign in and are forced to use an account name that ends with onmicrosoft.com. You discover that there is a UPN mismatch between Azure AD and the on-premises Active Directory. You need to ensure that the users can use single-sign on (SSO) to access Azure resources. \n\n What should you do first?',
        answers: [
                { text: 'From the on-premises network, deploy Active Directory Federation Services (AD FS). ', correct: false },
                { text: 'From Azure AD, add and verify a custom domain name.', correct: true },
                { text: 'From the on-premises network, request a new certificate that contains the Active Directory domain name.', correct: false },
                { text: 'From the server that runs Azure AD Connect, modify the filtering options.', correct: false }
    
            ]
        
    },
    {
        question: '    You have an Active Directory forest named contoso.com. You install and configure Azure AD Connect to use password hash synchronization as the single sign-on (SSO) method. Staging mode is enabled. You review the synchronization results and discover that the Synchronization Service Manager does not display any sync jobs. \n\n You need to ensure that the synchronization completes successfully. What should you do?',
        answers: [
                { text: 'From Synchronization Service Manager, run a full import.', correct: false },
                { text: 'Run Azure AD Connect and set the SSO method to Pass-through Authentication.', correct: false },
                { text: 'From Azure PowerShell, run Start-AdSyncSyncCycle -PolicyType Initial.', correct: false },
                { text: 'Run Azure AD Connect and disable staging mode.', correct: true }
    
            ]
        
    }
]