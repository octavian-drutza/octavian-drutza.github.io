import { Comet, generateRandomProps } from "./cometConstructor.js";
import { borderLeft, borderRight, borderBottom, plusScore } from "./index.js";
import { rocketCell } from "./rocket.js";

let celestialGenerator = document.getElementById("celestial-generator");

class Satelite extends Comet {
  constructor(speed, startX, startY, angleRight, angleLeft) {
    super(speed, startX, startY, angleRight, angleLeft);
  }

  populateCell() {
    this.cell = document.createElement("div");
    this.setStartPosition();
    this.cell.classList.add("satelite");
    celestialGenerator.appendChild(this.cell);
  }

  animateCell() {
    this.cell.innerHTML = `<i class="fas fa-satellite"></i>`;
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
      plusScore();
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
}

function generateSatelites() {
  let satelite = new Satelite(...generateRandomProps());
}

export { generateSatelites };
