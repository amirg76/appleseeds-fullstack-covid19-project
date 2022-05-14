import { sortBycontinent, getCountriesName } from "./app.js";
import { capitalFirstLetter } from "./tools.js";

// BUILD COUNTREY LIST
export function buildCountryList() {
  const allDrops = document.querySelectorAll(".myDropdown");
  allDrops.forEach((drop) => {
    // const newLink = document.createElement("a");
    // const att = document.createAttribute("data-country");
    // att.value = "israel";
    // newLink.setAttributeNode(att);
    // newLink.innerText = "israel";
    // drop.appendChild(newLink);
    // // ============================================
    const regionCheck = drop.getAttribute("data-region");
    sortBycontinent(capitalFirstLetter(regionCheck));
    const countryNameArr = getCountriesName();
    for (let i = 0; i < countryNameArr.length; i++) {
      const newLink = document.createElement("a");
      const att = document.createAttribute("data-country");
      att.value = countryNameArr[i];
      newLink.setAttributeNode(att);
      newLink.innerText = countryNameArr[i];
      drop.appendChild(newLink);
    }
  });
}
