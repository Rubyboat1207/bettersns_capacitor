import { goPage } from "./script.js"
import deselected_cone from '../assets/imgs/cone.svg';
import selected_cone from '../assets/imgs/cone_selected.svg';
import deselected_cube from '../assets/imgs/cube.svg';
import selected_cube from '../assets/imgs/cube_selected.svg';

let acceptable_drivetrains = []

let manipCone = false;
let manipCube = false;
let drivetrain = '';
let armDescription = '';
let agilityRating = 3;
let speedRating = 3;

document.getElementById("scoring").addEventListener("click", nextPage, () => { goPage("scoring"); saveToLocalStorage(); })
document.getElementById("back").addEventListener("click", () => { goPage("postmatch") })
const cube = document.getElementById("cube");

cube.addEventListener("click", () => {
    manipCube = !manipCube;
    reloadCube();
})

function nextPage() {
    saveToLocalStorage();
    if (formIsValid()) {
        goPage("teleop")
    }
}

function formIsValid() {
    // if (window.localStorage.getItem("drivetrains") == null) {
    //     alert("bro fix that goofy ahh drivetrain answer")
    //     return false;
    // }
    // if (window.localStorage.getItem("fast") == null) {
    //     alert("please fix speed input or answer")
    //     return false;
    // }
    return true;
}




const cone = document.getElementById("cone");
cone.addEventListener("click", () => {
    manipCone = !manipCone;
    reloadCone();
})

const manip = document.getElementById("manip");
manip.addEventListener("change", (c) => {
    armDescription = manip.value;
});

const unsure = document.getElementById("unsure")
const unsure_input = document.getElementById("unsure_input")
const drivetrains = document.getElementById("drivetrains")
drivetrains.addEventListener("change", () => {
    drivetrain = drivetrains.value;
    updateDrivetrain();
})
for (let i = 0; i < drivetrains.children.length; i++) {
    const elem = drivetrains.children[i];
    if (elem.value == 'unsure') {
        continue;
    }
    acceptable_drivetrains.push(elem.value);
}
function updateDrivetrain() {
    console.log(drivetrain)
    console.log(acceptable_drivetrains)
    if (!acceptable_drivetrains.includes(drivetrain)) {
        unsure.classList.remove('invis')
    } else {
        if (!unsure.classList.contains('invis')) {
            unsure.classList.add('invis')
        }
    }
}
unsure_input.addEventListener("change", () => {
    drivetrain = unsure_input.value;
})

const agility = document.getElementById("agility")
agility.addEventListener("change", () => {
    agilityRating = agility.value;
})

const fast = document.getElementById("fast")
fast.addEventListener("change", () => {
    speedRating = fast.value;
})

function reloadCone() {
    cone.setAttribute('src', manipCone ? selected_cone : deselected_cone);
}

function reloadCube() {
    cube.setAttribute('src', manipCube ? selected_cube : deselected_cube);
}

const saveToLocalStorage = () => {
    console.log(drivetrain)
    window.localStorage.setItem("manip_cone", manipCone || false);
    window.localStorage.setItem("manip_cube", manipCube || false);
    window.localStorage.setItem("arm_description", armDescription);
    window.localStorage.setItem("drivetrain_design", drivetrain);
    window.localStorage.setItem("agility_rating", agilityRating);
    window.localStorage.setItem("speed_rating", speedRating);
}

const loadFromLocalStorage = () => {
    manipCone = window.localStorage.getItem("manip_cone");
    manipCube = window.localStorage.getItem("manip_cube");
    armDescription = window.localStorage.getItem("arm_description");
    drivetrain = window.localStorage.getItem("drivetrain_design");
    agilityRating = window.localStorage.getItem("agility_rating");
    speedRating = window.localStorage.getItem("speed_rating");

    reloadCone();
    reloadCube();
    fast.value = speedRating;
    agility.value = agilityRating;
    if (acceptable_drivetrains.includes(drivetrain)) {
        drivetrains.value = drivetrain;
    } else {
        drivetrains.value = "unsure";
        document.getElementById("unsure_input").value = drivetrain || '';
    }
    manip.value = armDescription;
    updateDrivetrain();
}

loadFromLocalStorage();