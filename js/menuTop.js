import { contentEl } from "./content.js";
import { menuItems, getMenuItems, menu, toggleMainMenu } from "./menu.js";

let backButton;

(function init() {
  getBackButton();
})();

function getBackButton() {
  backButton = document.getElementById("back-top");
}

export { backButton };
