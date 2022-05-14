//CHANGE FIRST LETTER TO UPPERCASE FOR CLASS NAME
export function capitalFirstLetter(NameClass) {
  return NameClass[0].toUpperCase() + NameClass.slice(1);
}

export function dropDowncontinent() {
  const dropDownGroup = document.querySelector(".dropdown");
  dropDownGroup.addEventListener("click", dropDownBehave);
  // const dropDownBtn = document.querySelector(".dropbtn");
  // dropDownBtn.addEventListener("click", dropDownBehave);
}

function dropDownBehave(event) {
  console.log(event.currentTarget);
  console.log(event.target);
  showContinentMenu(event);

  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}

function showContinentMenu(event) {
  const selectedBtn = event.target.getAttribute("data-region");
  const allDrops = document.querySelectorAll(".myDropdown");
  allDrops.forEach((drop) => {
    const regionCheck = drop.getAttribute("data-region");
    if (regionCheck === selectedBtn) {
      drop.classList.toggle("show");
    }
  });
}

// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
