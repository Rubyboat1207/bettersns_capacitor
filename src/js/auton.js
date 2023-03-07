import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage, setCallback } from "./field.js"


function formIsValid() {
    if (window.localStorage.getItem("attemptedPlace") == null || !Boolean) {
        alert("Congradulations, you broke the code. You diserve an award. The awrd is jail time. Potentially the death penalty. Depends on Colins mood today")
        return false;
    }
    if (window.localStorage.getItem("attemptedPlace") == null || !Boolean) {
        alert("Congradulations, you broke the code. You diserve an award. The awrd is jail time. Potentially the death penalty. Depends on Colins mood today")
        return false;
    }
    if (window.localStorage.getItem("leftCom") == null || !Boolean) {
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

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("prematch");
    });
    document.getElementById("auton").addEventListener("click", nextPage);
    saveToLocalStorage("auton")
    window.localStorage.setItem("moved", this.document.getElementById("moved").classList.contains("checked"))
    window.localStorage.setItem("left_community", document.getElementById("left_community").classList.contains("checked"))
    goPage("teleop");
});
setCallback(() => {
    loadFromLocalStorage("auton");



});

