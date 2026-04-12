//@ts - nocheck
// ===== ADOX FOODS - MAIN SCRIPT =====

// ===== FOOD DATA =====
const FOOD_DATA = [
    // GRAINS
    { id: 1, name: "A Congo Of Rice", category: "grains", emoji: "🌾", image: "rice.png", price: 2400, desc: "Fresh, quality rice measured by the congo", badge: "🔥 Popular" },
    { id: 2, name: "A Congo Of White Beans", category: "grains", emoji: "🫘", image: "whitebeans.jpeg", price: 2100, desc: "Fresh white beans, perfect for any meal", badge: null },
    { id: 3, name: "A Congo Of Oloyin Beans", category: "grains", emoji: "🫘", image: "oloyin.png", price: 2800, desc: "Premium Oloyin honey beans", badge: null },
    { id: 4, name: "A Congo Of Garri", category: "grains", emoji: "🥣", image: "gari.png", price: 600, desc: "Fresh garri, measured by the congo", badge: "⭐ Best" },
    //{ id: 5, name: "Kivo Garri", category: "grains", emoji: "🥣", image: "garri.png", price: 400, desc: "Packaged Kivo garri — student favourite", badge: null },
    // PASTA & SEMOVITA
    { id: 6, name: "Golden Penny Spag", category: "pasta", emoji: "🍝", image: "GoldenPennySpag.png", price: 1100, desc: "Golden Penny spaghetti — full pack", badge: "🔥 Popular" },
    { id: 7, name: "Mama's Pride Spag", category: "pasta", emoji: "🍝", image: "mamaspag.png", price: 950, desc: "Mama's Pride spaghetti — budget friendly", badge: null },
    { id: 8, name: "Auntie B Spag", category: "pasta", emoji: "🍝", image: "AuntieB spag.png", price: 950, desc: "Auntie B spaghetti — great quality", badge: null },
    { id: 9, name: "Crown Spag", category: "pasta", emoji: "🍝", image: "CrownSpag.png", price: 1050, desc: "Crown spaghetti — premium quality", badge: null },
    { id: 10, name: "Semo 1kg", category: "pasta", emoji: "🫙", image: "1kkgsemo.png", price: 1800, desc: "Semovita 1kg pack — full size", badge: null },
    { id: 11, name: "Semo 500g", category: "pasta", emoji: "🫙", image: "500gsemo.jpeg", price: 950, desc: "Semovita 500g pack — student size", badge: null },
    // OILS
    { id: 12, name: "A Bottle Of Palm Oil", category: "oils", emoji: "🫙", image: "p.oil.png", price: 1480, desc: "Full bottle of fresh palm oil", badge: null },
    { id: 32, name: "Half A Bottle Of Palm Oil", category: "oils", emoji: "🫙", image: "p.oil.png", price: 750, desc: "Half a bottle of fresh palm oil", badge: null },
    { id: 13, name: "A Bottle Of Vegetable Oil", category: "oils", emoji: "🫙", image: "voil.png", price: 2100, desc: "Full bottle of vegetable oil", badge: null },
    { id: 33, name: "Half A Bottle Of Vegetable Oil", category: "oils", emoji: "🫙", image: "halfvoil.jpeg", price: 1100, desc: "Half a bottle of vegetable oil", badge: null },
    { id: 14, name: "Power Oil (1 Roll, 8 Pieces)", category: "oils", emoji: "🛢️", image: "poweroil.png", price: 1900, desc: "Power Oil — 1 roll", badge: "⭐ Best" },
    { id: 30, name: "Power Oil (1/2 Roll, 4 Pieces)", category: "oils", emoji: "🛢️", image: "halfpoil.jpeg", price: 980, desc: "Power Oil — 1/2 roll", badge: null },
    { id: 31, name: "A Sachet Of Power Oil", category: "oils", emoji: "🛢️", image: "sachetoil.jfif", price: 250, desc: "A Sachet Of Power Oil", badge: null },
    // TOMATO PASTE
    { id: 15, name: "Party Jollof Tomato Paste", category: "tomato", emoji: "🍅", image: "partyjollof.png", price: 250, desc: "Party Jollof tomato paste — per tin", badge: null },
    { id: 16, name: "Pepper & Onions Tomato Paste", category: "tomato", emoji: "🍅", image: "potomat.png", price: 200, desc: "Pepper and onions tomato paste — per tin", badge: null },
    { id: 17, name: "Tomato Paste Mix (Normal)", category: "tomato", emoji: "🍅", image: "tomatpaste.png", price: 200, desc: "Regular tomato paste mix — per tin", badge: null },
    // SEASONINGS
    { id: 18, name: "Knorr Seasoning Cube (10 Cubes)", category: "seasonings", emoji: "🧊", image: "knorr.png", price: 650, desc: "Knorr seasoning cubes — pack of 10 ", badge: "🔥 Popular" },
    { id: 19, name: "Chicken Flavor Cube (20 Cubes)", category: "seasonings", emoji: "🧊", image: "c.flvormag.jpg", price: 400, desc: "Chicken flavor seasoning — pack of 20", badge: null },
    { id: 23, name: "Jollof Spicity", category: "seasonings", emoji: "🌶️", image: "jollofspicity.jpeg", price: 150, desc: "Jollof spice mix — perfect blend", badge: null },
    { id: 29, name: "Hot Pepper", category: "seasonings", emoji: "🌶️", image: "hotpeper.png", price: 100, desc: "Ground hot pepper — per pack", badge: null },
    // SPICES
    { id: 21, name: "Thyme", category: "spices", emoji: "🌿", image: "thyme.jpg", price: 100, desc: "Dried thyme — per pack", badge: null },
    { id: 22, name: "Curry", category: "spices", emoji: "🌿", image: "curry.jpeg", price: 100, desc: "Curry powder — per pack", badge: null },
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
    showToast('🛒 ' + food.name + ' added to cart!');
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
    refreshCheckoutSummary();
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
    if (!summaryWrap) return;
    summaryWrap.innerHTML = cart.map(item =>
        `<div class="order-item"><div><div class="oi-name">${item.emoji} ${item.name}</div><div class="oi-qty">× ${item.qty}</div></div><div class="oi-price">₦${(item.price * item.qty).toLocaleString()}</div></div>`
    ).join('');
    const totalEl = document.querySelector('.order-total-price');
    if (totalEl) totalEl.textContent = '₦' + getCartTotal().toLocaleString();
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
    updateMinBar();
}

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
    const day = now.getDay();
    const hour = now.getHours();
    let isOpen = false;
    if (day >= 1 && day <= 5) isOpen = hour >= 8 && hour < 21;
    else if (day === 6) isOpen = hour >= 9 && hour < 20;
    else if (day === 0) isOpen = hour >= 12 && hour < 19;
    if (isOpen) {
        banner.className = 'status-banner open';
        banner.innerHTML = '🟢 We\'re Open! Orders are being accepted right now';
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
    const _overlay = document.querySelector('.cart-overlay');
    const _sidebar = document.querySelector('.cart-sidebar');
    if (_overlay) _overlay.classList.add('open');
    if (_sidebar) _sidebar.classList.add('open');
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
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
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
        if (getCartTotal() < 500) { showToast(`⚠️ Minimum order is ₦500. Add ₦${(500 - getCartTotal()).toLocaleString()} more!`); return; }
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
    const imageHTML = food.image ?
        `<img src="images/${food.image}" alt="${food.name}" />` :
        `<div class="food-emoji">${food.emoji}</div>`;
    const badgeHTML = food.badge ? `<div class="food-badge">${food.badge}</div>` : '';
    const qtyHTML = showQty ?
        `<div class="qty-wrap">
        <button class="qty-btn" onclick="this.nextElementSibling.textContent = Math.max(1, parseInt(this.nextElementSibling.textContent) - 1)">−</button>
        <span class="qty-num">1</span>
        <button class="qty-btn" onclick="this.previousElementSibling.textContent = parseInt(this.previousElementSibling.textContent) + 1">+</button>
       </div>` :
        '';
    const priceHTML = food.price === 0 ? '<span>Price on request</span>' : `₦<span>${food.price.toLocaleString()}</span>`;
    return `
    <div class="food-card reveal">
      <div class="food-img-wrap">${imageHTML}${badgeHTML}</div>
      <div class="food-body">
        <div class="food-category">${categoryLabel(food.category)}</div>
        <div class="food-name">${food.name}</div>
        <div class="food-desc">${food.desc}</div>
        ${qtyHTML}
        <div class="food-footer"><div class="food-price">${priceHTML}</div></div>
        <button class="add-cart-btn" onclick="handleAddToCart(this, ${food.id})">🛒 Add to Cart</button>
      </div>
    </div>`;
}

