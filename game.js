let c = document.getElementById("canvo");
let ctx = c.getContext("2d"); // to set animation to render
let score;
let msg;
let base = 280; // define disk base ..
const DISC_HEIGHT = 10; // define disk height
const DISC_WIDTH = 80; // define disk width
let bar1 = []; //used to store disks
let bar2 = [];
let bar3 = [];
let destinationTower = [2]; // array of length 2 used to store , mouse bar selected and targeted bar
let popElement; // element that will be popped and pushed
const DISC_COUNT = 4; // number of disks, defined static
let moves = 0; // moves taken

let modal = document.getElementById("myModal");

let endScreen = document.getElementById("myModal1");

let close = document.getElementById("close");

let tryAgain = document.getElementById("try");

/*  ----------- describing disks , drawDisc function is written in the variable  ---------*/

let disc1 = {
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

let disc2 = {
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

let disc3 = {
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

let disc4 = {
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
  ctx.fillStyle = "black";

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

bar 1,2,3 represents the black bars. used to push and pop disks
 ---------------*/
function drawLayout() {
  drawTowers();
  bar1 = [];
  bar2 = [];
  bar3 = [];

  disc1.x = c.width / 4 - 110;
  disc1.y = base - 10;

  disc2.x = c.width / 4 - 100;
  disc2.y = base - 20;

  disc3.x = c.width / 4 - 90;
  disc3.y = base - 30;

  disc4.x = c.width / 4 - 80;
  disc4.y = base - 40;

  bar1 = [disc1, disc2, disc3, disc4];

  for (let i = 0; i < bar1.length; i++) {
    bar1[i].drawDisc();
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
    if (evt.button == 0) {
      destinationTower[0] = 1;
    } else if (evt.button == 2) {
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
    if (evt.button == 0) {
      destinationTower[0] = 2;
    } else if (evt.button == 2) {
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
    if (evt.button == 0) {
      destinationTower[0] = 3;
    } else if (evt.button == 2) {
      destinationTower[1] = 3;
      moveDiscTo(destinationTower);
    }
  }
}

// -------- calculate score, display message ----------------------------
function checkGame(noOfMoves) {
  let minMoves = Math.pow(2, DISC_COUNT) - 1;
  let color;

  if (bar2.length == DISC_COUNT) {
    score = 100 * (minMoves / noOfMoves);
    if (score == 100) {
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

// ----------- pushes and pops disks and repaints animation
function moveDiscTo(sourceAndTarget) {
  if (
    (sourceAndTarget[0] != null || sourceAndTarget[0] != undefined) &&
    (sourceAndTarget[1] != null || sourceAndTarget[1] != undefined)
  ) {
    //popElement = bar[0].pop();
    if (sourceAndTarget[0] === sourceAndTarget[1]) {
      event.preventDefault();
    } else {
      // --------------------------- for bar1 ------------------------------------
      if (sourceAndTarget[0] == 1) {
        // source is bar1
        // target is bar1
        if (sourceAndTarget[1] == 1) {
          //if source and target is bar1
          event.preventDefault();
        } else if (sourceAndTarget[1] == 2) {
          //if source is bar 1 and target is bar2
          if (bar1.length == 0) {
            event.preventDefault();
          } else {
            if (bar2.length == 0) {
              popElement = bar1.pop();
              bar2.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar2[bar2.length - 1].diskId < bar1[bar1.length - 1].diskId
            ) {
              popElement = bar1.pop();
              bar2.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] == 3) {
          //if source is bar 1 and target is bar3
          if (bar1.length == 0) {
            event.preventDefault();
          } else {
            if (bar3.length == 0) {
              popElement = bar1.pop();
              bar3.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar3[bar3.length - 1].diskId < bar1[bar1.length - 1].diskId
            ) {
              popElement = bar1.pop();
              bar3.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        }
      }

      // --------------------------- for bar2 ------------------------------------

      // if source is bar2
      else if (sourceAndTarget[0] == 2) {
        if (sourceAndTarget[1] == 1) {
          //if source is bar 2 and target is bar1
          if (bar2.length == 0) {
            event.preventDefault();
          } else {
            if (bar1.length == 0) {
              popElement = bar2.pop();
              bar1.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar1[bar1.length - 1].diskId < bar2[bar2.length - 1].diskId
            ) {
              popElement = bar2.pop();
              bar1.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] == 2) {
          // if source and target is bar2
          event.preventDefault();
        } else if (sourceAndTarget[1] == 3) {
          //if source is bar 2 and target is bar3
          if (bar2.length == 0) {
            event.preventDefault();
          } else {
            if (bar3.length == 0) {
              popElement = bar2.pop();
              bar3.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar3[bar3.length - 1].diskId < bar2[bar2.length - 1].diskId
            ) {
              popElement = bar2.pop();
              bar3.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        }
      }

      // --------------------------- for bar3 ------------------------------------
      //if source is bar3
      else if (sourceAndTarget[0] == 3) {
        if (sourceAndTarget[1] == 1) {
          //if source is bar3 and target is bar1
          if (bar3.length == 0) {
            event.preventDefault();
          } else {
            if (bar1.length == 0) {
              popElement = bar3.pop();
              bar1.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar1[bar1.length - 1].diskId < bar3[bar3.length - 1].diskId
            ) {
              popElement = bar3.pop();
              bar1.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] == 2) {
          //if source is bar3 and target is bar2
          if (bar3.length == 0) {
            event.preventDefault();
          } else {
            if (bar2.length == 0) {
              popElement = bar3.pop();
              bar2.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else if (
              bar2[bar2.length - 1].diskId < bar3[bar3.length - 1].diskId
            ) {
              popElement = bar3.pop();
              bar2.push(popElement);
              moves = moves + 1;
              ctx.clearRect(0, 0, c.width, c.height);
              renderFrame(popElement, sourceAndTarget);
              document.getElementById("move").innerHTML = moves;
              checkGame(moves);
            } else {
              event.preventDefault();
            }
          }
        } else if (sourceAndTarget[1] == 3) {
          //if source and target is bar3
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

  if (bar1.length != 0) {
    for (let i = 0; i < bar1.length; i++) {
      bar1[i].drawDisc();
    }
  }
  if (bar2.length != 0) {
    for (let i = 0; i < bar2.length; i++) {
      bar2[i].drawDisc();
    }
  }
  if (bar3.length != 0) {
    for (let i = 0; i < bar3.length; i++) {
      bar3[i].drawDisc();
    }
  }
}

// ----- function to calculate and set the co-ordinates of disks depending upon the placement of bars

function renderFrame(elem, target) {
  if (target.length != 0 && elem.length != 0) {
    /* -------------- for bar1 ----------------*/
    if (target[1] == 1 && elem.diskId == 1) {
      // check target and disk, diskId used to determine, here disk is green
      elem.x = c.width / 4 - 110; // calculate width
      elem.y = base - 10 * bar1.length; // calculate base depending upon the disks in tower, which it is about to rest
    } else if (target[1] == 1 && elem.diskId == 2) {
      elem.x = c.width / 4 - 100;
      elem.y = base - 10 * bar1.length;
    } else if (target[1] == 1 && elem.diskId == 3) {
      elem.x = c.width / 4 - 90;
      elem.y = base - 10 * bar1.length;
    } else if (target[1] == 1 && elem.diskId == 4) {
      elem.x = c.width / 4 - 80;
      elem.y = base - 10 * bar1.length;
    } else if (target[1] == 2 && elem.diskId == 1) {
      /* -------------- for bar2 ----------------*/
      elem.x = c.width / 2 - 85;
      elem.y = base - 10 * bar2.length;
    } else if (target[1] == 2 && elem.diskId == 2) {
      elem.x = c.width / 2 - 75;
      elem.y = base - 10 * bar2.length;
    } else if (target[1] == 2 && elem.diskId == 3) {
      elem.x = c.width / 2 - 65;
      elem.y = base - 10 * bar2.length;
    } else if (target[1] == 2 && elem.diskId == 4) {
      elem.x = c.width / 2 - 55;
      elem.y = base - 10 * bar2.length;
    } else if (target[1] == 3 && elem.diskId == 1) {
      /* -------------- for bar3 ----------------*/
      elem.x = c.width / 2 + 115;
      elem.y = base - 10 * bar3.length;
    } else if (target[1] == 3 && elem.diskId == 2) {
      elem.x = c.width / 2 + 125;
      elem.y = base - 10 * bar3.length;
    } else if (target[1] == 3 && elem.diskId == 3) {
      elem.x = c.width / 2 + 135;
      elem.y = base - 10 * bar3.length;
    } else if (target[1] == 3 && elem.diskId == 4) {
      elem.x = c.width / 2 + 145;
      elem.y = base - 10 * bar3.length;
    }
    drawTowers();
    drawDiscs();
  } else {
    event.preventDefault();
  }
}

drawLayout();
