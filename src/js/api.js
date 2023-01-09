import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

function gatherData() {
    return {
        prematch: {
            author: window.localStorage.getItem("scouter"),
            name: window.localStorage.getItem("teamName"),
            teamid: window.localStorage.getItem("teamNumber"),
            match: window.localStorage.getItem("match"),
            preload: window.localStorage.getItem("preload") == "cone" || window.localStorage.getItem("preload") == "cube",
            noShow: window.localStorage.getItem("noShow") == "true",
            alliance: window.localStorage.getItem("alliance"),
            preload_type: window.localStorage.getItem("preload"),
        },
        auton: {
            markers: window.localStorage.getItem("auton-location"),
            extra_goal_progress: window.localStorage.getItem("auton-charged") == "true",
            attempted_collaboration: window.localStorage.getItem("auton-attempted_place") == "true",
        },
        teleop: {
            markers: window.localStorage.getItem("teleop-location"),
            extra_goal_progress: window.localStorage.getItem("teleop-charged") == "true",
            attempted_collaboration: window.localStorage.getItem("teleop-attempted_place") == "true",
        },
        postmatch: {
            notes: window.localStorage.getItem("notes"),
            GeneralRating: window.localStorage.getItem("GeneralRating"),
            Teamwork: window.localStorage.getItem("Teamwork"),
            Defense: window.localStorage.getItem("Defense"),
            Offense: window.localStorage.getItem("Offense"),
        },
    };
}

export async function writeDataToFile() {
    await Filesystem.writeFile({
        path: `savedata/${new Date().getFullYear()}}/${new Date().getMonth()}/${new Date().getDate()}/${new Date().getSeconds()}.json}}`,
        data: JSON.stringify(gatherData()),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
}

export function uploadData() {
    if(Capacitor.isNativePlatform()) {
        writeDataToFile();
    }
    const data = gatherData();
    console.log(data);
    const request = new XMLHttpRequest();
    const url = "localhost:1337/post";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onload = () => {
        console.log(request.responseText);
    }
    clearData();
}

async function submitDataFile(file) {
    const data = await Filesystem.readFile({
        path: file,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
    console.log(data);
    const request = new XMLHttpRequest();
    const url = "localhost:1337/post";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onload = () => {
        console.log(request.responseText);
    }
    clearData();
}