import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import { base_url } from "./constants.js";
import axios from "axios";
import { checkForStringNullOtherwiseReturn } from "./script.js";

const unknown_error_replacements = [
  'Mystical Cat stole my potions',
  'Natalie forgot how to add semicolons',
  'The ancient runes werent decypherable',
  'Colin let the request commit to master',
  'Someone forgot to pay off the parenthesis police',
  'Aahanna used the wrong set of braces',
  'Rudy accidentally forgot to implement an error message',
  'The muffin man did not deliver the pancakes',
  'The dinosaurs came back to take my leftovers',
  'The programming team was busy talking',
  'Josh distracted the api server',
  'The error went to get milk and never came back',
  'Joseph crossed the beams',
  'The request went to racetrack without telling us',
  'Han shot first',
  'The request ran a red light',
  'The request went 70 in a 40',
  'Someone confused java and javascript',
  'Nata;ie made a spelling aerror',
  'The programming team was busy making fun of natalie',
  'Cope',
  'Congradulations, you broke the code. You diserve an award. The awrd is jail time. Potentially the death penalty. Depends on Colins mood today',
  'Error 405',
  'The waffle house has closed',
  'The waffle house has found it\'s new host',
  ''
]

function gatherData() {
  return {
    prematch: {
      author: window.localStorage.getItem("scouter"),
      teamid: window.localStorage.getItem("teamNumber"),
      match: window.localStorage.getItem("match"),
      startingPos: window.localStorage.getItem("startingPos"),
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
      moved:
        window.localStorage.getItem("moved") || false,
      left_community:
        window.localStorage.getItem("left_community") || false
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
      points: checkForStringNullOtherwiseReturn(window.localStorage.getItem("points"), null),
      penalties: checkForStringNullOtherwiseReturn(window.localStorage.getItem("penalties"), null),
      final_score: checkForStringNullOtherwiseReturn(window.localStorage.getItem("final-score"), null),
      rank_points: checkForStringNullOtherwiseReturn(window.localStorage.getItem("rank-points"), null),
    },
    robot_attributes: {
      arm_design: checkForStringNullOtherwiseReturn(window.localStorage.getItem("arm_description"), null),
      drive_style: checkForStringNullOtherwiseReturn(window.localStorage.getItem("drivetrain_design"), null),
      agility: checkForStringNullOtherwiseReturn(window.localStorage.getItem("agility_rating"), null),
      speed: checkForStringNullOtherwiseReturn(window.localStorage.getItem("speed_rating"), null),
      intake_containables: checkForStringNullOtherwiseReturn(`${window.localStorage.getItem("manip_cone") ? 'cone' : 'no cone'} & ${window.localStorage.getItem("manip_cube") ? 'cube' : 'no cube'}`),
      color: checkForStringNullOtherwiseReturn(window.localStorage.getItem("color") || "metalic")
    }
  };
}

export function saveReqToLocal() {
  let json = gatherData()
  console.log("gatherd")
  let reqList = {requests: [], brokenRequests: []};
  

  if(window.localStorage.getItem("requestCache")) {
    try {
      reqList = JSON.parse(window.localStorage.getItem("requestCache"));
    }catch {
      if(confirm("request cache is corrupted, would you like to override it?")) {
        if(!reqList.hasOwnProperty('brokenRequests')) {
          reqList.brokenRequests = [];
        }
        reqList.brokenRequests.push(reqList.requests);
        reqList.requests = [];
      }
    }
  }


  reqList.requests.push(json);

  window.localStorage.setItem("requestCache", JSON.stringify(reqList))
}

export async function writeDataToFile() {
  console.log('writing data to file')
  if (Capacitor.isNativePlatform()) {
    let date = new Date();
    console.log(date);
    const path = `/savedata/${date.getFullYear()}}/${date.getMonth()}/${date.getDate()}/${new Date().getSeconds()}.json}}`;
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
  writeDataToFile(false);
  console.log(JSON.stringify({ data: gatherData() }));
  const response = await axios({
    method: "post",
    url: base_url + "form",
    data: JSON.stringify({ data: gatherData() }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

export async function uploadDataObject(json) {
  try {
    const response = await axios({
      method: "post",
      url: base_url + "form",
      data: JSON.stringify({data: json}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status != 200) {
      alert('Upload failed due to server error: ' + ((await response.data).message || (unknown_error_replacements[Math.round(Math.random() * (unknown_error_replacements.length - 1))] + ' (the error is unknown)')))
      return false;
    }
    console.log("returning well")
    return await response.data;
  }catch(e) {
    if(e.code == 'ERR_BAD_RESPONSE') {
      alert('The server had trouble parsing your request:\n\n' + e.response.data)
    }else {
      alert('Upload failed because server may not be online')
    }
    console.log(e)
    return false;
  }
}

export async function uploadAllData() {
  for(const item of JSON.parse(window.localStorage.getItem("requestCache")).requests) {
    if((await uploadDataObject(item)) !== true) {
      return false;
    }
  }
  alert('Upload succeeded with no errors')
  return true;
}

export async function submitDataFile(file) {
  const data = await Filesystem.readFile({
    path: file,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  console.log(data);
  const request = new XMLHttpRequest();
  const url = base_url + "post";
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
  request.onload = () => {
    console.log(request.responseText);
  };
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

export async function submitReport(reporter, contact, msg) {
  try {
    await axios({
      method: "post",
      url: base_url + "feedback",
      data: JSON.stringify({
          author: reporter,
          contact: contact,
          message: msg
      }),
      headers: {
          "Content-Type": "application/json",
      },
    });
    return true;
  }catch {
    return false;
  }
  
}