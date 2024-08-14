/*Initialisation des variables*/
const upButtonSecond = document.getElementById("upButtonSeconds");
const downButtonSecond = document.getElementById("downButtonSeconds");
const secondTwoInput = document.getElementById("seconds2");
const secondOneInput = document.getElementById("seconds1");

const upButtonMinute = document.getElementById("upButtonMinutes");
const downButtonMinute = document.getElementById("downButtonMinutes");
const minuteTwoInput = document.getElementById("minutes2");
const minuteOneInput = document.getElementById("minutes1");

const upButtonHours = document.getElementById("upButtonHours");
const downButtonHours = document.getElementById("downButtonHours");
const hoursTwoInput = document.getElementById("hours2");
const hoursOneInput = document.getElementById("hours1");

const timer = document.querySelector(".timer");
const title = document.querySelector("h1");
const meditButtons = document.getElementById("meditButtons");

//relatifs au texte
const countdownDisplay = document.getElementById("countdownDisplay");
const popUp = document.getElementById("popUp");

//boutons
const go = document.getElementById("startButton");
const allInputs = document.querySelectorAll("input");
const rainBtn = document.querySelector(".rainBtn");
const beachBtn = document.querySelector(".beachBtn");
const tForestBtn = document.querySelector(".tForestBtn");
const stopBtn = document.getElementById("stopBtn");
const allButtonInputs = document.querySelectorAll("input.button");
const allTimeInputs = document.querySelectorAll("input.timeInputs");
const chrono = document.getElementById("chronoBtn");
const volumeControl = document.getElementById("volumeControl");

//sons
// const rainSnd = document.getElementById("rainSnd");
// const beachSnd = document.getElementById("beachSnd");
// const tForestSnd = document.getElementById("tForestSnd");
const audioBackground = document.getElementById("audio-background");
//vidéos
const videoBackground = document.getElementById("video-background");

//animation
const breathingPoint = document.querySelector(".breathPoint");
//variables indépendantes
let intervalId;
let stopBreathingFlag = false; // Variable de contrôle
let intervalCountdown;
let lastClickedInput = null; //permet de déterminer le focus
/* Fin init */

// par défaut, video background et audio sont placés sur "plage"
audioBackground.src = "./assets/snd/beach.mp3";
videoBackground.src = "./assets/video/beach.mp4";

/* --- CONFIGURATION DU MINUTEUR --- */

//boutons secondes
upButtonSecond.addEventListener("mousedown", () => {
  incrementBox(secondTwoInput, secondOneInput);
  intervalId = setInterval(() => {
    incrementBox(secondTwoInput, secondOneInput);
  }, 100); // Répéter toutes les 100ms
});

upButtonSecond.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});
upButtonSecond.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});
downButtonSecond.addEventListener("mousedown", () => {
  decrementBox(secondTwoInput, secondOneInput);
  intervalId = setInterval(() => {
    decrementBox(secondTwoInput, secondOneInput);
  }, 100); // Répéter toutes les 100ms
});

downButtonSecond.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});

downButtonSecond.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});

//boutons minutes
upButtonMinute.addEventListener("mousedown", () => {
  incrementBox(minuteTwoInput, minuteOneInput);
  intervalId = setInterval(() => {
    incrementBox(minuteTwoInput, minuteOneInput);
  }, 100); // Répéter toutes les 100ms
});

upButtonMinute.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});

upButtonMinute.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});

downButtonMinute.addEventListener("mousedown", () => {
  decrementBox(minuteTwoInput, minuteOneInput);
  intervalId = setInterval(() => {
    decrementBox(minuteTwoInput, minuteOneInput);
  }, 100); // Répéter toutes les 100ms
});

downButtonMinute.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});

downButtonMinute.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});

//boutons heures
upButtonHours.addEventListener("mousedown", () => {
  incrementBox(hoursTwoInput, hoursOneInput);
  intervalId = setInterval(() => {
    incrementBox(hoursTwoInput, hoursOneInput);
  }, 100); // Répéter toutes les 100ms
});

