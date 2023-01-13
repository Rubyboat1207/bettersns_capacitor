import { uploadData, writeDataToFile } from "./api"

addEventListener("load", () => {
    document.getElementById("upload").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        uploadData();
    });

    document.getElementById("save").addEventListener("click", () => {
        saveToLocalStorage("postmatch")
        writeDataToFile();
    });
})