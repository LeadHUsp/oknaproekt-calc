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
  // Элементы формы вывода
  const outputTypeOfGlasses = document.getElementById("output-typeof-glasses");
  const outputTypeOfLight = document.getElementById("output-typeof-light");
  const outputSidingType = document.getElementById("output-siding-type");
  const outputSidingColor = document.getElementById("output-siding-color");
  const outputTypeOfWarming = document.getElementById("output-typeof-warming");
  const outputTypeOfFurniture = document.getElementById(
    "output-typeof-furniture"
  );
  const outputWallsType = document.getElementById("output-walss-type");
  const outputWallsColor = document.getElementById("output-walss-color");
  const outputFloorType = document.getElementById("output-floor-type");
  const outputFloorColor = document.getElementById("output-floor-color");
  const outputWarmingFloorOpt = document.getElementById(
    "output-warming-floor-opt"
  );
  //Определяет выбран ли сейчас французский тип остекления
  let flagOfFranceGlassType = false;
  // Меняет картинку из data-src-v2, т.е. специфичную для французского остекления
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
  //Вывод данных в форму
  const outPutForm = (outputEl, value) => {
    outputEl.value = value;
  };
  //Тип остекления
  typeOfGlassNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgInsideEl.setAttribute("src", dataSrc);
      outPutForm(
        outputTypeOfGlasses,
        item.querySelector(".project-calc__label-name").textContent
      );

      if (item.getAttribute("for") === "radio-typeof-balcony-france") {
        imgSidingEl.style.display = "none";
        typeOfSidingBlockEl.style.display = "none";
        flagOfFranceGlassType = true;
        swapDataSrcOnChange(typeOfWarmingNavEl, imgWarmingEl);
        swapDataSrcOnChange(typeOfFurnitureNavEl, imgFurnitureEl);
        swapDataSrcOnChange(typeOfWalssNavEl, imgWalssEl);
        swapDataSrcOnChange(typeOfFloorNavEl, imgFloorEl);
        outPutForm(outputSidingType, "Не выбрано");
        outPutForm(outputSidingColor, "Не выбрано");
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
  //Тип освещения
  typeOfLightNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgLightEl.setAttribute("src", dataSrc);
      outPutForm(
        outputTypeOfLight,
        item.querySelector(".project-calc__label-name").textContent
      );
    });
  });
  //Теплый пол чекбокс
  typeOfWarmFloor.addEventListener("change", () => {
    if (typeOfWarmFloor.checked === true) {
      imgWarmFloor.style.display = "block";
      outPutForm(outputWarmingFloorOpt, "Да");
    } else {
      imgWarmFloor.style.display = "none";
      outPutForm(outputWarmingFloorOpt, "Нет");
    }
  });
  //Тип утепления
  typeOfWarmingNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      outPutForm(
        outputTypeOfWarming,
        item.querySelector(".project-calc__label-name").textContent
      );
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
  //Тип обшивки парапета
  tab(
    "#typeof-siding-control .project-calc__tab-nav .project-calc__label",
    "#typeof-siding-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__label-active",
    "project-calc__tab-active",
    false
  );
  document
    .querySelectorAll("#typeof-siding-control .project-calc__label")
    .forEach((item) => {
      item.addEventListener("click", () => {
        outPutForm(
          outputSidingType,
          item.querySelector(".project-calc__label-name").textContent
        );
      });
    });
  typeOfSidingNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      let dataSrc = item.getAttribute("data-src");
      imgSidingEl.setAttribute("src", dataSrc);
      outPutForm(outputSidingColor, item.getAttribute("data-value"));
      typeOfSidingNavEl.forEach((item) => {
        item.classList.remove("project-calc__round-active");
      });
      item.classList.add("project-calc__round-active");
    });
  });
  //Тип мебели
  typeOfFurnitureNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      outPutForm(
        outputTypeOfFurniture,
        item.querySelector(".project-calc__label-name").textContent
      );
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
  //Тип отделки стен
  tab(
    "#typeof-walls-control .project-calc__tab-nav .project-calc__switch",
    "#typeof-walls-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__switch-active",
    "project-calc__tab-active",
    false
  );
  document
    .querySelectorAll("#typeof-walls-control .project-calc__switch")
    .forEach((item) => {
      item.addEventListener("click", () => {
        outPutForm(
          outputWallsType,
          item.querySelector(".project-calc__text").textContent
        );
      });
    });
  typeOfWalssNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      outPutForm(outputWallsColor, item.getAttribute("data-value"));
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
  //Тип пола
  tab(
    "#typeof-floor-control .project-calc__tab-nav .project-calc__switch",
    "#typeof-floor-control .project-calc__tab-content .project-calc__tab-item",
    "project-calc__switch-active",
    "project-calc__tab-active",
    false
  );
  document
    .querySelectorAll("#typeof-floor-control .project-calc__switch")
    .forEach((item) => {
      item.addEventListener("click", () => {
        outPutForm(
          outputFloorType,
          item.querySelector(".project-calc__text").textContent
        );
      });
    });
  typeOfFloorNavEl.forEach((item) => {
    item.addEventListener("click", () => {
      outPutForm(outputFloorColor, item.getAttribute("data-value"));
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
