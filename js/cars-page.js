import { cars } from './cars.js';

const carsGrid = document.getElementById('cars-grid');
const vehicleCount = document.getElementById('vehicle-count');
const noResults = document.getElementById('no-results');
const activeFiltersContainer = document.getElementById('active-filters');

const filterMake = document.getElementById('filter-make');
const filterYear = document.getElementById('filter-year');
const filterMinPrice = document.getElementById('filter-min-price');
const filterMaxPrice = document.getElementById('filter-max-price');
const filterTransmission = document.getElementById('filter-transmission');
const filterFuel = document.getElementById('filter-fuel');
const clearFiltersBtn = document.getElementById('clear-filters');
const clearAllBtn = document.getElementById('clear-all-btn');

function getPrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
}

function filterCars() {
  const make = filterMake.value;
  const year = filterYear.value;
  const minPrice = filterMinPrice.value ? parseInt(filterMinPrice.value) : 0;
  const maxPrice = filterMaxPrice.value ? parseInt(filterMaxPrice.value) : Infinity;
  const transmission = filterTransmission.value;
  const fuel = filterFuel.value;

  const filtered = cars.filter(car => {
    const carPrice = getPrice(car.price);
    const carYear = car.specs.find(s => s.label === "Year")?.value || "";
    const carTransmission = car.specs.find(s => s.label === "Transmission")?.value || "";
    const carFuel = car.specs.find(s => s.label === "Fuel Type")?.value || "";
    const carMake = car.specs.find(s => s.label === "Make")?.value || "";

    if (make && carMake !== make) return false;
    if (year && carYear !== year) return false;
    if (carPrice < minPrice || carPrice > maxPrice) return false;
    if (transmission && carTransmission !== transmission) return false;
    if (fuel && carFuel !== fuel) return false;

    return true;
  });

  renderCars(filtered);
  updateActiveFilters();
}

function renderCars(list) {
  vehicleCount.textContent = `${list.length} vehicle${list.length !== 1 ? 's' : ''} available`;

  if (list.length === 0) {
    carsGrid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  carsGrid.innerHTML = list.map(car => {
    const year = car.specs.find(s => s.label === "Year")?.value || "";
    const mileage = car.specs.find(s => s.label === "Mileage")?.value || "";
    const fuel = car.specs.find(s => s.label === "Fuel Type")?.value || "";
    const location = car.location.split(',')[0];

    return `
      <a href="car-details.html?id=${car.id}" class="car-card">
        <div class="car-image-container">
          <span class="condition-badge ${car.condition.toLowerCase()}">${car.condition}</span>
          <span class="price-badge">${car.price}</span>
          <img src="${car.image}" alt="${car.title}" class="car-image">
        </div>
        <div class="car-info">
          <h3 class="car-title">${car.title}</h3>
          <div class="car-specs">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              ${year}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <circle cx="12" cy="13" r="8"/>
                <path d="M12 9v4l3 3"/>
              </svg>
              ${mileage}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <path d="M3 7h18M3 17h18M7 3v4M17 3v4M7 17v4M17 17v4"/>
              </svg>
              ${fuel}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              ${location}
            </span>
          </div>
          <button class="view-details-btn">View Details</button>
        </div>
      </a>
    `;
  }).join('');
}

function updateActiveFilters() {
  const chips = [];

  if (filterMake.value) chips.push({ key: 'make', label: `Make: ${filterMake.value}` });
  if (filterYear.value) chips.push({ key: 'year', label: `Year: ${filterYear.value}` });
  if (filterMinPrice.value) chips.push({ key: 'min', label: `Min: $${filterMinPrice.value}` });
  if (filterMaxPrice.value) chips.push({ key: 'max', label: `Max: $${filterMaxPrice.value}` });
  if (filterTransmission.value) chips.push({ key: 'transmission', label: filterTransmission.value });
  if (filterFuel.value) chips.push({ key: 'fuel', label: filterFuel.value });

  activeFiltersContainer.innerHTML = chips.map(chip => `
    <span class="filter-chip">
      ${chip.label}
      <button data-key="${chip.key}">×</button>
    </span>
  `).join('');

  activeFiltersContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (key === 'make') filterMake.value = '';
      if (key === 'year') filterYear.value = '';
      if (key === 'min') filterMinPrice.value = '';
      if (key === 'max') filterMaxPrice.value = '';
      if (key === 'transmission') filterTransmission.value = '';
      if (key === 'fuel') filterFuel.value = '';
      filterCars();
    });
  });
}

function clearAllFilters() {
  filterMake.value = '';
  filterYear.value = '';
  filterMinPrice.value = '';
  filterMaxPrice.value = '';
  filterTransmission.value = '';
  filterFuel.value = '';
  filterCars();
}

[filterMake, filterYear, filterTransmission, filterFuel].forEach(el => {
  if (el) el.addEventListener('change', filterCars);
});

if (filterMinPrice) filterMinPrice.addEventListener('input', filterCars);
if (filterMaxPrice) filterMaxPrice.addEventListener('input', filterCars);
if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearAllFilters);
if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllFilters);

filterCars();

const openFiltersBtn = document.getElementById("open-filters");
const closeFiltersBtn = document.getElementById("close-filters");
const filtersSidebar = document.getElementById("filters-sidebar");
const filtersOverlay = document.getElementById("filters-overlay");

function openMobileFilters() {
  if (!filtersSidebar) return;
  filtersSidebar.classList.add("open");
  if (filtersOverlay) filtersOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileFilters() {
  if (!filtersSidebar) return;
  filtersSidebar.classList.remove("open");
  if (filtersOverlay) filtersOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (openFiltersBtn) {
  openFiltersBtn.addEventListener("click", openMobileFilters);
}

if (closeFiltersBtn) {
  closeFiltersBtn.addEventListener("click", closeMobileFilters);
}

if (filtersOverlay) {
  filtersOverlay.addEventListener("click", closeMobileFilters);
}