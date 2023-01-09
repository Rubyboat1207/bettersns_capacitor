function saveToLocalStorage() {
    //window.localStorage.setItem("notes", document.getElementById("notes").value);
    window.localStorage.setItem("GeneralRating", document.getElementById("GeneralRating").value);
    window.localStorage.setItem("Teamwork", document.getElementById("Teamwork").value);
    window.localStorage.setItem("Defense", document.getElementById("Defense").value);
    window.localStorage.setItem("Offense", document.getElementById("Offense").value);
}

function loadFromLocalStorage() {
    //document.getElementById("notes").value = window.localStorage.getItem("notes");
    document.getElementById("GeneralRating").value = window.localStorage.getItem("GeneralRating");
    document.getElementById("Teamwork").value = window.localStorage.getItem("Teamwork");
    document.getElementById("Defense").value = window.localStorage.getItem("Defense");
    document.getElementById("Offense").value = window.localStorage.getItem("Offense");
}



addEventListener('load', function () {
    document.getElementById("trash").addEventListener("click", () => {
        clearData();
        goPage("index");
    });
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        goPage("teleop");
    });
    document.getElementById("upload").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        uploadData();
    });

    document.getElementById("save").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        writeDataToFile();
    });
    loadFromLocalStorage();
});