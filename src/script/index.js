const hamburger = document.getElementById('hamburgerBtn');
const navLinksList = document.getElementById('navLinks');
const menuLinks = navLinksList.querySelectorAll('a');

function toggleMenu() {
    const isOpen = navLinksList.classList.toggle('nav-container__links--open');

    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        // Move focus to first menu item
        menuLinks[0].focus();
    }
}

hamburger.addEventListener('click', toggleMenu);

navLinksList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu();
        hamburger.focus();
    }
});