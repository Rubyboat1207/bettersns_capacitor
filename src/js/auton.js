addEventListener("load", () => {
    const display = document.getElementById("alliance-display");
    if(window.localStorage.getItem("alliance") == "true") {
        display.classList.add("d_blue");
    }else {
        display.classList.add("d_red");
    }
})