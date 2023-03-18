import { goPage } from "./script";

function saveToLocalStorage() {
    //window.localStorage.setItem("notes", document.getElementById("notes").value);
    window.localStorage.setItem("GeneralRating", document.getElementById("GeneralRating").value);
    window.localStorage.setItem("Teamwork", document.getElementById("Teamwork").value);
    window.localStorage.setItem("Defense", document.getElementById("Defense").value);
    window.localStorage.setItem("Offense", document.getElementById("Offense").value);
}

function loadFromLocalStorage() {
    //document.getElementById("notes").value = window.localStorage.getItem("notes");
    document.getElementById("GeneralRating").value = window.localStorage.getItem("GeneralRating");
    document.getElementById("Teamwork").value = window.localStorage.getItem("Teamwork");
    document.getElementById("Defense").value = window.localStorage.getItem("Defense");
    document.getElementById("Offense").value = window.localStorage.getItem("Offense");
}



function formIsValid() {
    if (window.localStorage.getItem("GeneralRating") == null) {
        alert("General Rating is set to false. good job");
        return false;
    }
    if (window.localStorage.getItem("Teamwork") == null) {
        alert("Teamwork is set to false. good job");
        return false;
    }
    if (window.localStorage.getItem("Defense") == null) {
        alert("Defense is set to false. good job");
        return false;
    }
    if(window.localStorage.getItem("Offense") == null) {
        alert("Offense is set to false. good job");
    }
    return true;
}

function nextPage() {
    saveToLocalStorage();
    if (formIsValid()) {
        goPage("robot")
    }
}

addEventListener('load', () => {
    document.getElementById("scoring").addEventListener("click", () => {
        saveToLocalStorage();
        window.localStorage.setItem('robot_skipped', true);
        console.log('hi')
        goPage("scoring");
    });
    document.getElementById("robot").addEventListener("click", () => {
        saveToLocalStorage();
        // goPage("robot");
    });
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        goPage("teleop");
    });

    loadFromLocalStorage();
});