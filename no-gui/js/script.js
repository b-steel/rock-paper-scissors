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

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    let winner = winningThrow(playerSelection, computerSelection);
    if (winner === 'tie') {
       
        console.log('It\'s a tie, try again');
        return 'tie';
    } else if (playerSelection === winner) {
        
        console.log(`You win! ${playerSelection} beats ${computerSelection}`);
        return 'player';
    } else {
       
        console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
        return 'computer';
    }
     
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
        return 'tie';return
    }
}

function game () {
    let numRounds = 5
    let playerScore = 0;
    let computerScore = 0;
    const computerThrow = computerPlay
    for (let i = 0; i < numRounds; i++) {
      let playerThrow = prompt('What will you choose: Rock, Paper, or Scissors?')  
      let result = playRound(playerThrow, computerThrow())
      switch (result) {
        case 'tie': 
          break;
        case 'player':
            playerScore += 1;
            break;
        case 'computer':
            computerScore += 1;
            break;
      }
    }
    let message = '';
    if (playerScore === computerScore) {
        message = 'it\'s a tie!' ;
    } else if (playerScore > computerScore) {
        message = 'you are the winner!';
    } else { 
        message = 'the computer wins!';
    }
    console.log(`After ${numRounds} rounds, ${message} \n Player score is: ${playerScore} \n Computer score is: ${computerScore}`);

    
}