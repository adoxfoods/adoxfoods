// @ts-nocheck
// ===== ADOX FOODS - MAIN SCRIPT =====

// ===== FOOD DATA =====
const FOOD_DATA = [
    // GRAINS
    { id: 1, name: "A Congo Of Rice", category: "grains", emoji: "🌾", image: "rice.png", price: 2300, desc: "Fresh, quality rice measured by the congo", badge: "🔥 Popular" },
    { id: 2, name: "A Congo Of White Beans", category: "grains", emoji: "🫘", image: "whitebeans.png", price: 2100, desc: "Fresh white beans, perfect for any meal", badge: null },
    { id: 3, name: "A Congo Of Oloyin Beans", category: "grains", emoji: "🫘", image: "oloyin.png", price: 2800, desc: "Premium Oloyin honey beans", badge: null },
    { id: 4, name: "A Congo Of Garri", category: "grains", emoji: "🥣", image: "gari.png", price: 600, desc: "Fresh garri, measured by the congo", badge: "⭐ Best" },
    // { id: 5, name: "Kivo Garri", category: "grains", emoji: "🥣", price: 380, image: "images/garri.png", desc: "Packaged Kivo garri — student favourite", badge: null },
    // PASTA & SEMOVITA
    { id: 6, name: "Golden Penny Spag", category: "pasta", emoji: "🍝", image: "GoldenPennySpag.png", price: 1100, desc: "Golden Penny spaghetti — full pack", badge: "🔥 Popular" },
    { id: 7, name: "Mama's Pride Spag", category: "pasta", emoji: "🍝", image: "mamaspag.png", price: 950, desc: "Mama's Pride spaghetti — budget friendly", badge: null },
    { id: 8, name: "Auntie B Spag", category: "pasta", emoji: "🍝", image: "AuntieB spag.png", price: 950, desc: "Auntie B spaghetti — great quality", badge: null },
    { id: 9, name: "Crown Spag", category: "pasta", emoji: "🍝", image: "CrownSpag.png", price: 1050, desc: "Crown spaghetti — premium quality", badge: null },
    { id: 10, name: "Semo 1kg", category: "pasta", emoji: "🫙", image: "1kkgsemo.png", price: 1800, desc: "Semovita 1kg pack — full size", badge: null },
    { id: 11, name: "Semo 500g", category: "pasta", emoji: "🫙", image: "500gsemo.jpeg", price: 950, desc: "Semovita 500g pack — student size", badge: null },
    // OILS
    { id: 12, name: "A Bottle Of Palm Oil", category: "oils", emoji: "🫙", image: "p.oil.png", price: 1480, desc: "Full bottle of fresh palm oil)", badge: null },
    { id: 32, name: "Half A Bottle Of Palm Oil", category: "oils", emoji: "🫙", image: "halfoil.png", price: 750, desc: "Half a bottle of fresh palm oil", badge: null },
    { id: 13, name: "A Bottle Of Vegetable Oil", category: "oils", emoji: "🫙", image: "voil.png", price: 2100, desc: "Full bottle of vegetable oil", badge: null },
    { id: 33, name: "Half A Bottle Of Vegetable Oil", category: "oils", emoji: "🫙", image: "halfvoil.jpeg", price: 1100, desc: "Half a bottle of vegetable oil", badge: null },
    { id: 14, name: "Power Oil (1 Roll, 8 Pieces)", category: "oils", emoji: "🛢️", image: "poweroil.png", price: 1900, desc: "Power Oil — 1 roll", badge: "⭐ Best" },
    { id: 30, name: "Power Oil (1/2 Roll, 4 Pieces)", category: "oils", emoji: "🛢️", image: "halfpoil.jpeg", price: 980, desc: "Power Oil — 1/2 roll", badge: null },
    { id: 31, name: "A Sachet Of Power Oil", category: "oils", emoji: "🛢️", image: "sachetoil.jfif", price: 250, desc: "A Sachet Of Power Oil", badge: null },
    // TOMATO PASTE
    { id: 15, name: "Party Jollof Tomato Paste", category: "tomato", emoji: "🍅", image: "partyjollof.png", price: 240, desc: "Party Jollof tomato paste — per tin", badge: null },
    { id: 16, name: "Pepper & Onions Tomato Paste", category: "tomato", emoji: "🍅", image: "potomat.png", price: 200, desc: "Pepper and onions tomato paste — per tin", badge: null },
    { id: 17, name: "Tomato Paste Mix (Normal)", category: "tomato", emoji: "🍅", image: "tomatpaste.png", price: 190, desc: "Regular tomato paste mix — per tin", badge: null },
    // SEASONINGS
    { id: 18, name: "Knorr Seasoning Cube (50 Cubes)", category: "seasonings", emoji: "🧊", image: "knorr.png", price: 650, desc: "Knorr seasoning cubes — pack of 50", badge: "🔥 Popular" },
    { id: 19, name: "Chicken Flavor Cube (20 Cubes)", category: "seasonings", emoji: "🧊", image: "c.flvormag.jpg", price: 400, desc: "Chicken flavor seasoning — pack of 20", badge: null },
    //{ id: 20, name: "Salt", category: "seasonings", emoji: "🧂", price: 190, image: "poweroil.png", desc: "Table salt — standard pack", badge: null },
    { id: 23, name: "Jollof Spicity", category: "seasonings", emoji: "🌶️", image: "jollofspicity.jpeg", price: 150, desc: "Jollof spice mix — perfect blend", badge: null },
    { id: 29, name: "Hot Pepper", category: "seasonings", emoji: "🌶️", image: "hotpeper.png", price: 100, desc: "Ground hot pepper — per pack", badge: null },
    // SPICES
    { id: 21, name: "Thyme", category: "spices", emoji: "🌿", price: 100, image: "thyme.jpg", desc: "Dried thyme — per pack", badge: null },
    { id: 22, name: "Curry", category: "spices", emoji: "🌿", price: 100, image: "curry.jpeg", desc: "Curry powder — per pack", badge: null },
    // { id: 24, name: "Lasor Beef Spice", category: "spices", emoji: "🌶️", price: 180, desc: "Lasor beef spice blend", badge: null },
    // { id: 25, name: "Lasor Fish Spice", category: "spices", emoji: "🌶️", price: 180, desc: "Lasor fish spice blend", badge: null },
    //{ id: 26, name: "Lasor Chicken Spice", category: "spices", emoji: "🌶️", price: 140, desc: "Lasor chicken spice blend", badge: null },
    //{ id: 27, name: "Lasor Fried Rice Spice", category: "spices", emoji: "🌶️", price: 140, desc: "Lasor fried rice spice mix", badge: null },
    // { id: 28, name: "Ginger, Garlic & Onion Mix", category: "spices", emoji: "🧄", price: 140, desc: "Mixed ginger, garlic and onion powder", badge: "⭐ Best" },
    //SPECIAL OFFERS

];

// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem('adoxCart')) || [];

function saveCart() { localStorage.setItem('adoxCart', JSON.stringify(cart)); }

function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function getCartTotal() { return cart.reduce((sum, item) => sum + (item.price * item.qty), 0); }

function addToCart(id, qty = 1) {
    const food = FOOD_DATA.find(f => f.id === id);
    if (!food) return;
    const existing = cart.find(i => i.id === id);
    if (existing) { existing.qty += qty; } else { cart.push({...food, qty }); }
    saveCart();
    updateCartUI();
    playCartSound();
    showToast(`🛒 ${food.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { removeFromCart(id); return; }
    saveCart();
    updateCartUI();
    renderCartItems();
    refreshCheckoutSummary();
}

function refreshCheckoutSummary() {
    const summaryWrap = document.querySelector('.order-summary-items');
    if (!summaryWrap) return; // not on checkout page, skip
    summaryWrap.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <div class="oi-name">${item.emoji} ${item.name}</div>
                <div class="oi-qty">× ${item.qty}</div>
            </div>
            <div class="oi-price">₦${(item.price * item.qty).toLocaleString()}</div>
        </div>
    `).join(''); - v
    const totalEl = document.querySelector('.order-total-price');
    if (totalEl) totalEl.textContent = '₦' + getCartTotal().toLocaleString();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
    refreshCheckoutSummary(); // ← add this
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        if (count === 0) { el.classList.add('hidden'); } else {
            el.classList.remove('hidden');
            el.classList.add('pop');
            setTimeout(() => el.classList.remove('pop'), 400);
        }

    });
    const totalEl = document.querySelector('.cart-total-amount');
    if (totalEl) totalEl.textContent = '₦' + getCartTotal().toLocaleString();

    function updateMinBar() {
        const MIN = 500;
        const total = getCartTotal();
        const pct = Math.min((total / MIN) * 100, 100);
        const fill = document.getElementById('cart-min-fill');
        const notice = document.getElementById('cart-min-notice');
        const text = document.getElementById('cart-min-text');
        if (!fill) return;

        fill.style.width = pct + '%';
        if (total >= MIN) {
            fill.classList.add('reached');
            if (notice) {
                notice.textContent = '✅ Minimum reached! Ready to checkout';
                notice.className = 'cart-min-notice reached';
            }
        } else {
            fill.classList.remove('reached');
            const remaining = MIN - total;
            if (notice) {
                notice.textContent = `⚠️ Add ₦${remaining.toLocaleString()} more to checkout`;
                notice.className = 'cart-min-notice not-reached';
            }
        }
        if (text) text.textContent = `₦${total.toLocaleString()} / ₦${MIN.toLocaleString()}`;
    }
    updateMinBar();
}



