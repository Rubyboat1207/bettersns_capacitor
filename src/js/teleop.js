import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage, setCallback } from "./field.js"

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("auton");
    });
    document.getElementById("postmatch").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("postmatch");
    });
    setCallback(() => {
        loadFromLocalStorage("teleop");
    })
});
