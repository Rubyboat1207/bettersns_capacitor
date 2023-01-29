addEventListener("load", () => {
    document.getElementById("back").addEventListener("click", () => { goPage("start") })
})

function formIsValid() {
    if (scouter.value == "") {
        alert("Please enter your name before sending feedback");
        return false;
    }
}