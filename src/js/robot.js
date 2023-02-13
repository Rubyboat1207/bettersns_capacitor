import { goPage } from "./script.js"
addEventListener("load", () => {
    document.getElementById("scoring").addEventListener("click", () => { goPage("scoring") })
})