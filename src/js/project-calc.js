import { tab } from "./tab";

document.addEventListener("DOMContentLoaded", () => {
  const typeOfGlassNavEl = document.querySelectorAll(
    ".project-calc__label-type-glass"
  );
  const typeOfLightNavEl = document.querySelectorAll(
    '*[data-group="typeof-light"]'
  );
  const typeOfWarmingNavEl = document.querySelectorAll(
    '*[data-group="typeof-warming"]'
  );
  const typeOfSidingNavEl = document.querySelectorAll(
    '*[data-group="typeof-siding"]'
  );
  const typeOfFurnitureNavEl = document.querySelectorAll(
    '*[data-group="typeof-furniture"]'
  );
  const typeOfWalssNavEl = document.querySelectorAll(
    '*[data-group="typeof-walls"]'
  );
  const typeOfFloorNavEl = document.querySelectorAll(
    '*[data-group="typeof-floor"]'
  );
  const typeOfWarmFloor = document.getElementById("radio-typeof-warm-floor");
  const typeOfSidingBlockEl = document.getElementById("typeof-siding-control");
  const imgInsideEl = document.getElementById("project-calc__inside-img");
  const imgLightEl = document.getElementById("project-calc__light-img");
  const imgWarmingEl = document.getElementById("project-calc__warming-img");
  const imgSidingEl = document.getElementById("project-calc__siding-img");
  const imgFurnitureEl = document.getElementById("project-calc__shkaf-img");
  const imgWalssEl = document.getElementById("project-calc__walls-img");
  const imgFloorEl = document.getElementById("project-calc__floor-img");
  const imgWarmFloor = document.getElementById("project-calc__floor-warm-img");
  //Определяет выбран ли сейчас тип французский тип остекления
  let flagOfFranceGlassType = false;
  // Меняет картинку из data-src-v2, т.е. специфичную для французского остеуления
  const swapDataSrcOnChange = (items, imgEl) => {
    items.forEach((item) => {
      if (
        item.classList.contains("active") ||
        item.classList.contains("project-calc__round-active")
      ) {
        let dataSrc = item.getAttribute("data-src-v2");
        imgEl.setAttribute("src", dataSrc);
      }
    });
  };
  // Меняет картинку из data-src
  const reverseSwapDataSrcOnChange = (items, imgEl) => {
    items.forEach((item) => {
      if (
        item.classList.contains("active") ||
        item.classList.contains("project-calc__round-active")
      ) {
        let dataSrc = item.getAttribute("data-src");
        imgEl.setAttribute("src", dataSrc);
      }
    });
  };
  typeOfGlassNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgInsideEl.setAttribute("src", dataSrc);
      if (item.getAttribute("for") === "radio-typeof-balcony-france") {
        imgSidingEl.style.display = "none";
        typeOfSidingBlockEl.style.display = "none";
        flagOfFranceGlassType = true;
        swapDataSrcOnChange(typeOfWarmingNavEl, imgWarmingEl);
        swapDataSrcOnChange(typeOfFurnitureNavEl, imgFurnitureEl);
        swapDataSrcOnChange(typeOfWalssNavEl, imgWalssEl);
        swapDataSrcOnChange(typeOfFloorNavEl, imgFloorEl);
      } else {
        imgSidingEl.style.display = "block";
        typeOfSidingBlockEl.style.display = "block";
        flagOfFranceGlassType = false;
        reverseSwapDataSrcOnChange(typeOfWarmingNavEl, imgWarmingEl);
        reverseSwapDataSrcOnChange(typeOfFurnitureNavEl, imgFurnitureEl);
        reverseSwapDataSrcOnChange(typeOfWalssNavEl, imgWalssEl);
        reverseSwapDataSrcOnChange(typeOfFloorNavEl, imgFloorEl);
      }
    });
  });
  typeOfLightNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgLightEl.setAttribute("src", dataSrc);
    });
  });
  typeOfWarmFloor.addEventListener("change", () => {
    if (typeOfWarmFloor.checked === true) {
      imgWarmFloor.style.display = "block";
    } else {
      imgWarmFloor.style.display = "none";
    }
  });
  /* typeOfWarmFloor.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("work");
      if (item.getAttribute("for") === "radio-typeof-floor-no") {
        imgWarmFloor.style.display = "none";
      } else {
        imgWarmFloor.style.display = "block";
      }
    });
  }); */
  typeOfWarmingNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      typeOfWarmingNavEl.forEach((navEl) => {
        navEl.classList.remove("active");
      });
      item.classList.add("active");
      if (flagOfFranceGlassType === true) {
        let dataSrc = item.getAttribute("data-src-v2");
        imgWarmingEl.setAttribute("src", dataSrc);
      } else {
        let dataSrc = item.getAttribute("data-src");
        imgWarmingEl.setAttribute("src", dataSrc);
      }
    });
  });
  tab(
    "#typeof-siding-control .project-calc__tab-nav .project-calc__label",
    "#typeof-siding-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__label-active",
    "project-calc__tab-active",
    false
  );
  tab(
    "#typeof-walls-control .project-calc__tab-nav .project-calc__switch",
    "#typeof-walls-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__switch-active",
    "project-calc__tab-active",
    false
  );
  tab(
    "#typeof-floor-control .project-calc__tab-nav .project-calc__switch",
    "#typeof-floor-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__switch-active",
    "project-calc__tab-active",
    false
  );
  typeOfSidingNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgSidingEl.setAttribute("src", dataSrc);
      typeOfSidingNavEl.forEach((item) => {
        item.classList.remove("project-calc__round-active");
      });
      item.classList.add("project-calc__round-active");
    });
  });
  typeOfFurnitureNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      typeOfFurnitureNavEl.forEach((navEl) => {
        navEl.classList.remove("active");
      });
      item.classList.add("active");
      if (flagOfFranceGlassType === true) {
        let dataSrc = item.getAttribute("data-src-v2");
        imgFurnitureEl.setAttribute("src", dataSrc);
      } else {
        let dataSrc = item.getAttribute("data-src");
        imgFurnitureEl.setAttribute("src", dataSrc);
      }
    });
  });
  typeOfWalssNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      typeOfWalssNavEl.forEach((navEl) => {
        navEl.classList.remove("project-calc__round-active");
      });
      item.classList.add("project-calc__round-active");
      if (flagOfFranceGlassType === true) {
        let dataSrc = item.getAttribute("data-src-v2");
        imgWalssEl.setAttribute("src", dataSrc);
      } else {
        let dataSrc = item.getAttribute("data-src");
        imgWalssEl.setAttribute("src", dataSrc);
      }
    });
  });
  typeOfFloorNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      typeOfFloorNavEl.forEach((navEl) => {
        navEl.classList.remove("project-calc__round-active");
      });
      item.classList.add("project-calc__round-active");
      if (flagOfFranceGlassType === true) {
        let dataSrc = item.getAttribute("data-src-v2");
        imgFloorEl.setAttribute("src", dataSrc);
      } else {
        let dataSrc = item.getAttribute("data-src");
        imgFloorEl.setAttribute("src", dataSrc);
      }
    });
  });
  $(".js-popup-call").magnificPopup({
    type: "inline",
    preloader: false,
  });
});
