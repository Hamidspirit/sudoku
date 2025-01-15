function isValid(board, row, col, num) {
    // Check row, column, and subgrid
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}


function removeNumbers(board, difficulty) {
    let cellsToRemove = difficulty === 'easy' ? 30 :
                        difficulty === 'medium' ? 40 :
                        50; // Increase or decrease based on desired difficulty

    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
}

let solutionCount = 0;

function countSolutions(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        countSolutions(board);
                        board[row][col] = 0;
                    }
                }
                return;
            }
        }
    }
    solutionCount++;
}

function isUniqueSolution(board) {
    solutionCount = 0;
    countSolutions(board);
    return solutionCount === 1;
}

function generateFilledGrid() {
    let board = Array(9).fill().map(() => Array(9).fill(0));
    solve(board);
    return board;
}

function generatePuzzle() {
    let difficulty = document.getElementById('difficulty').value;
    let board = generateFilledGrid();
    removeNumbers(board, difficulty);

    if (!isUniqueSolution(board)) {
        solutionCount = 0;
        generatePuzzle();  // Regenerate if the puzzle doesn't have a unique solution
        return;
    }
    solutionCount = 0
    displayBoard(board);
}


function isPlayerWon(board) {
    // Check if all cells are filled
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return false; // If there's an empty cell, player has not won yet
            }
        }
    }

    // Check rows
    for (let row = 0; row < 9; row++) {
        let seen = new Set();
        for (let col = 0; col < 9; col++) {
            let num = board[row][col];
            if (seen.has(num)) {
                return false; // Duplicate found in the row
            }
            seen.add(num);
        }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
        let seen = new Set();
        for (let row = 0; row < 9; row++) {
            let num = board[row][col];
            if (seen.has(num)) {
                return false; // Duplicate found in the column
            }
            seen.add(num);
        }
    }

    // Check subgrids (3x3)
    for (let startRow = 0; startRow < 9; startRow += 3) {
        for (let startCol = 0; startCol < 9; startCol += 3) {
            let seen = new Set();
            for (let row = startRow; row < startRow + 3; row++) {
                for (let col = startCol; col < startCol + 3; col++) {
                    let num = board[row][col];
                    if (seen.has(num)) {
                        return false; // Duplicate found in the subgrid
                    }
                    seen.add(num);
                }
            }
        }
    }

    return true; // Player has won
}

// Function to display the board
function displayBoard(board) {
    let container = document.getElementById('board');
    container.innerHTML = '';  // Clear previous board

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.createElement('input');
            cell.type = 'number';
            cell.value = board[row][col] !== 0 ? board[row][col] : ''; // Display filled numbers or leave empty
            cell.disabled = board[row][col] !== 0; // Disable cells that are pre-filled
            cell.addEventListener('input', function() {
                // Update the board with the new value
                let newValue = parseInt(cell.value) || 0;
                board[row][col] = newValue;

                // Check if the player has won after the change
                if (isPlayerWon(board)) {
                    document.getElementById('status').textContent = "Congratulations! You've completed the Sudoku!";
                } else {
                    document.getElementById('status').textContent = ''; // Clear the status if the player hasn't won yet
                }
            });
            container.appendChild(cell);
        }
    }
}

console.log("type solvePuzzle() to solve the board")
// Solve the puzzle automatically when the "Solve Sudoku" button is clicked
function solvePuzzle() {
    let container = document.getElementById('board');
    let board = [];
    
    // Get the current state of the board
    let inputs = container.getElementsByTagName('input');
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            board[i][j] = parseInt(inputs[i * 9 + j].value) || 0; // Get value from each input field
        }
    }

    // Solve the board using the existing solve function
    solve(board);

    // Display the solved board
    displayBoard(board);
    document.getElementById('status').textContent = "Sudoku Solved!";
}