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
