
// apolgies for anyone who has to read this, not my best work.
// rewriting this in react would be a good idea, but I don't have the time

// lets keep the fact that this is a mess a secret, it looks nice from the outside

let red;
let blue;

// This is a list of all the pages, and their orientation
// This is used to lock the screen orientation to the correct orientation
const pageconfigs = {
    "index": {
        orientation: "portrait",
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
        } else {
            select(red);
        }
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
    window.localStorage.clear();
    window.location.reload();
}