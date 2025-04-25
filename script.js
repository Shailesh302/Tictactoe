let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let playerA, playerB;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const startGameButton = document.getElementById('start-game');
const playerInputSection = document.getElementById('player-input');
const gameBoardSection = document.getElementById('game-board');
const winnerMessageSection = document.getElementById('winner-message');

// Function to start the game
function startGame() {
    playerA = document.getElementById('playerA').value || 'Player A';
    playerB = document.getElementById('playerB').value || 'Player B';

    if (!playerA || !playerB) {
        alert('Please enter both player names.');
        return;
    }

    playerInputSection.style.display = 'none';
    gameBoardSection.style.display = 'block';
}

// Add event listener for each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.id;
        if (!gameOver && gameBoard[index] === '') {
            makeMove(index);
        }
    });
});

function makeMove(index) {
    // Update the board and UI
    gameBoard[index] = currentPlayer;
    document.getElementById(index).textContent = currentPlayer;

    // Check for a win
    if (checkWinner()) {
        displayWinner();
        return;
    }

    // Check for a draw
    if (gameBoard.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        gameOver = true;
        return;
    }

    // Switch player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function displayWinner() {
    gameOver = true;
    const winner = currentPlayer === 'X' ? playerA : playerB;
    const loser = currentPlayer === 'X' ? playerB : playerA;

    winnerMessageSection.textContent = `${winner} wins! ${loser} better luck next time.`;
    winnerMessageSection.style.display = 'block';
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    winnerMessageSection.style.display = 'none';
    playerInputSection.style.display = 'block';
    gameBoardSection.style.display = 'none';

    // Clear the board
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
