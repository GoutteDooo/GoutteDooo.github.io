const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";

// General settings
let gamePlaying = false;

const gravity = 0.5,
  size = [51, 36],
  defaultSpeed = 6.2,
  jump = -11.5,
  cTenth = canvas.width / 10,
  maxRotation = 75; // Limite maximale en degrés;

let index = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight,
  flyHeight,
  speed = defaultSpeed,
  rotation,
  rotateAngle,
  nightMode = false;

//pipe settings
const pipeWidth = 78,
  pipeGap = 270,
  pipeLoc = () =>
    Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
    pipeWidth,
  setup = () => {
    currentScore = 0;
    flight = jump;
    flyHeight = canvas.height / 2 - size[1] / 2;

    pipes = Array(3)
      .fill()
      .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
  };

//sound settings
var flap = new Audio("./media/flap.mp3"),
  lose = new Audio("./media/bing.mp3"),
  pipePassed = new Audio("./media/pipePassed.mp3"),
  music = new Audio("./media/music.mp3"),
  nightMusic = new Audio("./media/nightMusic.mp3"),
  highScoreBeated = new Audio("./media/highScoreBeated.mp3");
pipePassed.volume = 0.3;
highScoreBeated.volume = 0.7;
music.loop = true;
nightMusic.loop = true;
let highScoreBeatedBool = false;
let volumeOn = true;
const volumeIcon = document.getElementById("volume-icon");
const playSound = (audioElement) => {
  if (volumeOn) {
    audioElement.currentTime = 0; // Réinitialiser la position de lecture
    audioElement.play().catch((error) => {
      console.error("Erreur lors de la lecture de l'audio :", error);
    });
  }
};

volumeIcon.addEventListener("click", () => {
  if (volumeOn) {
    volumeOn = false;
    volumeIcon.innerHTML = "<i class='fas fa-volume-off'></i>";
    music.pause();
    nightMusic.pause();
  } else {
    volumeOn = true;
    volumeIcon.innerHTML = "<i class='fas fa-volume-high'></i>";
  }
});

//Récupérer high score & afficher par défaut
bestScore = JSON.parse(localStorage.getItem("bestScore"));
if (!bestScore) bestScore = 0;

