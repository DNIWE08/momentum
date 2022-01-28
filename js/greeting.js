import { language } from './change-language.js';

const userName = document.querySelector('#user_name');
const greeting = document.querySelector('.greeting');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

function getTimeOfDay() {
  const currentHours = new Date().getHours();
  let prase;

  if (currentHours >= 6 && currentHours < 12) {
    prase = 'Morning';
  }
  if (currentHours >= 12 && currentHours < 18){
    prase = 'Day';
  }
  if (currentHours >= 18 && currentHours < 24){
    prase = 'Evening';
  } 
  if (currentHours >= 0 && currentHours < 6){
    prase = 'Night';
  }

  return prase;
}

function showGreeting(){
  let timeOfDay = getTimeOfDay();
  let outputPrase;
  if(language === "en"){
    userName.placeholder = '[Enter name]';
    if(timeOfDay === 'Day') {
      outputPrase = `Good Afternoon`;
    }
    outputPrase = `Good ${timeOfDay}`;
  } else {
    userName.placeholder = '[Введите имя]';
    switch (timeOfDay) {
      case 'Morning':
        outputPrase = `Доброе утро`;
        break;
      case 'Day':
        outputPrase = `Добрый день`;
        break;
      case 'Evening':
        outputPrase = `Добрый вечер`;
        break;
      case 'Night':
        outputPrase = `Доброй ночи`;
        break;
    }
  }

  greeting.textContent = outputPrase;
}

function setLocalStorage(){
  localStorage.setItem('user-name', userName.value);
}

function getLocalStorage(){
  if(!localStorage.getItem('user-name')) {
    userName.placeholder = '[Enter name]';
  }
  if(localStorage.getItem('user-name')) {
    userName.value = localStorage.getItem('user-name');
  }
}

export { showGreeting, getTimeOfDay};
