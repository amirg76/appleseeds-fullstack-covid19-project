import { capitalFirstLetter, dropDowncontinent } from "./tools.js";
import {
  buildCountryList,
  createRegionArrData,
  continentClick,
  changeTocountryDisply,
} from "./continent.js";
import { statisticsClick } from "./statistics.js";

let sortContinentArr = [];
let sortStatisticArr = [];
const ctx = document.getElementById("myChart").getContext("2d");

const fetchDeath = () => {
  return [12, 19, 3, 5, 2, 3];
};
// function renderGraf() {
const myChartObj = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "covid-19",
        data: fetchDeath(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
// }
// const config = {
//   type: "line",
//   data: data,
//   options: {},
// };
// const myChart1 = new Chart(document.getElementById("myChart"), config);

// UPDATE CHART COUNTRIES NAME
function updateChartCountriesName() {
  myChartObj.data.labels = getCountriesName();
  myChartObj.update();
}

// UPDATE CHART STATISTIC BY CONTINET
function updateChartStatisticsBycontinent() {
  myChartObj.data.datasets[0].data = getStatisticsBycontinent();
  myChartObj.update();
}

//  GET COUNTRIES NAME
export function getCountriesName() {
  const newSortArr = sortContinentArr.map((element) => element.name);
  return newSortArr;
}

//  GET STATISTIC BY CONTINET
function getStatisticsBycontinent() {
  return sortStatisticArr;
}

// CALC TOTAL CASES
function calcTotalCases(deaths, recovered) {
  const totalCases = document.querySelector(".totalCases");
  const sumTotal = Number(deaths) + Number(recovered);
  console.log(sumTotal);
  totalCases.innerText = sumTotal;
}

// RENDER COUNTRY STATICS
function renderCountryStat() {
  const newCases = document.querySelector(".newCases");
  const totalDeaths = document.querySelector(".totalDeaths");
  const newDeaths = document.querySelector(".newDeaths");
  const totalRecovered = document.querySelector(".totalRecovered");
  const criticalCon = document.querySelector(".criticalCon");
  newCases.innerText = sortContinentArr[0].statistic.newConfirmed;
  totalDeaths.innerText = sortContinentArr[0].statistic.deaths;
  newDeaths.innerText = sortContinentArr[0].statistic.newDeaths;
  totalRecovered.innerText = sortContinentArr[0].statistic.recovered;
  calcTotalCases(totalDeaths.innerText, totalRecovered.innerText);
}

// SORT BY COUNTRY
function sortByCountry(sortValue) {
  let old_data = JSON.parse(localStorage.getItem("data"));
  sortContinentArr = old_data.filter((element) => element.name === sortValue);
}

// SORT BY CONTINET
export function sortBycontinent(sortValue) {
  let old_data = JSON.parse(localStorage.getItem("data"));
  sortContinentArr = old_data.filter((element) => element.region === sortValue);

  updateChartCountriesName();
}

// SORT BY STATISTIC
export function sortByStatistic(sortValue = "confirmed") {
  let old_data = JSON.parse(localStorage.getItem("data"));
  sortStatisticArr = sortContinentArr.map((element) => {
    const { deaths, confirmed, recovered, critical } = element.statistic;
    const searchObj = { deaths, confirmed, recovered, critical };
    const searchObjKeys = Object.keys(searchObj);
    for (let key of searchObjKeys) if (key === sortValue) return searchObj[key];
  });
  console.log(sortStatisticArr);

  updateChartStatisticsBycontinent();
}

// BEHAVE FOR COUNTRY CHOISE
export function countryChoise(countrySelect) {
  const countryHeader = document.querySelector(".countryHeader");
  countryHeader.innerText = countrySelect;
  changeTocountryDisply();
  sortByCountry(countrySelect);
  console.log(sortContinentArr);
  renderCountryStat();
}

// START LISTENER TO BUTTONS
function startListenerToButtons() {
  const continentButtons = document.querySelector(".dropdown");
  continentButtons.addEventListener("click", continentClick);
  const statisticsButtons = document.querySelector(".statisticsButtons");
  statisticsButtons.addEventListener("click", statisticsClick);
}

// CREATE COVID ARRAY DATA
function createCovidArrData(covidData) {
  const getCovidData = covidData.map((element) => {
    const { code, name } = element;
    const { deaths, confirmed, recovered, critical } = element.latest_data;

    const { deaths: newDeaths, confirmed: newConfirmed } = element.today;
    const statistic = {
      deaths,
      confirmed,
      recovered,
      critical,
      newDeaths,
      newConfirmed,
    };
    let merged = { code, name, statistic };
    // let merged = { code, name, deaths, confirmed, recovered, critical };
    return merged;
  });
  return getCovidData;
}

// CONACT ARRAY OF DATA
function connectArrOfData(covidArrData, regionArrData) {
  let connectData = [];

  for (let i = 0; i < covidArrData.length; i++) {
    for (let j = 0; j < regionArrData.length; j++) {
      const { code, name, statistic } = covidArrData[i];
      // const { code, name, deaths, confirmed, recovered, critical } =
      //   covidArrData[i];
      const { region } = regionArrData[j];
      if (code === regionArrData[j].cca2) {
        const connectObj = {
          code,
          name,
          statistic,
          region,
        };
        connectData.push(connectObj);
      }
      //  else {
      //   connectData.push({
      //     code,
      //     name,
      //     deaths,
      //     confirmed,
      //     recovered,
      //     critical,
      //   });
      // }
    }
  }
  return connectData;
}

// CREATE ARRAY OF DATA
function createArrOfData(covidData, countryData, old_data) {
  const covidArrData = createCovidArrData(covidData);
  const regionArrData = createRegionArrData(countryData);

  return connectArrOfData(covidArrData, regionArrData);
}

// SAVE DATA RESULT ON LOCAL STORGE
function saveStorage(covidData, countryData) {
  let old_data = JSON.parse(localStorage.getItem("data"));
  old_data = createArrOfData(covidData, countryData, old_data);
  console.log(old_data);
  localStorage.setItem("data", JSON.stringify(old_data));
}
// FETCH DATA
const getFetchedData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// START PAGE
const StartPage = async () => {
  // if (localStorage.getItem("data") == null) {
  const covidData = await getFetchedData("https://corona-api.com/countries");
  const countryData = await getFetchedData(
    "https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1/"
  );
  localStorage.setItem("data", "[]");
  saveStorage(covidData.data, countryData);
  sortBycontinent("Asia", true);
  sortByStatistic();
  buildCountryList();
  // updateChartStatisticsBycontinent();
  // updateChartCountriesName();
  startListenerToButtons();
  dropDowncontinent();

  // }
  // else {
  //   startListenerToButtons();

  //   let old_data = JSON.parse(localStorage.getItem("data"));

  //   console.log(old_data);
  // }
};
StartPage();
