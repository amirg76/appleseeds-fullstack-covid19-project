import { capitalFirstLetter } from "./tools.js";
import { sortByStatistic } from "./app.js";
// BEHAVE FOR STATISTICS CLICK
export function statisticsClick(e) {
  capitalFirstLetter(e.target.className);
  sortByStatistic(e.target.className);
}
