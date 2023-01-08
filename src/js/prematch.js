let scouter, team, teamNumber, match, preload, noShow, cone, cube;
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
        cone.setAttribute("src", cone.parentElement.getAttribute("select-value") == "cone" ? "assets/imgs/cone.svg" : "assets/imgs/cone_selected.svg");
        cube.setAttribute("src", "assets/imgs/cube.svg");
    });
    cube = document.getElementById("cube");
    cube.addEventListener("click", () => {
        cube.setAttribute("src", cube.parentElement.getAttribute("select-value") == "cube" ? "assets/imgs/cube.svg" : "assets/imgs/cube_selected.svg");
        cone.setAttribute("src", "assets/imgs/cone.svg");
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
    if (team.value == "") {
        alert("Please enter a team name before continuing");
        return false;
    }
    if (teamNumber.value == "") {
        alert("Please enter a team number before continuing");
        return false;
    }
    if (match.value == "") {
        alert("Please enter a match number before continuing");
        return false;
    }
    if(window.localStorage.getItem("alliance") == null) {
        alert("Please select an alliance before continuing");
        return false;
    }
    return true;
}

function saveToLocalStorage() {
    window.localStorage.setItem("scouter", scouter.value);
    window.localStorage.setItem("teamName", team.value);
    window.localStorage.setItem("teamNumber", teamNumber.value);
    window.localStorage.setItem("match", match.value);
    window.localStorage.setItem("noShow", noShow.checked);
    window.localStorage.setItem("preload", preload.getAttribute("select-value"));
}

function loadFromLocalStorage() {
    scouter.value = window.localStorage.getItem("scouter");
    team.value = window.localStorage.getItem("teamName");
    teamNumber.value = window.localStorage.getItem("teamNumber");
    match.value = window.localStorage.getItem("match");
    noShow.checked = window.localStorage.getItem("noShow") == "true";
    preload.setAttribute("select-value", window.localStorage.getItem("preload"));
    cone.setAttribute("src", preload.getAttribute("select-value") == "cone" ? "assets/imgs/cone_selected.svg" : "assets/imgs/cone.svg");
    cube.setAttribute("src", preload.getAttribute("select-value") == "cube" ? "assets/imgs/cube_selected.svg" : "assets/imgs/cube.svg");
    
}

function nextPage() {
    if (formIsValid()) {
        saveToLocalStorage();
        goPage("auton");
    }
}

