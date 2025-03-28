let xScore = 0;  // Initialize X score
let oScore = 0;  // Initialize O score

let xsTurn = true;
const turn = document.querySelector(".turn");
turn.innerHTML = " X's turn";
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const winnerText = document.getElementById("winnerText");
const cells = document.querySelectorAll(".cell");

// Get the sound element
const placeSound = document.getElementById("place-sound");
const winSound = document.getElementById("win-sound");

const cellArray = Array.from(cells);

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if(cell.innerHTML !== ""){ return; }
        console.log(`You clicked on ${cell.className}`);
        if(xsTurn == true) {
            cell.innerHTML = 'x';
            xsTurn = false;
            console.log(xsTurn);
            turn.innerHTML = " O's turn";
        } else {
            cell.innerHTML = 'o';
            xsTurn = true;
            console.log(xsTurn);
            turn.innerHTML = " X's turn";
        }
        // Reset audio and play sound effect
        placeSound.currentTime = 0;  // Reset audio to the beginning
        placeSound.play();           // Play the sound effect

        if (checkWinner()) {
            // Play the win sound when a player wins
            winSound.currentTime = 0;  // Reset audio to the beginning
            winSound.play();           // Play the win sound
            showWinnerPopup(cell.innerHTML + " Wins!");
        } else if (isBoardFull()) { // Check if board is full
            showWinnerPopup("It's a Draw!");
        }
        
        if (checkWinner()) {
            showWinnerPopup(cell.innerHTML + " Wins!");
            updateScore(cell.innerHTML);  // Update score based on winner
        } else if (isBoardFull()) {
            showWinnerPopup("It's a Draw!");
        }
    });
});

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cellArray[a].innerHTML && 
            cellArray[a].innerHTML === cellArray[b].innerHTML && 
            cellArray[a].innerHTML === cellArray[c].innerHTML) {
            
            return cellArray[a].innerHTML; // Return the winner ('x' or 'o')
        }
    }
    return null; // No winner found
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

function updateScore(winner) {
    if (winner === 'x') {
        xScore++;  // Increment X's score
    } else if (winner === 'o') {
        oScore++;  // Increment O's score
    }
    document.getElementById("x-score").innerText = xScore;  // Update the display
    document.getElementById("o-score").innerText = oScore;  // Update the display
}

function resetBoard() {
    setTimeout(() => {
        cells.forEach(cell => (cell.innerHTML = ""));
        xsTurn = true; // Reset turn to X
        turn.innerHTML = " X's turn";
    }, 200);
}

function resetScore() {
    xScore = 0;  // Reset X's score
    oScore = 0;  // Reset O's score
    document.getElementById("x-score").innerText = xScore;  // Reset the display
    document.getElementById("o-score").innerText = oScore;  // Reset the display
}

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

function toggleMusic() {
    if (music.paused) {
            music.play();
            musicBtn.innerHTML = "⏸ Pause Music";
    } else {
            music.pause();
            musicBtn.innerHTML = "▶ Play Music";
    }
}
document.getElementById("ac-btn").addEventListener("click", function () {
    window.location.href = "ac.html";
});