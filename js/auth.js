const API = 'http://localhost:3000';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const tabs = document.querySelectorAll('.auth-tab');

function showTab(which) {
  const showLogin = which === 'login';

  tabs.forEach((t) => {
    const name = (t.dataset.tab || t.textContent).toLowerCase().trim();
    t.classList.toggle('active', name.includes(showLogin ? 'login' : 'sign'));
  });

  if (loginForm) loginForm.style.display = showLogin ? 'block' : 'none';
  if (signupForm) signupForm.style.display = showLogin ? 'none' : 'block';
}

function getFormValues(form) {
  const inputs = [...form.querySelectorAll('input')].filter((i) =>
    ['text', 'email', 'password'].includes(i.type)
  );

  const emailInput =
    inputs.find((i) => i.type === 'email' || (i.value && i.value.includes('@'))) ||
    inputs.find((i) => i.type === 'text' && i !== inputs[0]) ||
    inputs[1];

  const passwordInput =
    inputs.find((i) => i.type === 'password') ||
    inputs[inputs.length - 1];

  const nameInput = inputs.find((i) => i !== emailInput && i !== passwordInput);

  return {
    name: nameInput?.value.trim() || '',
    email: emailInput?.value.trim() || '',
    password: passwordInput?.value || '',
    confirm: inputs.filter((i) => i.type === 'password')[1]?.value || '',
  };
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const name = (tab.dataset.tab || tab.textContent).toLowerCase().trim();
    showTab(name.includes('login') ? 'login' : 'signup');
  });
});

showTab('login');

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
    const { name, email, password, confirm } = getFormValues(signupForm);

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
      window.location.href = 'index.html';
    } catch (err) {
      alert('Backend is not running. Keep npm run start:dev open.');
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { email, password } = getFormValues(loginForm);

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