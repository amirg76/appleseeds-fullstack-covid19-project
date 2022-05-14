import { getCountriesName, sortBycontinent, countryChoise } from "./app.js";
import { capitalFirstLetter } from "./tools.js";

// CHANGE TO CONTINET DISPLAY
export function changeTocontinentDisply() {
  const canvasDisplay = document.querySelector("#myChart");
  if (canvasDisplay.style.display === "none") {
    canvasDisplay.style.display = "block";
    const countryStat = document.querySelector(".chartContainerUpdate");
    countryStat.classList.remove("chartContainerUpdate");
    countryStat.classList.add("countryStatistic");
  }
}

// CHANGE TO COUNTRY DISPLAY
export function changeTocountryDisply() {
  const canvasDisplay = document.querySelector("#myChart");
  if (canvasDisplay.style.display === "block") {
    canvasDisplay.style.display = "none";
    const countryStat = document.querySelector(".countryStatistic");
    countryStat.classList.add("chartContainerUpdate");
    countryStat.classList.remove("countryStatistic");
  }
}

// BEHAVE FOR CONTINENT CLICK
export function continentClick(e) {
  const regionSelect = e.target.getAttribute("data-region");
  const countrySelect = e.target.getAttribute("data-country");
  console.log(regionSelect);
  if (regionSelect) {
    sortBycontinent(capitalFirstLetter(regionSelect));
    changeTocontinentDisply();
  } else countryChoise(countrySelect);
}

// CREATE REGION ARRAY DATA
export function createRegionArrData(countryData) {
  const getRegion = countryData.map((element) => {
    const { cca2, region } = element;
    return { cca2, region };
  });
  return getRegion;
}

// BUILD COUNTRY LIST
export function buildCountryList() {
  const allDrops = document.querySelectorAll(".myDropdown");
  allDrops.forEach((drop) => {
    const regionCheck = drop.getAttribute("data-region");
    sortBycontinent(capitalFirstLetter(regionCheck));
    renderCountryList(drop);
  });
}

// RENDER COUNTRY LIST
function renderCountryList(drop) {
  const countryNameArr = getCountriesName();
  for (let i = 0; i < countryNameArr.length; i++) {
    const newLink = document.createElement("a");
    const att = document.createAttribute("data-country");
    att.value = countryNameArr[i];
    newLink.setAttributeNode(att);
    newLink.innerText = countryNameArr[i];
    drop.appendChild(newLink);
  }
}