function renderCartItems() {
    const container = document.querySelector('.cart-items');
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Your cart is empty.<br>Add some foodstuff!</p></div>`;
        return;
    }
    container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">₦${(item.price * item.qty).toLocaleString()}</div>
        <div class="ci-controls">
          <button class="ci-qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
          <span class="ci-qty">${item.qty}</span>
          <button class="ci-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
    </div>
  `).join('');
}

// ===== CART SOUND =====
function playCartSound() {
    try {
        const ctx = new(window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.setValueAtTime(600, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
        g.gain.setValueAtTime(0.3, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        o.start(ctx.currentTime);
        o.stop(ctx.currentTime + 0.3);
    } catch (e) {}
}

// ===== ORDER ID =====
function generateOrderId() {
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `ADX-${year}-${rand}`;
}

// ===== OPEN/CLOSED STATUS =====
function initStatusBanner() {
    const banner = document.getElementById('statusBanner');
    if (!banner) return;
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();
    let isOpen = false;
    if (day >= 1 && day <= 5) isOpen = hour >= 8 && hour < 21; // Mon-Fri 8am-9pm
    else if (day === 6) isOpen = hour >= 9 && hour < 20; // Sat 9am-8pm
    else if (day === 0) isOpen = hour >= 12 && hour < 19; // Sun 12pm-7pm

    if (isOpen) {
        banner.className = 'status-banner open';
        banner.innerHTML = '🟢 We\'re Open! Orders are being accepted right now 🎉';
    } else {
        banner.className = 'status-banner closed';
        banner.innerHTML = '🔴 We\'re currently closed. Check our hours below for when we reopen!';
    }
}

// ===== CONFETTI =====
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ff6b35', '#2e4057', '#ff9f43', '#22c55e', '#3b82f6', '#f59e0b'];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: -20,
            w: Math.random() * 12 + 6,
            h: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            speed: Math.random() * 4 + 2,
            spin: Math.random() * 6 - 3,
            drift: Math.random() * 2 - 1,
        });
    }

    let frame;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        pieces.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.rotation += p.spin;
            if (p.y < canvas.height + 20) alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (alive) { frame = requestAnimationFrame(animate); } else { canvas.remove(); }
    }
    animate();
    setTimeout(() => {
        cancelAnimationFrame(frame);
        canvas.remove();
    }, 5000);
}

// ===== CART SIDEBAR =====
function openCart() {
    const overlay = document.querySelector('.cart-overlay');
    const sidebar = document.querySelector('.cart-sidebar');
    if (overlay) overlay.classList.add('open');
    if (sidebar) sidebar.classList.add('open');
    renderCartItems();
    updateCartUI();
}

function closeCart() {
    const overlay = document.querySelector('.cart-overlay');
    const sidebar = document.querySelector('.cart-sidebar');
    if (overlay) overlay.classList.remove('open');
    if (sidebar) sidebar.classList.remove('open');
}

// ===== TOAST =====
function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}

// ===== NAVBAR =====
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }));
    }
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    });
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => { if (a.getAttribute('href') === current) a.classList.add('active'); });
    document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', openCart));
    const overlay = document.querySelector('.cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCart);
    const cartClose = document.querySelector('.cart-close');
    if (cartClose) cartClose.addEventListener('click', closeCart);
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) { showToast('🛒 Your cart is empty!'); return; }
        if (!window.location.href.includes('checkout.html')) { window.location.href = 'checkout.html'; }
    });
}

// ===== REVEAL =====
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}

