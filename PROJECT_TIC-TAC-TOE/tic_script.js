let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn = document.querySelector("#startBtn");
let main = document.querySelector("main");
let startContainer = document.querySelector(".start-container");


let turn_O = true;
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let resetGame = () => {
    turn_O = true;
    enableBoxes();
    msgConatiner.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_O === true) {
            box.innerHTML = "O";
            box.classList.add("o-color");
            turn_O = false;
        } else {
            box.innerHTML = "X";
            box.classList.add("x-color");
            turn_O = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

let disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

let enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color");
        box.classList.remove("o-color");
    }
};


let showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgConatiner.classList.remove("hide");
    disableBoxes();
};

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame)

startBtn.addEventListener("click", () => {
    main.classList.remove("hide");
    startContainer.remove();
});