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

/*  ----------- describing disks , drawDisc function is written in the variable  ---------*/

let firstDisc = {
  x: c.width / 4 - 110,
  y: base - 10,
  width: DISC_WIDTH,
  height: DISC_HEIGHT,
  diskId: 1,
  drawDisc: function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "green";
    ctx.fill();
  },
};

let secondDisc = {
  x: c.width / 4 - 100,
  y: base - 20,
  width: DISC_WIDTH - 20,
  height: DISC_HEIGHT,
  diskId: 2,
  drawDisc: function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "yellow";
    ctx.fill();
  },
};

let thirdDisc = {
  x: c.width / 4 - 90,
  y: base - 30,
  width: DISC_WIDTH - 40,
  height: DISC_HEIGHT,
  diskId: 3,
  drawDisc: function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fill();
  },
};

let fourthDisc = {
  x: c.width / 4 - 80,
  y: base - 40,
  width: DISC_WIDTH - 60,
  height: DISC_HEIGHT,
  diskId: 4,
  drawDisc: function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "orange";
    ctx.fill();
  },
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
    firstTower[i].drawDisc();
  }
}

/*------------ function for animation --------------------*/

function animateDisc(elem, target) {}

/* --------------- function to check if the mouse is clicked on the bar only -------------------*/

function getTarget(evt) {
  // -------- if clicked on first bar ----------------------------
  if (
    evt.clientX >= 400 &&
    evt.clientX <= 410 &&
    evt.clientY >= 260 &&
    evt.clientY <= 360
  ) {
    // -------- evt.button gives mouse button (click, left right , middle) etc ----------------------------
    if (evt.button === 0) {
      destinationTower[0] = 1;
    } else if (evt.button === 2) {
      destinationTower[1] = 1;
      moveDiscTo(destinationTower);
    }
  }
  // -------- if clicked on first bar ----------------------------
  else if (
    evt.clientX >= 600 &&
    evt.clientX <= 610 &&
    evt.clientY >= 260 &&
    evt.clientY <= 360
  ) {
    if (evt.button === 0) {
      destinationTower[0] = 2;
    } else if (evt.button === 2) {
      destinationTower[1] = 2;
      moveDiscTo(destinationTower);
    }
  }
  // -------- if clicked on first bar ----------------------------
  else if (
    evt.clientX >= 800 &&
    evt.clientX <= 810 &&
    evt.clientY >= 260 &&
    evt.clientY <= 360
  ) {
    if (evt.button === 0) {
      destinationTower[0] = 3;
    } else if (evt.button === 2) {
      destinationTower[1] = 3;
      moveDiscTo(destinationTower);
    }
  }
}

// -------- calculate score, display message ----------------------------
function checkGame(noOfMoves) {
  let minMoves = Math.pow(2, DISC_COUNT) - 1;
  let color;

  if (secondTower.length === DISC_COUNT) {
    score = 100 * (minMoves / noOfMoves);
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
    document.getElementById("msg").innerHTML = msg;
    document.getElementById("msg").style.color = color;
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
  if (
    (sourceAndTarget[0] !== null || sourceAndTarget[0] !== undefined) &&
    (sourceAndTarget[1] !== null || sourceAndTarget[1] !== undefined)
  ) {
    if (sourceAndTarget[0] === sourceAndTarget[1]) {
      event.preventDefault();
    } else {
      // --------------------------- for firstTower ------------------------------------
      if (sourceAndTarget[0] === 1) {
        // source is firstTower
        // target is firstTower
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

  firstTower.map((tower) => tower.drawDisc());

  secondTower.map((tower) => tower.drawDisc());

  thirdTower.map((tower) => tower.drawDisc());
}

// ----- function to calculate and set the co-ordinates of disks depending upon the placement of bars

function renderFrame(elem, target) {
  let targetElement = target[1];
  const { diskId } = elem;
  if (targetElement && elem) {
    if (targetElement === 1) {
      /* -------------- for firstTower ----------------*/
      if (diskId === 1) {
        elem.x = c.width / 4 - 110; // calculate width
        elem.y = base - 10 * firstTower.length; // calculate base depending upon the disks in tower, which it is about to rest
      } else if (diskId === 2) {
        elem.x = c.width / 4 - 100;
        elem.y = base - 10 * firstTower.length;
      } else if (diskId === 3) {
        elem.x = c.width / 4 - 90;
        elem.y = base - 10 * firstTower.length;
      } else {
        elem.x = c.width / 4 - 80;
        elem.y = base - 10 * firstTower.length;
      }
    }
    if (targetElement === 2) {
      /* -------------- for secondTower ----------------*/
      if (diskId === 1) {
        elem.x = c.width / 2 - 85;
        elem.y = base - 10 * secondTower.length;
      } else if (diskId === 2) {
        elem.x = c.width / 2 - 75;
        elem.y = base - 10 * secondTower.length;
      } else if (diskId === 3) {
        elem.x = c.width / 2 - 65;
        elem.y = base - 10 * secondTower.length;
      } else {
        elem.x = c.width / 2 - 55;
        elem.y = base - 10 * secondTower.length;
      }
    } else {
      /* -------------- for thirdTower ----------------*/
      if (diskId === 1) {
        elem.x = c.width / 2 + 115;
        elem.y = base - 10 * thirdTower.length;
      } else if (diskId === 2) {
        elem.x = c.width / 2 + 125;
        elem.y = base - 10 * thirdTower.length;
      } else if (diskId === 3) {
        elem.x = c.width / 2 + 135;
        elem.y = base - 10 * thirdTower.length;
      } else {
        elem.x = c.width / 2 + 145;
        elem.y = base - 10 * thirdTower.length;
      }
    }
    drawTowers();
    drawDiscs();
  } else {
    event.preventDefault();
  }
}

drawLayout();