// ===== HOME PAGE =====
function initHome() {
    const featured = document.querySelector('.featured-grid');
    if (!featured) return;
    const items = [FOOD_DATA[0], FOOD_DATA[5], FOOD_DATA[17]];
    featured.innerHTML = items.map(f => foodCardHTML(f, false)).join('');
    featured.querySelectorAll('.food-card').forEach(card => {
        card.classList.remove('reveal');
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    setTimeout(initTilt, 300);
}

function categoryLabel(cat) {
    const map = { grains: 'Grains', pasta: 'Pasta & Semo', oils: 'Oils', tomato: 'Tomato Paste', seasonings: 'Seasonings', spices: 'Spices' };
    return map[cat] || cat;
}

function foodCardHTML(food, showQty = true) {
    const displayPrice = food.price === 0 ? 'Ask' : `₦${food.price.toLocaleString()}`;
    return `
    <div class="food-card reveal">
      <div class="food-img-wrap">
  ${food.image 
  ? `<img src="images/${food.image}" alt="${food.name}" />`
  : `<div class="food-emoji">${food.emoji}</div>`
}
}
        ${food.badge ? `<div class="food-badge">${food.badge}</div>` : ''}
      </div>
      <div class="food-body">
        <div class="food-category">${categoryLabel(food.category)}</div>
        <div class="food-name">${food.name}</div>
        <div class="food-desc">${food.desc}</div>
        ${showQty ? `
        <div class="qty-wrap">
          <button class="qty-btn" onclick="this.nextElementSibling.textContent = Math.max(1, parseInt(this.nextElementSibling.textContent) - 1)">−</button>
          <span class="qty-num">1</span>
          <button class="qty-btn" onclick="this.previousElementSibling.textContent = parseInt(this.previousElementSibling.textContent) + 1">+</button>
        </div>` : ''}
        <div class="food-footer">
          <div class="food-price">${food.price === 0 ? '<span>Price on request</span>' : `₦<span>${food.price.toLocaleString()}</span>`}</div>
        </div>
        <button class="add-cart-btn" onclick="handleAddToCart(this, ${food.id})">🛒 Add to Cart</button>
      </div>
    </div>
  `;
}

function handleAddToCart(btn, id) {
  const card = btn.closest('.food-card');
  const qtyEl = card?.querySelector('.qty-num');
  const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
  addToCart(id, qty);
  btn.innerHTML = '✅ Added!';
  btn.classList.add('added');
  setTimeout(() => { btn.innerHTML = '🛒 Add to Cart'; btn.classList.remove('added'); }, 500);
}

// ===== SHOP PAGE =====
function initShop() {
  const grid = document.querySelector('.menu-grid');
  if (!grid) return;
  let activeCategory = 'all';

  function render() {
    const items = activeCategory === 'all' ? FOOD_DATA : FOOD_DATA.filter(f => f.category === activeCategory);
    grid.innerHTML = items.map(f => foodCardHTML(f, true)).join('');
    initReveal();
    setTimeout(initTilt, 300);
  }
  render();

  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      grid.style.opacity = '0'; grid.style.transform = 'translateY(10px)';
      setTimeout(() => { render(); grid.style.transition = 'all 0.3s ease'; grid.style.opacity = '1'; grid.style.transform = 'translateY(0)'; }, 200);
    });
  });
}

// ===== PICKUP POINTS =====
const GATE_PICKUPS = {
  north: ['Front Of North Gate', ' Junction  - North Gate', 'North Gate Bus Stop', 'North Market Square'],
  south: ['Front Of South Gate', 'RCF Junction', 'Peace Avenue Junction', 'Apatapiti Junction', 'Stateline Junction'],
  west:  ['Junction A - West Gate', 'Junction B - West Gate', 'West Gate Bus Stop', 'West End Junction'],
};

