import { showGreeting } from './greeting.js';
import { language } from './change-language.js';

const timeNode = document.querySelector('.time');
const dateNode = document.querySelector('.date');

const options = {
  weekday: 'long',
  month: 'long',
  day: '2-digit',
};

const dateFormat = {
  en: "en-US",
  ru: "ru-Ru" 
}


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeNode.innerText = currentTime;
  if(language === "en") showDate("en");
  if(language === "ru") showDate("ru");
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate(format) {
  const date = new Date();
  const currentDate = date.toLocaleDateString(dateFormat[format], options);
  dateNode.innerText = currentDate;
}

export default showTime;