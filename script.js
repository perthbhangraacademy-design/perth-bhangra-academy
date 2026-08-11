const pageLoader = document.getElementById("pageLoader");
const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");

function hidePageLoader() {
  if (pageLoader) {
    pageLoader.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", hidePageLoader);

/* Backup so the loader can never get stuck */
window.setTimeout(hidePageLoader, 1800);

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
/* =========================
   PBA GALLERY LIGHTBOX
   ========================= */

document.addEventListener('DOMContentLoaded', function () {

  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeButton = document.getElementById('lightboxClose');
  const prevButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');
  const counter = document.getElementById('lightboxCounter');

  if (!galleryItems.length || !lightbox || !lightboxImage) {
    return;
  }

  let currentIndex = 0;

  function showImage(index) {

    if (index < 0) {
      index = galleryItems.length - 1;
    }

    if (index >= galleryItems.length) {
      index = 0;
    }

    currentIndex = index;

    const image = galleryItems[currentIndex].querySelector('img');

    if (!image) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (counter) {
      counter.textContent =
        (currentIndex + 1) + ' / ' + galleryItems.length;
    }
  }


  function openLightbox(index) {

    showImage(index);

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }


  function closeLightbox() {

    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  }


  galleryItems.forEach(function (item, index) {

    item.addEventListener('click', function () {
      openLightbox(index);
    });

  });


  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }


  if (prevButton) {
    prevButton.addEventListener('click', function () {
      showImage(currentIndex - 1);
    });
  }


  if (nextButton) {
    nextButton.addEventListener('click', function () {
      showImage(currentIndex + 1);
    });
  }


  /* Close when clicking dark background */

  lightbox.addEventListener('click', function (event) {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  /* Keyboard controls */

  document.addEventListener('keydown', function (event) {

    if (!lightbox.classList.contains('open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    }

  });


  /* Mobile swipe */

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    'touchstart',
    function (event) {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  lightbox.addEventListener(
    'touchend',
    function (event) {

      touchEndX =
        event.changedTouches[0].screenX;

      const swipeDistance =
        touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 50) {
        return;
      }

      if (swipeDistance > 0) {
        showImage(currentIndex - 1);
      } else {
        showImage(currentIndex + 1);
      }

    },
    { passive: true }
  );

});
/* =========================
   COACH PROFILE TOGGLES
   ========================= */

document.addEventListener('click', function (event) {

  const button = event.target.closest('.coach-profile-button');

  if (!button) return;

  const profile = button.nextElementSibling;

  if (!profile || !profile.classList.contains('coach-full-profile')) {
    return;
  }

  const isOpen = profile.classList.toggle('open');

  button.setAttribute(
    'aria-expanded',
    isOpen ? 'true' : 'false'
  );

  button.textContent = isOpen
    ? 'Close Full Profile ↑'
    : 'View Full Profile ↓';

});
