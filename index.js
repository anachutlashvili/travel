"use strict";

let favorites = readStorage("travelgo_favorites", []);
let trips = readStorage("travelgo_trips", []);
let cart = readStorage("travelgo_cart", []);

let activeDestination = null;
let galleryIndex = 0;
let galleryTimer = null;
let slideIndex = 0;

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    price: 850,
    days: 5,
    category: "Europe",
    rating: 4.8,
    description: "აღმოაჩინე პარიზის ბულვარები, მუზეუმები, კაფეები და ეიფელის კოშკის დაუვიწყარი ხედები.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 2,
    name: "Rome",
    country: "Italy",
    price: 780,
    days: 4,
    category: "Europe",
    rating: 4.9,
    description: "რომში ანტიკური ისტორია, გამორჩეული არქიტექტურა და იტალიური სამზარეულო გელოდება.",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 3,
    name: "Prague",
    country: "Czechia",
    price: 620,
    days: 4,
    category: "Europe",
    rating: 4.7,
    description: "მოინახულე პრაღის ძველი ქალაქი, კარლის ხიდი და ზღაპრული ციხესიმაგრე.",
    images: [
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 4,
    name: "Santorini",
    country: "Greece",
    price: 1100,
    days: 6,
    category: "Europe",
    rating: 4.9,
    description: "თეთრი სახლები, ლურჯი გუმბათები და ეგეოსის ზღვის მზის ჩასვლა.",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 5,
    name: "Tbilisi",
    country: "Georgia",
    price: 420,
    days: 3,
    category: "Europe",
    rating: 4.8,
    description: "ძველი თბილისის აივნები, აბანოთუბანი, ქართული სამზარეულო და თბილი სტუმართმოყვარეობა.",
    images: [
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 6,
    name: "Tokyo",
    country: "Japan",
    price: 1450,
    days: 7,
    category: "Asia",
    rating: 4.9,
    description: "ტოკიოში თანამედროვე ტექნოლოგიები, ტრადიციული ტაძრები და საოცარი ქუჩის ცხოვრება ერთმანეთს ხვდება.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4de8232b7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 7,
    name: "Bangkok",
    country: "Thailand",
    price: 980,
    days: 6,
    category: "Asia",
    rating: 4.6,
    description: "ოქროს ტაძრები, მცურავი ბაზრები და ტაილანდური არომატები ბანგკოკში გელოდება.",
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 8,
    name: "Bali",
    country: "Indonesia",
    price: 1250,
    days: 7,
    category: "Asia",
    rating: 4.8,
    description: "ტროპიკული პლაჟები, მწვანე ბრინჯის ტერასები და მშვიდი კუნძულის რიტმი.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 9,
    name: "Dubai",
    country: "United Arab Emirates",
    price: 1050,
    days: 5,
    category: "Asia",
    rating: 4.7,
    description: "ცათამბჯენები, უდაბნოს თავგადასავალი და თანამედროვე არაბული ფუფუნება.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 10,
    name: "New York",
    country: "USA",
    price: 1600,
    days: 6,
    category: "America",
    rating: 4.8,
    description: "ცენტრალური პარკიდან ბროდვეიმდე — ნიუ-იორკის ენერგია ყოველ ქუჩაზე იგრძნობა.",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 11,
    name: "Rio de Janeiro",
    country: "Brazil",
    price: 1350,
    days: 7,
    category: "America",
    rating: 4.7,
    description: "ოქროსფერი სანაპიროები, სამბა და კორკოვადოს მთიდან ქალაქის შთამბეჭდავი ხედი.",
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: 12,
    name: "Cancun",
    country: "Mexico",
    price: 1180,
    days: 6,
    category: "America",
    rating: 4.6,
    description: "კარიბის ზღვის ფირუზისფერი წყალი, მაიას ისტორია და მზიანი დასვენება.",
    images: [
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85"
    ]
  }
];

const getEl = (id) => document.getElementById(id);

