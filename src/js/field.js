const alliance = window.localStorage.getItem('alliance');
let icons_location = []; 
addEventListener('load', function() {
    if(alliance) {
        const side_grids = document.getElementsByClassName("side-grids");
        for(let grid of side_grids) {
            grid.classList.add(alliance == "true" ? "blue" : "red");
        }
    }
    const cubes = document.getElementsByClassName("cube");
    const cones = document.getElementsByClassName("cone");
    const icons = document.getElementsByClassName("icon");
    for(let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        icons_location.push({
            x: Math.floor(i / 2),
            y: i % 2,
            positive: false
        })
        icon.setAttribute("index", i);
        //console.log(icons_location[i].x, icons_location[i].y)
        icon.addEventListener("click", () => {
            icon.classList.toggle("selected");
            icons_location[i].positive = !icons_location[i].positive;
            //console.log(`Icon ${i} is now ${icons_location[i].selected ? "selected" : "unselected"}`);
        });
    }
    const floor = document.getElementById("floor");
    for(let i = 0; i < floor.children.length; i++) {
        let space = floor.children[i];
        space.addEventListener("click", () => {
            const index = space.getAttribute("index");
            const child = space.children[0];
            if(child == null) {
                let child = document.createElement("img");
                child.setAttribute("src", "assets/imgs/cube.svg");
                child.classList.add("cube");
                space.appendChild(child);
                icons_location[index].type = "cube";
            }
            else if(child.classList.contains("cube")) {
                child.setAttribute("src", "assets/imgs/cone.svg");
                child.classList.remove("cube");
                child.classList.add("cone");
                icons_location[index].type = "cone";
            }
            else {
                child.remove();
                icons_location[index].type = null;
            }
            //console.log(`Space ${index} is now a ${icons_location[index].type}`);
        });
        icons_location.push({
            x: i,
            y: 2,
            type: null
        });
        space.setAttribute("index", icons_location.length - 1);
    }
    console.log(icons_location);
});