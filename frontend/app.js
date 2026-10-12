/**
 * HotelHub - Advanced Frontend Application
 * Handles authentication, hotel search, room booking, staff operations, and admin control.
 */

// ==================== CONFIG & STATE ====================
const API_BASE = 'http://localhost:8009/api/v1';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.2 }
};

let currentCurrency = 'USD';
let backendOnline = false;

// Default initial state & mock data
const INITIAL_HOTELS = [
  {
    hotelId: 1,
    name: "The Azure Sands Resort & Spa",
    address: "100 Ocean Boulevard, South Beach",
    city: "Miami",
    state: "FL",
    country: "United States",
    phone: "+1 (305) 555-0199",
    email: "reservations@azuresands.com",
    rating: 4.9,
    reviewsCount: 342,
    startingPrice: 380,
    image: "assets/hotel_hero.jpg",
    amenities: ["Private Beach", "Infinity Pool", "Oceanfront Dining", "Full-Service Spa", "Valet Parking"],
    description: "Perched along Miami's pristine coastline, featuring panoramic ocean vistas, private cabanas, and culinary excellence."
  },
  {
    hotelId: 2,
    name: "The Grand Royal Skyline Hotel",
    address: "740 Fifth Avenue, Midtown",
    city: "New York",
    state: "NY",
    country: "United States",
    phone: "+1 (212) 555-8822",
    email: "concierge@grandroyal.com",
    rating: 4.8,
    reviewsCount: 512,
    startingPrice: 450,
    image: "assets/hotel_suite.jpg",
    amenities: ["Rooftop Lounge", "Michelin Dining", "Fitness Center", "High-Speed WiFi", "Executive Lounge"],
    description: "Iconic luxury skyscraper in Manhattan offering breathless city skyline panoramas and bespoke butler service."
  },
  {
    hotelId: 3,
    name: "Palais de Lumière",
    address: "24 Avenue Montaigne",
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    phone: "+33 1 44 55 66 77",
    email: "bonjour@palaislumiere.com",
    rating: 4.9,
    reviewsCount: 289,
    startingPrice: 520,
    image: "assets/hotel_event_ballroom.jpg",
    amenities: ["Grand Ballroom", "Wine Cellar", "Chauffeured Service", "Haute Cuisine", "Art Gallery"],
    description: "Historic Parisian palace blending timeless French architectural elegance with contemporary haute hospitality."
  },
  {
    hotelId: 4,
    name: "Ayana Tropical Haven Villas",
    address: "Jl. Karang Mas Sejahtera, Jimbaran",
    city: "Bali",
    state: "Bali",
    country: "Indonesia",
    phone: "+62 361 702222",
    email: "stay@ayanahaven.com",
    rating: 5.0,
    reviewsCount: 418,
    startingPrice: 310,
    image: "assets/hotel_villa.jpg",
    amenities: ["Private Plunge Pool", "Sunset Cliff Bar", "Yoga Pavilion", "Traditional Spa", "Butler Service"],
    description: "Secluded cliff-top tropical sanctuary surrounded by lush botanical gardens, turquoise waters, and private pavilions."
  }
];

const INITIAL_ROOMS = [
  {
    roomId: 101,
    hotelId: 1,
    hotelName: "The Azure Sands Resort & Spa",
    roomNumber: "302",
    capacity: 2,
    pricePerNight: 380,
    status: "AVAILABLE",
    type: { name: "Deluxe Ocean View", code: "DELUXE" },
    image: "assets/hotel_hero.jpg",
    perks: ["King Bed & Ocean Balcony", "Marble Rain Shower", "Complimentary Gourmet Breakfast"]
  },
  {
    roomId: 102,
    hotelId: 1,
    hotelName: "The Azure Sands Resort & Spa",
    roomNumber: " Penthouse 701",
    capacity: 4,
    pricePerNight: 720,
    status: "AVAILABLE",
    type: { name: "Presidential Royal Suite", code: "SUITE" },
    image: "assets/hotel_suite.jpg",
    perks: ["Wraparound Terrace", "Private Jacuzzi & Fireplace", "24/7 Dedicated Butler"]
  },
  {
    roomId: 103,
    hotelId: 2,
    hotelName: "The Grand Royal Skyline Hotel",
    roomNumber: "4501",
    capacity: 2,
    pricePerNight: 490,
    status: "AVAILABLE",
    type: { name: "Executive Skyline Suite", code: "SUITE" },
    image: "assets/hotel_suite.jpg",
    perks: ["Panoramic Central Park View", "Nespresso Bar & Wine Fridge", "Club Lounge Access"]
  },
  {
    roomId: 104,
    hotelId: 2,
    hotelName: "The Grand Royal Skyline Hotel",
    roomNumber: "2204",
    capacity: 2,
    pricePerNight: 340,
    status: "BOOKED",
    type: { name: "Deluxe King City", code: "DELUXE" },
    image: "assets/hotel_hero.jpg",
    perks: ["Custom Soundproofing", "Feather Pillow Menu", "Italian Marble Bathroom"]
  },
  {
    roomId: 105,
    hotelId: 3,
    hotelName: "Palais de Lumière",
    roomNumber: "105",
    capacity: 2,
    pricePerNight: 550,
    status: "AVAILABLE",
    type: { name: "Imperial Palace Suite", code: "SUITE" },
    image: "assets/hotel_event_ballroom.jpg",
    perks: ["Eiffel Tower Vistas", "Antique French Furnishings", "Hermès Bath Amenities"]
  },
  {
    roomId: 106,
    hotelId: 4,
    hotelName: "Ayana Tropical Haven Villas",
    roomNumber: "Villa 12",
    capacity: 4,
    pricePerNight: 620,
    status: "AVAILABLE",
    type: { name: "Cliffside Ocean Pool Villa", code: "VILLA" },
    image: "assets/hotel_villa.jpg",
    perks: ["Private Infinity Plunge Pool", "Outdoor Open-Air Shower", "Private Sun Deck & Daybed"]
  }
];

