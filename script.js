let boxes = document.querySelectorAll(".box");

let track = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];

let playerTurn1 = true;
let playerTurn2 = false;
let gameWon = false;

const validAttempt = (track, x, y) => {
  return track[x][y] === -1;
}

const checkWin = (track) => {
  // Check rows, columns and diagonals for a win
  for (let i = 0; i < 3; i++) {
    if (track[i][0] !== -1 && track[i][0] === track[i][1] && track[i][1] === track[i][2]) {
      return true;
    }
    if (track[0][i] !== -1 && track[0][i] === track[1][i] && track[1][i] === track[2][i]) {
      return true;
    }
  }
  if (track[0][0] !== -1 && track[0][0] === track[1][1] && track[1][1] === track[2][2]) {
    return true;
  }
  if (track[0][2] !== -1 && track[0][2] === track[1][1] && track[1][1] === track[2][0]) {
    return true;
  }
  return false;
}

const handleClick = (box, x, y) => {
  if (validAttempt(track, x, y) && !gameWon) {
    if (playerTurn1) {
      box.innerText = "X";
      track[x][y] = 1;
      playerTurn1 = false;
      playerTurn2 = true;
    } else {
      box.innerText = "O";
      track[x][y] = 0;
      playerTurn1 = true;
      playerTurn2 = false;
    }
    if (checkWin(track)) {
      gameWon = true;
      let msg=document.querySelector("p");
      if(playerTurn1?msg.innerText="Congratulations!!! Player 2 Won":msg.innerText="Congratulations!!! Player 1 Won");
    }
    
  } 
  else if(gameWon){
    box.removeEventListener("click",()=>handleClick(box,x,y));
    
  }else {
    alert("Invalid attempt");
    
  }
}

boxes.forEach((box, index) => {
  let x = Math.floor(index / 3);
  let y = index % 3;
  box.addEventListener("click", () => handleClick(box, x, y));
});
