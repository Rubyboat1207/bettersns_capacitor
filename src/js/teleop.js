import { goPage } from "./script.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  setCallback,
} from "./field.js";
import { funny } from "./constants.js";

let spinner_rot = 0;
let velocity = 0;
let easterEggShown = false;
let clickcount = 0;
let spinner;
let easterEggId = 0;

function rotate() {
  if (!easterEggShown) {
    return;
  }
  spinner_rot += velocity;
  velocity *= 0.99;
  spinner.style.transform = `rotate(${spinner_rot}deg)`;
  window.requestAnimationFrame(rotate);
}

addEventListener("load", function () {
  document.getElementById("back").addEventListener("click", () => {
    saveToLocalStorage("teleop");
    goPage("auton");
  });
  document
    .getElementById("postmatch")
    .addEventListener("click", nextPage, () => {
      saveToLocalStorage("teleop");
      goPage("postmatch");
    });
  // Yes, this is a little bit of a hack, but it works
  this.setTimeout(() => {
    loadFromLocalStorage("teleop");
  }, 500);
  if (funny) {
    spinner = this.document.getElementById("spinner");
    document.getElementById("title").addEventListener("click", (e) => {
      clickcount += 1;
      console.log(clickcount);

      if (clickcount >= 50) {
        spinner.classList.add("visible");
        easterEggShown = true;

        rotate();


        let id = easterEggId + 1;
        easterEggId += 1;

        const timeup = 10;
        this.setTimeout(() => {
          if (easterEggId != id) {
            return;
          }
          easterEggShown = false;
          clickcount = 0;
        }, timeup * 1000);

        this.setTimeout(() => {
          if (easterEggId != id) {
            return;
          }
          spinner.classList.remove("visible");
        }, (timeup - 1) * 1000);
      }
    });
    spinner.addEventListener("click", (e) => {
      velocity += 4;
    });
    this.addEventListener("click", (e) => {
      if (
        e.target != spinner &&
        e.target != document.getElementById("title") &&
        easterEggShown
      ) {
        easterEggShown = false;
        clickcount = 0;
        spinner.classList.remove("visible");
      }
    });
  }
});

function nextPage() {
  saveToLocalStorage();
  goPage("postmatch");
}
