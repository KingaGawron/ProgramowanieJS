let counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);

const images = document.querySelectorAll(".slides img")
const arrowLeft = document.querySelector(".left")
const arrowRight = document.querySelector(".right")
const img = document.querySelector(".slide img")
let currentImgIndex;

images.forEach((image,index) =>{
  image.addEventListener("click",(e)=>{
   
    image.src = e.target.src;
    console.log(image.src)
    currentImgIndex=index;
  })
})
arrowRight.addEventListener("click",()=>{
  currentImgIndex++;
  image.src=images[currentImgIndex];
})

