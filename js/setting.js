const settings = document.querySelector('.settings');
const settingPopup = document.querySelector('.setting-popup');
const inputs = document.querySelectorAll('.setting-input');

settings.addEventListener('click', openSettingPopup);
document.addEventListener('click', function (e){
  closePopup(e)
});

inputs.forEach(el => {
  let label = document.querySelector(`[for="${el.id}"]`);
  // label.textContent = el.dataset["en"];
  el.addEventListener('click', (e) => {
    hideElement(e.target);
  })
})

window.addEventListener('beforeunload', () => {
  inputs.forEach(element => {
    let isChecked = document.getElementById(`${element.id}`);
    if(isChecked.checked) {
        localStorage.setItem(`${element.id}`, true);
    } else {
      localStorage.setItem(`${element.id}`, false);
    }
  })
});

window.addEventListener('load', () => {
  inputs.forEach(element => {
    let isChecked = localStorage.getItem(`${element.id}`);
    if (isChecked === "true") {
      document.getElementById(`${element.id}`).checked = true;
      hideElement(element)
    }
  })
});

function openSettingPopup(){
  settings.classList.toggle('open')
  settingPopup.classList.toggle('hide')
}

function closePopup(e){
  if(!e.target.closest("div.setting-popup") && !e.target.classList.contains('settings') && settings.classList.contains('open')){
    openSettingPopup()
  }
}

function hideElement(element){
  let clickedItem = document.querySelector(`.${element.name}`)
  if(element.checked){
    clickedItem.style.transition = "all 0.3s ease";
    clickedItem.classList.add('hide')
  } else {
    clickedItem.classList.remove('hide')
  }
}

export { settings }