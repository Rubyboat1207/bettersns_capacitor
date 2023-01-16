import { uploadData, writeDataToFile } from "./api"
import { saveToLocalStorage } from "./scoring"

addEventListener("load", () => {
    document.getElementById("upload").addEventListener("click", () => {
        saveToLocalStorage()
        uploadData();
    });

    document.getElementById("save").addEventListener("click", () => {
        saveToLocalStorage()
        writeDataToFile();
    });
})