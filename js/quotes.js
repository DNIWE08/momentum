import { language } from "./change-language.js";

const quoteField = document.querySelector('.quote');
const authorField = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let isClicked = true;
let laguageQuote;

changeQuote.addEventListener('click', () => {
  changeQuote.style.transform = "rotate(-180deg)"
  if(isClicked === false) return false;
  isClicked = false;
  quoteField.classList.add('hidden');
  authorField.classList.add('hidden');
  setTimeout(() => {
    getQuotes();
    // toggleClass();
    isClicked = true;
    changeQuote.style.transform = "rotate(-360deg)"
  }, 500);
})

function getRandomQuote(length){
  let resultNumber = Math.floor(Math.random() * (length - 1));
  return resultNumber;
}

function toggleClass(){
  quoteField.classList.remove('hidden');
  authorField.classList.remove('hidden');
}

// function setQuotes(){
//   rundomNum = localStorage.getItem('current-quote');
//   quoteField.textContent = laguageQuote[rundomNum].text;
//   authorField.textContent = laguageQuote[rundomNum].author;
// }

async function getQuotes(){
  const quotesList = 'quotes.json';
  const result = await fetch(quotesList);
  const data = await result.json();

  let rundomNum = getRandomQuote(data.length);
  
  if(language === "en") {
    laguageQuote = data[rundomNum].en
  } else {
    laguageQuote = data[rundomNum].ru
  }
  
  quoteField.textContent = laguageQuote.text;
  authorField.textContent = laguageQuote.author;

  toggleClass()
}

// export { setQuotes }

export default getQuotes;