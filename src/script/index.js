/**
 * Initializes the Embla carousel and configures navigation controls
 *
 */

import EmblaCarousel from 'embla-carousel'

/**
 * The main carousel wrapper element
 *
 * @type {HTMLElement|null}
 */

const wrapperNode = document.querySelector('.embla');

/**
 * The carousel viewport element where slides are displayed
 *
 * @type {HTMLElement|null}
 */

const viewportNode = wrapperNode.querySelector('.embla__viewport');

/**
 * The previous slide navigation button
 *
 * @type {HTMLElement|null}
 */

const prevButtonNode = wrapperNode.querySelector('.embla__prev');

/**
 * The next slide navigation button
 *
 * @type {HTMLElement|null}
 */

const nextButtonNode = wrapperNode.querySelector('.embla__next');

/**
 * Embla carousel instance
 *
 * @type {Object}
 */

const emblaApi = EmblaCarousel(viewportNode, { loop: true });

/**
 * Navigates to the previous carousel slide when clicked
 *
 * @event click
 */

prevButtonNode.addEventListener('click', () => emblaApi.scrollPrev(), false);

/**
 * Navigates to the next carousel slide when clicked
 *
 * @event click
 */

nextButtonNode.addEventListener('click', () => emblaApi.scrollNext(), false);

/**
 * Adds pagination dot buttons to the carousel and manages their active state
 *
 * @param {Object} emblaApi - Embla carousel API instance
 * @param {HTMLElement} dotsNode - Container element for pagination dots
 *
 * @returns {void}
 */

export const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {

  /**
   * Collection of generated dot button elements
   *
   * @type {HTMLElement[]}
   */

  let dotNodes = [];

  /**
  * Creates pagination dot buttons and assigns click handlers
  *
  * @returns {void}
  */

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('');

    /**
   * Scrolls carousel to the selected slide
   *
   * @param {number} index - Target slide index
   *
   * @returns {void}
   */

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  /**
   * Updates the active pagination dot based on the current carousel slide
   *
   * @returns {void}
   */

  const toggleDotButtonsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove('embla__dot--selected');
    dotNodes[selected].classList.add('embla__dot--selected');
  }

  addDotBtnsWithClickHandlers();
  toggleDotButtonsActive();

  /**
  * Updates pagination state when the carousel is reinitialized
  * or when the active slide changes
  */

  emblaApi
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('reInit', toggleDotButtonsActive)
    .on('select', toggleDotButtonsActive)
}

/**
 * Container element for carousel pagination dots
 *
 * @type {HTMLElement|null}
 */

const dotsNode = document.querySelector('.embla__dots');

/**
 * Initializes carousel pagination controls
 */

addDotButtonAndClickHandlers(emblaApi, dotsNode);

// Logic for Hamburger

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
