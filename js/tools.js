// CHANGE FIRST LETTER TO UPPERCASE FOR CLASS NAME
export function capitalFirstLetter(NameClass) {
  return NameClass[0].toUpperCase() + NameClass.slice(1);
}

// DROP DOWN CONTINENT BEHAVE
export function dropDowncontinent() {
  const dropDownGroup = document.querySelector(".dropdown");
  dropDownGroup.addEventListener("click", showContinentMenu);
}

// DROP DOWN CONTINENT SHOW MENU
function showContinentMenu(event) {
  const selectedBtn = event.target.getAttribute("data-region");
  if (selectedBtn) {
    const allDrops = document.querySelectorAll(".myDropdown");
    allDrops.forEach((drop) => {
      const regionCheck = drop.getAttribute("data-region");
      if (regionCheck === selectedBtn) {
        drop.classList.add("show");
      } else {
        drop.classList.remove("show");
      }
    });
  }
}
