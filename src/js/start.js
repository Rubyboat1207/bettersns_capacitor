import { goPage } from "./script.js"
addEventListener("load", () => {
    document.getElementById("start").addEventListener("click", () => { goPage("prematch") })
})