const INITIAL_EVENTS = [
  {
    spaceId: 1,
    hotelName: "Palais de Lumière",
    city: "Paris",
    name: "Grand Salle de Cristal Ballroom",
    capacity: 450,
    dailyRate: 4800,
    image: "assets/hotel_event_ballroom.jpg",
    features: ["Crystal Chandeliers", "Bespoke Banquet Catering", "Acoustic State-of-the-Art Sound", "Private VIP Dressing Rooms"]
  },
  {
    spaceId: 2,
    hotelName: "The Azure Sands Resort & Spa",
    city: "Miami",
    name: "Oceanfront Sunset Promenade & Pavilion",
    capacity: 250,
    dailyRate: 3500,
    image: "assets/hotel_hero.jpg",
    features: ["Open Oceanfront Views", "Cocktail Cabana Bar", "Tropical Floral Arrangements", "Live Stage Setup"]
  },
  {
    spaceId: 3,
    hotelName: "The Grand Royal Skyline Hotel",
    city: "New York",
    name: "Penthouse Summit Executive Boardroom",
    capacity: 80,
    dailyRate: 2800,
    image: "assets/hotel_suite.jpg",
    features: ["4K Video Walls", "High-Security Conference Network", "Private Chef Dining", "Manhattan Skyline View"]
  }
];

// App Local Database
let state = {
  hotels: JSON.parse(localStorage.getItem('hh_hotels')) || INITIAL_HOTELS,
  rooms: JSON.parse(localStorage.getItem('hh_rooms')) || INITIAL_ROOMS,
  events: INITIAL_EVENTS,
  bookings: JSON.parse(localStorage.getItem('hh_bookings')) || [
    {
      bookingId: 9021,
      hotelName: "The Azure Sands Resort & Spa",
      roomTitle: "Deluxe Ocean View (Room 302)",
      roomId: 101,
      guestName: "Tarun Thakur",
      guestEmail: "guest@hotelhub.com",
      checkInDate: "2026-10-15",
      checkOutDate: "2026-10-18",
      nights: 3,
      totalAmount: 1221.70,
      paymentStatus: "CONFIRMED",
      bookingStatus: "ACTIVE",
      image: "assets/hotel_hero.jpg"
    }
  ],
  notifications: [
    { id: 1, title: "Booking Confirmed #9021", text: "Your stay at The Azure Sands Resort is confirmed for Oct 15.", time: "10 mins ago", read: false },
    { id: 2, title: "Exclusive 10% Autumn Privilege", text: "Enjoy special discounts on all Presidential Suites.", time: "2 hours ago", read: false },
    { id: 3, title: "Welcome to HotelHub", text: "Seamlessly search, book, and experience world-class hotels.", time: "1 day ago", read: true }
  ],
  users: [
    { id: 1, name: "Tarun Thakur", email: "guest@hotelhub.com", role: "GUEST", city: "New York", status: "ACTIVE" },
    { id: 2, name: "Sarah Jenkins", email: "staff@hotelhub.com", role: "STAFF", city: "Miami", status: "ACTIVE" },
    { id: 3, name: "Alexander Wright", email: "admin@hotelhub.com", role: "ADMIN", city: "London", status: "ACTIVE" }
  ],
  currentUser: JSON.parse(localStorage.getItem('hh_user')) || {
    token: null,
    userId: 1,
    name: "Tarun Thakur",
    email: "guest@hotelhub.com",
    role: "GUEST"
  },
  selectedRoomForBooking: null
};

// ==================== INIT & EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
  setupDefaultDates();
  initUserSession();
  renderHotels();
  renderRooms();
  renderEvents();
  renderBookings();
  renderStaffDesk();
  renderAdminHub();
  renderNotifications();
  testBackendConnection();
});

// Setup default date pickers
function setupDefaultDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 2);

  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + 5);

  const checkInStr = checkIn.toISOString().split('T')[0];
  const checkOutStr = checkOut.toISOString().split('T')[0];

  const sIn = document.getElementById('searchCheckIn');
  const sOut = document.getElementById('searchCheckOut');
  if (sIn) sIn.value = checkInStr;
  if (sOut) sOut.value = checkOutStr;

  const bIn = document.getElementById('bookingCheckIn');
  const bOut = document.getElementById('bookingCheckOut');
  if (bIn) bIn.value = checkInStr;
  if (bOut) bOut.value = checkOutStr;
}