upButtonHours.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});

upButtonHours.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});

downButtonHours.addEventListener("mousedown", () => {
  decrementBox(hoursTwoInput, hoursOneInput);
  intervalId = setInterval(() => {
    decrementBox(hoursTwoInput, hoursOneInput);
  }, 100); // Répéter toutes les 100ms
});

downButtonHours.addEventListener("mouseup", () => {
  clearInterval(intervalId);
});

downButtonHours.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});
const incrementBox = (secondInput, firstInput) => {
  let currentValue = parseInt(secondInput.value, 10);
  if (lastClickedInput === firstInput) {
    // Cas où l'utilisateur a cliqué dans le premier input
    if (
      (secondInput == hoursTwoInput && firstInput.value == 2) ||
      (firstInput.value == 1 && secondInput.value >= 4)
    ) {
      //on est dans les heures
      firstInput.value = 0;
    } else {
      //on est dans les minutes ou secondes
      if (firstInput.value >= 5) {
        firstInput.value = 0;
      } else {
        firstInput.value = (parseInt(firstInput.value, 10) + 1) % 10;
      }
    }
    lastClickedInput = firstInput;
  } else {
    // Comportement par défaut
    if (secondInput.value >= 0) {
      if (
        //vérifie si on est dans les boxs heures
        secondInput == hoursTwoInput &&
        firstInput.value == 2 &&
        secondInput.value == 3
      ) {
        secondInput.value = 0;
        firstInput.value = 0;
      } else {
        //boxs minutes ou secondes
        if (secondInput.value == 9) {
          if (firstInput.value == 5) {
            //cas où on atteint 59
            //repasser à 0
            secondInput.value = 0;
            firstInput.value = 0;
          } else {
            secondInput.value = 0;
            currentValue = parseInt(firstInput.value, 10);
            firstInput.value = (currentValue + 1) % 10;
          }
        } else {
          secondInput.value = (currentValue + 1) % 10; // Pour limiter à une seule chiffre, modulo 10
        }
      }
    } else {
      secondInput.value = 0;
      currentValue = parseInt(secondInput.value, 10);
      secondInput.value = (currentValue + 1) % 10;
    }
  }
};

const decrementBox = (secondInput, firstInput) => {
  let currentValue = parseInt(secondInput.value, 10);
  if (lastClickedInput === firstInput) {
    // Cas où l'utilisateur a cliqué dans le premier input
    if (secondInput == hoursTwoInput && firstInput.value == 0) {
      //on est dans les heures
      firstInput.value = 2;
    } else {
      //on est dans les minutes ou secondes
      if (firstInput.value == 0) {
        firstInput.value = 5;
      } else {
        firstInput.value = (parseInt(firstInput.value, 10) - 1) % 10;
      }
    }
    lastClickedInput = firstInput;
  } else {
    if (secondInput.value == 0) {
      if (firstInput.value == 0) {
        if (secondInput == hoursTwoInput) {
          //vérifie si c'est les heures, dans ce cas on passe a 23h
          secondInput.value = 3;
          firstInput.value = 2;
        } else {
          //sinon on est dans minutes ou secondes
          //cas où on est à 00 seconds, on passe à 59
          secondInput.value = 9;
          firstInput.value = 5;
        }
      } else {
        //on arrive à une dizaine, donc on décrémente la dizaine et on ajoute 9 aux unités
        currentValue = parseInt(firstInput.value, 10);
        firstInput.value = (currentValue - 1) % 10;
        currentValue = parseInt(secondInput.value, 10);
        secondInput.value = 9;
      }
    } else {
      //unité != 0, on décrémente
      currentValue = parseInt(secondInput.value, 10);
      secondInput.value = (currentValue - 1) % 10;
    }
  }
};

allInputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const value = event.target.value;
    const lastChar = value[value.length - 1];

    // Si la dernière entrée n'est pas un chiffre, réinitialise à la dernière valeur valide
    if (isNaN(lastChar) || value.length > 1) {
      event.target.value = lastChar.match(/[0-9]/) ? lastChar : "";
    }
  });
});

