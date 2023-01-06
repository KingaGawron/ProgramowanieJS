
const arrowRight = document.querySelector(".right")
const arrowLeft = document.querySelector(".left")
let counter = 1;

setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);

arrowRight.addEventListener("click",(e)=>{
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
})
  arrowLeft.addEventListener("click",(e)=>{
document.getElementById("radio" + counter).checked = true;
  counter--;
  if (counter < 1 ) {
    counter = 4;
  }
})