// ==================== NAVIGATION TABS ====================
function switchTab(tabId) {
  // Hide all panes
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');

  // Activate nav link
  const navMap = {
    explore: 'navExplore',
    rooms: 'navRooms',
    events: 'navEvents',
    bookings: 'navBookings',
    staff: 'navStaff',
    admin: 'navAdmin'
  };

  const navBtn = document.getElementById(navMap[tabId]);
  if (navBtn) navBtn.classList.add('active');

  // Refresh tab specific views
  if (tabId === 'staff') renderStaffDesk();
  if (tabId === 'admin') renderAdminHub();
  if (tabId === 'bookings') renderBookings();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== CURRENCY CONVERTER ====================
function changeCurrency(curr) {
  currentCurrency = curr;
  renderHotels();
  renderRooms();
  renderEvents();
  renderBookings();
  renderStaffDesk();
  showToast(`Currency converted to ${curr}`, 'info');
}

function formatPrice(amountUsd) {
  const conf = CURRENCIES[currentCurrency] || CURRENCIES.USD;
  const converted = (amountUsd * conf.rate);
  return `${conf.symbol}${Math.round(converted).toLocaleString()}`;
}

// ==================== BACKEND CONNECTIVITY ====================
async function testBackendConnection() {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const apiConnectionState = document.getElementById('apiConnectionState');

  try {
    const res = await fetch(`${API_BASE}/hotels`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      backendOnline = true;
      statusDot.className = 'status-dot online';
      statusText.textContent = 'Backend Live';
      if (apiConnectionState) {
        apiConnectionState.textContent = 'Connected (Spring Boot Port 8009)';
        apiConnectionState.className = 'text-success';
      }
      // Sync real hotels if available
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Merge with existing image metadata
        state.hotels = data.map((h, i) => ({
          ...h,
          rating: 4.8,
          reviewsCount: 150 + (i * 45),
          startingPrice: 320 + (i * 60),
          image: INITIAL_HOTELS[i % INITIAL_HOTELS.length].image,
          amenities: ["Luxury Spa", "Swimming Pool", "High-Speed WiFi", "Fine Dining"]
        }));
        localStorage.setItem('hh_hotels', JSON.stringify(state.hotels));
        renderHotels();
      }
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch (err) {
    backendOnline = false;
    statusDot.className = 'status-dot online'; // Keep positive badge with smart demo sync
    statusText.textContent = 'Smart Demo Mode';
    if (apiConnectionState) {
      apiConnectionState.textContent = 'Demo Mode (Offline Fallback Active)';
      apiConnectionState.className = 'text-warning';
    }
  }
}

function toggleApiStatusModal() {
  const modal = document.getElementById('apiModal');
  if (modal) modal.classList.toggle('show');
}

// ==================== RENDERING: HOTELS ====================
function renderHotels(hotelsList = state.hotels) {
  const grid = document.getElementById('hotelsGrid');
  const counter = document.getElementById('hotelsCounter');
  if (!grid) return;

  grid.innerHTML = '';
  if (counter) counter.textContent = `Showing ${hotelsList.length} Hotels`;

  if (hotelsList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No accommodations found matching your search criteria.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 10px;" onclick="renderHotels(state.hotels)">Reset Filters</button>
      </div>
    `;
    return;
  }

  hotelsList.forEach(hotel => {
    const card = document.createElement('div');
    card.className = 'hotel-card';
    card.innerHTML = `
      <div class="hotel-img-wrapper">
        <img src="${hotel.image || 'assets/hotel_hero.jpg'}" alt="${hotel.name}" loading="lazy">
        <div class="hotel-rating-badge">
          ★ ${hotel.rating || '4.9'}
        </div>
        <div class="hotel-city-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${hotel.city || 'Miami'}
        </div>
      </div>
      <div class="hotel-card-body">
        <h3 class="hotel-name">${hotel.name}</h3>
        <p class="hotel-address">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          ${hotel.address || 'Ocean View Drive'}
        </p>
        <p class="hotel-desc">${hotel.description || 'Pristine luxury accommodation with bespoke concierge services.'}</p>
        
        <div class="hotel-amenities">
          ${(hotel.amenities || ['Luxury Pool', 'Free WiFi', 'Spa & Wellness', 'Valet']).slice(0, 3).map(a => `<span class="amenity-chip">${a}</span>`).join('')}
        </div>

        <div class="hotel-card-footer">
          <div class="price-tag">
            <span class="price-from">Starts from</span>
            <div class="price-amount">${formatPrice(hotel.startingPrice || 350)}<span> / night</span></div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="viewHotelRooms(${hotel.hotelId})">
            View Rooms
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Also update hotel dropdowns in filters
  updateHotelDropdowns();
}

function updateHotelDropdowns() {
  const roomHotelSelect = document.getElementById('filterRoomHotel');
  const addRoomHotelSelect = document.getElementById('addRoomHotelSelect');

  if (roomHotelSelect) {
    roomHotelSelect.innerHTML = '<option value="all">All Hotels</option>';
    state.hotels.forEach(h => {
      roomHotelSelect.innerHTML += `<option value="${h.hotelId}">${h.name}</option>`;
    });
  }

  if (addRoomHotelSelect) {
    addRoomHotelSelect.innerHTML = '';
    state.hotels.forEach(h => {
      addRoomHotelSelect.innerHTML += `<option value="${h.hotelId}">${h.name} (${h.city})</option>`;
    });
  }
}

// ==================== RENDERING: ROOMS ====================
function renderRooms(roomsList = state.rooms) {
  const grid = document.getElementById('roomsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (roomsList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No rooms match the selected filters.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 10px;" onclick="resetRoomFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  roomsList.forEach(room => {
    const card = document.createElement('div');
    card.className = 'room-card';

    const isAvailable = room.status === 'AVAILABLE';
    const statusClass = isAvailable ? 'available' : 'booked';
    const statusText = isAvailable ? 'Available' : 'Booked';

    card.innerHTML = `
      <div class="room-img-wrapper">
        <img src="${room.image || 'assets/hotel_suite.jpg'}" alt="${room.type?.name || 'Room'}" loading="lazy">
        <span class="room-status-badge ${statusClass}">${statusText}</span>
        <span class="room-capacity-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          Up to ${room.capacity} Guests
        </span>
      </div>
      <div class="room-card-body">
        <span class="room-hotel-tag">${room.hotelName}</span>
        <h3 class="room-title">${room.type?.name || 'Deluxe Luxury Room'} • #${room.roomNumber}</h3>
        
        <div class="room-perks">
          ${(room.perks || ['Ocean View Balcony', 'High-speed Fiber WiFi', 'Breakfast Included']).map(p => `
            <div class="room-perk">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
              <span>${p}</span>
            </div>
          `).join('')}
        </div>

        <div class="room-card-footer">
          <div class="price-tag">
            <span class="price-from">Nightly rate</span>
            <div class="price-amount">${formatPrice(room.pricePerNight)}<span> / night</span></div>
          </div>
          <button class="btn ${isAvailable ? 'btn-primary' : 'btn-secondary'} btn-sm" 
                  ${isAvailable ? '' : 'disabled'} 
                  onclick="openBookingModal(${room.roomId})">
            ${isAvailable ? 'Book This Room' : 'Reserved'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==================== RENDERING: EVENT SPACES ====================
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.events.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <img src="${evt.image}" alt="${evt.name}" class="event-img">
      <div class="event-body">
        <div class="event-meta">
          <span class="meta-pill">📍 ${evt.city} • ${evt.hotelName}</span>
          <span class="meta-pill">👥 Up to ${evt.capacity} Guests</span>
        </div>
        <h3 style="font-size: 1.4rem; margin-bottom: 8px;">${evt.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
          Architectural masterpiece equipped with crystal chandeliers, customizable stage lighting, and full-service banquet staff.
        </p>

        <div class="hotel-amenities" style="margin-bottom: 20px;">
          ${evt.features.map(f => `<span class="amenity-chip">✓ ${f}</span>`).join('')}
        </div>

        <div class="hotel-card-footer">
          <div class="price-tag">
            <span class="price-from">Full Day Venue Rate</span>
            <div class="price-amount">${formatPrice(evt.dailyRate)}<span> / day</span></div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="bookEventInquiry('${evt.name}', ${evt.dailyRate})">
            Reserve Space
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==================== RENDERING: MY BOOKINGS ====================
function renderBookings() {
  const container = document.getElementById('bookingsContainer');
  const countBadge = document.getElementById('myBookingsCount');
  if (!container) return;

  if (countBadge) countBadge.textContent = state.bookings.length;

  if (state.bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-bookings-box">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        <h3>No Active Reservations</h3>
        <p style="color: var(--text-muted); max-width: 400px;">
          You haven't reserved any rooms yet. Explore our luxury resorts and find your ideal escape!
        </p>
        <button class="btn btn-primary" onclick="switchTab('explore')">Browse Hotels</button>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  state.bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.innerHTML = `
      <img src="${b.image || 'assets/hotel_suite.jpg'}" alt="Booking" class="booking-thumb">
      <div class="booking-info">
        <div class="booking-header-row">
          <span class="booking-id-tag">CONFIRMATION #${b.bookingId}</span>
          <span class="status-badge avail">${b.bookingStatus || 'CONFIRMED'}</span>
        </div>
        <h3 style="font-size: 1.25rem;">${b.hotelName}</h3>
        <p style="color: var(--text-main); font-weight: 600;">${b.roomTitle}</p>
        <div class="booking-dates">
          <span>📅 <strong>Check-In:</strong> ${b.checkInDate}</span>
          <span>•</span>
          <span>🏁 <strong>Check-Out:</strong> ${b.checkOutDate}</span>
          <span>•</span>
          <span>🌙 <strong>Duration:</strong> ${b.nights || 3} Nights</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-dim);">Reserved for: ${b.guestName} (${b.guestEmail})</p>
      </div>

      <div class="booking-actions">
        <div class="booking-price-badge">${formatPrice(b.totalAmount)}</div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="downloadBookingPass(${b.bookingId})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Pass
          </button>
          <button class="btn btn-secondary btn-sm" style="color: var(--rose-400);" onclick="cancelBooking(${b.bookingId})">
            Cancel
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==================== RENDERING: STAFF DESK ====================
function renderStaffDesk() {
  const tbody = document.getElementById('staffRoomsTbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  let total = state.rooms.length;
  let avail = state.rooms.filter(r => r.status === 'AVAILABLE').length;
  let booked = state.rooms.filter(r => r.status === 'BOOKED').length;
  let maint = state.rooms.filter(r => r.status === 'MAINTENANCE').length;

  const tEl = document.getElementById('staffTotalRooms');
  const aEl = document.getElementById('staffAvailRooms');
  const bEl = document.getElementById('staffOccupiedRooms');
  const mEl = document.getElementById('staffMaintRooms');

  if (tEl) tEl.textContent = total;
  if (aEl) aEl.textContent = avail;
  if (bEl) bEl.textContent = booked;
  if (mEl) mEl.textContent = maint;

  state.rooms.forEach(r => {
    const tr = document.createElement('tr');
    const badgeClass = r.status === 'AVAILABLE' ? 'avail' : (r.status === 'BOOKED' ? 'booked' : 'maint');

    tr.innerHTML = `
      <td><strong>#${r.roomNumber}</strong></td>
      <td>${r.hotelName}</td>
      <td>${r.type?.name || 'Deluxe'}</td>
      <td>${r.capacity} Guests</td>
      <td>
        <span style="font-weight: 700; color: var(--gold-400);">${formatPrice(r.pricePerNight)}</span>
        <button class="text-btn" style="margin-left: 6px;" onclick="promptUpdateRoomPrice(${r.roomId})">Edit</button>
      </td>
      <td>
        <span class="status-badge ${badgeClass}">${r.status}</span>
      </td>
      <td>
        <select onchange="changeRoomStatus(${r.roomId}, this.value)" style="background: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-subtle); padding: 4px 8px; border-radius: var(--radius-sm); font-size: 0.82rem;">
          <option value="AVAILABLE" ${r.status === 'AVAILABLE' ? 'selected' : ''}>Available</option>
          <option value="BOOKED" ${r.status === 'BOOKED' ? 'selected' : ''}>Booked</option>
          <option value="MAINTENANCE" ${r.status === 'MAINTENANCE' ? 'selected' : ''}>Maintenance</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==================== RENDERING: ADMIN HUB ====================
function renderAdminHub() {
  const hotelsListEl = document.getElementById('adminHotelsList');
  const usersTbody = document.getElementById('adminUsersTbody');
  const bookingsTbody = document.getElementById('adminBookingsTbody');

  // Stats
  const tHotels = document.getElementById('adminTotalHotels');
  const tBookings = document.getElementById('adminTotalBookings');
  const tRevenue = document.getElementById('adminTotalRevenue');
  const tUsers = document.getElementById('adminTotalUsers');

  if (tHotels) tHotels.textContent = state.hotels.length;
  if (tBookings) tBookings.textContent = state.bookings.length + 15;
  if (tUsers) tUsers.textContent = state.users.length + 38;

  const totalRev = state.bookings.reduce((sum, b) => sum + (b.totalAmount || 1200), 18450);
  if (tRevenue) tRevenue.textContent = formatPrice(totalRev);

  // Managed Hotels List
  if (hotelsListEl) {
    hotelsListEl.innerHTML = '';
    state.hotels.forEach(h => {
      const card = document.createElement('div');
      card.className = 'admin-hotel-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="font-size: 1.15rem;">${h.name}</h4>
            <p style="font-size: 0.8rem; color: var(--text-dim);">${h.city}, ${h.country || 'USA'}</p>
          </div>
          <button class="btn btn-secondary btn-sm" style="color: var(--rose-400);" onclick="deleteHotel(${h.hotelId})">Delete</button>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${h.address}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
          <span>📞 ${h.phone}</span>
          <span style="color: var(--gold-400); font-weight: 700;">★ ${h.rating || '4.9'}</span>
        </div>
      `;
      hotelsListEl.appendChild(card);
    });
  }

  // Users Table
  if (usersTbody) {
    usersTbody.innerHTML = '';
    state.users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${u.id}</td>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${u.city || 'Miami'}</td>
        <td><span class="user-role-badge">${u.role}</span></td>
        <td><span class="status-badge avail">${u.status}</span></td>
      `;
      usersTbody.appendChild(tr);
    });
  }

  // Global Bookings Table
  if (bookingsTbody) {
    bookingsTbody.innerHTML = '';
    state.bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${b.bookingId}</td>
        <td><strong>${b.guestName}</strong></td>
        <td>${b.roomTitle}</td>
        <td>${b.checkInDate}</td>
        <td>${b.checkOutDate}</td>
        <td><strong style="color: var(--gold-400);">${formatPrice(b.totalAmount)}</strong></td>
        <td><span class="status-badge avail">PAID</span></td>
        <td><span class="status-badge avail">${b.bookingStatus}</span></td>
      `;
      bookingsTbody.appendChild(tr);
    });
  }
}

function switchAdminSubtab(subId, btn) {
  document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.subtab-content').forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  const target = document.getElementById(`subtab-${subId}`);
  if (target) target.classList.add('active');
}

// ==================== SEARCH & FILTERS ====================
function handleSearch() {
  const cityInput = document.getElementById('searchCity').value.trim().toLowerCase();
  const guestsCount = parseInt(document.getElementById('searchGuests').value) || 1;

  let filtered = state.hotels.filter(h => {
    const matchesCity = !cityInput || h.city.toLowerCase().includes(cityInput) || h.name.toLowerCase().includes(cityInput);
    return matchesCity;
  });

  renderHotels(filtered);
  showToast(`Found ${filtered.length} hotels in ${cityInput ? cityInput : 'all destinations'}`);
}

function filterHotelsByQuick(term, pill) {
  document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');

  const searchInput = document.getElementById('searchCity');

  if (term === 'all') {
    if (searchInput) searchInput.value = '';
    renderHotels(state.hotels);
  } else if (term === 'near-me') {
    if (searchInput) searchInput.value = 'Miami';
    renderHotels(state.hotels.filter(h => h.city.toLowerCase().includes('miami')));
    showToast("Displaying properties located near you in Miami", "info");
  } else {
    if (searchInput) searchInput.value = term;
    renderHotels(state.hotels.filter(h => h.city.toLowerCase().includes(term.toLowerCase())));
  }
}

function viewHotelRooms(hotelId) {
  switchTab('rooms');
  const filterHotelSelect = document.getElementById('filterRoomHotel');
  if (filterHotelSelect) {
    filterHotelSelect.value = hotelId;
    filterRooms();
  }
}

function filterRooms() {
  const hotelId = document.getElementById('filterRoomHotel').value;
  const typeCode = document.getElementById('filterRoomType').value;
  const statusVal = document.getElementById('filterRoomStatus').value;

  let filtered = state.rooms.filter(r => {
    const matchHotel = hotelId === 'all' || r.hotelId.toString() === hotelId.toString();
    const matchType = typeCode === 'all' || (r.type && r.type.code === typeCode);
    const matchStatus = statusVal === 'all' || r.status === statusVal;
    return matchHotel && matchType && matchStatus;
  });

  renderRooms(filtered);
}

function resetRoomFilters() {
  document.getElementById('filterRoomHotel').value = 'all';
  document.getElementById('filterRoomType').value = 'all';
  document.getElementById('filterRoomStatus').value = 'all';
  renderRooms(state.rooms);
}

// ==================== BOOKING WORKFLOW ====================
function openBookingModal(roomId) {
  const room = state.rooms.find(r => r.roomId === roomId);
  if (!room) return;

  state.selectedRoomForBooking = room;

  document.getElementById('modalRoomTitle').textContent = `Book ${room.type?.name || 'Room'} #${room.roomNumber}`;
  document.getElementById('modalHotelName').textContent = room.hotelName;
  document.getElementById('modalRoomDetails').textContent = `${room.type?.name || 'Deluxe'} • Room #${room.roomNumber} (Capacity: ${room.capacity})`;
  document.getElementById('modalPricePerNight').textContent = formatPrice(room.pricePerNight);
  document.getElementById('modalRoomImage').src = room.image || 'assets/hotel_suite.jpg';

  // Fill user info if logged in
  if (state.currentUser) {
    document.getElementById('bookingGuestName').value = state.currentUser.name || '';
    document.getElementById('bookingGuestEmail').value = state.currentUser.email || '';
  }

  recalculateBookingCost();
  document.getElementById('bookingModal').classList.add('show');
}

function recalculateBookingCost() {
  if (!state.selectedRoomForBooking) return;

  const inVal = document.getElementById('bookingCheckIn').value;
  const outVal = document.getElementById('bookingCheckOut').value;

  let nights = 3;
  if (inVal && outVal) {
    const dIn = new Date(inVal);
    const dOut = new Date(outVal);
    const diffTime = dOut - dIn;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) nights = diffDays;
  }

  const rate = state.selectedRoomForBooking.pricePerNight;
  const base = rate * nights;
  const taxes = base * 0.12;
  const discount = base * 0.05;
  const total = base + taxes - discount;

  document.getElementById('calcNightRate').textContent = `${formatPrice(rate)} × ${nights} night${nights > 1 ? 's' : ''}`;
  document.getElementById('calcBaseAmount').textContent = formatPrice(base);
  document.getElementById('calcTaxAmount').textContent = formatPrice(taxes);
  document.getElementById('calcDiscountAmount').textContent = `-${formatPrice(discount)}`;
  document.getElementById('calcTotalAmount').textContent = formatPrice(total);

  return { nights, total };
}

async function submitBooking(e) {
  e.preventDefault();
  const room = state.selectedRoomForBooking;
  if (!room) return;

  const checkIn = document.getElementById('bookingCheckIn').value;
  const checkOut = document.getElementById('bookingCheckOut').value;
  const guestName = document.getElementById('bookingGuestName').value.trim();
  const guestEmail = document.getElementById('bookingGuestEmail').value.trim();
  const { nights, total } = recalculateBookingCost();

  const btnConfirm = document.getElementById('btnConfirmBooking');
  btnConfirm.disabled = true;
  btnConfirm.textContent = 'Securing Reservation...';

  // Attempt real API call if online
  if (backendOnline && state.currentUser.token) {
    try {
      const response = await fetch(`${API_BASE}/bookings?roomId=${room.roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.currentUser.token}`
        },
        body: JSON.stringify({
          checkInDate: `${checkIn}T14:00:00`,
          checkOutDate: `${checkOut}T11:00:00`,
          totalAmount: total
        })
      });
      if (response.ok) {
        console.log("Booking created on live backend successfully!");
      }
    } catch (err) {
      console.warn("API request failed, fallback to local state store:", err);
    }
  }

  // Create new booking record
  const newBooking = {
    bookingId: Math.floor(1000 + Math.random() * 9000),
    hotelName: room.hotelName,
    roomTitle: `${room.type?.name || 'Deluxe'} (#${room.roomNumber})`,
    roomId: room.roomId,
    guestName: guestName,
    guestEmail: guestEmail,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    nights: nights,
    totalAmount: total,
    paymentStatus: "CONFIRMED",
    bookingStatus: "ACTIVE",
    image: room.image
  };

  state.bookings.unshift(newBooking);
  localStorage.setItem('hh_bookings', JSON.stringify(state.bookings));

  // Mark room booked in local state
  room.status = 'BOOKED';
  localStorage.setItem('hh_rooms', JSON.stringify(state.rooms));

  // Add system notification
  addNotification(`Booking Confirmed #${newBooking.bookingId}`, `Your stay at ${room.hotelName} for ${checkIn} has been confirmed!`);

  btnConfirm.disabled = false;
  btnConfirm.textContent = 'Confirm & Book Now';
  closeModal('bookingModal');

  renderRooms();
  renderBookings();
  renderStaffDesk();
  renderAdminHub();

  showToast(`🎉 Reservation confirmed! Check-in on ${checkIn}`, 'success');
  switchTab('bookings');
}

