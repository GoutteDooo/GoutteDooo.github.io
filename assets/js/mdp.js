const password = "bonjour";

enter.addEventListener("click", () => {
  if (mdp.value == "bonjour") {
    window.location.href = "./index.html";
  } else {
    alert("le mot de passe n'est pas le bon.");
  }
});
