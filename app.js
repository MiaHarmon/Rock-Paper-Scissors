// Define the rules 
const rules = {
    Rock: ['Fire', 'Scissors', 'Snake', 'Human', 'Tree', 'Wolf', 'Sponge'],
    Gun: ['Rock', 'Fire', 'Scissors', 'Snake', 'Human', 'Tree', 'Wolf'],
    Lightning: ['Tree', 'Rock', 'Gun', 'Scissors', 'Snake', 'Human', 'Wolf'],
    Devil: ['Lightning', 'Tree', 'Rock', 'Gun', 'Scissors', 'Snake', 'Human'],
    Dragon: ['Devil', 'Lightning', 'Tree', 'Rock', 'Gun', 'Scissors', 'Snake'],
    Water: ['Dragon', 'Devil', 'Lightning', 'Tree', 'Rock', 'Gun', 'Scissors'],
    Air: ['Water', 'Dragon', 'Devil', 'Lightning', 'Tree', 'Rock', 'Gun'],
    Paper: ['Air', 'Water', 'Dragon', 'Devil', 'Lightning', 'Tree', 'Rock'],
    Sponge: ['Paper', 'Air', 'Water', 'Dragon', 'Devil', 'Lightning', 'Tree'],
    Wolf: ['Sponge', 'Paper', 'Air', 'Water', 'Dragon', 'Devil', 'Lightning'],
    Tree: ['Wolf', 'Sponge', 'Paper', 'Air', 'Water', 'Dragon', 'Devil'],
    Human: ['Tree', 'Wolf', 'Sponge', 'Paper', 'Air', 'Water', 'Dragon'],
    Snake: ['Human', 'Tree', 'Wolf', 'Sponge', 'Paper', 'Air', 'Water'],
    Scissors: ['Snake', 'Human', 'Tree', 'Wolf', 'Sponge', 'Paper', 'Air'],
    Fire: ['Scissors', 'Snake', 'Human', 'Tree', 'Wolf', 'Sponge', 'Paper']
};

let playerScore = 0;
let computerScore = 0;

// Random choice for computer
function computerRandomChoice() {
    const choices = Object.keys(rules);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It is a tie!';
    } else if (rules[playerChoice].includes(computerChoice)) {
        playerScore += 1;
        return `You win! ${playerChoice} beats ${computerChoice}`;
    } else {
        computerScore += 1;
        return `You lose! ${computerChoice} beats ${playerChoice}`;
    }
}

// Display the result and update scores
function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
    updatePlayerScore();
}

// Update player and computer scores in the UI
function updatePlayerScore() {
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Add event listeners to buttons and highlight computer's choice
const choiceButtons = document.querySelectorAll('.choice-button');
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const playerChoice = this.id;
        const computerChoice = computerRandomChoice();
        const computerChoiceButton = document.getElementById(computerChoice);
        computerChoiceButton.classList.add('choice-highlight');
        
        // Remove highlight after animation ends
        setTimeout(() => {
            computerChoiceButton.classList.remove('choice-highlight');
        }, 2000); 
        
        const result = determineWinner(playerChoice, computerChoice);
        displayResult(result);
    });
});

// Add function to reset scores
function resetScores() {
    playerScore = 0;
    computerScore = 0;
    updatePlayerScore(); // Update the score display
    
    // clear the result text
    const resultElement = document.getElementById('result');
    resultElement.textContent = '';
}

// Add an event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetScores);
