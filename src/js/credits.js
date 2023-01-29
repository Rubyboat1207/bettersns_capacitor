import { goPage } from "./script.js"
import { Browser } from '@capacitor/browser';


addEventListener("load", () => {
    document.getElementById("back").addEventListener("click", () => { goPage("index") })
})

const openCapacitorSite = async () => {
  await Browser.open({ url: 'https://github.com/frc5431/BetterSNS-Client' });
};

