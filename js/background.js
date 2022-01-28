import { getTimeOfDay } from './greeting.js';

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let currentImage = getRandomNum();

slidePrev.addEventListener('click', getPrevSlide);
slideNext.addEventListener('click', getNextSlide);

function setBG(){
  let timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/DNIWE08/stage1-tasks/assets/images/${timeOfDay.toLowerCase()}/${currentImage}.jpg`;
  img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}

function getRandomNum(){
  let randomNum = Math.floor(Math.random() * 20);
  if(randomNum === 0) {
    randomNum = 1;
  }
  randomNum = randomNum.toString().padStart(2, "0");
  return randomNum;
}

function getPrevSlide(){
  if(currentImage - 1 === 0){
    currentImage = 21;
  }
  currentImage--;
  currentImage = currentImage.toString().padStart(2, "0");
  setBG();
}

function getNextSlide(){
  if(currentImage + 1 === 21){
    currentImage = 0;
  }
  currentImage++;
  if(currentImage <= 9){
    currentImage = currentImage.toString().padStart(2, "0");
  }
  setBG();
}

export default setBG;