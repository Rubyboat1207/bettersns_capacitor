import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage, setCallback } from "./field.js"

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("prematch");
    });
    document.getElementById("teleop").addEventListener("click", () => {
        saveToLocalStorage("auton")
        window.localStorage.setItem("moved", this.document.getElementById("moved").classList.contains("checked"))
        window.localStorage.setItem("left_community", document.getElementById("left_community").classList.contains("checked"))
        goPage("teleop");
    });
    setCallback(() => {
        loadFromLocalStorage("auton");
        
    });
});
