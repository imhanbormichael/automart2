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

(function showLoggedInUser() {
  const auth = document.querySelector('.auth');
  const mobileAuth = document.querySelector('.mobile-auth');
  if (!auth) return;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch (e) {
    user = null;
  }

  const loginLinks = document.querySelectorAll('.auth .login, .mobile-auth .login');
  const signupLinks = document.querySelectorAll('.auth .signup, .mobile-auth .signup');
  loginLinks.forEach((a) => (a.href = 'login.html'));
  signupLinks.forEach((a) => (a.href = 'login.html'));

  if (!user || !user.name) return;

  const firstLetter = user.name.charAt(0).toUpperCase();

  auth.innerHTML = `
    <div class="user-chip">
      <span class="user-avatar">${firstLetter}</span>
      <span class="user-name">${user.name}</span>
    </div>
    <a href="#" class="logout">Logout</a>
  `;

  if (mobileAuth) {
    mobileAuth.innerHTML = `
      <div class="user-chip">
        <span class="user-avatar">${firstLetter}</span>
        <span class="user-name">${user.name}</span>
      </div>
      <a href="#" class="logout">Logout</a>
    `;
  }

  document.querySelectorAll('.logout').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    });
  });
})();