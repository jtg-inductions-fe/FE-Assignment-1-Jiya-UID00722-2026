function toggleMenu() {
    const navLinksList = document.querySelector('.nav__links');
    navLinksList.classList.toggle('nav__links-list--open');
    
}

const hamburger = document.querySelector('.nav__hamburger');
hamburger.addEventListener('click', toggleMenu);