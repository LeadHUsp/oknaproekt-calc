export let tab = (
  controlSelector,
  contentSelector,
  controlActiveClass,
  contentActiveClass,
  parent,
  slickClass = null
) => {
  const tabControl = document.querySelectorAll(controlSelector);
  const tabContent = document.querySelectorAll(contentSelector);
  let tabName;
  tabControl.forEach((item) => {
    item.addEventListener("click", selectNavTab);
  });

  function selectNavTab() {
    tabControl.forEach((tab) => {
      tab.classList.remove(controlActiveClass);
    });
    this.classList.add(controlActiveClass);
    tabName = this.getAttribute("data-tab");
    selectTabContent(tabName, parent);
    if (slickClass !== null) {
      $(`${slickClass}`).slick("refresh");
    }
  }
  function selectTabContent(tabName, parentParam) {
    if (parentParam) {
      tabContent.forEach((item) => {
        if (item.getAttribute("data-tab-content") == tabName) {
          item.classList.add(contentActiveClass);
          let childTabNavEl = item.querySelectorAll(".child-tabs__btn");
          let childTabContent = item.querySelectorAll(".child-tabs__item");
          childTabNavEl.forEach((childNav) => {
            childNav.classList.remove("child-tabs__btn-active");
          });
          childTabNavEl[0].classList.add("child-tabs__btn-active");
          childTabContent.forEach((child) => {
            child.classList.remove("child-tabs__item-active");
          });
          childTabContent[0].classList.add("child-tabs__item-active");
        } else {
          item.classList.remove(contentActiveClass);
        }
      });
    } else {
      tabContent.forEach((item) => {
        item.getAttribute("data-tab-content") == tabName
          ? item.classList.add(contentActiveClass)
          : item.classList.remove(contentActiveClass);
      });
    }
  }
};
