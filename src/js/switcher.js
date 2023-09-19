const switchElement = document.querySelector('.switch input');

const enableDark = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled'); 
};

const disableDark = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', 'disabled'); 
};


const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
  enableDark();
  switchElement.checked = true; 
}
const border = document.querySelector('.hero-small-ph-div');
switchElement.addEventListener('click', () => {
  if (document.body.classList.contains('darkmode')) {
    disableDark();
  } else {
    enableDark();
  }
});
// *
const switchModalElement = document.querySelector('.modal-switch input');

const enableModalDark = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled'); // Correct the case here
};

const disableModalDark = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', 'disabled'); // Correct the case here
};

// Check the initial state from localStorage
const darkModeModal = localStorage.getItem('darkMode');
if (darkModeModal === 'enabled') {
  enableModalDark();
  switchModalElement.checked = true; // Make sure the switch is checked
}
const borderModal = document.querySelector('.hero-small-ph-div');
switchModalElement.addEventListener('click', () => {
  if (document.body.classList.contains('darkmode')) {
    disableModalDark();
  } else {
    enableModalDark();
  }
});
