const pageconfigs = {
    "index": {
        orientation: "portrait",
    }
}


function goPage(page) {
    window.location = `./${page}.html`;
    window.screen.orientation.lock(pageconfigs[page].orientation);
}