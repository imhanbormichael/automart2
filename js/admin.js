const API = 'http://localhost:3000';

const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
const token = localStorage.getItem('token');

if (!user || user.role !== 'admin' || !token) {
  window.location.href = 'index.html';
}

async function loadUsers() {
  const status = document.getElementById('admin-status');
  const table = document.getElementById('users-table');

  try {
    const res = await fetch(API + '/admin/users', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!res.ok) {
      status.textContent = 'Access denied. You are not an admin.';
      return;
    }

    const users = await res.json();
    status.textContent = users.length + ' registered users';

    table.innerHTML = users.map((u) => `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td class="${u.role === 'admin' ? 'role-admin' : 'role-user'}">${u.role}</td>
      </tr>
    `).join('');
  } catch (e) {
    status.textContent = 'Backend is not running.';
  }
}

loadUsers();