const modal1 = document.getElementById("modal1");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const openModal = document.getElementById("openModal");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const closeBtns = document.querySelectorAll(".closeBtn");

const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
    navMenu.classList.remove('navigation__menu--open');
    navMenu.hidden = true;
    hamburger.setAttribute('aria-expanded', false);
}

// Open first modal
openModal.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page reload
    if (navMenu.classList.contains('navigation__menu--open')) closeMenu();
    modal1.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
});

// Go to second modal
nextBtn.addEventListener("click", () => {
    screen1.classList.add("special-deals__hidden");
    screen2.classList.remove("special-deals__hidden");
});

// Go back to first modal
prevBtn.addEventListener("click", () => {
    screen2.classList.add("special-deals__hidden");
    screen1.classList.remove("special-deals__hidden");
});

// Close any open modal
closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        modal1.close();

        screen2.classList.add("special-deals__hidden");
        screen1.classList.remove("special-deals__hidden");

        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    });
});

modal1.addEventListener("close", () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
});

modal1.addEventListener("click", (e) => {
  if (e.target === modal1) modal1.close();
});

const loading = document.getElementById("loading");
const content = document.getElementById("content");

function setLoading(isLoading) {
    loading.classList.toggle("wheel__container--hidden", !isLoading);
    content.classList.toggle("wheel--hidden", isLoading);
}

// Show loading
setLoading(false);

// setTimeout(() => {
//   setLoading(false);
// }, 2000);


const wheel = document.getElementById("wheel");
const button = document.getElementById("spin");

const prizes = [
    "20% Off Flights",
    "Free Hotel Nights",
    "VIP Lounge Access",
    "50% Off Package"
];

prizes.forEach((prize, index) => {
    const angle = (360 / prizes.length) * index + (360 / prizes.length) / 2;

    const label = document.createElement("div");
    label.className = "wheel__label";
    label.textContent = prize;

    wheel.appendChild(label);
});

let rotation = 0;

button.addEventListener("click", () => {

    button.disabled = true;

    const randomIndex = Math.floor(Math.random() * prizes.length);

    const segmentAngle = 360 / prizes.length;

    const extraSpins = 5 * 360;

    rotation += extraSpins + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        alert("You won: " + prizes[randomIndex]);
        button.disabled = false;
    }, 5000);

});