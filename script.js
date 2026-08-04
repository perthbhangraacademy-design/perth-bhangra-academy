const loader = document.getElementById("loader");
const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const year = document.getElementById("year");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader.classList.add("hidden");
  }, 650);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
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
  {
    threshold: 0.16
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const target = Number(element.dataset.number);
      const duration = 1300;
      const startedAt = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.floor(target * easedProgress).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.6
  }
);

document.querySelectorAll("[data-number]").forEach((counter) => {
  counterObserver.observe(counter);
});

year.textContent = new Date().getFullYear();
