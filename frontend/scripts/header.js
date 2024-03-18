const openNavBtn = document.getElementById('open-nav-btn');
const closeNavBtn = document.getElementById('close-nav-btn');
const navLinks = document.getElementById('nav-links');





openNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'block';
    navLinks.style.display = 'flex';
});

closeNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'block';
    closeNavBtn.style.display = 'none';
    navLinks.style.display = 'none';
});