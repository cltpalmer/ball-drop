const balls = document.querySelectorAll('.ball');
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const playAgainButton = document.getElementById('play-again-button');
const body = document.body;

let score = 0;
let timeLeft = 30;
let swapInterval;
let holeSwapInterval;
let timerInterval;
let swapSpeed = 4000;  // Slower initial speed
const initialSwapSpeed = 4000;  // Slower initial speed

balls.forEach(ball => {
    ball.addEventListener('dragstart', dragStart);
});

holes.forEach(hole => {
    hole.addEventListener('dragover', dragOver);
    hole.addEventListener('drop', drop);
});

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', resetGame);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-color'));
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const ballColor = event.dataTransfer.getData('text/plain');
    const holeColor = event.target.getAttribute('data-color');

    if (ballColor === holeColor) {
        event.target.style.backgroundColor = 'transparent';
        score++;
        scoreDisplay.textContent = `Score: ${score}/10`;
        flashBackground('green');
        if (score === 10) {
            setTimeout(() => {
                alert('You win!');
                endGame();
            }, 500);
        }
    } else {
        flashBackground('red');
    }
}

function flashBackground(color) {
    body.style.backgroundColor = color === 'green' ? '#90EE90' : '#FF6347';
    setTimeout(() => {
        body.style.backgroundColor = '#F0F8FF';
    }, 500);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            clearInterval(swapInterval);
            clearInterval(holeSwapInterval);
            setTimeout(() => {
                alert('Time\'s up! You lose.');
                endGame();
            }, 500);
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    swapSpeed = initialSwapSpeed;
    scoreDisplay.textContent = 'Score: 0/10';
    timerDisplay.textContent = 'Time: 30s';
    holes.forEach(hole => {
        hole.style.backgroundColor = 'transparent';
    });
    playAgainButton.style.display = 'none';
    startButton.style.display = 'block';
    clearInterval(timerInterval);
    clearInterval(swapInterval);
    clearInterval(holeSwapInterval);
    balls.forEach(ball => {
        ball.classList.remove('falling');
    });
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(swapInterval);
    clearInterval(holeSwapInterval);
    playAgainButton.style.display = 'block';
    startButton.style.display = 'none';
    balls.forEach(ball => {
        ball.classList.add('falling');
    });
}

function swapBalls() {
    const ballArray = Array.from(balls);
    const ball1 = ballArray[Math.floor(Math.random() * ballArray.length)];
    const ball2 = ballArray[Math.floor(Math.random() * ballArray.length)];

    if (ball1 !== ball2) {
        const tempColor = ball1.getAttribute('data-color');
        ball1.setAttribute('data-color', ball2.getAttribute('data-color'));
        ball2.setAttribute('data-color', tempColor);

        ball1.style.backgroundColor = ball2.getAttribute('data-color');
        ball2.style.backgroundColor = tempColor;

        ball1.style.transform = 'scale(1.2)';
        ball2.style.transform = 'scale(1.2)';

        setTimeout(() => {
            ball1.style.transform = 'scale(1)';
            ball2.style.transform = 'scale(1)';
        }, 300);
    }
}

function swapHoles() {
    const holeArray = Array.from(holes);
    const hole1 = holeArray[Math.floor(Math.random() * holeArray.length)];
    const hole2 = holeArray[Math.floor(Math.random() * holeArray.length)];

    if (hole1 !== hole2) {
        const tempColor = hole1.getAttribute('data-color');
        hole1.setAttribute('data-color', hole2.getAttribute('data-color'));
        hole2.setAttribute('data-color', tempColor);

        hole1.style.borderColor = hole2.getAttribute('data-color');
        hole2.style.borderColor = tempColor;
    }
}

function startSwapping() {
    swapInterval = setInterval(() => {
        swapBalls();
        swapSpeed = Math.max(1000, swapSpeed - 300);  // Slightly slower acceleration
        clearInterval(swapInterval);
        startSwapping();
    }, swapSpeed);

    holeSwapInterval = setInterval(() => {
        swapHoles();
    }, 1500);
}

function startGame() {
    startButton.style.display = 'none';
    scoreDisplay.textContent = 'Score: 0/10';
    timerDisplay.textContent = 'Time: 30s';
    score = 0;
    timeLeft = 30;
    swapSpeed = initialSwapSpeed;
    startTimer();
    startSwapping();
    balls.forEach(ball => {
        ball.classList.remove('falling');
    });
}

document.addEventListener('DOMContentLoaded', resetGame);
