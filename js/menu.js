let menu;
let menuItems;
let current;
let submenuCurrent;
let title = "";

(function init() {
  getMenu();
  getMenuItems(".menu-item");
})();

function getMenu() {
  menu = document.getElementById("menu");
}

function getMenuItems(itemClass) {
  menuItems = Array.from(document.querySelectorAll(itemClass));
}

function backTitleAnimation() {
  let titleEl = document.querySelector(".title");
  titleEl.style.animationDuration = "0.2s";
  titleEl.style.animationName = "title-disappear";
  titleEl.style.fontSize = "0%";
}

function toggleMainMenu() {
  menu.innerHTML = `
    <h1 class="title">${title}</h1>
    <div class="row">
        <div id="column" class="col-lg-3 col-md-6 mb-3">
            <div id="menu_item_1" class="menu-item">
                <i class="fas fa-heartbeat"></i> GET FIT
            </div>
        </div>
        <div id="column" class="col-lg-3 col-md-6 mb-3">
            <div id="menu_item_2" class="menu-item">
                <i class="fas fa-fire-alt"></i> LOSE WEIGHT
            </div>
        </div>
        <div id="column" class="col-lg-3 col-md-6 mb-3">
            <div id="menu_item_3" class="menu-item">
                <i class="fas fa-dumbbell"></i> BUILD MUSCLE
            </div>
        </div>
        <div id="column" class="col-lg-3 col-md-6 mb-3">
            <div id="menu_item_4" class="menu-item">
                <i class="fas fa-running"></i> BUILD STRENGTH
            </div>
        </div>
    </div>`;
  getMenuItems(".menu-item");
  backTitleAnimation();
}

function getCurrent(menuItem) {
  if (menuItem.className === "menu-item") {
    current = menuItem;
  } else if (
    menuItem.className === "submenu-item" &&
    menuItem.id != "submenu_item_back"
  ) {
    submenuCurrent = menuItem;
  } else if (menuItem.id === "submenu_item_back") {
    current = "";
    submenuCurrent = "";
  }
}

function toggleSecondaryMenu(menuItem) {
  if (menuItem.className === "menu-item") {
    title = menuItem.innerText;
  }
  menu.innerHTML = `       
      <h1 class="title">${title}</h1>
        <div class="row">
            <div id="column" class="col-lg-3 col-md-6 mb-3">
                <div id="submenu_item_1" class="submenu-item">
                    <i class="fas fa-utensils"></i> MEAL PLAN
                </div>
            </div>
            <div id="column" class="col-lg-3 col-md-6 mb-3">
                <div id="submenu_item_2" class="submenu-item">
                    <i class="fas fa-calendar-alt"></i> WORK-OUT PLANS
                </div>
            </div>
            <div id="column" class="col-lg-3 col-md-6 mb-3">
                <div id="submenu_item_3" class="submenu-item">
                    <i class="fas fa-pills"></i> SUPLIMENTS
                </div>
            </div>
            <div id="column" class="col-lg-3 col-md-6 mb-3">
                <div id="submenu_item_back" class="submenu-item">
                    <i class="fas fa-pills"></i> BACK
                </div>
            </div>
        </div>`;
  getMenuItems(".submenu-item");
}

export {
  toggleSecondaryMenu,
  toggleMainMenu,
  getCurrent,
  getMenuItems,
  backTitleAnimation,
  menu,
  menuItems,
  current,
  submenuCurrent,
};
