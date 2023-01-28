import { goPage } from "./script.js"

addEventListener("load", () => {
    document.getElementById("back").addEventListener("click", () => { goPage("start") })
})

("apiS").on('click', function(){
    window.location = "https://github.com/frc5431/BetterSNS-Client/commit/33364b1aaadf0ee5cf63c2e48a678baa7f80e876";    
});

