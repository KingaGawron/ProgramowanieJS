let counter = 1
setInterval(function(){

    document.getElementById('radio'+counter).checked=true;
    counter++;
    if(counter > 4){
        counter = 1
    }
},5000);

const arrowRight = document.querySelector("right");
const arrowLeft = document.querySelector("left");
const img = document.querySelector("slide");
let currentImgIndex;
img.forEach((slide,index) => {
    slide.addEventListener("click",() =>{

        currentImgIndex=index;
        alert(currentImgIndex);
    });
    
});

arrowRight.addEventListener("click",()=>{
    counter++;
}
)