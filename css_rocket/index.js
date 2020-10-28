import {
  initiateRocketMovement,
  manageRocketMovement,
  setRocketBottom,
  removeMove,
} from "./rocket.js";
import { manageStars, populateStars, removeStar } from "./stars.js";
import { generateComets } from "./cometConstructor.js";
import { generateSatelites } from "./sateliteConstructor.js";

let borders = document.querySelector(".main-container");
let scorePlace = document.querySelector(".score");
let levelPlace = document.querySelector(".level");
let message = document.querySelector(".message");
let startButton = document.querySelector(".start-button");
let mainMessage = document.querySelector(".center-message");
let highscorePlace = document.querySelector(".highscore");
let borderLeft,
  borderRight,
  borderBottom = 650,
  level = 1,
  initStarQty = 30,
  starFreq = 100,
  cometFreq = 500,
  sateliteFreq = 3000,
  levelChangeFreq = 30000,
  starInterval,
  cometsInterval,
  levelInterval,
  satelitesInterval,
  gameOn = false,
  scoreStart = 1,
  score;

activateStart();

function init() {
  mainMessage.style.setProperty("display", "none");
  message.innerText = "";
  gameOn = true;
  restartScore();
  restartLevel();
  verifyHighScore();
  getBorders();
  setBordersBottom(borderBottom);
  window.addEventListener("resize", getBorders);
  populateStars(initStarQty);
  starInterval = setInterval(manageStars, starFreq);
  cometsInterval = setInterval(generateComets, cometFreq);
  satelitesInterval = setInterval(generateSatelites, sateliteFreq);
  levelInterval = setInterval(changeLevel, levelChangeFreq);
  setRocketBottom();
  initiateRocketMovement();
  manageRocketMovement();
}

function getBorders() {
  borderLeft = borders.getBoundingClientRect().x;
  borderRight = borderLeft + 1000;
}

function setBordersBottom(px) {
  borders.style.setProperty("--height", px + "px");
}

function restartScore() {
  score = scoreStart;
  scorePlace.innerText = `Score: ${score}`;
}

function restartLevel() {
  level = 1;
  levelPlace.innerText = `Level: ${level}`;
}

function setUpScore() {
  if (gameOn) {
    scorePlace.innerText = `Score: ${score}`;
    verifyHighScore();
    checkWinStatus();
  }
}

function checkWinStatus() {
  if (score < 0) {
    clearInterval(starInterval);
    clearInterval(cometsInterval);
    clearInterval(satelitesInterval);
    clearInterval(levelInterval);
    removeStar(initStarQty);
    message.innerText = "YOU LOST, LOOSER!";
    gameOn = false;
    mainMessage.style.setProperty("display", "block");
    removeMove();
  }
}

function setUpLevel() {
  levelPlace.innerText = `Level: ${level}`;
}

function changeLevel() {
  level++;
  setUpLevel();
  if (cometFreq > 400) {
    cometFreq -= 150;
  } else if (cometFreq <= 200) {
    cometFreq -= 50;
  } else if (cometFreq <= 20) {
    cometFreq = 15;
  }
  clearInterval(cometsInterval);
  cometsInterval = setInterval(generateComets, cometFreq);
}

function activateStart() {
  startButton.addEventListener("click", () => {
    if (!gameOn) {
      init();
    }
  });
}

function minusScore() {
  if (gameOn) {
    score--;
  }
  setUpScore();
}

function plusScore() {
  if (gameOn) {
    score++;
  }
  setUpScore();
}

function verifyHighScore() {
  let highscore = localStorage.getItem("rocket-score");
  if (highscore) {
    if (score > highscore) {
      localStorage.setItem("rocket-score", score);
    }
  } else {
    localStorage.setItem("rocket-score", score);
  }
  highscorePlace.innerText = `Highscore: ${highscore}`;
}

export {
  borderLeft,
  borderRight,
  borderBottom,
  borders,
  gameOn,
  setUpScore,
  minusScore,
  plusScore,
};
