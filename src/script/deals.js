const modal1 = document.getElementById('modal1');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');

const openModal = document.getElementById('openModal');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const closeBtns = document.querySelectorAll('.closeBtn');

const loading = document.getElementById('loading');
const content = document.getElementById('content');

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin');

const unlockedContainer = document.querySelector(
    '.special-deals__unlocked-cards',
);

const countBadge = document.querySelector('.special-deals__count');

const messageText = document.querySelector('.special-deals__message');

const resultCardContainer = document.querySelector(
    '.special-deals__result-card',
);

const loadingText = document.querySelector('.special-deals__loading-text');

const API_URL =
    'https://gist.githubusercontent.com/ameer-wajid-ali/1f29ebee4295cede36f8d74b45e576df/raw/122966c9a123861249f173911d8d93a76dc06d7a/';

let rotation = 0;

let availableDeals = [];
let wheelDeals = [];
let unlockedDeals = [];

let apiFailed = false;


// MODAL

function showModal(modal) {
    modal.classList.add('special-deals__modal--active');
}

function hideModal(modal) {
    modal.classList.remove('special-deals__modal--active');
}

openModal?.addEventListener('click', (e) => {
    e.preventDefault();

    showModal(modal1);

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
});

nextBtn?.addEventListener('click', () => {
    screen1.classList.add('special-deals__hidden');

    screen2.classList.remove('special-deals__hidden');

    renderUnlockedDeals();
});

prevBtn?.addEventListener('click', () => {
    screen2.classList.add('special-deals__hidden');

    screen1.classList.remove('special-deals__hidden');
});

closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        hideModal(modal1);

        screen2.classList.add('special-deals__hidden');

        screen1.classList.remove('special-deals__hidden');

        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    });
});


// LOADING

function setLoading(isLoading) {
    console.log('setLoading:', isLoading);
    if (isLoading) {
        loading.classList.remove('special-deals__wheel-container--hidden');

        content.classList.add('special-deals__wheel--hidden');
    } else {
        loading.classList.add('special-deals__wheel-container--hidden');

        content.classList.remove('special-deals__wheel--hidden');
    }

    console.log('loading classes:', loading.className);
    console.log('content classes:', content.className);
}

// INITIAL LOAD

document.addEventListener('DOMContentLoaded', async () => {
    setLoading(true);

    loadLocalData();

    updateBadge();

    if (!availableDeals.length && !unlockedDeals.length) {
        await fetchDeals();
    } else {
        setLoading(false);
    }

    initializeWheel();
});

// FETCH API ONLY ONCE

async function fetchDeals() {
    setLoading(true);

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API Error ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.length) {
            showEmptyState('No special deals available currently');

            return;
        }

        availableDeals = data;

        localStorage.setItem('availableDeals', JSON.stringify(availableDeals));

        apiFailed = false;
    } catch (error) {
        apiFailed = true;

        showEmptyState('Unable to load deals, Please try again later');

        return;
    } finally {
        if (!apiFailed) {
            setLoading(false);
        }
    }
}

// LOCAL STORAGE

function loadLocalData() {
    availableDeals = JSON.parse(localStorage.getItem('availableDeals')) || [];

    unlockedDeals = JSON.parse(localStorage.getItem('unlockedDeals')) || [];
}

function saveData() {
    localStorage.setItem('availableDeals', JSON.stringify(availableDeals));

    localStorage.setItem('unlockedDeals', JSON.stringify(unlockedDeals));
}

// CREATE WHEEL

function initializeWheel() {
    wheel.innerHTML = '';

    // Clear previous animation
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';

    rotation = 0;

    // Force browser repaint
    wheel.offsetHeight;

    // Restore transition
    wheel.style.transition = 'transform 5s ease-out';

    // remove previous winning card
    if (resultCardContainer) {
        resultCardContainer.innerHTML = '';
    }

    if (messageText) {
        messageText.textContent = '';
    }

    if (apiFailed) {
        return;
    }

    if (!availableDeals.length) {
        handleCompletedState();
        return;
    }

    let deals = getRandomDeals(availableDeals, 4);

    // Fill remaining slots with Try Again
    while (deals.length < 4) {
        deals.push({
            label: 'Try Again',
            isTryAgain: true,
        });
    }

    wheelDeals = deals;

    createWheelSegments();
}