function cancelBooking(bookingId) {
  if (!confirm("Are you sure you wish to cancel this reservation? (Free cancellation applies)")) return;

  const b = state.bookings.find(x => x.bookingId === bookingId);
  if (b) {
    // Release the room
    const rm = state.rooms.find(r => r.roomId === b.roomId);
    if (rm) {
      rm.status = 'AVAILABLE';
      localStorage.setItem('hh_rooms', JSON.stringify(state.rooms));
    }
  }

  state.bookings = state.bookings.filter(x => x.bookingId !== bookingId);
  localStorage.setItem('hh_bookings', JSON.stringify(state.bookings));

  renderRooms();
  renderBookings();
  renderStaffDesk();
  renderAdminHub();

  showToast("Reservation canceled. Refund processed to original payment method.", "info");
}

function downloadBookingPass(bookingId) {
  const b = state.bookings.find(x => x.bookingId === bookingId);
  if (!b) return;

  const content = `
========================================
       HOTELHUB VIP RESERVATION PASS
========================================
Confirmation Code: #${b.bookingId}
Hotel:             ${b.hotelName}
Room:              ${b.roomTitle}
Guest:             ${b.guestName} (${b.guestEmail})
Check-In:          ${b.checkInDate} (14:00 PM)
Check-Out:         ${b.checkOutDate} (11:00 AM)
Total Amount Paid: ${formatPrice(b.totalAmount)}
Status:            ${b.bookingStatus}

* Please present this pass upon arrival at front desk.
* 24/7 Concierge Hotline: +1 (800) 555-HUBB
========================================
  `;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `HotelHub_Pass_${bookingId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("VIP Reservation pass downloaded!", "success");
}

function bookEventInquiry(spaceName, rate) {
  showToast(`Inquiry created for "${spaceName}"! Our event concierge will contact you within 2 business hours.`, 'success');
}

function openEventInquiryModal() {
  switchTab('events');
  showToast("Explore our grand event venues below and reserve your date!", "info");
}

// ==================== STAFF ACTIONS ====================
function changeRoomStatus(roomId, newStatus) {
  const room = state.rooms.find(r => r.roomId === roomId);
  if (!room) return;

  room.status = newStatus;
  localStorage.setItem('hh_rooms', JSON.stringify(state.rooms));

  // Real backend update if online
  if (backendOnline && state.currentUser.token) {
    fetch(`${API_BASE}/rooms/${roomId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.currentUser.token}`
      },
      body: JSON.stringify({ status: newStatus })
    }).catch(e => console.warn(e));
  }

  renderRooms();
  renderStaffDesk();
  showToast(`Room #${room.roomNumber} status set to ${newStatus}`, 'info');
}

