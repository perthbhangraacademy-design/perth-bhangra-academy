const pageLoader = document.getElementById("pageLoader");
const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    pageLoader.classList.add("hidden");
  }, 650);
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 25);
});

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
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

document.querySelectorAll(".reveal-scroll").forEach((element) => {
  revealObserver.observe(element);
});

year.textContent = new Date().getFullYear();