// ===== CHECKOUT PAGE =====
function initCheckout() {
  const summaryWrap = document.querySelector('.order-summary-items');
  if (!summaryWrap) return;

  // Generate Order ID
  const orderId = generateOrderId();
  const orderIdWrap = document.querySelector('.order-id-badge');
  if (orderIdWrap) orderIdWrap.querySelector('span').textContent = orderId;

  if (cart.length === 0) {
    summaryWrap.innerHTML = `<p style="color:var(--gray-400);font-size:.9rem;text-align:center;padding:1rem 0">No items in cart. <a href="shop.html" style="color:var(--primary)">Browse shop</a></p>`;
  } else {
    summaryWrap.innerHTML = cart.map(item => `
      <div class="order-item">
        <div><div class="oi-name">${item.emoji} ${item.name}</div><div class="oi-qty">× ${item.qty}</div></div>
        <div class="oi-price">₦${(item.price * item.qty).toLocaleString()}</div>
      </div>
    `).join('');
  }
  if (getCartTotal() < 500) { 
    showToast(`⚠️ Minimum order is ₦500. Add ₦${(500 - getCartTotal()).toLocaleString()} more!`); 
    return; 
}

  const totalEl = document.querySelector('.order-total-price');
  if (totalEl) totalEl.textContent = '₦' + getCartTotal().toLocaleString();

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const screenshotInput = document.getElementById('screenshot');
  const fileWrap = document.querySelector('.file-upload-wrap');
  const filePreview = document.querySelector('.file-preview');
  let screenshotUploaded = false;
  let currentLocation = 'campus';

  // Location toggle
  document.querySelectorAll('.loc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.loc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLocation = btn.dataset.loc;
      if (currentLocation === 'campus') {
        document.getElementById('campus-fields').style.display = 'block';
        document.getElementById('offcampus-fields').style.display = 'none';
      } else {
        document.getElementById('campus-fields').style.display = 'none';
        document.getElementById('offcampus-fields').style.display = 'block';
      }
    });
  });

  // Gate cascade
  const gateSelect = document.getElementById('gate');
  const pickupSelect = document.getElementById('pickup');
  const pickupGroup = document.getElementById('pickup-group');
  if (gateSelect) {
    gateSelect.addEventListener('change', () => {
      const gate = gateSelect.value;
      if (gate && GATE_PICKUPS[gate]) {
        pickupSelect.innerHTML = `<option value="">-- Choose pickup point --</option>` + GATE_PICKUPS[gate].map(p => `<option>${p}</option>`).join('');
        pickupGroup.style.display = 'block';
      } else { pickupGroup.style.display = 'none'; }
    });
  }

  if (nameInput) nameInput.addEventListener('input', () => { nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, ''); clearError(nameInput); });
  if (phoneInput) phoneInput.addEventListener('input', () => { phoneInput.value = phoneInput.value.replace(/[^0-9]/g, ''); clearError(phoneInput); });
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput));

  if (fileWrap && screenshotInput) {
    fileWrap.addEventListener('click', () => screenshotInput.click());
    fileWrap.addEventListener('dragover', e => { e.preventDefault(); fileWrap.classList.add('dragover'); });
    fileWrap.addEventListener('dragleave', () => fileWrap.classList.remove('dragover'));
    fileWrap.addEventListener('drop', e => { e.preventDefault(); fileWrap.classList.remove('dragover'); screenshotInput.files = e.dataTransfer.files; handleFileUpload(screenshotInput); });
    screenshotInput.addEventListener('change', () => handleFileUpload(screenshotInput));
  }

  function handleFileUpload(input) {
    if (input.files && input.files[0]) {
      screenshotUploaded = true;
      if (filePreview) { filePreview.innerHTML = `✅ ${input.files[0].name}`; filePreview.classList.add('show'); }
      if (fileWrap) fileWrap.style.borderColor = 'var(--success)';
    }
  }

 const waBtn = document.querySelector('.whatsapp-btn');
if (waBtn) {
  waBtn.addEventListener('click', async () => {
    if (!validateForm()) return;
    if (cart.length === 0) { showToast('🛒 Your cart is empty!'); return; }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const total = getCartTotal();
    const items = cart.map(i => `• ${i.emoji} ${i.name} x${i.qty} = ₦${(i.price * i.qty).toLocaleString()}`).join('\n');

    let deliveryInfo = '';
    if (currentLocation === 'campus') {
      deliveryInfo = `🏫 *Hostel:* ${document.getElementById('hostel').value}`;
    } else {
      const gateEl = document.getElementById('gate');
      const gate = gateEl.options[gateEl.selectedIndex].text;
      const pickup = document.getElementById('pickup').value;
      deliveryInfo = `🚪 *Gate:* ${gate}\n📍 *Pickup Point:* ${pickup}`;
    }

    // STEP 1 — Save order to backend FIRST to get Order ID
    waBtn.textContent = '⏳ Processing...';
    waBtn.disabled = true;

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, email,
        delivery: currentLocation === 'campus'
          ? document.getElementById('hostel').value
          : `${document.getElementById('gate').options[document.getElementById('gate').selectedIndex].text} - ${document.getElementById('pickup').value}`,
        items: cart,
        total: getCartTotal()
      })
    });
    // Send order details to Formspree
