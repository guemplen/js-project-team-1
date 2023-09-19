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
