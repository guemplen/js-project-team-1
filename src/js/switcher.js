const switchElement = document.querySelector('.switch input');

const enableDark = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled'); // Correct the case here
};

const disableDark = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', 'disabled'); // Correct the case here
};

// Check the initial state from localStorage
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
  enableDark();
  switchElement.checked = true; // Make sure the switch is checked
}
const border = document.querySelector('.hero-small-ph-div');
switchElement.addEventListener('click', () => {
  if (document.body.classList.contains('darkmode')) {
    disableDark();
  } else {
    enableDark();
  }
});
