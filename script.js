let boxes = document.querySelectorAll(".box");
let resbtn = document.querySelector("#res-btn");
let newbtn = document.querySelector("#new-btn");
let msgcon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

// Reset the game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgcon.classList.add("hide");
};

// Handle clicks on the boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; 

        if (turn0) {
            box.innerText = "o";
            turn0 = false;
        } else {
            box.innerText = "x";
            turn0 = true;
        }

        box.disabled = true; 
        box.classList.add("disabled"); 

        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        box.classList.add("disabled");
    });
};

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.classList.remove("disabled");
        box.innerText = "";
    });
};

// Show the winner message
const showWinner = (winner) => {
    msg.innerText = `Congrats! The winner is ${winner}`;
    msgcon.classList.remove("hide");
    disableBoxes();
};

// Check if there is a winner
const checkWinner = () => {
    for (let pattern of arr) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for a draw
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgcon.classList.remove("hide");
    }
};

// Event listeners for reset buttons
newbtn.addEventListener("click", resetGame);
resbtn.addEventListener("click", resetGame);
