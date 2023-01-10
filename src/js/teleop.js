import { goPage } from "./script.js"
import { saveToLocalStorage, loadFromLocalStorage} from "./field.js"

addEventListener('load', function () {
    document.getElementById("back").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("auton");
    });
    document.getElementById("postmatch").addEventListener("click", () => {
        saveToLocalStorage("teleop")
        goPage("postmatch");
    });
    loadFromLocalStorage("teleop");

});
