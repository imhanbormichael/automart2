const API = 'http://localhost:3000';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const tabs = document.querySelectorAll('.auth-tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    if (tab.dataset.tab === 'login') {
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
    } else {
      if (loginForm) loginForm.style.display = 'none';
      if (signupForm) signupForm.style.display = 'block';
    }
  });
});

document.querySelectorAll('.toggle-pass').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = signupForm.querySelector('[name="name"], #name')?.value?.trim();
    const email = signupForm.querySelector('[name="email"], #signup-email')?.value?.trim();
    const password = signupForm.querySelector('[name="password"], #signup-password')?.value;
    const confirm = signupForm.querySelector('[name="confirm"], #confirm-password')?.value;

    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    if (confirm && password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(API + '/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Signup failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      alert('Account created');
      window.location.href = 'index.html';
    } catch (err) {
      alert('Backend is not running. Keep npm run start:dev open.');
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('[name="email"], #email, #login-email')?.value?.trim();
    const password = loginForm.querySelector('[name="password"], #password, #login-password')?.value;

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } catch (err) {
      alert('Backend is not running. Keep npm run start:dev open.');
    }
  });
}