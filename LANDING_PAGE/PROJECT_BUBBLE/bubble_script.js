function makeBubble (){
let clutter = "";
for (let i = 0; i <= 191; i++) {
    let randomNumber = Math.floor(Math.random() * 10 );
    clutter += `<div class="bubble">${randomNumber}</div>`;
};
document.querySelector("#panelBottom").innerHTML = clutter;
};

let timer = 60;
let timerInterval;
function runTimer(){
    timerInterval = setInterval(function(){
        if(timer > 0){
            timer--;
        document.querySelector("#timerValue").textContent = timer;
        }
        else{
            clearInterval(timerInterval);
            document.querySelector("#panelBottom").innerHTML = `
            <div class="game-over">
                <h2>Game Over</h2>
                <button id="restartBtn">Restart Game</button>
                </div>
                `;
                addRestartEvent();
        }
    }, 1000);
}

let hitNumber;
function getNewHit (){
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector("#hitValue").textContent = hitNumber
}

let score = 0;
function increaseScore (){
    score += 10;
    document.querySelector("#scoreValue").textContent = score;
}

let clickedNumber;
document.querySelector("#panelBottom").addEventListener("click", function(details){
    if(!details.target.classList.contains("bubble"))return;
    clickedNumber = Number(details.target.textContent);
    if(clickedNumber === hitNumber){
        increaseScore();
        makeBubble();
        getNewHit();
    } else {
        clearInterval(timerInterval);
        timer = 0;
        document.querySelector("#timerValue").textContent = 0;
        document.querySelector("#panelBottom").innerHTML = `
        <div class="game-over">
        <h2>Game Over</h2>
        <button id="restartBtn">Restart Game</button>
        </div>
        `;
        addRestartEvent();
    }
})

function addRestartEvent (){
    document.querySelector("#restartBtn").addEventListener("click", function (){
    clearInterval(timerInterval);
    timer = 60;
    score = 0;
    document.querySelector("#timerValue").textContent = timer;
    document.querySelector("#scoreValue").textContent = score;
    getNewHit();
    makeBubble();
    runTimer();
    });
    
}

function startGame(){
    timer = 60;
    score = 0;
    document.querySelector("#timerValue").textContent = timer;
    document.querySelector("#scoreValue").textContent = score;
    getNewHit();
    makeBubble();
    runTimer();
}

function addStartEvent(){
    document.querySelector("#startBtn").addEventListener("click", function(){
        startGame();
    });
}



addStartEvent();
