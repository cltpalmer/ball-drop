const balls = document.querySelectorAll('.ball');
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;

balls.forEach(ball => {
    ball.addEventListener('dragstart', dragStart);
});

holes.forEach(hole => {
    hole.addEventListener('dragover', dragOver);
    hole.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.style.backgroundColor);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const ballColor = event.dataTransfer.getData('text/plain');
    const holeColor = event.target.getAttribute('data-color');

    if (ballColor === holeColor) {
        event.target.style.backgroundColor = ballColor;
        score++;
        scoreDisplay.textContent = `Score: ${score}/10`;
        if (score === 10) {
            alert('You win!');
            resetGame();
        }
    } else {
        alert('Wrong color! Try again.');
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert('Time\'s up! You lose.');
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = 'Score: 0/10';
    timerDisplay.textContent = 'Time: 30s';
    holes.forEach(hole => {
        hole.style.backgroundColor = '#FFF';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
});