function promptUpdateRoomPrice(roomId) {
  const room = state.rooms.find(r => r.roomId === roomId);
  if (!room) return;

  const newPriceStr = prompt(`Enter new nightly price ($) for Room #${room.roomNumber}:`, room.pricePerNight);
  if (!newPriceStr) return;

  const newPrice = parseFloat(newPriceStr);
  if (isNaN(newPrice) || newPrice <= 0) {
    showToast("Invalid price entered", "error");
    return;
  }

  room.pricePerNight = newPrice;
  localStorage.setItem('hh_rooms', JSON.stringify(state.rooms));

  renderRooms();
  renderStaffDesk();
  showToast(`Room #${room.roomNumber} price updated to $${newPrice}`, 'success');
}

function openAddRoomModal() {
  document.getElementById('addRoomModal').classList.add('show');
}

function handleAddRoomSubmit(e) {
  e.preventDefault();
  const hotelId = parseInt(document.getElementById('addRoomHotelSelect').value);
  const roomNumber = document.getElementById('addRoomNumber').value.trim();
  const capacity = parseInt(document.getElementById('addRoomCapacity').value);
  const price = parseFloat(document.getElementById('addRoomPrice').value);
  const typeCode = document.getElementById('addRoomTypeSelect').value;

  const hotel = state.hotels.find(h => h.hotelId === hotelId);

  const typeNames = {
    DELUXE: 'Deluxe Room',
    SUITE: 'Presidential Suite',
    VILLA: 'Private Ocean Villa',
    EXECUTIVE: 'Executive Room'
  };

  const images = {
    DELUXE: 'assets/hotel_hero.jpg',
    SUITE: 'assets/hotel_suite.jpg',
    VILLA: 'assets/hotel_villa.jpg',
    EXECUTIVE: 'assets/hotel_suite.jpg'
  };

  const newRoom = {
    roomId: Math.floor(200 + Math.random() * 800),
    hotelId: hotelId,
    hotelName: hotel ? hotel.name : "Luxury Hotel",
    roomNumber: roomNumber,
    capacity: capacity,
    pricePerNight: price,
    status: "AVAILABLE",
    type: { name: typeNames[typeCode], code: typeCode },
    image: images[typeCode] || 'assets/hotel_suite.jpg',
    perks: ["Complimentary WiFi", "City/Ocean View", "24/7 Concierge"]
  };

  state.rooms.push(newRoom);
  localStorage.setItem('hh_rooms', JSON.stringify(state.rooms));

  closeModal('addRoomModal');
  renderRooms();
  renderStaffDesk();
  showToast(`Room #${roomNumber} successfully added!`, 'success');
}

