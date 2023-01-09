const icons = document.getElementsByClassName("icon");
let floor_icons;

const alliance = window.localStorage.getItem('alliance');
let icons_location = [];

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
    icons_location[18 + loc.x].type = value;

    if(child == null) {
        if(value == null) {
            return;
        }
        child = document.createElement("img");
        icon.appendChild(child);
    }

    child.classList.remove("cube");
    child.classList.remove("cone");

    if(value == null) {
        child.remove();
        return;
    }

    child.setAttribute("src", `assets/imgs/${value}.svg`);
    child.classList.add(`${value}`);
}

function registerElevatedIcons() {
    floor_icons = document.getElementById('floor').children;
    for(let i = 0; i < icons.length; i++) {
        const loc = {
            x: Math.floor(i / 2),
            y: i % 2,
            positive: false
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
    const floor = document.getElementById("floor");
    for(let i = 0; i < floor.children.length; i++) {
        const loc = {
            x: i,
            y: 2,
            type: null
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

addEventListener('load', function() {
    registerElevatedIcons();
    registerFloorIcons();
    if(alliance) {
        const side_grids = document.getElementsByClassName("side-grids");
        for(let grid of side_grids) {
            grid.classList.add(alliance == "true" ? "blue" : "red");
        }
    }
    this.document.getElementById("charge").addEventListener("click", (e) => {
        let charged = e.target.getAttribute("src") == "assets/imgs/successful_charge.png";
        e.target.setAttribute("src", charged ? "assets/imgs/unsuccessful_charge.svg" : "assets/imgs/successful_charge.png");
    });
    console.log(icons_location);
});