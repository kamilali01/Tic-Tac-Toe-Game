const xImage = "./img/assassins-creed.png";  // Replace with the actual path to your X image
const oImage = "./img/templar-icon.png";  // Replace with the actual path to your O image

let xScore = 0;  // Initialize X score
let oScore = 0;  // Initialize O score

let xsTurn = true;
const turn = document.querySelector(".turn");
turn.innerHTML = " Assassin'S turn";
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const winnerText = document.getElementById("winnerText");
const cells = document.querySelectorAll(".cell");

// Get the sound element
const placeSound = document.getElementById("place-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");


let gameBoard = ['', '', '', '', '', '', '', '', '']; // Keeps track of the game state

const cellArray = Array.from(cells);

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        console.log(`You clicked on ${cell.className}`);
        if (gameBoard[index] === "") {
            placeMarker(cell, index);
        }
    });
});

function placeMarker(cell, index) {
    const marker = xsTurn ? 'X' : 'O';
    gameBoard[index] = marker;

    const img = document.createElement('img');
    img.style = "max-width: 5rem; filter: invert(1);";
    img.src = xsTurn ? xImage : oImage;
    img.alt = marker;
    cell.appendChild(img);
    placeSound.currentTime = 0; 
    placeSound.play();
    
    if (checkWinner(marker)) {
        setTimeout(() => {
            if (marker === 'X') {
                winnerText.innerHTML = `AssassinS wins!`;
                winSound.play();
            } else {
                winnerText.innerHTML = `TemplarS wins!`;
                loseSound.play();
            }
            updateScore(marker);
            showModal();  // This will show the winner modal with the correct message
        }, 200);
        return;
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        setTimeout(() => {
            winnerText.innerHTML = "It's a draw!";
            showModal();  // Show the draw modal
        }, 300);
        return;
    }

    xsTurn = !xsTurn; // Toggle the turn
    turn.innerHTML = xsTurn ? "Assassin'S turn" : "Templar'S turn";
}

function checkWinner(marker) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === marker);
    });
}

function isBoardFull() {
    return cellArray.every(cell => cell.innerHTML !== ""); // If no empty cells, return true
}


function showModal() {
    // Make modal and overlay visible first
    modal.style.display = "block";
    modalOverlay.style.display = "block";

    // Use a short delay before adding the "show" class
    setTimeout(() => {
        modal.classList.add("show");
        modalOverlay.classList.add("show");
    }, 2); // Small delay to allow CSS transition to apply
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

function updateScore(marker) {
    if (marker === 'X') {
        xScore++;
        document.getElementById('x-score').innerText = xScore;
    } else {
        oScore++;
        document.getElementById('o-score').innerText = oScore;
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset the game state
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear the cells
    });
    xsTurn = true;
    turn.innerHTML = " Assassin'S turn";
}

function resetScore() {
    xScore = 0;  // Reset X's score
    oScore = 0;  // Reset O's score
    document.getElementById("x-score").innerText = xScore;  // Reset the display
    document.getElementById("o-score").innerText = oScore;  // Reset the display
}

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
music.volume = 0.3;
placeSound.playbackRate = 3;
winSound.playbackRate = 1.5;
loseSound.volume = 0.5;
winSound.currentTime = 0.5;

document.addEventListener("DOMContentLoaded", function () {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play().catch(error => console.log("Autoplay blocked: " + error));
});
function toggleMusic() {
    if (music.paused) {
            music.play();
            musicBtn.innerHTML = "⏸ Pause Music";
    } else {
            music.pause();
            musicBtn.innerHTML = "▶ Play Music";
    }
}
document.getElementById("og-btn").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.getElementById("op-btn").addEventListener("click", function () {
    window.location.href = "op.html";
});
document.getElementById("viking-btn").addEventListener("click", function () {
    window.location.href = "viking.html";
});