function destinationCardTemplate(destination) {
  const isFavorite = favorites.includes(destination.id);

  return `
    <article class="destination-card">
      <div class="card-img">
        <img src="${destination.images[0]}" alt="${escapeHTML(destination.name)}" loading="lazy">
        <button class="favorite-small" data-favorite="${destination.id}" aria-label="ფავორიტებში დამატება">
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div class="card-content">
        <span class="card-country">${escapeHTML(destination.country)} · ${destination.category}</span>
        <h3>${escapeHTML(destination.name)}</h3>
        <p>${escapeHTML(destination.description)}</p>
        <div class="card-info">
          <span>⭐ ${destination.rating}</span>
          <span>📅 ${destination.days} დღე</span>
        </div>
        <div class="card-footer">
          <strong>${formatMoney(destination.price)}</strong>
          <button class="details-btn" data-details="${destination.id}">დეტალურად</button>
        </div>
      </div>
    </article>
  `;
}

function syncBadges() {
  const totalSpentCount = trips.reduce((sum, trip) => sum + trip.total, 0);

  getEl("cartCount").textContent = cart.length;
  getEl("totalTrips").textContent = trips.length;
  getEl("totalFavorites").textContent = favorites.length;
  getEl("totalCart").textContent = cart.length;
  getEl("totalSpent").textContent = formatMoney(totalSpentCount);
}

