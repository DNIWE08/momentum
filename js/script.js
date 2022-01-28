import showTime from './time-and-date.js';
import setBG from './background.js';
import getWeather from './weatherAPI.js';
import { getTimeOfDay } from './greeting.js';
import getQuotes from './quotes.js';
import playAudio from './audio.js';
// import { startPage } from './change-language.js';
import { settings } from './setting.js';

const flickrLabel = document.querySelector('label[for="flickr-api"]');
const unsplashLabel = document.querySelector('label[for="unsplash-api"]');
const flickrValue = document.querySelector('#flickr-api');
const unsplashValue = document.querySelector('#unsplash-api');
const githubValue = document.querySelector('.github-api');
const flickrError = document.querySelector('.flickr-error');
const unsplashError = document.querySelector('.unsplash-error');
let imageCattegory;

flickrValue.value = getTimeOfDay();
unsplashValue.value = getTimeOfDay();

flickrLabel.addEventListener('click', getFlickrImage)
unsplashLabel.addEventListener('click', getUnsplashImage)
githubValue.addEventListener('click', setBG)


// startPage()
getQuotes();
getWeather();
setBG();
showTime();


async function getFlickrImage(){
  try{
    imageCattegory = await flickrValue.value;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=65683f2125d207d2f02d4cb8c16a9ffd&tags=${imageCattegory}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod === 404 || data.cod === undefined){
      getFlickrImage
    }
    const img = new Image();
    img.src = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)].url_l;
    img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
    flickrError.textContent = ""
  } catch(err) {
    flickrError.textContent = "Error"
  }
}

async function getUnsplashImage(){
  try{
    imageCattegory = unsplashValue.value;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imageCattegory}&client_id=-GLYeqf0QLujL12zSym7KlSSgA8rs3Sx_P54HREeOqg`
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod === 404 || data.cod === undefined){
      getUnsplashImage
    }
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
    unsplashError.textContent = ""
  } catch(err) {
    unsplashError.textContent = "Error"
  }
}
