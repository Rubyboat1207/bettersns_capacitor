import { goPage, clearData } from "./script";
let points, penalties, total;
export function saveToLocalStorage() {
  window.localStorage.setItem(
    "points",
    document.getElementById("points").value
  );
  window.localStorage.setItem(
    "penalties",
    document.getElementById("penalties").value
  );
  window.localStorage.setItem(
    "final-score",
    document.getElementById("final-score").value
  );
  window.localStorage.setItem(
    "rank-points",
    document.getElementById("rank-points").value
  );
}

function loadFromLocalStorage() {
  document.getElementById("points").value =
    window.localStorage.getItem("points");
  document.getElementById("penalties").value =
    window.localStorage.getItem("penalties");
  document.getElementById("final-score").value = parseInt(
    window.localStorage.getItem("final-score")
  );
  document.getElementById("rank-points").value = parseInt(
    window.localStorage.getItem("rank-points")
  );
}

addEventListener("load", function () {
  document.getElementById("trash").addEventListener("click", () => {
    clearData();
    goPage("index");
  });
  document.getElementById("back").addEventListener("click", () => {
    saveToLocalStorage();
    goPage("postmatch");
  });
  points = document.getElementById("points");
  penalties = document.getElementById("penalties");
  total = document.getElementById("final-score");
  //on points change, update the total
  points.addEventListener("change", () => {
    let val = parseInt(points.value);
    if (penalties.value) {
      val -= parseInt(penalties.value);
    }
    total.value = val;
  });
  //on penalties change, update the total, but only if points have been entered
  penalties.addEventListener("change", () => {
    if (points.value) {
      total.value = parseInt(points.value) - parseInt(penalties.value);
    }
  });
  loadFromLocalStorage();
});