function showModal(id) {
  getEl(id).classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideModal(id) {
  getEl(id).classList.remove("show");

  const anyModalOpen = ["detailModal", "plannerModal", "cartModal"].some((modalId) => 
    getEl(modalId).classList.contains("show")
  );

  if (!anyModalOpen) {
    document.body.style.overflow = "";
  }

  if (id === "detailModal") {
    clearInterval(galleryTimer);
    galleryTimer = null;
  }
}

function renderDestinations() {
  const searchInput = getEl("destinationSearch").value || getEl("searchInput").value;
  const search = searchInput.trim().toLowerCase();
  const category = getEl("categoryFilter").value;
  const price = getEl("priceFilter").value;
  const sort = getEl("sortSelect").value;

  localStorage.setItem("travelgo_last_search", search);

  let filtered = destinations.filter((dest) => {
    const matchesSearch = !search || `${dest.name} ${dest.country}`.toLowerCase().includes(search);
    const matchesCategory = category === "all" || dest.category === category;
    
    let matchesPrice = true;
    if (price === "500") {
      matchesPrice = dest.price < 500;
    } else if (price === "500-1000") {
      matchesPrice = dest.price >= 500 && dest.price <= 1000;
    } else if (price === "1000") {
      matchesPrice = dest.price > 1000;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "days") filtered.sort((a, b) => a.days - b.days);

  getEl("destinationContainer").innerHTML = filtered.map(destinationCardTemplate).join("");
  getEl("noResults").style.display = filtered.length ? "none" : "block";
}

function renderFavorites() {
  const container = getEl("favoritesContainer");
  const items = favorites.map(findDestination).filter(Boolean);

  if (!items.length) {
    container.innerHTML = '<p class="empty-message">ფავორიტები ჯერ არ გაქვს.</p>';
  } else {
    container.innerHTML = items.map((item) => `
      <article class="favorite-card">
        <img src="${item.images[0]}" alt="${escapeHTML(item.name)}">
        <div>
          <span>${escapeHTML(item.country)}</span>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${formatMoney(item.price)}</p>
          <button class="remove-favorite" data-remove-favorite="${item.id}">წაშლა</button>
          <button class="details-btn" data-details="${item.id}">დეტალურად</button>
        </div>
      </article>
    `).join("");
  }

  syncBadges();
}

function renderTrips() {
  const container = getEl("tripsContainer");

  if (!trips.length) {
    container.innerHTML = '<p class="empty-message">დაგეგმილი მოგზაურობები ჯერ არ გაქვს.</p>';
  } else {
    container.innerHTML = trips.map((trip, index) => `
      <article class="trip-card">
        <div>
          <span>${escapeHTML(trip.destinationName)} · ${escapeHTML(trip.country)}</span>
          <h3>${escapeHTML(trip.name)}</h3>
          <p>გამგზავრება: ${escapeHTML(trip.departure)} · დაბრუნება: ${escapeHTML(trip.returnDate)}</p>
          <p>${trip.people} ადამიანი · ${trip.days} დღე · ${escapeHTML(trip.hotelLabel)} სასტუმრო</p>
          <strong>${formatMoney(trip.total)}</strong>
        </div>
        <button class="delete-trip" data-delete-trip="${index}">წაშლა</button>
      </article>
    `).join("");
  }

  syncBadges();
}

function renderCart() {
  const items = cart.map(findDestination).filter(Boolean);
  const container = getEl("cartContainer");

  if (!items.length) {
    container.innerHTML = '<p class="empty-message">კალათა ცარიელია.</p>';
  } else {
    container.innerHTML = items.map((item) => `
      <div class="cart-item">
        <img src="${item.images[0]}" alt="${escapeHTML(item.name)}">
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.country)}</p>
          <strong>${formatMoney(item.price)}</strong>
        </div>
        <button class="remove-cart" data-remove-cart="${item.id}" aria-label="წაშლა">×</button>
      </div>
    `).join("");
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  getEl("cartTotal").textContent = formatMoney(totalPrice);
  
  syncBadges();
}

function showGalleryImage(index) {
  if (!activeDestination) return;

  const images = activeDestination.images;
  galleryIndex = (index + images.length) % images.length;

  getEl("modalMainImage").src = images[galleryIndex];

  getEl("thumbnailContainer").innerHTML = images.map((src, i) => `
    <img 
      src="${src}" 
      alt="${escapeHTML(activeDestination.name)} ფოტო ${i + 1}" 
      class="${i === galleryIndex ? "active" : ""}" 
      data-image-index="${i}"
    >
  `).join("");
}

function openDetails(id) {
  activeDestination = findDestination(id);
  if (!activeDestination) return;

  getEl("modalCountry").textContent = activeDestination.country;
  getEl("modalName").textContent = activeDestination.name;
  getEl("modalPrice").textContent = activeDestination.price;
  getEl("modalRating").textContent = activeDestination.rating;
  getEl("modalDays").textContent = activeDestination.days;
  getEl("modalDescription").textContent = activeDestination.description;

  const isFav = favorites.includes(activeDestination.id);
  getEl("favoriteBtn").textContent = isFav ? "♥ ფავორიტებიდან წაშლა" : "♡ ფავორიტებში დამატება";

  galleryIndex = 0;
  showGalleryImage(0);
  showModal("detailModal");

  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
    showGalleryImage(galleryIndex + 1);
  }, 4000);
}

function toggleFavorite(id) {
  const numericId = Number(id);

  if (favorites.includes(numericId)) {
    favorites = favorites.filter((favId) => favId !== numericId);
  } else {
    favorites.push(numericId);
  }

  saveStorage("travelgo_favorites", favorites);
  renderFavorites();
  renderDestinations();

  if (activeDestination) {
    const isFav = favorites.includes(activeDestination.id);
    getEl("favoriteBtn").textContent = isFav ? "♥ ფავორიტებიდან წაშლა" : "♡ ფავორიტებში დამატება";
  }
}

function getTripCalculation() {
  const destinationId = getEl("tripDestination").value;
  const destination = findDestination(destinationId) || destinations[0];

  const people = Math.max(1, Number(getEl("peopleCount").value) || 1);
  const departure = getEl("departureDate").value;
  const returnDate = getEl("returnDate").value;

  let nights = destination.days;
  if (departure && returnDate) {
    const diffTime = new Date(`${returnDate}T00:00:00`) - new Date(`${departure}T00:00:00`);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    nights = Math.max(1, diffDays);
  }

  const hotel = getEl("hotelType").value;
  let hotelCostPerDay = 0;
  if (hotel === "premium") hotelCostPerDay = 180;
  else if (hotel === "standard") hotelCostPerDay = 100;

  const food = getEl("foodType").value === "food" ? 50 * people * nights : 0;
  const transport = getEl("transportType").value === "transport" ? 150 : 0;
  const insurance = getEl("insurance").checked ? 80 * people : 0;

  const total = (destination.price * people) + (hotelCostPerDay * nights) + food + transport + insurance;

  return { destination, people, nights, hotel, total };
}

function updateTotal() {
  const calculation = getTripCalculation();
  getEl("totalPrice").textContent = `სრული თანხა: ${formatMoney(calculation.total)}`;
}

function openPlanner(id) {
  if (id) {
    getEl("tripDestination").value = String(id);
  }
  updateTotal();

  const savedName = localStorage.getItem("travelgo_user_name");
  if (savedName) {
    getEl("userName").value = savedName;
  }

  showModal("plannerModal");
}

function renderSlider() {
  const destination = destinations[slideIndex];

  getEl("sliderList").innerHTML = `
    <div class="slider">
      <img src="${destination.images[1]}" alt="${escapeHTML(destination.name)}">
      <div class="slide-info">
        <span>${escapeHTML(destination.country)}</span>
        <h2>${escapeHTML(destination.name)}</h2>
        <p>${escapeHTML(destination.description)}</p>
      </div>
    </div>
  `;
}

function readStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from LocalStorage:`, error);
    localStorage.removeItem(key);
    return fallback;
  }
}

function saveStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function formatMoney(amount) {
  const num = Number(amount) || 0;
  return `${num.toLocaleString("ka-GE")} ₾`;
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function findDestination(id) {
  return destinations.find((item) => item.id === Number(id));
}

getEl("destinationSearch").addEventListener("input", () => {
  getEl("searchInput").value = getEl("destinationSearch").value;
  renderDestinations();
});

getEl("searchInput").addEventListener("input", () => {
  getEl("destinationSearch").value = getEl("searchInput").value;
  renderDestinations();
});

getEl("searchBtn").addEventListener("click", () => {
  getEl("destinationSearch").value = getEl("searchInput").value;
  renderDestinations();
  getEl("destinations").scrollIntoView({ behavior: "smooth" });
});

["categoryFilter", "priceFilter", "sortSelect"].forEach((id) => {
  getEl(id).addEventListener("change", renderDestinations);
});

document.addEventListener("click", (e) => {
  const detailsBtn = e.target.closest("[data-details]");
  if (detailsBtn) openDetails(detailsBtn.dataset.details);

  const favoriteBtn = e.target.closest("[data-favorite]");
  if (favoriteBtn) toggleFavorite(favoriteBtn.dataset.favorite);

  const removeFavBtn = e.target.closest("[data-remove-favorite]");
  if (removeFavBtn) toggleFavorite(removeFavBtn.dataset.removeFavorite);

  const removeCartBtn = e.target.closest("[data-remove-cart]");
  if (removeCartBtn) {
    const id = Number(removeCartBtn.dataset.removeCart);
    cart = cart.filter((item) => item !== id);
    saveStorage("travelgo_cart", cart);
    renderCart();
  }

  const deleteTripBtn = e.target.closest("[data-delete-trip]");
  if (deleteTripBtn) {
    const index = Number(deleteTripBtn.dataset.deleteTrip);
    trips.splice(index, 1);
    saveStorage("travelgo_trips", trips);
    renderTrips();
  }

  const thumbnailImg = e.target.closest("[data-image-index]");
  if (thumbnailImg) {
    showGalleryImage(Number(thumbnailImg.dataset.imageIndex));
  }
});

getEl("galleryPrev").addEventListener("click", () => showGalleryImage(galleryIndex - 1));
getEl("galleryNext").addEventListener("click", () => showGalleryImage(galleryIndex + 1));

getEl("favoriteBtn").addEventListener("click", () => {
  if (activeDestination) toggleFavorite(activeDestination.id);
});

getEl("cartBtn").addEventListener("click", () => {
  if (activeDestination && !cart.includes(activeDestination.id)) {
    cart.push(activeDestination.id);
    saveStorage("travelgo_cart", cart);
    renderCart();
  }
});

getEl("planTripBtn").addEventListener("click", () => {
  const destId = activeDestination?.id;
  hideModal("detailModal");
  openPlanner(destId);
});

const modalCloseMap = [
  ["closeDetailModal", "detailModal"],
  ["closePlannerModal", "plannerModal"],
  ["closeCartModal", "cartModal"]
];

modalCloseMap.forEach(([btnId, modalId]) => {
  getEl(btnId).addEventListener("click", () => hideModal(modalId));
});

["detailModal", "plannerModal", "cartModal"].forEach((modalId) => {
  getEl(modalId).addEventListener("click", (e) => {
    if (e.target === getEl(modalId)) hideModal(modalId);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    ["detailModal", "plannerModal", "cartModal"].forEach(hideModal);
  }
});

const formInputs = ["tripDestination", "departureDate", "returnDate", "peopleCount", "hotelType", "foodType", "transportType", "insurance"];
formInputs.forEach((id) => {
  getEl(id).addEventListener("input", updateTotal);
  getEl(id).addEventListener("change", updateTotal);
});

getEl("tripForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const errorEl = getEl("formError");
  errorEl.textContent = "";

  const name = getEl("userName").value.trim();
  const departure = getEl("departureDate").value;
  const returnDate = getEl("returnDate").value;
  const people = Number(getEl("peopleCount").value);

  if (!name || !departure || !returnDate || !getEl("tripDestination").value) {
    errorEl.textContent = "გთხოვ, შეავსე ყველა აუცილებელი ველი.";
    return;
  }

  if (new Date(`${returnDate}T00:00:00`) < new Date(`${departure}T00:00:00`)) {
    errorEl.textContent = "დაბრუნების თარიღი გამგზავრების თარიღზე ადრე ვერ იქნება.";
    return;
  }

  if (!Number.isInteger(people) || people < 1) {
    errorEl.textContent = "ადამიანების რაოდენობა მინიმუმ 1 უნდა იყოს.";
    return;
  }

  const calc = getTripCalculation();
  let hotelLabel = "No";
  if (calc.hotel === "premium") hotelLabel = "Premium";
  if (calc.hotel === "standard") hotelLabel = "Standard";

  trips.push({
    name,
    destinationId: calc.destination.id,
    destinationName: calc.destination.name,
    country: calc.destination.country,
    departure,
    returnDate,
    people,
    days: calc.nights,
    hotelLabel,
    total: calc.total
  });

  saveStorage("travelgo_trips", trips);
  localStorage.setItem("travelgo_user_name", name);

  renderTrips();
  getEl("tripForm").reset();
  getEl("peopleCount").value = "1";
  updateTotal();
  hideModal("plannerModal");
});

getEl("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  
  localStorage.setItem("travelgo_theme", isDark ? "dark" : "light");
  getEl("themeBtn").textContent = isDark ? "☀️" : "🌙";
});

getEl("planHeroBtn").addEventListener("click", () => openPlanner());

const cartLink = Array.from(document.querySelectorAll(".nav-bar a"))
  .find((link) => link.getAttribute("href") === "#cart");

if (cartLink) {
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    renderCart();
    showModal("cartModal");
  });
}

getEl("prevBtn").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + destinations.length) % destinations.length;
  renderSlider();
});

getEl("nextBtn").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % destinations.length;
  renderSlider();
});

function initializeApp() {
  getEl("tripDestination").innerHTML = destinations
    .map((d) => `<option value="${d.id}">${escapeHTML(d.name)} — ${escapeHTML(d.country)}</option>`)
    .join("");

  const lastSearch = localStorage.getItem("travelgo_last_search") || "";
  getEl("searchInput").value = lastSearch;
  getEl("destinationSearch").value = lastSearch;

  if (localStorage.getItem("travelgo_theme") === "dark") {
    document.body.classList.add("dark");
  }
  getEl("themeBtn").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";

  const storedName = localStorage.getItem("travelgo_user_name");
  if (storedName) {
    getEl("userName").value = storedName;
  }

  renderDestinations();
  renderFavorites();
  renderTrips();
  renderCart();
  renderSlider();
  updateTotal();
}

initializeApp();