import audioList from "./audio-list.js";

const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
const playList = document.querySelector(".play-list");

let isPlay = false;
let currentAudio = 0;
let currPlayedAudioName;

const audio = new Audio();

audio.addEventListener('ended', () => {
  nextAudio()
  playAudio();
  updateBtn();
})

playPrevBtn.addEventListener('click', () => {
  prevAudio()
  playAudio();
  updateBtn();
})
playNextBtn.addEventListener('click', () => {
  nextAudio()
  playAudio();
  updateBtn();
})

playBtn.addEventListener('click', () => {
  playAudio();
  updateBtn();
})

audioList.forEach((el, index) => {
  if(index === 0){
    currPlayedAudioName = el.trackName;
  }
  const liElement = document.createElement('li');
  liElement.classList.add(`play-item`);
  liElement.classList.add(`item-${index}`);
  liElement.textContent = `${el.trackName}`;
  liElement.addEventListener('click', () => {
    playCurrentAudio(liElement);
    currPlayedAudioName = liElement.textContent;
  });
  playList.append(liElement);
})

function playAudio(){
  if(isPlay){
    audio.play();
    isPlay = !isPlay;
  } else {
    audio.pause();
    isPlay = !isPlay;
  }
  updateAciveAudio();
}

function updateBtn(){
  if(isPlay){
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");
  } else {
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
  }
}

function nextAudio(){
  if(currentAudio + 1 === audioList.length) {
    currentAudio = -1;
  }
  currentAudio++;
  updateAudioSrc()
  isPlay = !isPlay;
  updateAciveAudio();
} 

function prevAudio(){
  if(currentAudio - 1 === -1) {
    currentAudio = audioList.length;
  }
  currentAudio--;
  updateAudioSrc()
  isPlay = !isPlay;
  updateAciveAudio();
}

function playCurrentAudio(el){
  currentAudio = el.classList[1].split("-")[1];
  updateAudioSrc()
  playAudio();
  updateBtn()
}

function updateAciveAudio(){
  const listItems = document.querySelectorAll('.play-item');
  listItems.forEach((el) => {
    el.classList.remove('item-active')
    el.classList.remove('played')
    if(el.classList.contains(`item-${currentAudio}`)){
      el.classList.add('item-active');
      currPlayedAudioName = el.textContent;
      updateItemBtn(el)
    }
  })
}

function updateItemBtn(el){
  if(!isPlay){
    el.classList.add('played');
  } else {
    el.classList.remove('played');
  }
}

function updateAudioSrc(){
  audio.src = `${audioList[currentAudio].src}`;
}

updateAciveAudio();
updateAudioSrc()
playAudio();

const timeLine = document.querySelector(".player-timeline");
const timeCurrent = document.querySelector(".player-time__current");
const timeDuration = document.querySelector(".player-time__duration");
const timeProgress = document.querySelector(".progress");
const audioName = document.querySelector(".player-audio__name");
const volumeProgressWrapper = document.querySelector(".progress-volume__wrapper");
const volumeProgress = document.querySelector(".progress-volume");
const volumeIcons = document.querySelectorAll("i.fa");
const playListBtn = document.querySelector(".play-list__toggle");
const playListContaine = document.querySelector(".play-list");
let isMuted = false;

playListBtn.addEventListener('click', () => {
  playListContaine.classList.toggle('hide-list')
  playListBtn.classList.toggle('hide-list')
})

audio.addEventListener("loadeddata", function() {
  timeDuration.textContent = formatTime(audio.duration);
  timeCurrent.textContent = formatTime(audio.currentTime);
  audioName.textContent = `${currPlayedAudioName} (YouTube)`;
  changeVolumeIcon(audio.volume)
}, false);

timeLine.addEventListener("click", e => {
  const timeLineWidth = window.getComputedStyle(timeLine).width;
  const timeToSeek = e.offsetX / parseInt(timeLineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
  timeProgress.style.width = audio.currentTime / audio.duration * 100 + "%";
}, false);

volumeProgressWrapper.addEventListener("click", e => {
  const volumeLineWidth = window.getComputedStyle(volumeProgressWrapper).width;
  const volumeToSeek = e.offsetX / parseInt(volumeLineWidth);
  audio.volume = volumeToSeek;
  changeVolumeIcon(audio.volume)
}, false);

function updateTimeValues(){
  timeCurrent.textContent = formatTime(audio.currentTime);
  timeProgress.style.width = audio.currentTime / audio.duration * 100 + "%";
}

setInterval(updateTimeValues, 500);

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

volumeIcons.forEach(icon => {
  icon.addEventListener('click',(e) => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    if(isMuted){
      volumeProgress.style.width = audio.volume * 0 + "%";
      e.target.classList.add('hide');
      volumeIcons[2].classList.remove('hide');
    } else {
      changeVolumeIcon(audio.volume);
    }
  })
})

function changeVolumeIcon(currentVolume){
  volumeProgress.style.width = audio.volume * 100 + "%";
  volumeIcons.forEach(icon => {
    if(!isMuted){

      icon.classList.add('hide')
      if(currentVolume <= 0.1){
        if(icon.classList.contains('fa-volume-off')){
          icon.classList.remove('hide')
        }
      } else if(currentVolume > 0.1 && currentVolume <= 0.5){
        if(icon.classList.contains('fa-volume-down')){
          icon.classList.remove('hide')
        }
      } else {
        if(icon.classList.contains('fa-volume-up')){
          icon.classList.remove('hide')
        }
      }
    } else {
      volumeProgress.style.width = audio.volume * 0 + "%";
      volumeIcons[2].classList.remove('hide');
    }
  })
}

export default playAudio;