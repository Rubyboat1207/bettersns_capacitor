import { goPage } from "./script.js"
import { Browser } from '@capacitor/browser';


addEventListener("load", () => {
    document.getElementById("back").addEventListener("click", () => { goPage("index")})
    document.getElementById("apiS").addEventListener("click", () => {openAPISite()})
    document.getElementById("appS").addEventListener("click", () => {openAPPSite()})

})

const openAPISite = async () => {
  await Browser.open({ url: 'https://github.com/frc5431/BetterSNS-api' });
};
const openAPPSite = async () => {
  await Browser.open({ url: 'https://github.com/frc5431/BetterSNS-Client' });
}
