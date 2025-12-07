// ====== Config ======
const DATA_URL = '../data/product.json';
const SAMPLE_COUNT = 5;       // hiển thị khoảng 5 sản phẩm
const TAX_RATE = 0.08;        // Thuế 8%
const SHIPPING_BASE = 15000;  // Phí ship mặc định
const FREE_SHIP_THRESHOLD = 200000; // >= 200k miễn ship

let state = {
  items: [],        // {id, name, unitPrice, image, brand, category, rating, qty}
  discountValue: 0, // luôn bằng 0
  shipping: 0,      // phí ship (tính động)
};

const els = {
  items: document.getElementById('cart-items'),
  subtotal: document.getElementById('subtotal'),
  tax: document.getElementById('tax'),
  discount: document.getElementById('discount'),
  shipping: document.getElementById('shipping'),
  grand: document.getElementById('grandTotal'),
  placeOrderBtn: document.getElementById('placeOrder'),
  checkoutForm: document.getElementById('checkoutForm'),
  tpl: document.getElementById('cart-item-template')
};

// ======================== Helpers ====================
const vnd = n => `${(Math.round(n)).toLocaleString('vi-VN')} VNĐ`;

function calcTotals() {
  const subtotal = state.items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);

  // Shipping rule
  let shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_BASE;

  // Discount luôn = 0
  let discount = 0;

  const grand = Math.max(0, subtotal + tax + shipping - discount);

  state.discountValue = discount;
  state.shipping = shipping;

  return { subtotal, tax, discount, shipping, grand };
}

function renderTotals() {
  const { subtotal, tax, discount, shipping, grand } = calcTotals();
  els.subtotal.textContent = vnd(subtotal);
  els.tax.textContent = vnd(tax);
  els.discount.textContent = `- ${vnd(discount)}`;
  els.shipping.textContent = vnd(shipping);
  els.grand.textContent = vnd(grand);
}

function renderItems() {
  els.items.innerHTML = '';
  if (state.items.length === 0) {
    els.items.innerHTML = `<div class="cart-item empty">
      <div class="item-info"><h4 class="item-name">Giỏ hàng trống</h4>
      <div class="item-meta">Hãy tiếp tục mua sắm để thêm sản phẩm.</div></div></div>`;
    renderTotals();
    return;
  }

  state.items.forEach(product => {
    const node = els.tpl.content.cloneNode(true);
    const root = node.querySelector('.cart-item');
    root.dataset.id = product.id;

    const img = node.querySelector('.item-thumb img');
    img.src = product.image;
    img.alt = product.name;

    node.querySelector('.item-name').textContent = product.name;
    node.querySelector('.item-brand').textContent = product.brand || '—';
    node.querySelector('.item-category').textContent = product.category || '—';
    node.querySelector('.item-rating').textContent = `★ ${product.rating ?? '-'}`;
    node.querySelector('.item-price').textContent = vnd(product.unitPrice);

    const qtyInput = node.querySelector('.qty-input');
    qtyInput.value = product.qty;
    const decBtn = node.querySelector('.qty-btn.dec');
    const incBtn = node.querySelector('.qty-btn.inc');
    const removeBtn = node.querySelector('.remove-item');

    // Events
    decBtn.addEventListener('click', () => changeQty(product.id, -1));
    incBtn.addEventListener('click', () => changeQty(product.id, +1));
    qtyInput.addEventListener('input', e => setQty(product.id, parseInt(e.target.value || '1', 10)));
    removeBtn.addEventListener('click', () => removeItem(product.id));

    els.items.appendChild(node);
  });

  renderTotals();
}

function changeQty(id, delta) {
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  it.qty = Math.max(1, (it.qty || 1) + delta);
  renderItems();
}

function setQty(id, qty) {
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  it.qty = Math.max(1, isNaN(qty) ? 1 : qty);
  renderItems();
}

function removeItem(id) {
  state.items = state.items.filter(x => x.id !== id);
  renderItems();
}

// ====== Boot ======
async function loadProducts() {
  const res = await fetch(DATA_URL);
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.items || []);
  const picked = list.slice(0, SAMPLE_COUNT);

  state.items = picked.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    rating: p.rating,
    unitPrice: p.unitPrice,
    image: p.image || p.mainImage,
    qty: 1
  }));

  renderItems();
}

function wireEvents() {
  els.checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const { subtotal, tax, discount, shipping, grand } = calcTotals();
    if (state.items.length === 0) {
      alert('Giỏ hàng đang trống. Vui lòng thêm sản phẩm.');
      return;
    }
    // Demo: hiển thị thông tin đơn
    const formData = new FormData(els.checkoutForm);
    const name = formData.get('customerName');
    const addr = formData.get('address');
    const phone = formData.get('phone');
    const pay = formData.get('paymentMethod');
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  wireEvents();
  try {
    await loadProducts();
  } catch (err) {
    console.error(err);
    els.items.innerHTML = '<p>Lỗi tải dữ liệu sản phẩm.</p>';
  }
});
