addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("postmatch");
    });
    document.getElementById("teleop").addEventListener("click", () => {
        saveToLocalStorage("auton")
        goPage("teleop");
    });
    completeCallback = () => {
        loadFromLocalStorage("auton");
    }
});
