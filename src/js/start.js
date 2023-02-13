import { uploadAllData } from "./api.js"
import { goPage } from "./script.js"
addEventListener("load", () => {
    document.getElementById("start").addEventListener("click", () => { goPage("prematch") })
    document.getElementById("source").addEventListener("click", () => { goPage("credits") })
    document.getElementById("feedback").addEventListener("click", () => { goPage("feedback") })

    document.getElementById("upload").addEventListener("click", () => {
        if(uploadAllData()) {
            window.localStorage.removeItem("requestCache");
        }
    })
})
