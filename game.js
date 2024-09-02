let c = document.getElementById("canvo");
let ctx = c.getContext("2d"); // to set animation to render
let score;
let msg;
let base = 280; // define disk base ..
const DISC_HEIGHT = 10; // define disk height
const DISC_WIDTH = 80; // define disk width
let firstTower = []; //used to store disks
let secondTower = [];
let thirdTower = [];
let destinationTower = [2]; // array of length 2 used to store , mouse bar selected and targeted bar
let popElement; // element that will be popped and pushed
const DISC_COUNT = 4; // number of disks, defined static
let moves = 0; // moves taken

let modal = document.getElementById("myModal");

let endScreen = document.getElementById("myModal1");

let close = document.getElementById("close");

let tryAgain = document.getElementById("try");

/*  ----------- describing disks ---------*/

function drawDisc() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.color;
  ctx.fill();
}

let firstDisc = {
  x: c.width / 4 - 110,
  y: base - 10,
  width: DISC_WIDTH,
  height: DISC_HEIGHT,
  diskId: 1,
  color: "green",
  drawDisc: drawDisc,
};

let secondDisc = {
  x: c.width / 4 - 100,
  y: base - 20,
  width: DISC_WIDTH - 20,
  height: DISC_HEIGHT,
  diskId: 2,
  color: "yellow",
  drawDisc: drawDisc,
};

let thirdDisc = {
  x: c.width / 4 - 90,
  y: base - 30,
  width: DISC_WIDTH - 40,
  height: DISC_HEIGHT,
  diskId: 3,
  color: "red",
  drawDisc: drawDisc,
};

let fourthDisc = {
  x: c.width / 4 - 80,
  y: base - 40,
  width: DISC_WIDTH - 60,
  height: DISC_HEIGHT,
  diskId: 4,
  color: "orange",
  drawDisc: drawDisc,
};

// ---------- defining font style and height
ctx.font = "30px Arial";

// ----- adding text in canvas
ctx.strokeText("Tower of Hanoi", 10, 50);

// add action listener to canvas element, getTarget is function to invoke, boolean value to invoke the function

c.addEventListener("mousedown", getTarget, true);

/*  ----------- for hiding model ---------*/

modal.style.display = "block";

endScreen.style.display = "none";

/*  ----------- for drawing black bars ---------*/

function drawTowers() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "brown";

  ctx.beginPath();
  ctx.rect(100, 180, 10, 100); //vertical bar
  ctx.fill();

  ctx.beginPath();
  ctx.rect(300, 180, 10, 100); //vertical bar
  ctx.fill();

  ctx.beginPath();
  ctx.rect(500, 180, 10, 100); //vertical bar
  ctx.fill();

  ctx.beginPath();
  ctx.rect(20, 280, 600, 10); //horizontal bar
  ctx.fill();
}

close.onclick = function () {
  modal.style.display = "none";
};

tryAgain.onclick = function () {
  reset();
  endScreen.style.display = "none";
};

/*  ------------------ for drawing disks, default they rest on first bar

bar 1,2,3 represents the towers and are used to push and pop disks
 ---------------*/
function drawLayout() {
  drawTowers();
  firstTower = [];
  secondTower = [];
  thirdTower = [];

  firstDisc.x = c.width / 4 - 110;
  firstDisc.y = base - 10;

  secondDisc.x = c.width / 4 - 100;
  secondDisc.y = base - 20;

  thirdDisc.x = c.width / 4 - 90;
  thirdDisc.y = base - 30;

  fourthDisc.x = c.width / 4 - 80;
  fourthDisc.y = base - 40;

  firstTower = [firstDisc, secondDisc, thirdDisc, fourthDisc];

  for (let i = 0; i < firstTower.length; i++) {
    firstTower[i].drawDisc.bind(firstTower[i])();
  }
}

/*------------ function for animation --------------------*/

function animateDisc(elem, target) {}

function moveDiskHelper(tower, button) {
  if (button === 0) {
    destinationTower[0] = tower;
  } else if (button === 2) {
    destinationTower[1] = tower;
    moveDiscTo(destinationTower);
  }
}

/* --------------- function to check if the mouse is clicked on the bar only -------------------*/

function getTarget(evt) {
  const { clientX, clientY, button } = evt;
  if (clientY >= 260 && clientY <= 360) {
    // -------- if clicked on first bar ----------------------------
    if (clientX >= 400 && clientX <= 410) {
      moveDiskHelper(1, button);
    }
    // -------- if clicked on second bar ----------------------------
    else if (clientX >= 600 && clientX <= 610) {
      moveDiskHelper(2, button);
    }
    // -------- if clicked on third bar ----------------------------
    else if (clientX >= 800 && clientX <= 810) {
      moveDiskHelper(3, button);
    }
  }
}

// -------- calculate score, display message ----------------------------
function checkGame(noOfMoves) {
  let minMoves = Math.pow(2, DISC_COUNT) - 1;
  let color;

  if (secondTower.length === DISC_COUNT) {
    score = Math.round(100 * (minMoves / noOfMoves));
    if (score === 100) {
      msg =
        "Excellent!!! <p>You have completed the game in minimum possible moves</p>";
      color = "green";
    } else if (score >= 80 && score < 99) {
      msg = "Good job";
      color = "yellow";
    } else if (score >= 60 && score <= 80) {
      msg = "Fine job";
      color = "orange";
    } else {
      msg = "You can do better !!!!";
      color = "red";
    }

    endScreen.style.display = "block";
    let msgElement = document.getElementById("msg");
    msgElement.innerHTML = msg;
    msgElement.style.color = color;
    document.getElementById("endScore").innerHTML =
      "Your efficiency is " + score;
    document.getElementById("endMoves").innerHTML = "Moves taken " + noOfMoves;
  }
}

