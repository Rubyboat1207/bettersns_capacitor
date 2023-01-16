import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage, setCallback } from "./field.js"

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("prematch");
    });
    document.getElementById("teleop").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("teleop");
    });
    setCallback(() => {
        loadFromLocalStorage("auton");
    });
});
