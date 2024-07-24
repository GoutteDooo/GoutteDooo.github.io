const button = document.querySelector(".toggleBtn");
const page = document.querySelector(".page");
let navOn = true;

button.addEventListener("click", () => {
  nav.classList.toggle("hideNav");
  if (navOn) {
    navOn = false;
    button.style.transform = "rotate(180deg)";
    // nav.style.top = "-50px";
  } else {
    navOn = true;
    button.style.transform = "rotate(0deg)";
    // nav.style.top = "0px";
  }
});

printVersion.addEventListener("click", () => {
  page.classList.add("pagePrint");
  // page.classList.toggle("page");
});
numVersion.addEventListener("click", () => {
  page.classList.remove("pagePrint");
});
// window.onscroll = function () {
//   if (window.scrollY > 0) {
//     nav.classList.toggle("hideNav");
//   }
// };
