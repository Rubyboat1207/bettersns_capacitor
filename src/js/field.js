import dcone from "../assets/imgs/cone.svg";
import dcube from "../assets/imgs/cube.svg";
import battery from "../assets/imgs/unsuccessful_charge.svg";
import battery_slightly_charged from "../assets/imgs/slight_charge.svg";
import battery_charged from "../assets/imgs/successful_charge.png";

const icons = document.getElementsByClassName("icon");
let floor_icons;

const alliance = window.localStorage.getItem('alliance');
let icons_location = [];
let level = false;

function setGridLocation(loc, value) {
    if(loc.y != 2) {
        let i = loc.x * 2 + loc.y;
        if(value == true) {
            icons[i].classList.add("selected");
        }
        else {
            icons[i].classList.remove("selected");
        }
        icons_location[i].positive = value;
        return;
    }

    const icon = floor_icons[loc.x];
    let child = icon.children[0];
    let type = value;
    if(value === undefined) {
        type = loc.type;
    }
    icons_location[18 + loc.x].type = type;


    if(child == null) {
        if(type == null) {
            return;
        }
        child = document.createElement("img");
        icon.appendChild(child);
    }

    child.classList.remove("cube");
    child.classList.remove("cone");

    if(type == null) {
        console.log('null it')
        loc.positive = false;
        child.remove();
        return;
    }
    loc.positive = true;
    child.setAttribute("src", type == "cube" ? dcube : dcone);
    child.classList.add(`${type}`);
    console.log('set')
    console.log(icons_location)
}

function registerElevatedIcons() {
    for(let i = 0; i < icons.length; i++) {
        const loc = {
            x: Math.floor(i / 2),
            y: i % 2,
            difficulty:  2 - i % 2,
            positive: false,
            type: icons[i].children[0].classList.contains("cube") ? "cube" : "cone"
        };
        icons_location.push(loc)

        icons[i].addEventListener("click", () => {
            setGridLocation(loc, !icons_location[i].positive);
            if(!icons_location[i].positive) {
                return;
            }
            if(loc.x >= 3 && loc.x <= 5) {
                const place = document.getElementById("community-place");
                if(!place.classList.contains("checked")) {
                    document.getElementById("community-place").click();
                }
            }
        });
    }
}

function registerFloorIcons() {
    floor_icons = document.getElementById('floor').children;
    const floor = document.getElementById("floor");
    for(let i = 0; i < floor.children.length; i++) {
        const loc = {
            x: i,
            y: 2,
            difficulty: 0,
            type: null,
            positive: false
        };
        let space = floor.children[i];
        space.addEventListener("click", () => {
            const child = space.children[0];
            if(loc.x >= 3 && loc.x <= 5) {
                const place = document.getElementById("community-place");
                if(!place.classList.contains("checked")) {
                    document.getElementById("community-place").click();
                }
            }

            if(child == null) {
                console.log('ch null')
                setGridLocation(loc, "cube");
                return;
            }

            if(child.classList.contains("cube")) {
                setGridLocation(loc, "cone");
                return;
            }

            setGridLocation(loc, null);
        });
        icons_location.push(loc);
    }
}

export function saveToLocalStorage(prefix) {
    console.log('test')
    console.log(icons_location);
    window.localStorage.setItem(`${prefix}-location`, JSON.stringify(icons_location));
    window.localStorage.setItem(`${prefix}-charged`, level);
    window.localStorage.setItem(`${prefix}-attempted_place`, document.getElementById("community-place").classList.contains("checked"));
}

export function loadFromLocalStorage(prefix) {
    console.log("test")
    if(!loaded) {
        registerElevatedIcons();
        registerFloorIcons();
    }
    console.log(prefix)
    const loc = JSON.parse(window.localStorage.getItem(`${prefix}-location`));
    console.log(loc)
    level = window.localStorage.getItem(`${prefix}-charged`) || 0;
    const attempted_place = window.localStorage.getItem(`${prefix}-
    attempted_place`) == "true";
    if(attempted_place) {
        document.getElementById("community-place").click();
    }
    
    setBatteryCharge(parseInt(level));
    if(loc == null) {
        return;
    }
    for(let i = 0; i < loc.length; i++) {
        
        if(loc[i].y != 2) {
            if(loc[i].type == null) {
                continue;
            }
            setGridLocation(loc[i], loc[i].positive);
        }
        else {
            setGridLocation(loc[i], loc[i].type);
        }
    }
}

export let completeCallback = () => {};

export function setCallback(callback) {
    console.log('callback set')
    completeCallback = callback;
}

let loaded = false;

addEventListener('load', function() {
    if(!loaded) {
        registerElevatedIcons();
        registerFloorIcons();
    }

    loaded = true;
    if(alliance) {
        const side_grids = document.getElementsByClassName("side-grids");
        for(let grid of side_grids) {
            grid.classList.add(alliance == "true" ? "blue" : "red");
        }
    }
    this.document.getElementById("charge").addEventListener("click", (e) => {
        let lvl = e.target.getAttribute("lvl");
        let new_charge = loopAround(parseInt(lvl) + 1, 0, 2);
        this.document.getElementById("charge").setAttribute("lvl", new_charge)
        setBatteryCharge(new_charge);
    });
    console.log(icons_location);
    console.log(completeCallback)
    
});

function setBatteryCharge(level) {
    let levels = [battery, battery_slightly_charged, battery_charged]
    document.getElementById("charge").setAttribute("src", levels[level]);
}

function loopAround(number, min, max) {
    if(number < min) {
        return max;
    }
    if(number > max) {
        return min;
    }
    return number;
}