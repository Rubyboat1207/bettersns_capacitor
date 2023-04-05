
// apolgies for anyone who has to read this, not my best work.
// rewriting this in react would be a good idea, but I don't have the time

import { emojis, funny, game, version } from "./constants";
import confetti from "canvas-confetti";

// lets keep the fact that this is a mess a secret, it looks nice from the outside

let red;
let blue;

export const createConfetti = (colors) => {
    confetti({
        particleCount: 50,
        spread: 360,
        origin: { y: 0.5, x: 0.5 },
        startVelocity: 20,
        colors: colors
    })
}

export const createConfettiAtClick = (e, colors) => {
    confetti({
        particleCount: 50,
        spread: 360,
        origin: { y: e.clientY / 1280, x: e.clientX / 800 },
        startVelocity: 20,
        colors: colors
    })
}

// This is a list of all the pages, and their orientation
// This is used to lock the screen orientation to the correct orientation
const pageconfigs = {
    "index": {
        orientation: "portrait",
    },
    "credits": {
        orientation: "credits",
    },
    "prematch": {
        orientation: "portrait",
    },
    "auton": {
        orientation: "landscape",
    },
    "teleop": {
        orientation: "landscape",
    },
    "postmatch": {
        orientation: "portrait",
    },
    "robot": {
        orientation: "portrait",
    },
    "scoring": {
        orientation: "portrait",
    },
    "feedback": {
        orientation: "portrait",
    },
    "credits": {
        orientation: "portrait",
    }
}

// This is a generic function for going to a page, and locking the screen orientation accordingly
export function goPage(page) {
    window.location = `./${page}.html`;
    window.screen.orientation.lock(pageconfigs[page].orientation);
}

// These two functions are a wrapper for the generic select function
// So that you can include it in the HTML, instead of having to write a listener
export function selectRed() {
    select(red);
    window.localStorage.setItem("alliance", false);
}

export function selectBlue() {
    select(blue);
    window.localStorage.setItem("alliance", true);
}

// a generic function for selecting a tab
function select(tab) {
    const other = tab == red ? blue : red;

    tab.classList.add("selected");
    if (other.classList.contains("selected")) {
        other.classList.remove("selected");
    }
}

// lets you select alliances
export function registerTabEvents() {
    red = document.getElementById("red");
    blue = document.getElementById("blue");

    red.children[0].addEventListener("click", selectRed)
    blue.children[0].addEventListener("click", selectBlue)
}

// This is for the custom checkbox element
function registerToggleEvents() {
    let checkboxes = document.getElementsByTagName("checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", (element) => {
            let checkbox = element.target;
            while (checkbox.tagName.toLowerCase() != "checkbox") {
                checkbox = checkbox.parentElement;
            }

            checkbox.classList.toggle("checked");
        });
    }
}

// This code allows for selecting a value from a list of options
// it then sets which option is selected in the attribute "select-value"
function registerMultiselectEvents() {
    let multiselects = document.getElementsByTagName("multiselect");
    for (let i = 0; i < multiselects.length; i++) {
        multiselects[i].addEventListener("click", (event) => {
            // Finds the multiselect element in the parent tree
            let multiselect = event.target;
            while (multiselect.tagName.toLowerCase() != "multiselect") {
                multiselect = multiselect.parentElement;
            }
            console.log(event.target)
            // Nulls the select-value attribute if the same option is selected twice
            const old_selected = multiselect.getAttribute("select-value");
            const new_selected = event.target.getAttribute("select-name");
            if (old_selected == new_selected) {
                multiselect.setAttribute("select-value", "");
            } else {
                multiselect.setAttribute("select-value", new_selected);
            }
        });
    }
}

function enableOnlineElementsDependingOnNetwork() {
    Network.getStatus().then(status => {
        if (status.connected) {
            for(let i = 0; i < document.getElementsByClassName("wifi-req").length; i++) {
                document.getElementsByClassName("wifi-req")[i].classList.remove("disabled");
            }
        } else {
            for(let i = 0; i < document.getElementsByClassName("wifi-req").length; i++) {
                document.getElementsByClassName("wifi-req")[i].classList.add("disabled");
            }
        }
    });
}


// Sets up the page, and should run before all other load listeners
addEventListener("load", () => {
    // -- Alliance Selection --
    if (document.getElementById("red") && document.getElementById("blue")) {
        registerTabEvents();
        if (window.localStorage.getItem("alliance") == "true") {
            select(blue);
        } else if (window.localStorage.getItem("alliance") === "false"){
            select(red);
        }
        
    }

    //version number, current game
    if(document.getElementById("version")) {
        document.getElementById("version").innerHTML = version + ' ' + game + (funny &&  (' ' + emojis[Math.ceil(Math.random() * (emojis.length - 1))]));
    }

    const display = document.getElementById("alliance-display");
    if (display) {
        if (window.localStorage.getItem("alliance") == "true") {
            display.classList.add("d_blue");
        } else {
            display.classList.add("d_red");
        }
    }
    // -- Toggle --
    registerToggleEvents();
    // -- Multiselect --
    registerMultiselectEvents();
})

export function clearData() {
    // window.localStorage.removeItem("scouter");
    window.localStorage.removeItem("teamName");
    window.localStorage.removeItem("teamNumber");
    window.localStorage.removeItem("match");
    window.localStorage.removeItem("preload");
    window.localStorage.removeItem("noShow");
    window.localStorage.removeItem("alliance");
    window.localStorage.removeItem("auton-location");
    window.localStorage.removeItem("auton-charged");
    window.localStorage.removeItem("auton-attempted_place");
    window.localStorage.removeItem("teleop-location");
    window.localStorage.removeItem("teleop-charged");
    window.localStorage.removeItem("teleop-attempted_place");
    window.localStorage.removeItem("notes");
    window.localStorage.removeItem("GeneralRating");
    window.localStorage.removeItem("Teamwork");
    window.localStorage.removeItem("Defense");
    window.localStorage.removeItem("Offense");
    window.localStorage.removeItem("points");
    window.localStorage.removeItem("penalties");
    window.localStorage.removeItem("final-score");
    window.localStorage.removeItem("rank-points");
    window.localStorage.removeItem("arm_description");
    window.localStorage.removeItem("drivetrain_design");
    window.localStorage.removeItem("agility_rating");
    window.localStorage.removeItem("speed_rating");
    window.localStorage.removeItem("manip_cone");
    window.localStorage.removeItem("manip_cube");
    window.localStorage.removeItem("left_community");
    window.localStorage.removeItem("moved");
}

   // -- Notes --
const notes = document.getElementById("notes-container");
if(notes) {
    const notesbutton = document.getElementById("notes-button");
    if (notes) {
        notes.value = window.localStorage.getItem("notes");
        document.getElementById("notes").addEventListener("change", (element) => {
            window.localStorage.setItem("notes", element.target.value);
        });
        notesbutton.addEventListener("click", () => {
            notes.classList.toggle("hidden");
            if(!notes.classList.contains("hidden")) {
                notes.focus();
                notesbutton.children[0].innerHTML = '&lt;&lt;'
            }else {
                notesbutton.children[0].innerHTML = '&gt;&gt;'
            }
        });
    }
    document.getElementById("notes").value = window.localStorage.getItem("notes");
}


export function checkForStringNullOtherwiseReturn(str, preferedValue) {
    if(str === null) {
        return preferedValue;
    }
    if(str === 'null') {
        return preferedValue;
    }
    return str;
}