 let typeContent = document.querySelector(".typeContent p");
let input = document.getElementById("typeValue");
let resetBtn = document.querySelector(".bottomPart button");

let soundBtn = document.querySelector(".sound input");

let letterIndex = (mistakes = isTyping = 0);

let time;
let tLeft = document.querySelector(".tLeft");
let error = document.querySelector(".error");
let wpm = document.querySelector(".wpm");
let cpm = document.querySelector(".cpm");
let maxTime = 60;
let timeLeft = maxTime;

let correctType = new Audio("typing_sound/type.mp3");
let incorrectType = new Audio("typing_sound/wrong.mp3");

let isSoundOn = true;

let playSound = () => {
    correctType.pause();
    incorrectType.pause();
}

let loadPara = () => {
    let randomPara = Math.floor(Math.random() * article.length);
    typeContent.innerHTML = "";
    article[randomPara].split('').forEach(element => {
        let realData = `<span>${element}</span>`;
        typeContent.innerHTML += realData;
    });

    typeContent.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('click', () => {
        input.focus();
    })
}

loadPara();

soundBtn.addEventListener('change', () => {
    isSoundOn = soundBtn.checked;
});

input.addEventListener('input', (e) => {
    let char = typeContent.querySelectorAll("span");
    let inputValue = e.target.value.split('')[letterIndex];

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if(letterIndex < char.length){
        if(inputValue == null){
            if(letterIndex > 0){
                letterIndex--;
                if(char[letterIndex].classList.contains('incorrect')){
                    mistakes--;
                }
                char[letterIndex].classList.remove('correct', 'incorrect');
            }
        } else {
            if (char[letterIndex].innerText == inputValue) {
                char[letterIndex].classList.add('correct');
                playSound();
                if(isSoundOn){
                correctType.play();
                }
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                playSound();
                if(isSoundOn){
                incorrectType.play();
                }
            }
            letterIndex++;
        }
        char.forEach(element => {
            element.classList.remove('active');
        })
        if(char[letterIndex]){
            char[letterIndex].classList.add('active');
        } else {
            char[char.length - 1].classList.add('active');
        }
        error.innerText = `Mistakes: ${mistakes}`;

        cpm.innerText = `CPM: ${letterIndex - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
});

let timeSetup = () => {
    if(timeLeft > 0){
        timeLeft--;
        tLeft.innerText = `Time-Left: ${timeLeft}S`;

        let timeSpent = maxTime - timeLeft;
        if(timeSpent === 0){
            timeSpent = 1;
        }

        let wpmTab = Math.round((letterIndex - mistakes) / 5 / timeSpent * 60);
        wpm.innerText = `WPM: ${wpmTab}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
};

resetBtn.addEventListener('click', () => {
    loadPara();
    clearInterval(time);
     wpm.innerText = `WPM: 0`;
     cpm.innerText = `CPM: 0`;
     timeLeft = maxTime;
     tLeft.innerText = `Time-Left: ${maxTime}S`;
     input.value = "";
     letterIndex = mistakes = isTyping = 0;
})