//* MODULE HEADER*//
const modalMenu = document.querySelector('.backdrop');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');

function openModal() {
  modalMenu.style.visibility = 'visible';
  modalMenu.style.left = '0';
}
function closeModal() {
  modalMenu.style.left = '-100%';
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

function saveSwitcherState() {
  localStorage.setItem('switcherState', switchElement.checked);
}
function loadSwitcherState() {
  const switcherState = localStorage.getItem('switcherState') === 'true';
  switchElement.checked = switcherState;

  applySwitcherState();
}
function applySwitcherState() {
  if (switchElement.checked) {
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
}

switchElement.addEventListener('change', function () {
  applySwitcherState();
  saveSwitcherState();
});

loadSwitcherState();

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

function saveModalSwitcherState() {
  localStorage.setItem('switcherState', modalSwitchElement.checked);
}
function loadModalSwitcherState() {
  const switcherState = localStorage.getItem('switcherState') === 'true';
  modalSwitchElement.checked = switcherState;
  applyModalSwitcherState();
}
function applyModalSwitcherState() {
  if (modalSwitchElement.checked) {
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
}
modalSwitchElement.addEventListener('change', function () {
  applyModalSwitcherState();
  saveModalSwitcherState();
});

loadModalSwitcherState();

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
