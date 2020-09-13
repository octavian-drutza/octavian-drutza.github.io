import {
  toggleMainMenu,
  toggleSecondaryMenu,
  getCurrent,
  backTitleAnimation,
  menuItems,
  menu,
  current,
  submenuCurrent,
} from "./menu.js";

import {
  swapContent,
  insertContent,
  content,
  headerPictureEl,
  lowContent,
} from "./content.js";

import { backButton } from "./menuTop.js";

import { changeQuote, footerContent } from "./footer.js";

import { changeHeaderImage } from "./headerCarousel.js";

(function init() {
  changeQuote();
})();

menu.addEventListener("click", (e) => {
  menuItems.forEach((item) => {
    if (e.target.id === item.id) {
      getCurrent(item);
      if (e.target.className === "menu-item") {
        toggleSecondaryMenu(item);
      } else if (e.target.id === "submenu_item_back") {
        toggleMainMenu();
      }
    }
  });
  if ((current, submenuCurrent)) {
    swapContent(current, submenuCurrent);
    insertContent(content);
  }
});

backButton.addEventListener("click", () => {
  if ((current, submenuCurrent)) {
    toggleSecondaryMenu(current);
  }
  backButton.style.display = "none";
  headerPictureEl.style.display = "block";
  lowContent.style.display = "block";
});

footerContent.addEventListener("animationend", () => {
  footerContent.classList.remove("footer-animation");
  void footerContent.offsetWidth;
  footerContent.classList.add("footer-animation");
  changeQuote();
});

headerPictureEl.addEventListener("animationend", () => {
  headerPictureEl.classList.remove("header-animation");
  void headerPictureEl.offsetWidth;
  headerPictureEl.classList.add("header-animation");
  changeHeaderImage();
});
