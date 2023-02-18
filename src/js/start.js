import { uploadAllData } from "./api.js"
import { goPage } from "./script.js"
addEventListener("load", () => {
    document.getElementById("start").addEventListener("click", () => { goPage("prematch") })
    document.getElementById("source").addEventListener("click", () => { goPage("credits") })
    document.getElementById("feedback").addEventListener("click", () => { goPage("feedback") })

    document.getElementById("upload").addEventListener("click", () => {
        if(window.localStorage.getItem("requestCache") == null) {
            alert('You have no cached data')
            return;
        }
        if(uploadAllData() === true) {
            window.localStorage.removeItem("requestCache");
            alert('data successfully uploaded')
        }
    })
    document.getElementById("clear").addEventListener("click", () => {
        if(window.localStorage.getItem("requestCache") == null) {
            alert('You have no cached data')
            return;
        }
        if(confirm('Are you sure you want to clear cache')) {
            window.localStorage.removeItem("requestCache");
        }
    })
    document.getElementById('version').addEventListener('click', () => {
        if(confirm('Go to developer utilities page?')) {
            if(confirm('Are you sure, cause its really ugly...')) {
                if(confirm('Final sure??')) {
                    goPage('devutil')
                }
            }
        }
    })
})
