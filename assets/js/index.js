const button = document.querySelector(".toggleBtn");
const page = document.querySelector(".page");
const photo = document.querySelector(".photo");
let lastSelectedText = false;
let navOn = true;
console.log("passwordLock : " + localStorage.passwordLock);

if (localStorage.passwordLock == "false") {
  const toggleNav = () => {
    nav.classList.toggle("hideNav");
    if (navOn) {
      navOn = false;
      button.style.transform = "rotate(180deg)";
      button.style.opacity = 0.2;
    } else {
      navOn = true;
      button.style.transform = "rotate(0deg)";
      button.style.opacity = 1;
    }
  };

  button.addEventListener("click", () => {
    toggleNav();
  });

  printVersion.addEventListener("click", () => {
    page.classList.add("pagePrint");
    toggleNav();
    // page.classList.toggle("page");
  });
  numVersion.addEventListener("click", () => {
    page.classList.remove("pagePrint");
  });
} else {
  document.body.remove();
  alert("Veuillez entrer le mot de passe.");
}

/* Copier la sélection */
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText != "" && lastSelectedText !== selectedText)
    navigator.clipboard
      .writeText(selectedText)
      .then(() => {
        alert("Texte copié dans le presse-papiers !");
      })
      .catch((err) => {
        console.error("Erreur lors de la copie : ", err);
      });
  lastSelectedText = selectedText;
});