function handleAddToCart(btn, id) {
    const card = btn.closest('.food-card');
    const qtyEl = card ? card.querySelector('.qty-num') : null;
    const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;
    addToCart(id, qty);
    btn.innerHTML = '✅ Added!';
    btn.classList.add('added');
    setTimeout(() => {
        btn.innerHTML = '🛒 Add to Cart';
        btn.classList.remove('added');
    }, 500);
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
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(10px)';
            setTimeout(() => {
                render();
                grid.style.transition = 'all 0.3s ease';
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

// ===== PICKUP POINTS =====
const GATE_PICKUPS = {
    north: ['North Gate Junction', 'Deeper Life Junction', 'North Gate Bus Stop', 'North Market Square'],
    south: ['South Gate Junction', 'RCF Junction', 'Peace Avenue Junction', 'Apatapiti Junction', 'Stateline Junction', 'CAC Chapel Of Praise', 'Deeper Life Church'],
    west: ['Westgate Junction', 'Aside Junction', 'CACCF Junction', 'Filaoye Junction', 'Capricorn Junction', 'Yeolab Junction'],
};

// ===== CHECKOUT PAGE =====
function initCheckout() {
    const summaryWrap = document.querySelector('.order-summary-items');
    if (!summaryWrap) return;

    if (cart.length === 0) {
        summaryWrap.innerHTML = `<p style="color:var(--gray-400);font-size:.9rem;text-align:center;padding:1rem 0">No items in cart. <a href="shop.html" style="color:var(--primary)">Browse shop</a></p>`;
    } else {
        summaryWrap.innerHTML = cart.map(item => `
      <div class="order-item">
        <div><div class="oi-name">${item.emoji} ${item.name}</div><div class="oi-qty">× ${item.qty}</div></div>
        <div class="oi-price">₦${(item.price * item.qty).toLocaleString()}</div>
      </div>`).join('');
    }

    const totalEl = document.querySelector('.order-total-price');
    if (totalEl) totalEl.textContent = '₦' + getCartTotal().toLocaleString();

    // Location toggle
    document.querySelectorAll('.loc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.loc-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const loc = btn.dataset.loc;
            if (loc === 'campus') {
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
                pickupSelect.innerHTML = `<option value="">-- Choose pickup point --</option>` +
                    GATE_PICKUPS[gate].map(p => `<option>${p}</option>`).join('');
                pickupGroup.style.display = 'block';
            } else { pickupGroup.style.display = 'none'; }
        });
    }
}

// ===== MODAL =====
function showConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.add('open');
}

function handleModalYes() {
    clearCart();
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.remove('open');
    window.location.href = 'thankyou.html';
}

function handleModalNo() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.remove('open');
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
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s ease';
        });
        card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    });
}

// ===== FILTER DROPDOWN =====
function toggleFilterDropdown() {
    const dd = document.getElementById('filterDropdown');
    if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

function selectCategory(btn, label) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const labelEl = document.getElementById('activeCatLabel');
    if (labelEl) labelEl.textContent = label;
    const dd = document.getElementById('filterDropdown');
    if (dd) dd.style.display = 'none';
    btn.dispatchEvent(new Event('click'));
}
document.addEventListener('click', e => {
    const dd = document.getElementById('filterDropdown');
    const toggle = document.getElementById('filterToggle');
    if (dd && toggle && !toggle.contains(e.target) && !dd.contains(e.target)) dd.style.display = 'none';
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