
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

const themeToggle = document.getElementById('theme-toggle-input');
themeToggle.addEventListener('change', toggleTheme); 
 
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light'); 
}
