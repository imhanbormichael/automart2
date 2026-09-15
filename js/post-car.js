const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (!loggedInUser || !loggedInUser.email) {
  window.location.href = 'login.html';
}

const API = 'http://localhost:3000';
const form = document.getElementById('post-car-form');
const photoInput = document.getElementById('car-photos');
const preview = document.getElementById('photo-preview');
const yearSelect = document.getElementById('car-year');
const toast = document.getElementById('toast');

let uploadedImages = [];

for (let year = 2026; year >= 1995; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

function showToast(message) {
  toast.textContent = '⚠  ' + message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

photoInput.addEventListener('change', () => {
  const files = Array.from(photoInput.files || []);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImages.push(reader.result);
      const img = document.createElement('img');
      img.src = reader.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('car-title').value.trim();
  const description = document.getElementById('car-description').value.trim();
  const price = document.getElementById('car-price').value;
  const year = document.getElementById('car-year').value;
  const make = document.getElementById('car-make').value;
  const model = document.getElementById('car-model').value.trim();
  const mileage = document.getElementById('car-mileage').value;
  const transmission = document.getElementById('car-transmission').value;
  const fuel = document.getElementById('car-fuel').value;
  const location = document.getElementById('car-location').value.trim();

  if (!title || !description || !price || !year || !make || !model || !mileage || !transmission || !fuel || !location) {
    showToast('Please fill in all fields');
    return;
  }

  if (uploadedImages.length === 0) {
    showToast('Please upload at least one image');
    return;
  }

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch (err) {
    user = null;
  }

  const payload = {
    title,
    make,
    model,
    year: Number(year),
    price: Number(price),
    mileage: String(mileage),
    fuel,
    transmission,
    condition: Number(mileage) < 1000 ? 'New' : 'Used',
    location,
    description,
    image: uploadedImages[0],
    sellerName: user?.name || 'You',
    sellerPhone: user?.phone || '+1 555-0000',
    sellerEmail: user?.email || 'you@automart.com',
  };

  try {
    const res = await fetch(API + '/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      showToast('Could not save car to database');
      return;
    }
  } catch (err) {
    showToast('Backend is not running');
    return;
  }

  window.location.href = 'cars.html';
});