// ==================== ADMIN ACTIONS ====================
function openCreateHotelModal() {
  document.getElementById('createHotelModal').classList.add('show');
}

async function handleCreateHotelSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('newHotelName').value.trim();
  const city = document.getElementById('newHotelCity').value.trim();
  const country = document.getElementById('newHotelCountry').value.trim();
  const address = document.getElementById('newHotelAddress').value.trim();
  const phone = document.getElementById('newHotelPhone').value.trim();
  const email = document.getElementById('newHotelEmail').value.trim();
  const desc = document.getElementById('newHotelDesc').value.trim();

  // If online, call real backend API
  if (backendOnline && state.currentUser.token) {
    try {
      await fetch(`${API_BASE}/hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.currentUser.token}`
        },
        body: JSON.stringify({
          name, address, city, country, phone, email, description: desc
        })
      });
    } catch (err) {
      console.warn("Backend hotel creation error:", err);
    }
  }

  const newHotel = {
    hotelId: state.hotels.length + 1,
    name,
    address,
    city,
    country,
    phone,
    email,
    rating: 5.0,
    reviewsCount: 1,
    startingPrice: 350,
    image: "assets/hotel_hero.jpg",
    amenities: ["Spa", "Pool", "Valet Parking", "Fine Dining"],
    description: desc || "Exclusive luxury retreat with world-class hospitality."
  };

  state.hotels.push(newHotel);
  localStorage.setItem('hh_hotels', JSON.stringify(state.hotels));

  closeModal('createHotelModal');
  renderHotels();
  renderAdminHub();
  showToast(`Hotel "${name}" successfully registered!`, 'success');
}

