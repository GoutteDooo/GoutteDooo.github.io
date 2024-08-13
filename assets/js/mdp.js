const password = "bonjour";
let nbrEssais;
let passwordLock = true;
localStorage.passwordLock = passwordLock;
/* STORAGE */
if (localStorage.nbrEssais > 0) {
  nbrEssais = localStorage.nbrEssais;
} else {
  nbrEssais = 0;
}

/* FIN STORAGE */

enter.addEventListener("click", (e) => {
  if (mdp.value == "bonjour" && nbrEssais < 3) {
    window.location.href = "./CV.html";
    localStorage.nbrEssais = JSON.parse(0);
    passwordLock = false;
    localStorage.passwordLock = JSON.parse(passwordLock);
  } else if (nbrEssais >= 3) {
    alert("Trop de tentatives ! Veuillez réessayer dans 5 minutes.");
    setTimeout(() => {
      nbrEssais = 0;
      localStorage.nbrEssais = JSON.parse(0);
    }, 300000);
  } else {
    alert("le mot de passe est incorrect.");
    nbrEssais++;
    localStorage.nbrEssais = JSON.parse(nbrEssais);
  }
});

mdp.addEventListener("keypress", (e) => {
  if (e.key == "Enter") enter.click();
});
