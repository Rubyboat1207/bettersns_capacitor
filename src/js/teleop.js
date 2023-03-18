import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage, setCallback } from "./field.js"

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("auton");
    });
    document.getElementById("postmatch").addEventListener("click", nextPage, () => {
        saveToLocalStorage("teleop")
        goPage("postmatch");
    });
    // Yes, this is a little bit of a hack, but it works
    this.setTimeout(() => {
        loadFromLocalStorage("teleop");
    }, 500)
});


function formIsValid() {
    if (window.localStorage.getItem("attemptedPlace") == null || !Boolean) {
        alert("Congradulations, you broke the code. You diserve an award. The awrd is jail time. Potentially the death penalty. Depends on Colins mood today")
        return false;
    }
    return true;
}


function nextPage() {
    if (formIsValid()) {
        saveToLocalStorage();
        goPage("teleop")
    }
}
