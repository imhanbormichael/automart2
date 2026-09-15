import { getDbCars } from './cars.js';

const API = 'http://localhost:3000';
const grid = document.getElementById('listings-grid');
const count = document.getElementById('listings-count');

let user = null;
try {
  user = JSON.parse(localStorage.getItem('currentUser') || 'null');
} catch (e) {
  user = null;
}

if (!user) {
  window.location.href = 'login.html';
}

async function loadMine() {
  const cars = await getDbCars();
  const mine = cars.filter((car) => car.seller.email === user.email);

  count.textContent = mine.length + (mine.length === 1 ? ' car posted' : ' cars posted');

  if (mine.length === 0) {
    grid.innerHTML = '<p>You have not posted any cars yet.</p>';
    return;
  }

  grid.innerHTML = mine.map((car) => {
    const dbId = String(car.id).replace('db-', '');
    return `
      <div class="car-card">
        <a href="car-details.html?id=${car.id}" style="text-decoration:none;color:inherit;">
          <div class="car-image-container">
            <span class="condition-badge ${String(car.condition).toLowerCase()}">${car.condition}</span>
            <span class="price-badge">${car.price}</span>
            <img src="${car.image}" alt="${car.title}" class="car-image">
          </div>
          <div class="car-info">
            <h3 class="car-title">${car.title}</h3>
            <p>${car.location}</p>
          </div>
        </a>
        <div class="car-info" style="padding-top:0;">
          <button class="delete-btn" data-id="${dbId}">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this car?')) return;
      await fetch(API + '/cars/' + btn.dataset.id, { method: 'DELETE' });
      loadMine();
    });
  });
}

loadMine();