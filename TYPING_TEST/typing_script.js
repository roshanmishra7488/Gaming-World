let gameOverCount = 0;

    let AdModal = document.getElementById("AdModal");
    let AdVideo = document.getElementById("AdVideo");

    let typeContent = document.querySelector(".typeContent p");
    let input = document.getElementById("typeValue");
    let resetBtn = document.querySelector(".bottomPart button");

    let timeOverBox = document.getElementById("timeOverBox");

    let soundBtn = document.querySelector(".sound input");

    document.querySelector(".box").addEventListener('click', () => {
        if (!input.disabled) {
            input.focus();
        }
    });

    let letterIndex = 0;
    let mistakes = 0;
    let isTyping = false;

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

        correctType.currentTime = 0;
        incorrectType.currentTime = 0;
    }

    let loadPara = () => {
        let randomPara = Math.floor(Math.random() * article.length);
        typeContent.innerHTML = "";
        article[randomPara].split('').forEach(element => {
            let realData = `<span>${element}</span>`;
            typeContent.innerHTML += realData;
        });

        typeContent.querySelectorAll('span')[0].classList.add('active');


    }

    loadPara();

    soundBtn.addEventListener('change', () => {
        isSoundOn = soundBtn.checked;
    });

   input.addEventListener('input', (e) => {
    let char = typeContent.querySelectorAll("span");
    if (input.disabled) return;

    let inputValue = e.target.value;

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    //  BACKSPACE HANDLE
    if (inputValue.length < letterIndex) {
        letterIndex--;
        if (char[letterIndex].classList.contains('incorrect')) {
            mistakes--;
        }
        char[letterIndex].classList.remove('correct', 'incorrect');
    } 
    //  NORMAL TYPING
    else {
        let currentChar = inputValue[letterIndex];

        if (letterIndex < char.length) {
            if (char[letterIndex].innerText == currentChar) {
                char[letterIndex].classList.add('correct');
                playSound();
                if (isSoundOn) correctType.play();
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                playSound();
                if (isSoundOn) incorrectType.play();
            }
            letterIndex++;
        }
    }

    // ACTIVE CURSOR
    char.forEach(el => el.classList.remove('active'));
    if (char[letterIndex]) {
        char[letterIndex].classList.add('active');
    }

    error.innerText = `Mistakes: ${mistakes}`;
    cpm.innerText = `CPM: ${letterIndex - mistakes}`;
});

    let timeSetup = () => {
        if (timeLeft > 0) {
            timeLeft--;
            tLeft.innerText = `Time-Left: ${timeLeft}S`;

            let timeSpent = maxTime - timeLeft || 1;

            let wpmTab = Math.round((letterIndex - mistakes) / 5 / timeSpent * 60);
            wpm.innerText = `WPM: ${wpmTab}`;
        } else {
            clearInterval(time);
            time = null;
            input.value = "";
            input.blur();

            input.disabled = true;

            setTimeout(() => {
            gameOverCount++;

            if (gameOverCount % 3 === 0) {
                timeOverBox.style.display = "none";
                AdModal.style.display = "flex";
                AdVideo.play();
            } else {

                timeOverBox.style.display = "block";
            }
            }, 100);
        }
    };

    resetBtn.addEventListener('click', () => {
        loadPara();
        clearInterval(time);
        time = null;

        timeLeft = maxTime;
        letterIndex = 0;
        mistakes = 0;
        isTyping = false;

        wpm.innerText = `WPM: 0`;
        cpm.innerText = `CPM: 0`;
        error.innerText = `Mistakes: 0`;
        tLeft.innerText = `Time-Left: ${maxTime}S`;

        input.value = "";
        input.disabled = false;
        input.focus();

        timeOverBox.style.display = "none";
        AdModal.style.display = "none";
    })

    AdVideo.addEventListener("ended", () => {
        AdModal.style.display = "none";
        timeOverBox.style.display = "block";

        AdVideo.currentTime = 0;
    });