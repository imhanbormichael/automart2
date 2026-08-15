const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-menu");

if (toggle && menu) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = menu.classList.toggle("active");
    toggle.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  });

  // Close when clicking outside
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

  // Auto-close when clicking a link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });
}