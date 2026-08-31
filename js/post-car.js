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
  files.forEach(file => {
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

form.addEventListener('submit', (e) => {
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

  const priceNumber = parseInt(price, 10);
  const mileageNumber = parseInt(mileage, 10);
  const formattedPrice = '$' + priceNumber.toLocaleString();
  const formattedMileage = mileageNumber.toLocaleString() + ' mi';

  const newCar = {
    id: Date.now(),
    title,
    price: formattedPrice,
    location,
    image: uploadedImages[0],
    condition: mileageNumber < 1000 ? 'New' : 'Used',
    description,
    specs: [
      { label: 'Make', value: make },
      { label: 'Model', value: model },
      { label: 'Year', value: year },
      { label: 'Mileage', value: formattedMileage },
      { label: 'Transmission', value: transmission },
      { label: 'Fuel Type', value: fuel }
    ],
    images: uploadedImages,
    seller: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      memberSince: '2026',
      email: 'you@automart.com',
      phone: '+1 555-0000'
    }
  };

  const posted = JSON.parse(localStorage.getItem('postedCars') || '[]');
  posted.unshift(newCar);
  localStorage.setItem('postedCars', JSON.stringify(posted));

  window.location.href = 'cars.html';
});