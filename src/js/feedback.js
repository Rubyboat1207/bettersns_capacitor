import { submitReport } from "./api.js";
import { goPage } from "./script.js"
let reporter = '';
let msg = '';
let submit = false;

const back = document.getElementById("back");

back.addEventListener("click", () => {
    if(submit) {
        if(!submitReport(document.getElementById('reporterName').value, document.getElementById('reporterContact').value || '', document.getElementById('txtInput').value)) {
            return
        }
    }
    setTimeout(() => {
        goPage("index");
    }, 1000)
})
document.getElementById('reporterName').addEventListener('change', () => {
    reporter = document.getElementById('reporterName').value;
    maybeUpdateBackButton()
})
document.getElementById('txtInput').addEventListener('change', () => {
    msg = document.getElementById('txtInput').value;
    maybeUpdateBackButton()
})

function maybeUpdateBackButton() {
    if(msg != '') {
        back.innerHTML = 'Submit'
        submit = true;
    }else {
        submit = false;
        back.innerHTML = 'Back'
    }
}

function formIsValid() {
    if (scouter.value == "") {
        alert("Please enter your name before sending feedback");
        return false;
    }
}