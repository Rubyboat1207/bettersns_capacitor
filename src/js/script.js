let red;
let blue;

const pageconfigs = {
    "index": {
        orientation: "portrait",
    },
    prematch: {
        orientation: "portrait",
    },
    "autonomous": {
        orientation: "landscape",
    },
    "teleop": {
        orientation: "landscape",
    },
}


function goPage(page) {
    window.location = `./${page}.html`;
    window.screen.orientation.lock(pageconfigs[page].orientation);
}




function selectRed() {
    select(red);
    window.localStorage.setItem("alliance", false);
}

function selectBlue() {
    select(blue);
    window.localStorage.setItem("alliance", true);
}

function select(tab) {
    const other = tab == red ? blue : red;

    tab.classList.add("selected");
    if(other.classList.contains("selected")) {
        other.classList.remove("selected");
    }
}

function registerTabEvents() {
    red = document.getElementById("red");
    blue = document.getElementById("blue");

    red.children[0].addEventListener("click", selectRed)
    blue.children[0].addEventListener("click", selectBlue)
}

function registerToggleEvents() {
    let checkboxes = document.getElementsByTagName("checkbox");
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", (element) => {
            let checkbox = element.target;
            while(checkbox.tagName.toLowerCase() != "checkbox") {
                checkbox = checkbox.parentElement;
            }

            checkbox.classList.toggle("checked");
        });
    }
}

addEventListener("load", () => {
    if(document.getElementById("red") && document.getElementById("blue")) {
        registerTabEvents();
    }
    registerToggleEvents();

    if(document.getElementById("alliance-display")) {
        let display = document.getElementById("alliance-display");
        if(window.localStorage.getItem("alliance") == "true") {
            display.classList.add("d_blue");
        }else {
            display.classList.add("d_red");
        }
    }
})