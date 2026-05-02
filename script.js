const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector("#navPanel");
const navLinks = document.querySelectorAll(".nav-link");
const bookingForm = document.querySelector("#bookingForm");
const successMessage = document.querySelector("#successMessage");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id], footer[id]");
const fallbackImages = document.querySelectorAll(".js-image");
const workersInfoButton = document.querySelector("#workersInfoButton");
const workersModal = document.querySelector("#workersModal");
const workersModalClose = document.querySelector("#workersModalClose");
const workersModalAction = document.querySelector("#workersModalAction");

function closeMobileMenu() {
  menuToggle.classList.remove("active");
  navPanel.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openWorkersModal() {
  workersModal.hidden = false;
  workersModalClose.focus();
}

function closeWorkersModal() {
  workersModal.hidden = true;
  workersInfoButton.focus();
}

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMobileMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  successMessage.textContent =
    "شكرًا لك! تم استلام طلب الحجز، وسيتواصل معك فريقنا قريبًا عبر واتساب.";
  successMessage.classList.add("show");
  bookingForm.reset();
});

fallbackImages.forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("is-missing");
    image.setAttribute("aria-hidden", "true");
  });
});

workersInfoButton.addEventListener("click", openWorkersModal);
workersModalClose.addEventListener("click", closeWorkersModal);
workersModalAction.addEventListener("click", closeWorkersModal);

workersModal.addEventListener("click", (event) => {
  if (event.target === workersModal) {
    closeWorkersModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !workersModal.hidden) {
    closeWorkersModal();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);

      navLinks.forEach((link) => link.classList.remove("active"));

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));