//Détermine le focus à chaque fois qu'on clique dans un nouvel input
document.querySelectorAll(".timeInputs").forEach((input) => {
  input.addEventListener("focus", () => {
    lastClickedInput = input;
  });
});

/* --- FIN Configuration du minuteur ---*/

/*LANCEMENT DE LA SESSION */
go.addEventListener("click", async () => {
  stopBreathingFlag = false; //Pour éviter les bugs éventuels de multiclick en fin de session précédente
  const timeMeditation = [
    parseInt(document.getElementById("hours1").value, 10),
    parseInt(document.getElementById("hours2").value, 10),
    parseInt(document.getElementById("minutes1").value, 10),
    parseInt(document.getElementById("minutes2").value, 10),
    parseInt(document.getElementById("seconds1").value, 10),
    parseInt(document.getElementById("seconds2").value, 10),
  ];
  //realTime est djà défini en ms
  let realTime =
    (timeMeditation[0] * 10 + timeMeditation[1]) * 60 * 60 * 1000 +
    (timeMeditation[2] * 10 + timeMeditation[3]) * 60 * 1000 +
    (timeMeditation[4] * 10 + timeMeditation[5]) * 1000;

  if (realTime > 0) {
    // vérifie qu'on a pas tapé 0 pour pas d'erreurs
    countdownDisplay.innerHTML = ""; //Ajouter 00:00:00 dans le futur
    clearAllBoxes();
    popUp.style.visibility = "visible";
    popUp.style.opacity = "1"; //affiche texte par défaut
    await delay(5000); //pour laisser le temps d'afficher le texte par défaut
    countdownCircle(realTime); // temps affiché avec l'animation circulaire
    activateBreathingPoint(true);
    stopBtn.style.opacity = "0.2";
    countdownDisplay.style.opacity = "0.2";
    stopBtn.style.visibility = "visible";
    countdownDisplay.style.visibility = "visible";
    await cycleBreathing(realTime);
    reinitializer();
    fondu(stopBtn, 1000);
    await fondu(countdownDisplay, 1000);
  }
});

chrono.addEventListener("click", async () => {
  stopBreathingFlag = false; //Pour éviter les bugs éventuels de multiclick en fin de session précédente
  let realTime = 0; //temps en ms
  clearAllBoxes();
  popUp.style.visibility = "visible";
  popUp.style.opacity = "1"; //affiche texte par défaut
  await delay(5000); //pour laisser le temps d'afficher le texte par défaut
  finFondu(stopBtn);
  afficherTemps(realTime);
  activateBreathingPoint(true);
  stopBtn.style.opacity = "0.2";
  stopBtn.style.visibility = "visible";
  countdownDisplay.style.width = "200px";
  countdownDisplay.innerHTML = "00:00:00";
  countdownDisplay.style.opacity = "0.2";
  countdownDisplay.style.visibility = "visible";
  countdownDisplay.style.background = "#ffffff4f";
  await finFondu(countdownDisplay);
  await cycleBreathing(86000000);
  reinitializer();
  fondu(stopBtn, 1000);
  await fondu(countdownDisplay, 1000);
  countdownDisplay.style.background = "#00000000"; //Pour le cercle countdown
  countdownDisplay.style.width = "auto";
  countdownDisplay.innerHTML = "";
});

const afficherTemps = (realTime) => {
  let totalTimeInSeconds = Math.floor(realTime / 1000); //convertir les ms en s
  intervalCountdown = setInterval(function () {
    if (totalTimeInSeconds <= -1) {
      clearInterval(intervalCountdown);
      ringBell();
      return;
    }

    let hours = Math.floor(totalTimeInSeconds / 3600);
    let minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    let seconds = totalTimeInSeconds % 60;

    countdownDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    totalTimeInSeconds++;
  }, 1000);
};

