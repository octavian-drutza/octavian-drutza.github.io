import { borderLeft, borderRight, borderBottom, borders } from "./index.js";
let rocketCell = document.querySelector(".rocket");
let getCoords;
let curPosition;

const DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  STEADY: 2,
};
let direction = DIRECTIONS.RIGHT;

function setRocketBottom() {
  rocketCell.style.setProperty(
    "--rocket-bottom",
    `${borderBottom - 50}` + "px"
  );
}

function moveRocket() {
  if (direction == DIRECTIONS.RIGHT) {
    rocketCell.classList.add("rocket-animation-right");
  } else if (direction == DIRECTIONS.LEFT) {
    rocketCell.classList.add("rocket-animation-left");
  }
}

function checkForImpact() {
  if (direction == DIRECTIONS.RIGHT && curPosition > borderRight - 80) {
    removeAnimation();
    wiggleScreen();
  } else if (direction == DIRECTIONS.LEFT && curPosition < borderLeft + 30) {
    removeAnimation();
    wiggleScreen();
  }
}

function initiateRocketMovement() {
  moveRocket();
  getCoords = setInterval(() => {
    curPosition = rocketCell.getBoundingClientRect().x;
    checkForImpact();
  }, 10);
}

function manageRocketMovement() {
  document.addEventListener("keydown", function (event) {
    directMove(event);
  });
  document.addEventListener("keyup", function (event) {
    stopMove(event);
  });
}

function directMove(event) {
  if (event.code === "ArrowLeft" && direction != DIRECTIONS.LEFT) {
    removeAnimation();
    direction = DIRECTIONS.LEFT;
    initiateRocketMovement();
  } else if (event.code === "ArrowRight" && direction != DIRECTIONS.RIGHT) {
    removeAnimation();
    direction = DIRECTIONS.RIGHT;
    initiateRocketMovement();
  }
}

function stopMove(event) {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    rocketInertion();
    direction = DIRECTIONS.STEADY;
    removeAnimation();
  }
}

function removeMove() {
  document.addEventListener("keydown", (e) => {
    direction = DIRECTIONS.STEADY;
    removeAnimation();
  });
}

function removeAnimation() {
  clearInterval(getCoords);
  rocketCell.classList.remove(
    "rocket-animation-right",
    "rocket-animation-left"
  );
  borders.classList.remove("wiggle-container");
  rocketCell.style.setProperty("--rocket-start", curPosition + "px");
}

function wiggleScreen() {
  borders.classList.add("wiggle-container");
  borders.onanimationend = () => {
    borders.classList.remove("wiggle-container");
  };
}

function rocketInertion() {
  if (direction == DIRECTIONS.LEFT) {
    rocketCell.classList.add("rocket-animation-stop-left");
  } else if (direction == DIRECTIONS.RIGHT) {
    rocketCell.classList.add("rocket-animation-stop-right");
  }
  borders.onanimationend = () => {
    rocketCell.classList.remove(
      "rocket-animation-stop-left",
      "rocket-animation-stop-right"
    );
  };
}

export {
  manageRocketMovement,
  initiateRocketMovement,
  setRocketBottom,
  removeMove,
  rocketCell,
};
