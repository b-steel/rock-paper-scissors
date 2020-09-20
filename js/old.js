const throwOptions = ['Rock', 'Paper', 'Scissors'];

function random(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function computerPlay() {
    return throwOptions[random(0, 3)]
}

function capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1)
}
function winningThrow(throw1, throw2) {
    const throwDictionary = {
        'rock scissors': 'rock',
        'scissors rock': 'rock',
        'rock paper': 'paper',
        'paper rock': 'paper',
        'scissors paper': 'scissors',
        'paper scissors': 'scissors',
    };
    if (throw1 !== throw2) {
        return throwDictionary[throw1 + ' ' + throw2];
    }
    else {
        return 'tie';
    }
}
function updateScores(playerScore, computerScore) {
    let pScore = document.getElementById('player-points');
    let cScore = document.getElementById('computer-points');
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
}

function updateThrows(pThrow, cThrow) {
    let player = document.getElementById('last-player-throw');
    let computer = document.getElementById('last-computer-throw');
    player.innerText = pThrow;
    computer.innerText = cThrow;
}

function updateMessage(message) {
    messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
}

let winningScore = 5
let playerScore = 0;
let computerScore = 0;
let lastComputerThrow = '';
let lastPlayerThrow = '';


function playRound(playerSelection, computerSelection) {
   
    playerSelection = this.id.toLowerCase();
    computerSelection = computerPlay().toLowerCase();
    let winner = winningThrow(playerSelection, computerSelection);


    if (winner === 'tie') {
        updateMessage('It\'s a tie, try again')
    } else if (playerSelection === winner) {
        playerScore +=1;

        updateMessage(`Your ${playerSelection} beats the computers ${computerSelection}`);
        
    } else {
        computerScore +=1;
        updateMessage(`The computers ${computerSelection} beats your ${playerSelection}`);
        
    }
  
    
    updateScores(playerScore, computerScore);
    updateThrows(playerSelection, computerSelection);
    
    return // get out of the function

}

if (playerScore === winningScore || computerScore === winningScore) {
    if (playerScore === winningScore) {
        updateMessage('YOU WIN!');
    } else {updateMessage('YOU LOSE!');
}
}


let rockButton = document.querySelector('#rock');
let paperButton = document.querySelector('#paper');
let scissorsButton = document.querySelector('#scissors');

rockButton.addEventListener('click', playRound);
paperButton.addEventListener('click', playRound)
scissorsButton.addEventListener('click', playRound)




