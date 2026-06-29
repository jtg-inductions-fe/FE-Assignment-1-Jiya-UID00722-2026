import EmblaCarousel from 'embla-carousel'

/**
 * Adds pagination dot buttons to the carousel and manages their active state
 *
 * @param {Object} emblaApi - Embla carousel API instance
 * @param {HTMLElement} dotsNode - Container element for pagination dots
 */
export const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = []

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index) => {
      emblaApi.scrollTo(index)
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))

    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotButtonsActive = () => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()

    dotNodes[previous]?.classList.remove('embla__dot--selected')
    dotNodes[selected]?.classList.add('embla__dot--selected')
  }

  addDotBtnsWithClickHandlers()
  toggleDotButtonsActive()

  emblaApi
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('reInit', toggleDotButtonsActive)
    .on('select', toggleDotButtonsActive)
}

/**
 * Initializes a single Embla carousel
 *
 * @param {HTMLElement} wrapperNode - The carousel wrapper element
 * @returns {Object} Embla API instance
 */
const initEmbla = (wrapperNode) => {
  const viewportNode = wrapperNode.querySelector('.embla__viewport')
  const prevButtonNode = wrapperNode.querySelector('.embla__prev')
  const nextButtonNode = wrapperNode.querySelector('.embla__next')
  const dotsNode = wrapperNode.querySelector('.embla__dots')

  const emblaApi = EmblaCarousel(viewportNode, {
    loop: true
  })

  prevButtonNode?.addEventListener('click', () => emblaApi.scrollPrev(), false)
  nextButtonNode?.addEventListener('click', () => emblaApi.scrollNext(), false)

  if (dotsNode) {
    addDotButtonAndClickHandlers(emblaApi, dotsNode)
  }

  return emblaApi
}

/**
 * Initialize all Embla carousels on the page
 */
document.querySelectorAll('.embla').forEach(initEmbla)

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

  navMenu.hidden = !isOpen;

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

/**
 * Footer accordion functionality
 *
 * Adds click event listeners to each footer accordion heading,
 * allowing users to expand or collapse the associated content panel
 *
 * When an accordion is opened, its content panel's maximum height is
 * set to its scroll height to enable a smooth CSS transition. Clicking
 * the heading again collapses the panel
 */

/**
 * Collection of accordion toggle elements
 *
 * @type {HTMLCollectionOf<Element>}
 */

const acc = document.querySelectorAll(".footer__links-title");

acc.forEach(button => {
  button.addEventListener("click", () => {
    const isOpen = button.classList.toggle("footer__links-title--active");

    const panel = button.nextElementSibling;

    button.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
    panel.classList.toggle("footer__links-list--open", isOpen);
  });
});