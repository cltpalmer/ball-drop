const balls = document.querySelectorAll('.ball');
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let swapInterval;

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
            clearInterval(swapInterval);
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
    clearInterval(swapInterval);
    startSwapping();
}

function swapBalls() {
    const ballArray = Array.from(balls);
    const ball1 = ballArray[Math.floor(Math.random() * ballArray.length)];
    const ball2 = ballArray[Math.floor(Math.random() * ballArray.length)];

    if (ball1 !== ball2) {
        const tempColor = ball1.style.backgroundColor;
        ball1.style.backgroundColor = ball2.style.backgroundColor;
        ball2.style.backgroundColor = tempColor;

        ball1.style.transform = 'scale(1.2)';
        ball2.style.transform = 'scale(1.2)';

        setTimeout(() => {
            ball1.style.transform = 'scale(1)';
            ball2.style.transform = 'scale(1)';
        }, 300);
    }
}

function startSwapping() {
    swapInterval = setInterval(swapBalls, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    startSwapping();
});
