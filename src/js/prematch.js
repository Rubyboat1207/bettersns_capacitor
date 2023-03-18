import { goPage } from "./script";
import dcone from '../assets/imgs/cone.svg';
import dcone_selected from '../assets/imgs/cone_selected.svg';
import dcube from '../assets/imgs/cube.svg';
import dcube_selected from '../assets/imgs/cube_selected.svg';

let scouter, team, teamNumber, match, preload, noShow, cone, cube, startingPos;
addEventListener("load", () => {
    scouter = document.getElementById("scouter");
    team = document.getElementById("teamName");
    teamNumber = document.getElementById("teamNumber");
    match = document.getElementById("match");
    preload = document.getElementById("preload");
    noShow = document.getElementById("noShow");
    
    document.getElementById("auton").addEventListener("click", nextPage);
 
    cone = document.getElementById("cone");
    cone.addEventListener("click", () => {
        cone.setAttribute("src", cone.parentElement.getAttribute("select-value") == "cone" ? dcone : dcone_selected);
        cube.setAttribute("src", dcube);
    });

    startingPos = document.getElementById("startingPosVal");

    cube = document.getElementById("cube");
    cube.addEventListener("click", () => {
        cube.setAttribute("src", cube.parentElement.getAttribute("select-value") == "cube" ? dcube : dcube_selected);
        cone.setAttribute("src", dcone);
    });

    document.getElementById("back").addEventListener("click", () => {
        goPage("index");
    });
    loadFromLocalStorage();
});

function formIsValid() {
    if (scouter.value == "") {
        alert("Please enter your name before continuing");
        return false;
    }
    if (teamNumber.value == "" || !isNaN(teamNumber)) {
        alert("Please enter a team number before continuing");
        return false;
    }
    if (match.value == "" || !isNaN(teamNumber)) {
        alert("Please enter a match number before continuing");
        return false;
    }
    if(window.localStorage.getItem("alliance") == null) {
        alert("Please select an alliance color before continuing");
        return false;
    }
    return true;
}

function saveToLocalStorage() {
    window.localStorage.setItem("scouter", scouter.value);
    window.localStorage.setItem("teamNumber", teamNumber.value);
    window.localStorage.setItem("startingPos", startingPos.value);
    window.localStorage.setItem("match", match.value);
    window.localStorage.setItem("noShow", noShow.classList.contains("checked"));
    window.localStorage.setItem("preload", preload.getAttribute("select-value"));
}

function loadFromLocalStorage() {
    startingPos.value = window.localStorage.getItem("startingPos");
    scouter.value = window.localStorage.getItem("scouter");
    teamNumber.value = window.localStorage.getItem("teamNumber");
    match.value = window.localStorage.getItem("match");``
    if(window.localStorage.getItem("noShow") == "true") {
        noShow.classList.add("checked");
    }
    preload.setAttribute("select-value", window.localStorage.getItem("preload"));
    cone.setAttribute("src", preload.getAttribute("select-value") == "cone" ? dcone_selected : dcone);
    cube.setAttribute("src", preload.getAttribute("select-value") == "cube" ? dcube_selected : dcube);
    
}

function nextPage() {
    if (formIsValid()) {
        saveToLocalStorage();
        if(noShow.classList.contains("checked")) {
            goPage("scoring");
            return;
        }
        goPage("auton");
    }
}

/*div class="notes hidden" id="notes-container">
<div class="notes-outline">
  <div class="content-container">
    <h1>Notes</h1>
    <div class="line"></div>
    <textarea id="notes" placeholder="ex. Cycle times are slow"></textarea>
  </div>
</div>
<div class="notes-button" id="notes-button">
  <span>&gt;&gt;</span>
</div>
</div>*/