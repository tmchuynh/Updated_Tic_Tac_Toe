// Select all the HTML elements with the class 'cell' (representing each square in the Tic Tac Toe board)
const cells = document.querySelectorAll(".cell");

// Initialize variables to keep track of game state
let currentPlayer = "X"; // Start with Player X

let board = ["", "", "", "", "", "", "", "", ""]; // Represents the game board
let scoreX = 0; // Initialize Player X's score
let scoreO = 0; // Initialize Player O's score
let ties = 0; // Counter for tie games

// Update scoreboard in HTML
const scoreBoardX = document.querySelector(".score-x"); // Element to display Player X's score
const scoreBoardO = document.querySelector(".score-o"); // Element to display Player O's score
const scoreBoardTies = document.querySelector(".score-ties"); // Element to display tie count

// Display initial scores on scoreboard
scoreBoardX.textContent = `Player X: ${scoreX}`;
scoreBoardO.textContent = `Player O: ${scoreO}`;
scoreBoardTies.textContent = `Ties: ${ties}`;

// Loop through each cell element and add a click event listener
cells.forEach((cell) => {
      cell.addEventListener("click", () => {
            const index = cell.dataset.index; // Get the index of the clicked cell
            if (board[index] === "") {
                  // Check if the cell is empty
                  board[index] = currentPlayer; // Update the board array with the current player's mark
                  cell.textContent = currentPlayer; // Display the current player's mark in the clicked cell

                  // Check if the current player has won
                  if (checkWinner(currentPlayer)) {
                        highlightWinner(); // Highlight the winning combination on the board
                        setTimeout(() => {
                              alert(`Player ${currentPlayer} wins!`); // Show an alert with the winner
                              updateScore(currentPlayer); // Update the scoreboard for the winner
                              resetGame(); // Reset the game for a new round
                        }, 100); // Delay to ensure the board is updated before alerting
                  } else if (board.every((cell) => cell !== "")) {
                        // Check if all cells are filled (tie game)
                        alert("It's a tie!"); // Show an alert for a tie game
                        updateTies(); // Update the tie counter on the scoreboard
                        resetGame(); // Reset the game for a new round
                  } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch turns between players
                  }
            }
      });
});

// Function to check if the current player has won
function checkWinner(player) {
      const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6] // Diagonals
      ];

      // Check each winning condition to see if the current player has marks in all three cells
      return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return board[a] === player && board[b] === player && board[c] === player;
      });
}

// Function to highlight the winning combination on the board
// THIS FUNCTION IS ABSOLUTELY OPTIONAL FOR UI
// DO IT AT THE END IF YOU HAVE THE TIME
function highlightWinner() {
      const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6] // Diagonals
      ];

      // Iterate through each winning condition and add a 'winner' class to the winning cells
      winConditions.forEach((condition) => {
            const [a, b, c] = condition;
            if (board[a] === board[b] && board[a] === board[c]) {
                  cells[a].classList.add("winner");
                  cells[b].classList.add("winner");
                  cells[c].classList.add("winner");
            }
      });
}

// Function to update the score for the winning player
function updateScore(player) {
      if (player === "X") {
            scoreX++;
            scoreBoardX.textContent = `Player X: ${scoreX}`;
      } else if (player === "O") {
            scoreO++;
            scoreBoardO.textContent = `Player O: ${scoreO}`;
      }
}

// Function to update the tie count
function updateTies() {
      ties++;
      scoreBoardTies.textContent = `Ties: ${ties}`;
}

// Function to reset the game board and prepare for a new game
function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""]; // Reset the board array
      currentPlayer = "X"; // Start with Player X again
      cells.forEach((cell) => {
            cell.textContent = ""; // Clear the text content of each cell
            cell.classList.remove("winner"); // Remove the 'winner' class from each cell
      });
}