function getRandomDeals(array, count) {
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
}

// DRAW WHEEL

function createWheelSegments() {
    const segment = 360 / wheelDeals.length;

    wheelDeals.forEach((deal, index) => {
        const label = document.createElement('div');

        label.className = 'special-deals__label';

        label.textContent = deal.label;

        wheel.appendChild(label);
    });
}

// SPIN

spinBtn.addEventListener('click', () => {
    if (!wheelDeals.length) return;

    spinBtn.disabled = true;

    const winnerIndex = Math.floor(Math.random() * wheelDeals.length);

    const winner = wheelDeals[winnerIndex];

    const segmentAngle = 360 / wheelDeals.length;

    rotation +=
        5 * 360 + (360 - (winnerIndex * segmentAngle + segmentAngle / 2));

    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        // Try Again case
        if (winner.isTryAgain) {
            messageText.textContent = 'Oops! Try Again';

            spinBtn.disabled = false;

            setTimeout(() => {
                initializeWheel();
            }, 5000);
            return;
        }

        unlockDeal(winner);

        spinBtn.disabled = false;
    }, 5000);
});

// UNLOCK DEAL

function unlockDeal(deal) {
    if (deal.isTryAgain) {
        return;
    }

    const expiry = new Date();

    const validityDays = deal.validFor ?? 7;

    expiry.setDate(expiry.getDate() + validityDays);

    const unlocked = {
        ...deal,

        unlockedAt: new Date().toISOString(),

        expiry: expiry.toISOString(),
    };

    unlockedDeals.push(unlocked);

    availableDeals = availableDeals.filter(
        (item) => item.promoCode !== deal.promoCode,
    );

    saveData();

    showWinningDeal(unlocked);

    updateBadge();

    setTimeout(() => {
        initializeWheel();
    }, 5000);
}

// RESULT

function showWinningDeal(deal) {
    const card = document.createElement('div');

    card.className = 'special-deals__card';

    card.innerHTML = `
        <div class="special-deals__card-left">

            <p class="special-deals__discount">
                ${deal.label}
            </p>

            <p class="special-deals__expiry">
                ${getRemainingTime(deal.expiry)}
            </p>

        </div>


        <div class="special-deals__card-right">

            <div class="special-deals__coupon-code">
                ${deal.promoCode}
            </div>


            <button class="special-deals__copy-button">
                <i class="far fa-clone"></i>
            </button>

        </div>
    `;

    // remove previous result card
    resultCardContainer.innerHTML = '';

    // add new result card
    resultCardContainer.appendChild(card);

    // update message
    document.querySelector('.special-deals__message').textContent = 'You won!';
}

// EXPIRY

function getRemainingTime(date) {
    const diff = new Date(date) - new Date();

    if (diff <= 0) return 'Expired';

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return `Expires in ${days}d`;
}

// UNLOCKED DEALS

function renderUnlockedDeals() {
    unlockedContainer.innerHTML = '';

    const sorted = [...unlockedDeals].sort(
        (a, b) => new Date(a.expiry) - new Date(b.expiry),
    );

    sorted.forEach((deal) => {
        const expired = new Date(deal.expiry) < new Date();

        unlockedContainer.innerHTML += `

            <div class="
            special-deals__card
            ${expired ? 'special-deals__card--expired' : ''}">


            <div class="special-deals__card-left">

            <p class="special-deals__discount">
            ${deal.label}
            </p>


            <p class="special-deals__expiry">
            ${expired ? 'Expired' : getRemainingTime(deal.expiry)}
            </p>


            </div>


            <div class="special-deals__card-right">

            <div class="special-deals__coupon-code">
            ${deal.promoCode}
            </div>

            </div>


            </div>

            `;
    });
}

// BADGE

function updateBadge() {
    countBadge.textContent = unlockedDeals.length;
}

// STATES

function handleCompletedState() {
    setLoading(true);
    loadingText.textContent = 'All deals unlocked';
    spinBtn.disabled = true;
}

function showEmptyState(message) {
    wheel.innerHTML = `
    <p class="special-deals__error">
    ${message}
    </p>
    `;
}
