const throwOptions = ['Rock', 'Paper', 'Scissors'];
let winningScore = 5
let playerScore = 0;
let computerScore = 0;
const tableFooter = document.querySelector('table').getElementsByTagName('tfoot')[0];
const tabelFooterRow = tableFooter.getElementsByTagName('tr')[0];
const winningThrowDictionary = {
    'rock scissors': 'rock',
    'scissors rock': 'rock',
    'rock paper': 'paper',
    'paper rock': 'paper',
    'scissors paper': 'scissors',
    'paper scissors': 'scissors',
};
const tbody = document.querySelector('table').getElementsByTagName('tbody')[0];
const rpsButtons = document.getElementsByClassName('throw-button');
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const resetButton = document.getElementById('reset');
let message = '';
const messageDiv = document.getElementById('message');
let animationIsRunning = false;
let currentlyRunningTimeout;
let currentRound = 0;




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
    if (throw1 !== throw2) {
        return winningThrowDictionary[throw1 + ' ' + throw2];
    }
    else {
        return 'tie';
    }
}
function convertChoiceToSrc(choice) {
    switch (choice) {
        case 'rock':
            return 'images/rock-icon.jpg';
        case 'paper':
            return 'images/paper-icon.jpg';
        case 'scissors':
            return 'images/scissors-icon.jpg';
    }
}

function updateMessage(message) {
    messageDiv.innerText = message;
}

function applyWinnerClass(item) {
    item.classList.add('winner');
}
function applyTieClass(item1, item2) {
    item1.classList.add('tie');
    item2.classList.add('tie');
}
function animateChoice(playerSelection, computerSelection, winner) {
    const grid = document.getElementById('choice-container');
    const waitTime = 300; // Time between icon appearing and the winner being displayed
    animationIsRunning = true;
    // clear out previous content
    grid.innerHTML = '';

    // set the icons
    const pIcon = document.createElement('img');
    const cIcon = document.createElement('img');
    pIcon.src = convertChoiceToSrc(playerSelection);
    cIcon.src = convertChoiceToSrc(computerSelection);
    pIcon.id = 'player-icon';
    cIcon.id = 'computer-icon';
    grid.appendChild(pIcon);
    grid.appendChild(cIcon);
    pIcon.classList.add('grid-item-3');
    cIcon.classList.add('grid-item-4');

    // Determine winner and animate it
    if (playerSelection === computerSelection) {
        //tie
        setTimeout(applyTieClass, waitTime, pIcon, cIcon);

    } else if (playerSelection === winner) {
        //player wins
        setTimeout(applyWinnerClass, waitTime, pIcon);
    } else {
        // computer wins
        setTimeout(applyWinnerClass, waitTime, cIcon);

    }
}

function fadeIcons() {
    const flexbox = document.getElementById('choice-container');
    const pIcon = document.getElementById('player-icon');
    const cIcon = document.getElementById('computer-icon');
    animationIsRunning = false;

    pIcon.style = 'opacity: 0';
    cIcon.style = 'opacity: 0';


}

function playRound(event) {
    currentRound += 1;
    let playerSelection = this.id.toLowerCase();
    let computerSelection = computerPlay().toLowerCase();
    let winner = winningThrow(playerSelection, computerSelection);
    if (animationIsRunning) {
        clearTimeout(currentlyRunningTimeout);
    }

    animateChoice(playerSelection, computerSelection, winner);

    if (winner === 'tie') {
        message = 'It\'s a tie, try again'
    } else if (playerSelection === winner) {
        playerScore += 1;
        message = `Your ${playerSelection} beats the computers ${computerSelection}`;

    } else {
        computerScore += 1;
        message = `The computers ${computerSelection} beats your ${playerSelection}`;
    }
    // Update page w/ scores
    updateScores(playerScore, computerScore);
    updateStack(playerSelection, computerSelection, winner);

    // Winning conditions
    if (playerScore === winningScore || computerScore === winningScore) {
        if (playerScore === winningScore) {
            updateMessage('YOU WIN!');
        } else {
            updateMessage('YOU LOSE!');
        }
        // Change page now that win condition has been reached
        updatePageAfterWin();
    }

    currentlyRunningTimeout = setTimeout(fadeIcons, 2000);


    return // get out of the function
}
function updatePageAfterWin() {
    const resetButton = document.getElementById('reset');
    resetButton.innerText = 'New Game';
    const rpsButtons = document.getElementsByClassName('throw-button');
    Array.from(rpsButtons).forEach((b) => { b.setAttribute('disabled', "") });
}
function updateScores(pScore, cScore) {
    const tds = tabelFooterRow.getElementsByTagName('td');
    tds[1].textContent = pScore;
    tds[2].textContent = cScore;

}
function updateStack(playerSelection, computerSelection, winner) {
    if (tbody.rows.length === 5) {
        tbody.removeChild(tbody.rows[0]);
    }
    let newRow = tbody.insertRow(tbody.rows.length - 1);
    let cellZero = newRow.insertCell(0);
    let cellOne = newRow.insertCell(1);
    let cellTwo = newRow.insertCell(2);
    let newText0 = document.createTextNode(currentRound);
    cellZero.appendChild(newText0);
    let newText1 = document.createTextNode(capitalizeFirst(playerSelection));
    cellOne.appendChild(newText1);
    let newText2 = document.createTextNode(capitalizeFirst(computerSelection));
    cellTwo.appendChild(newText2);

   
    if (playerSelection === computerSelection) {
        cellOne.classList.add('text-tie');
        cellTwo.classList.add('text-tie');
    }
    else if (winner === playerSelection) {
        cellOne.classList.add('text-winner');
    } else {
        cellTwo.classList.add('text-winner');
    }
}
function resetGame() {
    //Put buttons back to original setup
    resetButton.innerText = 'Start Over';
    Array.from(rpsButtons).forEach((b) => { b.removeAttribute('disabled', "") });
    
    // Remove win message
    updateMessage('');
    // Reset Scores
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    updateScores(0, 0);
    tbody.innerHTML = `<tr>
    <td> </td>
    <td>--</td>
    <td>--</td>
  </tr>`
}

rockButton.addEventListener('click', playRound);
paperButton.addEventListener('click', playRound)
scissorsButton.addEventListener('click', playRound);
resetButton.addEventListener('click', resetGame);

