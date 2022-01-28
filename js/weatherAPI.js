import { language } from './change-language.js';

const cityInput = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const unitsTemp = 'metric';
cityInput.value = "Минск"

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

cityInput.addEventListener('change', getWeather)


async function getWeather() {  
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${language}&appid=d549583b2c498477029e3b8da4411cb9&units=${unitsTemp}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if(!cityInput.value){
      temperature.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
      weatherDescription.textContent = "";
    } 
    
    weatherIcon.className = 'weather-icon owf';  
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    if(language === "en"){
      wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
      weatherDescription.textContent = data.weather[0].description;
    } else {
      wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`;
      humidity.textContent = `Влажность: ${data.main.humidity} %`;
      weatherDescription.textContent = data.weather[0].description;
    }
    weatherError.textContent = "";

  } catch (err) {
    if(language === "en"){
      weatherError.textContent = 'Enter the correct city';
    } else {
      weatherError.textContent = 'Введите правильный город';
    }

  }
}

function setLocalStorage(){
  localStorage.setItem('user-city', cityInput.value);
}

function getLocalStorage(){
  if(!localStorage.getItem('user-city')){
    cityInput.value = "Минск";
  }
  if(localStorage.getItem('user-city')){
    cityInput.value = localStorage.getItem('user-city');
  }
}

export default getWeather;