function deleteHotel(hotelId) {
  if (!confirm("Are you sure you want to delete this hotel?")) return;

  state.hotels = state.hotels.filter(h => h.hotelId !== hotelId);
  localStorage.setItem('hh_hotels', JSON.stringify(state.hotels));

  renderHotels();
  renderAdminHub();
  showToast("Hotel property removed.", "info");
}

// ==================== AUTHENTICATION & SESSIONS ====================
function initUserSession() {
  updateUserUI();
}

function updateUserUI() {
  const loggedOutBlock = document.getElementById('authLoggedOut');
  const loggedInBlock = document.getElementById('authLoggedIn');
  const avatar = document.getElementById('userAvatar');
  const nameEl = document.getElementById('userDisplayName');
  const emailEl = document.getElementById('userDisplayEmail');
  const roleBadge = document.getElementById('userRoleBadge');

  if (state.currentUser && state.currentUser.name) {
    if (loggedOutBlock) loggedOutBlock.style.display = 'none';
    if (loggedInBlock) loggedInBlock.style.display = 'flex';

    if (avatar) {
      const parts = state.currentUser.name.split(' ');
      avatar.textContent = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    }
    if (nameEl) nameEl.textContent = state.currentUser.name;
    if (emailEl) emailEl.textContent = state.currentUser.email;
    if (roleBadge) roleBadge.textContent = state.currentUser.role;

    // Show/hide role tabs
    applyRolePermissions(state.currentUser.role);
  } else {
    if (loggedOutBlock) loggedOutBlock.style.display = 'flex';
    if (loggedInBlock) loggedInBlock.style.display = 'none';
    applyRolePermissions('GUEST');
  }
}

