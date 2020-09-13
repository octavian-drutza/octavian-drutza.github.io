import { menu } from "./menu.js";
import { backButton } from "./menuTop.js";
let lowContent;
let contentEl;
let headerPictureEl;
let content;
let menuObj = {
  menu_item_1: {
    submenu_item_1: { content: "getfit_mealplan" },
    submenu_item_2: { content: "getfit_workouts" },
    submenu_item_3: { content: "getfit_supliments" },
  },
  menu_item_2: {
    submenu_item_1: { content: "loseweight_mealplan" },
    submenu_item_2: { content: "loseweight_workouts" },
    submenu_item_3: { content: "loseweight_supliments" },
  },
  menu_item_3: {
    submenu_item_1: { content: "buildmuscle_mealplan" },
    submenu_item_2: { content: "buildmuscle_workouts" },
    submenu_item_3: { content: "buildmuscle_supliments" },
  },
  menu_item_4: {
    submenu_item_1: { content: "buildstrength_mealplan" },
    submenu_item_2: { content: "buildstrength_workouts" },
    submenu_item_3: { content: "buildstrength_supliments" },
  },
};

(function init() {
  getContentEl();
})();

function getContentEl() {
  contentEl = document.getElementById("all-content");
  headerPictureEl = document.getElementById("header");
  lowContent = document.getElementById("low-content");
}

function insertContent(content) {
  menu.innerHTML = content;
  backButton.style.display = "block";
  headerPictureEl.style.display = "none";
  lowContent.style.display = "none";
}

function swapContent(current, submenuCurrent) {
  content = menuObj[current.id][submenuCurrent.id].content;
}

export {
  swapContent,
  insertContent,
  content,
  contentEl,
  headerPictureEl,
  lowContent,
};
