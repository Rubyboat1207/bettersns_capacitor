import { uploadData, writeDataToFile } from "./api"
import { saveToLocalStorage } from "./postmatch"

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