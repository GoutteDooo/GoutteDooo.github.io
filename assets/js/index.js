const button = document.querySelector(".toggleBtn");
const page = document.querySelector(".page");
const photo = document.querySelector(".photo");
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
    photo.style.background = "none";
    // page.classList.toggle("page");
  });
  numVersion.addEventListener("click", () => {
    page.classList.remove("pagePrint");
    //Remettre avec la photo ---V
    // photo.style.background = "url(/assets/img/#.JPG) center/cover";
  });
  // window.onscroll = function () {
  //   if (window.scrollY > 0) {
  //     nav.classList.toggle("hideNav");
  //   }
  // };
} else {
  document.body.remove();
  alert("Veuillez entrer le mot de passe.");
}