fetch('https://formspree.io/f/xvzvdlyk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    name: name,
    phone: phone,
    order_id: orderId,
    delivery: currentLocation === 'campus'
      ? document.getElementById('hostel').value
      : document.getElementById('pickup').value,
    items: cart.map(i => `${i.name} x${i.qty} = ₦${(i.price * i.qty).toLocaleString()}`).join(', '),
    total: '₦' + getCartTotal().toLocaleString()
  })
});

    const orderData = await orderRes.json();

    waBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:20px;height:20px;fill:white;flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> I've Made Payment — Send via WhatsApp`;
    waBtn.disabled = false;

    if (!orderData.success) {
      showToast('❌ Error saving order. Please try again!');
      return;
    }

    const orderId = orderData.orderId;

    // STEP 2 — Now build WhatsApp message with real Order ID
    const message = encodeURIComponent(
      `📦 *NEW ORDER - ADOX FOODS* 📦\n\n` +
      `🔢 *Order ID:* ${orderId}\n\n` +
      `👤 *Customer:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `${deliveryInfo}\n\n` +
      `📋 *Order Details:*\n${items}\n\n` +
      `💰 *Total: ₦${total.toLocaleString()}*\n\n` +
      `✅ Payment made via GTBank.\n` +
      `📸 Please see attached payment screenshot.\n\n` +
      `_Thank you for choosing Adox Foods!_ 🧡`
    );

    // STEP 3 — Save to localStorage
    localStorage.setItem('adoxLastOrder', JSON.stringify(cart));
    localStorage.setItem('adoxLastTotal', getCartTotal());
    localStorage.setItem('adoxLastOrderId', orderId);

    // STEP 4 — Open WhatsApp
    window.open(`https://wa.me/2348012345678?text=${message}`, '_blank');
    setTimeout(() => showConfirmModal(), 800);
  });
}

  function validateForm() {
    let valid = true;
    const name = nameInput?.value.trim();
    const phone = phoneInput?.value.trim();
    const email = emailInput?.value.trim();
    if (!name || name.length < 2) { showError(nameInput, 'Please enter your full name'); valid = false; }
    if (!phone || phone.length < 10 || phone.length > 14) { showError(phoneInput, 'Enter a valid phone number (10-14 digits)'); valid = false; }
    if (!email || !email.includes('@')) { showError(emailInput, 'Please enter a valid email address'); valid = false; }
    if (currentLocation === 'campus') {
      const hostel = document.getElementById('hostel').value;
      if (!hostel) { showError(document.getElementById('hostel'), 'Please select your hostel'); valid = false; }
    } else {
      if (!document.getElementById('gate').value) { showError(document.getElementById('gate'), 'Please select a gate'); valid = false; }
      if (!document.getElementById('pickup').value) { showError(document.getElementById('pickup'), 'Please select a pickup point'); valid = false; }
    }
    if (!screenshotUploaded) { showToast('📸 Please upload your payment screenshot!'); if (fileWrap) fileWrap.style.borderColor = '#ef4444'; valid = false; }
    if (cart.length === 0) { showToast('🛒 Add items to your cart first!'); valid = false; }
    return valid;
  }

  function showError(input, msg) {
    if (!input) return;
    input.classList.add('error');
    const err = input.nextElementSibling;
    if (err && err.classList.contains('form-error')) { err.textContent = msg; err.classList.add('show'); }
  }

  function clearError(input) {
    if (!input) return;
    input.classList.remove('error');
    const err = input.nextElementSibling;
    if (err && err.classList.contains('form-error')) err.classList.remove('show');
  }
}

function showConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (modal) modal.classList.add('open');
}

function handleModalYes() {
  clearCart();
  document.getElementById('confirmModal')?.classList.remove('open');
  window.location.href = 'thankyou.html';
}

function handleModalNo() {
  document.getElementById('confirmModal')?.classList.remove('open');
}

// ===== 3D TILT =====
function initTilt() {
  document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rotX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
      const rotY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'all 0.5s ease'; });
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  });
}
function toggleFilterDropdown() {
  const dd = document.getElementById('filterDropdown');
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

function selectCategory(btn, label) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('activeCatLabel').textContent = label;
  document.getElementById('filterDropdown').style.display = 'none';
  btn.dispatchEvent(new Event('click')); // triggers existing filter logic
}

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  const dd = document.getElementById('filterDropdown');
  const toggle = document.getElementById('filterToggle');
  if (dd && toggle && !toggle.contains(e.target) && !dd.contains(e.target)) {
    dd.style.display = 'none';
  }
});


// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStatusBanner();
  initNavbar();
  updateCartUI();
  initReveal();
  initHome();
  initShop();
  initCheckout();
  setTimeout(initTilt, 500);
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => setTimeout(initTilt, 400));
  });
  });