import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import axios from "axios";

function gatherData() {
  return {
    prematch: {
      author: window.localStorage.getItem("scouter"),
      name: window.localStorage.getItem("teamName"),
      teamid: window.localStorage.getItem("teamNumber"),
      match: window.localStorage.getItem("match"),
      preload:
        window.localStorage.getItem("preload") == "cone" ||
        window.localStorage.getItem("preload") == "cube",
      noShow: window.localStorage.getItem("noShow") == "true",
      alliance: window.localStorage.getItem("alliance"),
      preload_type: window.localStorage.getItem("preload"),
      noshow: window.localStorage.getItem("noShow") == "true",
    },
    auton: {
      markers: JSON.parse(window.localStorage.getItem("auton-location")),
      extra_goal_progress:
        window.localStorage.getItem("auton-charged") == "true",
      attempted_collaboration:
        window.localStorage.getItem("auton-attempted_place") == "true",
    },
    teleop: {
      markers: JSON.parse(window.localStorage.getItem("teleop-location")),
      extra_goal_progress:
        window.localStorage.getItem("teleop-charged") == "true",
      attempted_collaboration:
        window.localStorage.getItem("teleop-attempted_place") == "true",
    },
    postmatch: {
      notes: window.localStorage.getItem("notes"),
      GeneralRating: window.localStorage.getItem("GeneralRating"),
      Teamwork: window.localStorage.getItem("Teamwork"),
      Defense: window.localStorage.getItem("Defense"),
      Offense: window.localStorage.getItem("Offense"),
      points: window.localStorage.getItem("points"),
      penalties: window.localStorage.getItem("penalties"),
      final_score: window.localStorage.getItem("final-score"),
      rank_points: window.localStorage.getItem("rank-points"),
    },
  };
}

export async function writeDataToFile() {
    console.log('writing data to file')
  if (Capacitor.isNativePlatform()) {
    const path = `/savedata/${new Date().getFullYear()}}/${new Date().getMonth()}/${new Date().getDate()}/${new Date().getSeconds()}.json}}`;
    await Filesystem.writeFile({
      path: path,
      data: JSON.stringify(gatherData()),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    //write to cahce list file
    const cacheList = await Filesystem.readFile({
      path: "cacheList.json",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    const cacheListData = JSON.parse(cacheList.data);
    cacheListData.push(path);
    await Filesystem.writeFile({
      path: "cacheList.json",
      data: JSON.stringify(cacheListData),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    //return;
  }
  saveToFileWeb();
}

function saveToFileWeb() {
  //download gathered data as json file
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gatherData()));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export async function uploadData() {
  writeDataToFile();
  console.log(JSON.stringify({ data: gatherData() }));
  const response = await axios({
    method: "post",
    url: "http://localhost:1337/api/v1/form",
    data: JSON.stringify({ data: gatherData() }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    clearData();
  }
  return await response.data;
}

export async function submitDataFile(file) {
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
  };
  clearData();
}

export async function uploadCachedData() {
  const cacheList = await Filesystem.readFile({
    path: "cacheList.json",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  const cacheListData = JSON.parse(cacheList.data);
  for (let i = 0; i < cacheListData.length; i++) {
    submitDataFile(cacheListData[i]);
  }
  await Filesystem.writeFile({
    path: "cacheList.json",
    data: JSON.stringify([]),
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
}