const loginTab = document.getElementById('tab-login');
const signupTab = document.getElementById('tab-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const errorBox = document.getElementById('auth-error');

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add('show');
}

function clearError() {
  errorBox.classList.remove('show');
  errorBox.textContent = '';
}

function showLogin() {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
  clearError();
}

function showSignup() {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
  clearError();
}

loginTab.addEventListener('click', showLogin);
signupTab.addEventListener('click', showSignup);

if (window.location.pathname.includes('signup')) {
  showSignup();
}

document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const hidden = input.type === 'password';
    input.type = hidden ? 'text' : 'password';
    btn.innerHTML = hidden
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.87 2.93-5.17 5.31-6.61"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/><path d="M10.73 5.08A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8a11.6 11.6 0 0 1-2.16 3.19"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });
});

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (password !== confirm) {
    showError('Passwords do not match');
    return;
  }

  const users = getUsers();
  if (users.some(user => user.email === email)) {
    showError('An account with this email already exists');
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);
  localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  window.location.href = 'index.html';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const users = getUsers();
  const user = users.find(item => item.email === email && item.password === password);

  if (!user) {
    showError('Invalid email or password');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
  window.location.href = 'index.html';
});