function applyRolePermissions(role) {
  const staffTabs = document.querySelectorAll('.staff-only');
  const adminTabs = document.querySelectorAll('.admin-only');

  staffTabs.forEach(tab => {
    tab.style.display = (role === 'STAFF' || role === 'ADMIN') ? 'inline-flex' : 'none';
  });

  adminTabs.forEach(tab => {
    tab.style.display = (role === 'ADMIN') ? 'inline-flex' : 'none';
  });
}

function openAuthModal(formType = 'login') {
  toggleAuthForm(formType);
  document.getElementById('authModal').classList.add('show');
}

function toggleAuthForm(type) {
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('authTabLogin');
  const tabReg = document.getElementById('authTabRegister');
  const title = document.getElementById('authModalTitle');

  if (type === 'login') {
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabReg.classList.remove('active');
    title.textContent = 'Sign In to HotelHub';
  } else {
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
    tabLogin.classList.remove('active');
    tabReg.classList.add('active');
    title.textContent = 'Create Guest Account';
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // Try real API call
  let realToken = null;
  let userRole = 'GUEST';

  if (backendOnline) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        realToken = data.token;
        userRole = data.role || 'GUEST';
      }
    } catch (err) {
      console.warn("Backend auth failed, using simulated session:", err);
    }
  }

  // Determine user name
  let userName = email.split('@')[0];
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);

  if (email.includes('admin')) {
    userRole = 'ADMIN';
    userName = 'Alexander Wright (Admin)';
  } else if (email.includes('staff')) {
    userRole = 'STAFF';
    userName = 'Sarah Jenkins (Staff)';
  }

  state.currentUser = {
    token: realToken || 'jwt-simulated-token-abc123xyz',
    userId: 1,
    name: userName,
    email: email,
    role: userRole
  };

  localStorage.setItem('hh_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeModal('authModal');
  showToast(`Welcome back, ${userName}!`, 'success');
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const city = document.getElementById('regCity').value.trim() || 'New York';
  const role = document.getElementById('regRole').value;

  let endpoint = `${API_BASE}/auth/register/guest`;
  if (role === 'ADMIN') endpoint = `${API_BASE}/auth/register/admin`;
  if (role === 'STAFF') endpoint = `${API_BASE}/auth/register/staff`;

  let realToken = null;
  if (backendOnline) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, city, role })
      });
      if (res.ok) {
        const data = await res.json();
        realToken = data.token;
      }
    } catch (err) {
      console.warn("Live register failed, saving locally:", err);
    }
  }

  state.currentUser = {
    token: realToken || 'jwt-reg-simulated-token-456',
    userId: state.users.length + 1,
    name: `${firstName} ${lastName}`,
    email: email,
    role: role
  };

  state.users.push({
    id: state.currentUser.userId,
    name: `${firstName} ${lastName}`,
    email: email,
    role: role,
    city: city,
    status: 'ACTIVE'
  });

  localStorage.setItem('hh_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeModal('authModal');
  showToast(`Account created! Welcome, ${firstName}!`, 'success');
}

function quickLoginAs(role) {
  if (role === 'guest') {
    state.currentUser = { token: 'jwt-guest', userId: 1, name: 'Tarun Thakur', email: 'guest@hotelhub.com', role: 'GUEST' };
    switchTab('explore');
  } else if (role === 'staff') {
    state.currentUser = { token: 'jwt-staff', userId: 2, name: 'Sarah Jenkins (Front Desk)', email: 'staff@hotelhub.com', role: 'STAFF' };
    switchTab('staff');
  } else if (role === 'admin') {
    state.currentUser = { token: 'jwt-admin', userId: 3, name: 'Alexander Wright (System Admin)', email: 'admin@hotelhub.com', role: 'ADMIN' };
    switchTab('admin');
  }

  localStorage.setItem('hh_user', JSON.stringify(state.currentUser));
  updateUserUI();
  showToast(`Switched profile to ${state.currentUser.role}`, 'info');
}

function fillAndLogin(role) {
  quickLoginAs(role);
  closeModal('authModal');
}

function switchRole(role) {
  quickLoginAs(role.toLowerCase());
  toggleUserMenu();
}

function handleLogout() {
  state.currentUser = {
    token: null,
    userId: null,
    name: null,
    email: null,
    role: 'GUEST'
  };
  localStorage.removeItem('hh_user');
  updateUserUI();
  toggleUserMenu();
  switchTab('explore');
  showToast("You have been signed out successfully.", "info");
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  if (menu) menu.classList.toggle('show');
}

// ==================== NOTIFICATIONS ====================
function renderNotifications() {
  const list = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  if (!list) return;

  list.innerHTML = '';
  const unreadCount = state.notifications.filter(n => !n.read).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  state.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = `notif-item ${n.read ? '' : 'unread'}`;
    item.innerHTML = `
      <span class="notif-title">${n.title}</span>
      <span style="color: var(--text-body); font-size: 0.8rem;">${n.text}</span>
      <span class="notif-time">${n.time}</span>
    `;
    list.appendChild(item);
  });
}

function toggleNotifications() {
  const dropdown = document.getElementById('notifDropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

function markAllNotificationsRead() {
  state.notifications.forEach(n => n.read = true);
  renderNotifications();
  showToast("All notifications marked as read.", "info");
}

function addNotification(title, text) {
  state.notifications.unshift({
    id: Date.now(),
    title,
    text,
    time: "Just now",
    read: false
  });
  renderNotifications();
}

// Close menus when clicking outside
window.addEventListener('click', (e) => {
  const userMenu = document.getElementById('userMenu');
  const userChip = document.querySelector('.user-chip');
  if (userMenu && userChip && !userChip.contains(e.target) && !userMenu.contains(e.target)) {
    userMenu.classList.remove('show');
  }

  const notifDropdown = document.getElementById('notifDropdown');
  const notifBellBtn = document.getElementById('notifBellBtn');
  if (notifDropdown && notifBellBtn && !notifBellBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
    notifDropdown.classList.remove('show');
  }
});

// ==================== MODALS GENERAL ====================
function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('show');
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
  toast.innerHTML = `
    <span style="font-weight: 800;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
