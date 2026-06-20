const hamburger = document.getElementById('hamburgerBtn');
const navLinksList = document.getElementById('navLinks');
const closeBtn = document.getElementById("closeBtn");

/**
 * @description Toggles the navigation menu open and closed, and manages focus for accessibility
 * @returns {void}
 */

function toggleMenu() {
    const isOpen = navLinksList.classList.toggle('nav-container__links--open');

    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        // Move focus to first menu item
        closeBtn.focus();
    }
    if (!isOpen) {
        // Move focus back to hamburger button
        hamburger.focus();
    }
}

hamburger.addEventListener('click', toggleMenu);

closeBtn.addEventListener("click", toggleMenu);

/**
 * @description Closes the menu when Escape key is pressed, and returns focus to hamburger button
 * @param {KeyboardEvent} e - The keyboard event object
 * @returns {void}
 */

navLinksList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu();
        hamburger.focus();
    }
});