// ----------- reset the game

function reset() {
  moves = 0;
  scoreBoard = { score: 0, move: 0, msg: "" };
  ctx.clearRect(0, 0, c.width, c.height);
  drawLayout();
  document.getElementById("move").innerHTML = moves;
}

function gameAlert() {
  document.getElementById("gameAlert").innerHTML =
    "Cannot place large disk on smaller one";
  setTimeout(function () {
    document.getElementById("gameAlert").innerHTML = "";
  }, 3500);
}

// ----------- pushes and pops disks and repaints animation
function moveDiscTo(sourceAndTarget) {
  if (sourceAndTarget[0] && sourceAndTarget[1]) {
    if (sourceAndTarget[0] === sourceAndTarget[1]) {
      event.preventDefault();
    } else {
      // --------------------------- for firstTower ------------------------------------
      if (sourceAndTarget[0] === 1) {
        // source and target is firstTower
        if (sourceAndTarget[1] === 1) {
          //if source and target is firstTower
          event.preventDefault();
        } else if (sourceAndTarget[1] === 2) {
          //if source is bar 1 and target is secondTower
          if (firstTower.length === 0) {
            event.preventDefault();
          } else {
            if (secondTower.length === 0) {
              popElement = firstTower.pop();
              secondTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              secondTower[secondTower.length - 1].diskId <
              firstTower[firstTower.length - 1].diskId
            ) {
              popElement = firstTower.pop();
              secondTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] === 3) {
          //if source is bar 1 and target is thirdTower
          if (firstTower.length === 0) {
            event.preventDefault();
          } else {
            if (thirdTower.length === 0) {
              popElement = firstTower.pop();
              thirdTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              thirdTower[thirdTower.length - 1].diskId <
              firstTower[firstTower.length - 1].diskId
            ) {
              popElement = firstTower.pop();
              thirdTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        }
      }

      // --------------------------- for secondTower ------------------------------------

      // if source is secondTower
      else if (sourceAndTarget[0] === 2) {
        if (sourceAndTarget[1] === 1) {
          //if source is bar 2 and target is firstTower
          if (secondTower.length === 0) {
            event.preventDefault();
          } else {
            if (firstTower.length === 0) {
              popElement = secondTower.pop();
              firstTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              firstTower[firstTower.length - 1].diskId <
              secondTower[secondTower.length - 1].diskId
            ) {
              popElement = secondTower.pop();
              firstTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] === 2) {
          // if source and target is secondTower
          event.preventDefault();
        } else if (sourceAndTarget[1] === 3) {
          //if source is bar 2 and target is thirdTower
          if (secondTower.length === 0) {
            event.preventDefault();
          } else {
            if (thirdTower.length === 0) {
              popElement = secondTower.pop();
              thirdTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              thirdTower[thirdTower.length - 1].diskId <
              secondTower[secondTower.length - 1].diskId
            ) {
              popElement = secondTower.pop();
              thirdTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        }
      }

      // --------------------------- for thirdTower ------------------------------------
      //if source is thirdTower
      else if (sourceAndTarget[0] === 3) {
        if (sourceAndTarget[1] === 1) {
          //if source is thirdTower and target is firstTower
          if (thirdTower.length === 0) {
            event.preventDefault();
          } else {
            if (firstTower.length === 0) {
              popElement = thirdTower.pop();
              firstTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              firstTower[firstTower.length - 1].diskId <
              thirdTower[thirdTower.length - 1].diskId
            ) {
              popElement = thirdTower.pop();
              firstTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] === 2) {
          //if source is thirdTower and target is secondTower
          if (thirdTower.length === 0) {
            event.preventDefault();
          } else {
            if (secondTower.length === 0) {
              popElement = thirdTower.pop();
              secondTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              secondTower[secondTower.length - 1].diskId <
              thirdTower[thirdTower.length - 1].diskId
            ) {
              popElement = thirdTower.pop();
              secondTower.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              gameAlert();
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] === 3) {
          //if source and target is thirdTower
          event.preventDefault();
        }
      }
    }
  } else {
    event.preventDefault();
  }
}

//  -----  draw the disks after they are pushed to array

function drawDiscs() {
  destinationTower = [];

  firstTower.forEach((tower) => tower.drawDisc());

  secondTower.forEach((tower) => tower.drawDisc());

  thirdTower.forEach((tower) => tower.drawDisc());
}

// ----- function to calculate and set the co-ordinates of disks depending upon the placement of bars

function renderFrame(elem, target) {
  let [, targetElement] = target;
  const { diskId } = elem;
  if (targetElement && elem) {
    if (targetElement === 1) {
      /* -------------- for firstTower ----------------*/
      const calcObj = {
        1: -110,
        2: -100,
        3: -90,
        4: -80,
      };

      elem.y = base - 10 * firstTower.length; // calculate base depending upon the disks in tower, which it is about to rest
      elem.x = c.width / 4 + calcObj[diskId];
    }
    if (targetElement === 2) {
      /* -------------- for secondTower ----------------*/
      const calcObj = {
        1: -85,
        2: -75,
        3: -65,
        4: -55,
      };

      elem.y = base - 10 * secondTower.length;
      elem.x = c.width / 2 + calcObj[diskId];
    } else if (targetElement === 3) {
      /* -------------- for thirdTower ----------------*/
      const calcObj = {
        1: 115,
        2: 125,
        3: 135,
        4: 145,
      };

      elem.y = base - 10 * thirdTower.length;
      elem.x = c.width / 2 + calcObj[diskId];
    }
    drawTowers();
    drawDiscs();
  } else {
    event.preventDefault();
  }
}

drawLayout();
