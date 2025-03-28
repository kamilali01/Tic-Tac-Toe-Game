let xsTurn = true;
const turn = document.querySelector(".turn");
turn.innerHTML = " X's turn";
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const winnerText = document.getElementById("winnerText");
const cells = document.querySelectorAll(".cell");
const cellArray = Array.from(cells);
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if(cell.innerHTML !== ""){return;}
        console.log(`You clicked on ${cell.className}`);
        if(xsTurn == true){cell.innerHTML = 'x'; xsTurn = false; console.log(xsTurn);turn.innerHTML = " O's turn";}
        else{cell.innerHTML = 'o'; xsTurn = true;console.log(xsTurn); turn.innerHTML = " X's turn";}
        if (checkWinner()) {
            showWinnerPopup(cell.innerHTML + " Wins!");
        }
        else if (isBoardFull()) { // Check if board is full
            showWinnerPopup("It's a Draw!");
        }
    });
});

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cellArray[a].innerHTML &&
            cellArray[a].innerHTML === cellArray[b].innerHTML &&
            cellArray[a].innerHTML === cellArray[c].innerHTML
        );
    });
}
function resetBoard() {
    setTimeout(() => {
        cells.forEach(cell => (cell.innerHTML = ""));
        xsTurn = true; // Reset turn to X
        turn.innerHTML = " X's turn"
    }, 200);
}

function isBoardFull() {
    return cellArray.every(cell => cell.innerHTML !== ""); // If no empty cells, return true
}

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (Top-left to Bottom-right)
    [2, 4, 6]  // Diagonal (Top-right to Bottom-left)
];
function showWinnerPopup(message) {
    winnerText.innerText = message;
    
    // Make modal and overlay visible first
    modal.style.display = "block";
    modalOverlay.style.display = "block";

    // Use a short delay before adding the "show" class
    setTimeout(() => {
        modal.classList.add("show");
        modalOverlay.classList.add("show");
    }, 10); // Small delay to allow CSS transition to apply
}

function closeModal() {
    modal.classList.remove("show");
    modalOverlay.classList.remove("show");

    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
        resetBoard();
    }, 500);
}