const render = () => {
  index++;
  //Affichage du décors : deux décors collés entre eux pour donner l'impression d'un décors infini
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    Math.floor(-((index * (defaultSpeed / 2)) % canvas.width)),
    0,
    canvas.width,
    canvas.height
  );
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    Math.floor(-((index * (defaultSpeed / 2)) % canvas.width) + canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  if (nightMode) {
    // Définit la couleur de remplissage avec une légère transparence pour simuler le mode nuit
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Ajustez l'opacité pour obtenir l'effet souhaité

    // Dessine un rectangle couvrant tout le canvas pour appliquer le filtre
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (gamePlaying) {
    // Sauvegarder l'état du contexte
    ctx.save();

    // Déplacer le point de rotation au centre de l'image (cTenth + size[0]/2, flyHeight + size[1]/2)
    ctx.translate(cTenth + size[0] / 2, flyHeight + size[1] / 2);
    // Appliquer la rotation
    rotation = (rotateAngle * Math.PI) / 180; // Convertir les degrés en radians
    // Limiter la rotation à 75 degrés
    if (rotateAngle < maxRotation) {
      // Incrémenter l'angle de manière à ralentir à mesure qu'on approche de 75° (maxRotation)
      rotateAngle += 1.5 * (1 + rotateAngle / maxRotation);
    } else {
      rotateAngle = maxRotation;
    }
    ctx.rotate(rotation);

    // Dessiner l'image avec le point de référence déplacé
    ctx.drawImage(
      img,
      432, // Coordonnées x dans la source
      Math.floor((index % 9) / 3) * size[1], // Coordonnées y dans la source
      ...size, // Taille de l'image (width, height)
      -size[0] / 2, // Position x dans le canvas après translation
      -size[1] / 2, // Position y dans le canvas après translation
      ...size // Taille à dessiner sur le canvas
    );

    // Restaurer l'état du contexte
    ctx.restore();

    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]); //la deuxième valeur est une sécurité. Elle permet à l'oiseau de rester au sol quand il le touche et ne pas descendre indéfiniment.
  } else {
    //Affichage de l'écran d'accueil : Deux décors qui sont collés entre eux pour donner l'impression d'un décor infini.
    // Dessiner l'oiseau au centre du canvas
    ctx.drawImage(
      img,
      432, // Coordonnées x dans la source
      Math.floor((index % 9) / 3) * size[1], // Coordonnées y dans la source
      ...size, // Taille de l'image (width, height)
      canvas.width / 2 - size[0] / 2, // Position x dans le canvas
      flyHeight, // Position y dans le canvas
      ...size // Taille à dessiner sur le canvas
    );
    flyHeight = canvas.height / 2 - size[1] / 2;

    //Affichage Scores
    if (nightMode) {
      ctx.fillStyle = "yellow"; // Couleur de la police en mode nuit
      ctx.font = "bold 30px courier";
      ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
      ctx.fillText("Cliquez pour jouer", 48, 535);
      ctx.font = "bold 15px courier";
      ctx.fillText("Appuyer sur 'N' pour désactiver", 75, 620);
      ctx.fillText("le Night Mode (svp, faites-le)", 80, 640);
    } else {
      ctx.font = "bold 30px courier";
      ctx.fillStyle = "black"; // Couleur de la police en mode nuit
      ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
      ctx.fillText("Cliquez pour jouer", 48, 535);
      ctx.font = "bold 15px courier";
      ctx.fillText("Appuyer sur 'N' pour activer", 90, 620);
      ctx.fillText("le Night Mode (c'est moche)", 95, 640);
    }
  }

  if (gamePlaying) {
    pipes.map((pipe) => {
      pipe[0] -= speed;
      //pipe du haut
      ctx.drawImage(
        img,
        432,
        588 - pipe[1],
        pipeWidth,
        pipe[1],
        pipe[0],
        0,
        pipeWidth,
        pipe[1]
      );
      //pipe du bas
      ctx.drawImage(
        img,
        432 + pipeWidth,
        108,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap,
        pipe[0],
        pipe[1] + pipeGap,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap
      );

      //L'oiseau est passé entre les tuyaux
      if (pipe[0] <= -pipeWidth) {
        //Jouer son
        playSound(pipePassed);
        //Score
        currentScore++;
        //On augmente la vitesse progressivement
        speed = defaultSpeed + currentScore * 0.05;
        console.log(speed);
        if (bestScore < currentScore) {
          //BestScore sound effect
          bestScore = currentScore;

          //Stocker dans le localStorage
          localStorage.setItem("bestScore", bestScore.toString());

          if (!highScoreBeatedBool) {
            playSound(highScoreBeated);
            //Affichage spécial du high score quand dépassé en plein jeu
            document.getElementById("bestScore").classList = "highScoreDisplay";
            setTimeout(() => {
              document.getElementById("bestScore").classList = "";
            }, 2000);
          }
          highScoreBeatedBool = true;
        }

        //détruit le tuyau passé et en crée un autre
        pipes = [
          ...pipes.slice(1),
          [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
        ];
        //la formule est reprise de la fonction setup
      }

      //Si l'oiseau touche un tuyau, la partie se termine
      //Si oiseau est entre les tuyaux, et que sa position y en touche un , alors la partie se termine.
      //(On fait un every pour vérifier toutes ces conditions.)
      //(elem de elem (si toutes les valeurs sont true))
      if (
        [
          pipe[0] <= cTenth + size[0],
          pipe[0] + pipeWidth >= cTenth,
          pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
        ].every((elem) => elem)
      ) {
        playSound(lose);
        speed = defaultSpeed;
        gamePlaying = false;
        highScoreBeatedBool = false;
        setup();
      }
    });
  }

  //Affichage des scores
  document.getElementById("bestScore").innerHTML = `Meilleur : ${bestScore}`;
  document.getElementById(
    "currentScore"
  ).innerHTML = `Actuel : ${currentScore}`;

  //Rejouer l'animation
  window.requestAnimationFrame(render);
};

// Exécuter la fonction render une fois que l'image est chargée
setup();
img.onload = render;
canvas.addEventListener("click", () => {
  gamePlaying = true;
  rotateAngle = -30;
  if (volumeOn) {
    if (nightMode) {
      music.pause();
      nightMusic.play();
    } else {
      nightMusic.pause();
      music.play();
    }
  }
  playSound(flap);
});

window.onclick = () => (flight = jump);

document.addEventListener("keydown", (event) => {
  if (event.key === "n" || event.key === "N") {
    nightMode = !nightMode;
    if (volumeOn) {
      if (nightMode) {
        music.pause();
        nightMusic.play();
      } else {
        nightMusic.pause();
        music.play();
      }
    }
  }
});