const ringBell = () => {
  document
    .getElementById("bell")
    .play()
    .catch((error) => {
      console.error("Erreur lors de la lecture de l'audio :", error);
    });
};

const clearAllBoxes = () => {
  title.style.opacity = "0";
  timer.style.opacity = "0";
  go.style.opacity = "0";
  meditButtons.style.opacity = "0";
  chrono.style.opacity = "0";
  setTimeout(() => {
    title.style.visibility = "hidden";
    timer.style.visibility = "hidden";
    go.style.visibility = "hidden";
    meditButtons.style.visibility = "hidden";
    chrono.style.visibility = "hidden";
    //fondu
    //ajouter classe fade-element à fullscreen
    document.getElementById("fullscreenBtn").classList = "fade-element";
  }, 1000);
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fondu(element, ms) {
  element.style.transition = `opacity ${ms}ms ease-in-out`;
  element.style.opacity = "0";
  await delay(ms);
  element.style.visibility = "hidden";
}

async function finFondu(element) {
  element.style.visibility = "visible";
  element.style.transition = `opacity 1000ms ease-in-out`;
  element.style.opacity = "1";
  await delay(1000);
}

async function cycleBreathing(realTime) {
  finFondu(popUp);
  let alternateBreath = true;
  const endTime = Date.now() + realTime;

  await fondu(popUp, 1000); //fondu du texte de base
  await delay(1000); //pour bien fondre le texte

  while (Date.now() < endTime && !stopBreathingFlag) {
    if (alternateBreath) {
      // popUp.innerHTML = "Inspirez...";
      await finFondu(popUp);
      await delay(1000); // Temps d'affichage du texte avant de commencer le fondu
      await fondu(popUp, 1000);
      popUp.innerHTML = "";
    } else {
      // popUp.innerHTML = "Expirez...";
      await finFondu(popUp);
      await delay(1000); // Temps d'affichage du texte avant de commencer le fondu
      await fondu(popUp, 1000);
      popUp.innerHTML = "";
    }
    alternateBreath = !alternateBreath;
    await delay(1000); // Temps sans texte visible entre les cycles
  }
  // Fin du cycle
  ringBell();
  popUp.innerHTML = "Séance terminée. Bonne journée!";
  await finFondu(popUp);
  await delay(5000);
  await fondu(popUp, 1000);
  popUp.innerHTML = "C'est parti, concentrez-vous sur votre respiration...";
  stopBreathingFlag = false;
}

//réinitialise les boîtes après la session
const reinitializer = () => {
  popUp.innerHTML = "C'est parti, concentrez-vous sur votre respiration...";
  title.style.visibility = "visible";
  timer.style.visibility = "visible";
  go.style.visibility = "visible";
  meditButtons.style.visibility = "visible";
  chrono.style.visibility = "visible";
  title.style.opacity = "1";
  timer.style.opacity = "1";
  go.style.opacity = "1";
  meditButtons.style.opacity = "1";
  chrono.style.opacity = "1";
  activateBreathingPoint(false);
};

// Play the video when "Go" or "Chrono" is clicked
const playMedia = () => {
  videoBackground.play();
  audioBackground.play().catch((error) => {
    console.error("Erreur lors de la lecture de l'audio :", error);
  });
};
go.addEventListener("click", playMedia);
chrono.addEventListener("click", playMedia);

const changeVideoSource = (src) => {
  videoBackground.src = src;
};

const changeSndSource = (src) => {
  audioBackground.src = src;
};

const activateBreathingPoint = (bool) => {
  if (bool) {
    breathingPoint.style.visibility = "visible";
    breathingPoint.style.animationPlayState = "running";
  } else {
    breathingPoint.style.visibility = "hidden";
    breathingPoint.style.animationPlayState = "paused";
  }
};

/* FIN LANCEMENT SESSION */

volumeControl.addEventListener("input", (event) => {
  audioBackground.volume = event.target.value / 9;
  console.log(event);
});

// Ajouter des écouteurs d'événements aux boutons
rainBtn.addEventListener("click", () => {
  changeVideoSource("./assets/video/rain1.mp4");
  changeSndSource("./assets/snd/rain.mp3");
  title.style.color = "#2470a6";
  timer.style.backgroundColor = "#2c7fb1ab";
  allButtonInputs.forEach((input) => {
    input.style.color = "#0406529a";
    input.style.backgroundColor = "";
    input.style.borderColor = "#74747478";
  });
  allTimeInputs.forEach((input) => {
    input.style.color = "#150f64d2";
    input.style.backgroundColor = "#85bdffab";
    input.style.borderColor = "#8b8b8b7c";
  });
  go.style.background = "#64acbd";
  go.style.color = "#001f68";
});

beachBtn.addEventListener("click", () => {
  changeVideoSource("./assets/video/beach.mp4");
  changeSndSource("./assets/snd/beach.mp3");
  title.style.color = "#743213";
  timer.style.backgroundColor = "#b1822cab";
  allButtonInputs.forEach((input) => {
    input.style.color = "#4b4d0f9a";
    input.style.backgroundColor = "#";
    input.style.borderColor = "#ffffff86";
  });
  allTimeInputs.forEach((input) => {
    input.style.color = "#645f0fd2";
    input.style.backgroundColor = "#c2cc32ab";
    input.style.borderColor = "#ffffff7c";
  });
  go.style.background = "#ca6512";
  go.style.color = "#4b4d0f";
});

tForestBtn.addEventListener("click", () => {
  changeVideoSource("./assets/video/tForest.mp4");
  changeSndSource("./assets/snd/tForest.mp3");
  title.style.color = "#b7fdb5";
  timer.style.backgroundColor = "#95db94ab";
  allButtonInputs.forEach((input) => {
    input.style.color = "#ffffffab";
    input.style.backgroundColor = "";
    input.style.borderColor = "#ffffff86";
  });
  allTimeInputs.forEach((input) => {
    input.style.color = "#00680ed2";
    input.style.backgroundColor = "#c8ffb9ab";
    input.style.borderColor = "#ffffff7c";
  });
  go.style.background = "#96c99a";
  go.style.color = "#ffffff";
});

audioBackground.addEventListener("timeupdate", () => {
  if (audioBackground.src.includes("rain.mp3")) {
    if (audioBackground.currentTime >= 25) {
      audioBackground.currentTime = 5; // Réinitialiser la position de lecture
      audioBackground.play();
    }
  }
});

stopBtn.addEventListener("click", async () => {
  stopBreathingFlag = true;
  clearInterval(intervalCountdown);
  await delay(20000); //temps avant que le countdowndisplay disparaisse (15sec environ)
  countdownDisplay.innerHTML = "00:00:00";
});

// Fonction pour activer le plein écran
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(
        `Erreur en essayant d'activer le mode plein écran : ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

// Ajouter un écouteur d'événement au bouton plein écran
fullscreenBtn.addEventListener("click", toggleFullscreen);

/* COUNTDOWN CIRCULAIRE */
const countdownCircle = (realTime) => {
  var width = 100;
  var height = 100;
  var radius = Math.min(width, height) / 2;
  var duration = realTime;

  var svg = d3
    .select(".countdown")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arc = d3
    .arc()
    .startAngle(0)
    .innerRadius(radius - 10)
    .outerRadius(radius)
    .cornerRadius(20);

  var foreground = svg
    .append("path")
    .datum({ endAngle: 0 })
    .style("fill", "lightblue")
    .attr("d", arc);

  var start = Date.now();

  var timer = d3.interval(function () {
    var elapsed = Date.now() - start;
    var progress = elapsed / duration;
    foreground.attr("d", arc.endAngle(2 * Math.PI * progress));

    if (progress >= 1) {
      foreground.attr("d", arc.endAngle(2 * Math.PI)); // Ensure it completes the circle
      timer.stop(); // Stop the interval using the reference
    }
  }, 16);
};
