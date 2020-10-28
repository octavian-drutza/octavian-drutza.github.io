import { borderLeft, borderRight, borderBottom, minusScore } from "./index.js";

import { rocketCell } from "./rocket.js";

let celestialGenerator = document.getElementById("celestial-generator");

const DIRECTIONS = {
  RIGHT: {
    value: 0,
    class: "celestial-animation-right",
    angle: ["transform", "rotate(-90deg)"],
  },
  LEFT: {
    value: 1,
    class: "celestial-animation-left",
  },
  DOWN: {
    value: 2,
    class: "celestial-animation-down",
    angle: ["transform", "rotate(-45deg)"],
  },
};

export class Comet {
  constructor(/* id, */ speed, startX, startY, angleRight, angleLeft) {
    /*     this.id = id; */
    this.startX = startX;
    this.startY = startY;
    this.speed = speed;
    this.angleRight = angleRight;
    this.angleLeft = angleLeft;
    this.cell;
    this.direction;
    this.getCoords;
    this.create();
  }

  create() {
    this.populateCell();
    this.animateCell();
    this.specifyPathAngle();
    this.initialize();
  }

  specifyPathAngle() {
    DIRECTIONS.RIGHT.anglePath = [
      "--celestial-path-right",
      `${this.angleRight}` + "px",
    ];
    DIRECTIONS.LEFT.anglePath = [
      "--celestial-path-left",
      `${this.angleLeft}` + "px",
    ];
  }

  populateCell() {
    this.cell = document.createElement("div");
    this.setStartPosition();
    this.cell.classList.add("comet");
    celestialGenerator.appendChild(this.cell);
  }

  setStartPosition() {
    this.cell.style.setProperty("--celestial-startX", `${this.startX}` + "px");
    this.cell.style.setProperty("--celestial-startY", `${this.startY}` + "px");
  }

  setSpeed() {
    this.cell.style.setProperty("--celestial-speed", `${this.speed}` + "s");
  }

  animateCell() {
    this.cell.innerHTML = `<i class="fas fa-meteor"></i>`;
  }

  setBottom() {
    this.cell.style.setProperty("--bottom", `${borderBottom}` + "px");
  }

  move(direction) {
    this.direction = direction;
    if (this.direction.angle) {
      this.cell.style.setProperty(...this.direction.angle);
    }
    if (this.direction.anglePath) {
      this.cell.style.setProperty(...this.direction.anglePath);
    }
    this.cell.classList.add(this.direction.class);
    this.setSpeed();
    this.setBottom();
    this.setOut();
  }

  manageMovement() {
    let dir = [...Object.keys(DIRECTIONS)];
    let ran = Math.floor(Math.random() * dir.length);
    this.move(DIRECTIONS[dir[ran]]);
  }

  removePrevAnimation() {
    this.cell.style.removeProperty("transform");
    this.cell.classList.remove(
      "celestial-animation-right",
      "celestial-animation-left",
      "celestial-animation-down"
    );
  }

  checkForImpact() {
    let celestialX = this.cell.getBoundingClientRect().x;
    let celestialY = this.cell.getBoundingClientRect().y;
    let rocketX = rocketCell.getBoundingClientRect().x;
    let rocketY = rocketCell.getBoundingClientRect().y;
    if (
      celestialX > rocketX - 25 &&
      celestialX < rocketX + 25 &&
      celestialY > rocketY - 40
    ) {
      minusScore();
      this.removePrevAnimation();
      this.cell.remove();
    }
    if (
      celestialY > borderBottom - 50 ||
      celestialX < borderLeft ||
      celestialX > borderRight - 50
    ) {
      this.cell.remove();
    }
  }

  initialize() {
    this.manageMovement();
    this.getCoords = setInterval(() => {
      this.checkForImpact();
    }, 10);
  }

  setOut() {
    this.cell.onanimationend = () => {
      this.removePrevAnimation();
      clearInterval(this.getCoords);
      this.cell.remove();
    };
  }
}

function generateComets() {
  let comet = new Comet(...generateRandomProps());
}

function generateRandomProps() {
  let speed, startX, startY, angleRight, angleLeft;
  speed = Math.floor(Math.random() * 7 + 1);
  startX = Math.floor(Math.random() * 800 + 100) + borderLeft;
  startY = Math.floor(Math.random() * 10 - 100);
  angleRight = startX + Math.floor(Math.random() * 400 + 100);
  angleLeft = startX - Math.floor(Math.random() * 400 + 100);
  return [speed, startX, startY, angleRight, angleLeft];
}

export { generateComets, generateRandomProps };
