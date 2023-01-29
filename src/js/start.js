import { goPage } from "./script.js"
addEventListener("load", () => {
    document.getElementById("start").addEventListener("click", () => { goPage("prematch") })
})

addEventListener("load", () => {
    document.getElementById("source").addEventListener("click", () => { goPage("credits") })
})

addEventListener("load", () => {
    document.getElementById("feedback").addEventListener("click", () => { goPage("feedback") })
})