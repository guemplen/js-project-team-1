//* MODULE HEADER*//

const modalMenu = document.querySelector('.backdrop-burger');
const openMenuBtn = document.querySelector('.js-open-menu-burger');
const closeMenuBtn = document.querySelector('.js-close-menu');

function openModal() {
  modalMenu.style.visibility = 'visible';
  modalMenu.style.left = '0';
  document.body.classList.add('body-no-scroll');
}
function closeModal() {
  modalMenu.style.left = '-100%';
  setTimeout(() => {
    modalMenu.style.visibility = 'hidden';
  }, 800);
  document.body.classList.remove('body-no-scroll');
}
openMenuBtn.addEventListener('click', openModal);
closeMenuBtn.addEventListener('click', closeModal);
