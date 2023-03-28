import { goPage, clearData } from "./script";
import { saveReqToLocal, uploadAllData, uploadData, writeDataToFile } from "./api"
import confetti from 'canvas-confetti';

function validate() {
  if(isNaN(document.getElementById('points').value) || document.getElementById('points').value == '') {
    return false;
  }
  if(isNaN(document.getElementById('penalties').value) || document.getElementById('penalties').value == '') {
    return false;
  }
  if(isNaN(document.getElementById('rank-points').value) || document.getElementById('rank-points').value == '') {
    return false;
  }
  return true;
}

addEventListener("load", () => {
    // document.getElementById("upload").addEventListener("click", () => {
    //   saveToLocalStorage();
    //   saveReqToLocal();
    //   // writeDataToFile();
    //   clearData();
    //   uploadAllData();
    //   goPage("index");
    // });

    document.addEventListener('click', (e) => {
      if(!currentlyConfetti) {
        return;
      }
      confetti({
        particleCount: 50,
        spread: 360,
        origin: { y: e.clientY / 1280, x: e.clientX / 800 },
        startVelocity: 20,
        colors: [
          'CD3636',
          '3673CD'
        ]
      });

    })

    document.getElementById("save").addEventListener("click", (e) => {
      
      if(currentlyConfetti) {
        return;
      }
      if(!validate()) {
        alert('all points fields must be filled out, and must be numerical.')
        return;
      }
      
      

      currentlyConfetti = true;
      setTimeout(() => {
        saveToLocalStorage();
        saveReqToLocal();

        clearData();
        goPage("index");
      }, 2000)
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: e.clientY / 1280, x: e.clientX / 800 },
        startVelocity: 80
      });
    });
})



let points, penalties, total;
export function saveToLocalStorage() {
  window.localStorage.setItem(
    "points",
    document.getElementById("points").value
  );
  window.localStorage.setItem(
    "penalties",
    document.getElementById("penalties").value
  );
  // window.localStorage.setItem(
  //   "final-score",
  //   document.getElementById("final-score").value
  // );
  window.localStorage.setItem(
    "rank-points",
    document.getElementById("rank-points").value
  );
}

function numberOrNothing(value) {
  if (Number.isNaN(value) == true) {
    return ''
  }
  return value;
}

function loadFromLocalStorage() {
  document.getElementById("points").value =
    window.localStorage.getItem("points");
  document.getElementById("penalties").value =
    window.localStorage.getItem("penalties");
  // document.getElementById("final-score").value = numberOrNothing(parseInt(
  //   window.localStorage.getItem("final-score")
  // ));
  document.getElementById("rank-points").value = numberOrNothing(parseInt(
    window.localStorage.getItem("rank-points")
  ));
}


function formIsValid() {
  if (window.localStorage.getItem("points") == null || isNaN()) {
    alert("You think you're funny, huh? You think you're funny saying 'letter' to a number question? I bet you think you're really witty saying that rehashed developer torture again. Well you aren't. You aren't funny. You aren't hilarious in the slightest. I didn't laugh. I didn't grin, I didn't even exhale out of my nose. Your joke wasn't funny. Your joke was [GRACSIOUS PROFESSINALISM]. It's stale and [GRACSIOUS PROFESSINALISM]. If you're going to make a joke, make an original one or at least improve the one you're taking. This was low effort. Step up your game, or just don't make jokes in the scouting app at all.")
    return false;
  }
  if (window.localStorage.getItem("penalties") == null || isNaN()) {
    alert("You think you're funny, huh? You think you're funny saying 'letter' to a number question? I bet you think you're really witty saying that rehashed developer torture again. Well you aren't. You aren't funny. You aren't hilarious in the slightest. I didn't laugh. I didn't grin, I didn't even exhale out of my nose. Your joke wasn't funny. Your joke was [GRACSIOUS PROFESSINALISM]. It's stale and [GRACSIOUS PROFESSINALISM]. If you're going to make a joke, make an original one or at least improve the one you're taking. This was low effort. Step up your game, or just don't make jokes in the scouting app at all.")
    return false;
  }
  if (window.localStorage.getItem("final-score") == null || isNaN()) {
    alert("You think you're funny, huh? You think you're funny saying 'letter' to a number question? I bet you think you're really witty saying that rehashed developer torture again. Well you aren't. You aren't funny. You aren't hilarious in the slightest. I didn't laugh. I didn't grin, I didn't even exhale out of my nose. Your joke wasn't funny. Your joke was [GRACSIOUS PROFESSINALISM]. It's stale and [GRACSIOUS PROFESSINALISM]. If you're going to make a joke, make an original one or at least improve the one you're taking. This was low effort. Step up your game, or just don't make jokes in the scouting app at all.")
    return false;
  }
  if (window.localStorage.getItem("rank-points") == null || isNaN()) {
    alert("You think you're funny, huh? You think you're funny saying 'letter' to a number question? I bet you think you're really witty saying that rehashed developer torture again. Well you aren't. You aren't funny. You aren't hilarious in the slightest. I didn't laugh. I didn't grin, I didn't even exhale out of my nose. Your joke wasn't funny. Your joke was [GRACSIOUS PROFESSINALISM]. It's stale and [GRACSIOUS PROFESSINALISM]. If you're going to make a joke, make an original one or at least improve the one you're taking. This was low effort. Step up your game, or just don't make jokes in the scouting app at all.")
    return false;
  }
  return true;
}

let currentlyConfetti = false;

function nextPage() {
  if(currentlyConfetti) {
    return;
  }

  if (formIsValid()) {
    const canvas = document.getElementById('confetti-canvas');
    const confettiSettings = { 
      particleCount: 100, 
      spread: 70, 
      origin: { y: 0.6 }
    };
    confetti(canvas, confettiSettings);
    currentlyConfetti = true;
    setTimeout(() => {
      saveToLocalStorage();
      // goPage("teleop")
    }, 10000)
    
  }
}

addEventListener("load", function () {
  document.getElementById("trash").addEventListener("click", () => {
    clearData();
    goPage("index");
  });
  document.getElementById("back").addEventListener("click", () => {
    saveToLocalStorage();
    goPage("robot");
  });
  points = document.getElementById("points");
  penalties = document.getElementById("penalties");
  // total = document.getElementById("final-score");
  //on points change, update the total
  // points.addEventListener("change", () => {
  //   let val = parseInt(points.value);
  //   if (penalties.value) {
  //     // val -= parseInt(penalties.value);
  //   }
  //   console.log(val)
  //   if(val == NaN) {
  //     // total.value = '';
  //     return;
  //   }
  //   total.value = val;
  // });
  //on penalties change, update the total, but only if points have been entered
  penalties.addEventListener("change", () => {
    if (points.value) {
      // total.value = parseInt(points.value) - parseInt(penalties.value);
    }
  });
  loadFromLocalStorage();
});
