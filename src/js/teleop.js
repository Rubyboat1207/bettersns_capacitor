addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("auton");
    });
    document.getElementById("postmatch").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("postmatch");
    });
    completeCallback = () => {
        loadFromLocalStorage("teleop");
    }
});
