const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

const openModal = document.getElementById("openModal");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const closeBtns = document.querySelectorAll(".closeBtn");

function showModal(modal) {
    modal.classList.add("special-deals__modal--active");
}

function hideModal(modal) {
    modal.classList.remove("special-deals__modal--active");
}

// Open first modal
openModal.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("clicked");
    showModal(modal1);
});

// Go to second modal
nextBtn.addEventListener("click", () => {
    hideModal(modal1);
    showModal(modal2);
});

// Go back to first modal
prevBtn.addEventListener("click", () => {
    hideModal(modal2);
    showModal(modal1);
});

// Close any open modal
closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        hideModal(modal1);
        hideModal(modal2);
    });
});