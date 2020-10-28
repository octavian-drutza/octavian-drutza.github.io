import { borderLeft } from "./index.js";
let starGenerator = document.getElementById("star-generator");

function createStar(speed, delay, angle, spos, w, h, blink) {
  let star = document.createElement("div");
  star.setAttribute("class", "star");
  star.style.setProperty("--speed", speed + "s");
  star.style.setProperty("--delay", delay + "s");
  star.style.setProperty("--angle", angle + "vw");
  star.style.setProperty("--start-position", spos + "vw");
  star.style.setProperty("--height", h + "px");
  star.style.setProperty("--width", w + "px");
  star.style.setProperty("--blink", blink + "s");
  return star;
}

function generateRandomProps() {
  let speed, delay, angle, spos, w, h, blink;
  speed = Math.floor(Math.random() * 1 + 1);
  delay = Math.floor(Math.random() * 1);
  w = Math.floor(Math.random() * 4);
  h = w + 3;
  spos = Math.floor(Math.random() * 88);
  if (spos > 80) {
    angle = Math.floor(Math.random() * 10) + 65;
  } else if (spos > 50 && spos < 80) {
    angle = Math.floor(Math.random() * 10) + 50;
  } else {
    angle = Math.floor(Math.random() * 10) + 30;
  }
  blink = delay = Math.floor(Math.random() * 5);
  return [speed, delay, angle, spos, w, h, blink];
}

function populateStars(starQty) {
  for (let i = 0; i < starQty; i++) {
    starGenerator.appendChild(createStar(...generateRandomProps()));
  }
}

function removeStar(starQty) {
  for (let i = 0; i < starQty; i++) {
    starGenerator.removeChild(starGenerator.childNodes[0]);
  }
}

function manageStars() {
  populateStars(1);
  removeStar(1);
}

export { manageStars, populateStars, removeStar };
