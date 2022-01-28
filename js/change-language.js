import showTime from './time-and-date.js';
import getWeather from './weatherAPI.js';
import getQuotes from './quotes.js';

const changeLanguageBtn = document.querySelector('.change-language--btn');
const dateNode = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const weather = document.querySelector('.weather');
const quotesWrapper = document.querySelector('.quotes-wrapper');
const currentLanguage = document.querySelector('.current-language--slider');
const inputsParagraph = document.querySelector('.change-laguage__text');
const settingInputs = document.querySelectorAll('.setting-input');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', startPage);

let language;

// if(language === undefined) {
//   language = "ru";
// };

currentLanguage.textContent = language;
// changeLabelLanguage(language);


changeLanguageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(language === "ru"){
    language = "en"
  } else if(language === "en"){
    language = "ru"
  }
  currentLanguage.textContent = language;
  changeLabelLanguage(language)
  changeButtonLanguage(language)
  startPage()
})

function startPage(){
  startHide([dateNode, greeting, weather, quotesWrapper])
  setTimeout(() => {
    // showTime();
    getQuotes();
    getWeather();
  }, 500)
  setTimeout(() => {
    endHide([dateNode, greeting, weather, quotesWrapper])
  }, 1000)
}

export function startHide([...elements]){
  elements.forEach(element => {
    element.classList.add('start-hide');
  })
}

function endHide([...elements]){
  elements.forEach(element => {
    element.classList.remove('start-hide')
    element.style.transition = 'opacity 0.2s ease';
  })
}

function changeLabelLanguage(lang){
  settingInputs.forEach(( el ) => {
    if(lang === "en") {
      el.previousElementSibling.textContent = el.dataset.en
    } else if(lang === "ru"){
      el.previousElementSibling.textContent = el.dataset.ru;
    }
  })
}
function changeButtonLanguage(lang){
    if(lang === "en") {
      inputsParagraph.textContent = "Hide element";
      changeLanguageBtn.textContent = "change language"
    } else if(lang === "ru"){
      inputsParagraph.textContent = "Скрыть элемент";
      changeLanguageBtn.textContent = "сменить язык"
    }
}

function setLocalStorage(){
  localStorage.setItem('user-language', language);
}

function getLocalStorage(){
  if(!localStorage.getItem('user-language')){
    language = "ru";
  }
  if(localStorage.getItem('user-language')){
    language = localStorage.getItem('user-language');
    currentLanguage.textContent = language;
    changeLabelLanguage(language);
    changeButtonLanguage(language);
  }
}

export { language }