let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

// Winning Patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset Game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Box Click Logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    const isWinner = checkWinner();

    if (count === 9 && !isWinner) gameDraw();
  });
});

// Draw Logic
const gameDraw = () => {
  msg.innerText = "Game is a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable All Boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable All Boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner-box");
  });
};

// Show Winner (after highlight)
const showWinner = (winner) => {
  setTimeout(() => {
    msg.innerHTML = `Player <span style="color:#00ffd5;">${winner}</span> Wins!`;
    msgContainer.classList.remove("hide");
  }, 800); // message 0.8 sec बाद दिखेगा

  disableBoxes();
};

// CHECK WINNER
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {

        // highlight winning boxes FIRST
        boxes[pattern[0]].classList.add("winner-box");
        boxes[pattern[1]].classList.add("winner-box");
        boxes[pattern[2]].classList.add("winner-box");

        showWinner(pos1); // message बाद में show होगा
        return true;
      }
    }
  }
  return false;
};

// Events
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
