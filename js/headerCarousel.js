import { headerPictureEl } from "./content.js";
let index;
let currentImage;
let url;
let imagesList = [
  { source: "img/car_1.jpg" },
  { source: "img/car_2.jpg" },
  { source: "img/car_3.jpg" },
  { source: "img/car_4.jpg" },
  { source: "img/car_5.jpg" },
];

(function init() {
  index = 0;
  setValues();
})();

function setValues() {
  currentImage = imagesList[index];
  url = `url(${currentImage.source})`;
  headerPictureEl.style.backgroundImage = url;
}

function changeHeaderImage() {
  if (index < imagesList.length - 1) {
    index++;
  } else if (index === imagesList.length - 1) {
    index = 0;
  }
  setValues();
}

export { changeHeaderImage };
