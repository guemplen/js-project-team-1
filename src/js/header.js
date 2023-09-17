//* MODULE HEADER*//
const modalMenu = document.querySelector('.backdrop');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');

function openModal() {
  modalMenu.style.visibility = 'visible';
  modalMenu.style.left = '0';
}
function closeModal() {
  modalMenu.style.left = '-100%'; // Slide it out to the left
  setTimeout(() => {
    modalMenu.style.visibility = 'hidden';
  }, 800);
}
openMenuBtn.addEventListener('click', openModal);
closeMenuBtn.addEventListener('click', closeModal);

//* HEAD SWITCHER*//
const switchElement = document.querySelector('.switch input');
const siteNavFav = document.querySelector('.site-nav-fav');
const logoLink = document.querySelector('.logo-link');
const cart = document.querySelector('.cart');

// Function to set the switch state in localStorage
function setSwitchState(isChecked) {
  localStorage.setItem('switchState', isChecked ? 'checked' : 'unchecked');
}
function getSwitchState() {
  const state = localStorage.getItem('switchState');
  return state === 'unchecked';
}
switchElement.checked = getSwitchState();

switchElement.addEventListener('change', function () {
  if (this.checked) {
    document.body.style.backgroundColor = '#000';
    cart.style.stroke = '#fff';
    siteNavFav.style.color = '#fff';
    logoLink.style.color = '#fff';
  } else {
    document.body.style.backgroundColor = '#fff';
    cart.style.stroke = '#000';
    siteNavFav.style.color = '#000';
    logoLink.style.color = '#000';
  }
});
//* MODAL SWITCHER*//
const modalSwitchElement = document.querySelector('.modal-switch input');
const burger = document.querySelector('.burger');

function setSwitchState(isChecked) {
  localStorage.setItem('switchState', isChecked ? 'checked' : 'unchecked');
}
function getSwitchState() {
  const state = localStorage.getItem('switchState');
  return state === 'unchecked';
}
modalSwitchElement.checked = getSwitchState();

modalSwitchElement.addEventListener('change', function () {
  if (this.checked) {
    burger.style.stroke = '#fff';

    modalMenu.style.backgroundColor = '#000';
    document.body.style.backgroundColor = '#000';
    cart.style.stroke = '#fff';
    logoLink.style.color = '#fff';
  } else {
    burger.style.stroke = '#000';
    cart.style.stroke = '#000';
    logoLink.style.color = '#000';
    modalMenu.style.backgroundColor = 'var(--green)';
    document.body.style.backgroundColor = '#fff';
  }
});
