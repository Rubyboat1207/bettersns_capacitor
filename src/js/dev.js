import { goPage } from "./script"

document.getElementById('back').addEventListener('click', () => {
    goPage('index')
})

document.getElementById('localStorage').value = JSON.stringify(JSON.parse(localStorage.getItem('requestCache')), null, '  ')