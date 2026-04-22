
let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");

let userScoreParagraph =document.querySelector("#userScore");
let compScoreParagraph =document.querySelector("#compScore");

let genCompChoice = () => {
    let options = ["stone", "paper", "scissor"];
    let randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

let drawGame = () => {
    msg.innerText = "Match Draw, Play Again";
    msg.style.backgroundColor = "#081b31";
}

let showWinner = (userWin, userChoice, compChoice) => {
    if(userWin ===  true) {
        userScore ++;
        userScoreParagraph.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#114f0a";
    } else {
        compScore++;
        compScoreParagraph.innerText = compScore;
        msg.innerText = `You Lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "#ff0000";
    }
}

let playGame = (userChoice) => {
    let compChoice = genCompChoice();

    if(userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if(userChoice === "stone") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "stone" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})
