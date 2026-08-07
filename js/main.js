const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-menu");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();

  const isOpen = menu.classList.toggle("active");
  toggle.classList.toggle("open");

  // Sync accessibility
  toggle.setAttribute("aria-expanded", isOpen);

  // Optional: lock body scroll
  document.body.classList.toggle("no-scroll", isOpen);
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }
  }
});

// Auto-close menu when clicking a link
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
});