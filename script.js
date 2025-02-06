// Game state
let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 3;

// DOM elements - Changed from const to let for choices
let playerScoreDisplay = document.getElementById('player-score');
let computerScoreDisplay = document.getElementById('computer-score');
let resultText = document.getElementById('result-text');
let choices = document.querySelectorAll('.choice');

// Game choices and their winning conditions - Fixed logic
const CHOICES = {
    rock: { beats: 'scissors', icon: 'fa-hand-rock' },     // Rock beats Scissors
    paper: { beats: 'rock', icon: 'fa-hand-paper' },       // Paper beats Rock
    scissors: { beats: 'paper', icon: 'fa-hand-scissors' }  // Scissors beats Paper
};

// Initialize game
function initGame() {
    choices.forEach(choice => {
        choice.addEventListener('click', handleChoice);
    });
}

// Handle choice click
function handleChoice(event) {
    if (!isGameOver()) {
        playRound(event.currentTarget.id);
    }
}

// Get computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    
    // Show choices with animation
    animateChoices(playerChoice, computerChoice);
    
    // Determine winner after a short delay for animation
    setTimeout(() => {
        if (playerChoice === computerChoice) {
            updateResultText("It's a tie!");
            highlightChoices(playerChoice, computerChoice, 'tie');
        } else if (CHOICES[playerChoice].beats === computerChoice) {
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            updateResultText('You win this round!');
            highlightChoices(playerChoice, computerChoice, 'win');
        } else {
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            updateResultText('Computer wins this round!');
            highlightChoices(playerChoice, computerChoice, 'lose');
        }

        // Check if game is over
        if (isGameOver()) {
            const winner = playerScore === WINNING_SCORE ? 'You win the game!' : 'Computer wins the game!';
            updateResultText(`${winner} Click any button to play again.`);
        }
    }, 500); // Delay to show animation
}

// Animate choices
function animateChoices(playerChoice, computerChoice) {
    // Reset all choices
    choices.forEach(choice => {
        choice.style.transform = 'scale(1)';
        choice.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        choice.style.backgroundColor = 'transparent';
    });

    // Animate selected choices
    const playerButton = document.getElementById(playerChoice);
    const computerButton = document.getElementById(computerChoice);

    playerButton.style.transform = 'scale(1.1)';
    computerButton.style.transform = 'scale(1.1)';
}

// Highlight choices based on result
function highlightChoices(playerChoice, computerChoice, result) {
    const playerButton = document.getElementById(playerChoice);
    const computerButton = document.getElementById(computerChoice);

    // Reset all choices
    choices.forEach(choice => {
        choice.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        choice.style.backgroundColor = 'transparent';
    });

    if (result === 'tie') {
        playerButton.style.borderColor = '#ffd700';
        computerButton.style.borderColor = '#ffd700';
    } else if (result === 'win') {
        playerButton.style.borderColor = '#50faf7';
        playerButton.style.backgroundColor = 'rgba(80, 250, 247, 0.1)';
        computerButton.style.borderColor = '#ff4444';
    } else {
        computerButton.style.borderColor = '#50faf7';
        computerButton.style.backgroundColor = 'rgba(80, 250, 247, 0.1)';
        playerButton.style.borderColor = '#ff4444';
    }
}

// Update result text with animation
function updateResultText(message) {
    resultText.style.opacity = '0';
    setTimeout(() => {
        resultText.textContent = message;
        resultText.style.opacity = '1';
    }, 200);
}

// Check if game is over
function isGameOver() {
    if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        const winner = playerScore === WINNING_SCORE ? 'You win the game!' : 'Computer wins the game!';
        updateResultText(`${winner} Click any button to play again.`);
        
        // Add click event for retry
        choices.forEach(choice => {
            choice.removeEventListener('click', handleChoice);
            choice.addEventListener('click', resetGame, { once: true });
        });
        
        return true;
    }
    return false;
}

// Reset the game
function resetGame() {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    
    // Reset UI
    updateResultText('Make your move');
    choices.forEach(choice => {
        choice.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        choice.style.backgroundColor = 'transparent';
        choice.style.transform = 'scale(1)';
        
        // Remove retry event listener and add back the game event listener
        choice.removeEventListener('click', resetGame);
        choice.addEventListener('click', handleChoice);
    });
}

// Start the game
initGame();
