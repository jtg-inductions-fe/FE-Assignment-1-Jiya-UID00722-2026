import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const prevButtonNode = wrapperNode.querySelector('.embla__prev')
const nextButtonNode = wrapperNode.querySelector('.embla__next')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

prevButtonNode.addEventListener('click', () => emblaApi.scrollPrev(), false)
nextButtonNode.addEventListener('click', () => emblaApi.scrollNext(), false)

const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const closeBtn = document.getElementById("closeBtn");

/**
 * @description Toggles the navigation menu open and closed, and manages focus for accessibility
 * @returns {void}
 */

function toggleMenu() {
    const isOpen = navMenu.classList.toggle('navigation__menu--open');

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

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu();
        hamburger.focus();
    }
});

/**
 * References the DOM elements used to display platform statistics
 *
 * @type {HTMLElement|null}
 */

const packagesCount = document.getElementById("packages-count");

/**
 * References the DOM element used to display the total number of hotels
 *
 * @type {HTMLElement|null}
 */

const hotelsCount = document.getElementById("hotels-count");

/**
 * References the DOM element used to display the total number of airlines
 *
 * @type {HTMLElement|null}
 */

const airlinesCount = document.getElementById("airlines-count");

/**
 * References the DOM element used to display the total number of customers
 *
 * @type {HTMLElement|null}
 */

const customersCount = document.getElementById("customers-count");

/**
 * Updates the statistics counters with the latest values
 *
 * @description
 * Sets the counts for packages, hotels, airlines, and customers
 *
 * @returns {void}
 */

packagesCount.innerText = "500+";
hotelsCount.innerText = "100";
airlinesCount.innerText = "7";
customersCount.innerText = "2k+";
