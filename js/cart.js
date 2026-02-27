/* Cart state (localStorage) + events to update UI across pages. */
(function () {
  window.SC = window.SC || {};

  var CART_KEY = "cart";

  function readCart() {
    return SC.storage.get(CART_KEY, { items: {} });
  }

  function writeCart(cart) {
    SC.storage.set(CART_KEY, cart);
    window.dispatchEvent(new CustomEvent("sc:cart-changed", { detail: cart }));
  }

  function clampQty(qty) {
    qty = Number(qty || 0);
    if (!isFinite(qty)) return 1;
    return Math.max(1, Math.min(99, Math.round(qty)));
  }

  function getProductById(id) {
    return (SC.products || []).find(function (p) {
      return p.id === id;
    });
  }

  SC.cart = {
    get: function () {
      return readCart();
    },
    clear: function () {
      writeCart({ items: {} });
    },
    add: function (productId, qty) {
      var p = getProductById(productId);
      if (!p) return;

      var cart = readCart();
      var current = cart.items[productId] || 0;
      cart.items[productId] = clampQty(current + (qty ? Number(qty) : 1));
      writeCart(cart);
    },
    setQty: function (productId, qty) {
      var p = getProductById(productId);
      if (!p) return;

      var cart = readCart();
      if (!cart.items[productId]) cart.items[productId] = 1;
      cart.items[productId] = clampQty(qty);
      writeCart(cart);
    },
    dec: function (productId) {
      var cart = readCart();
      if (!cart.items[productId]) return;
      cart.items[productId] = clampQty(cart.items[productId] - 1);
      writeCart(cart);
    },
    inc: function (productId) {
      var cart = readCart();
      if (!cart.items[productId]) cart.items[productId] = 0;
      cart.items[productId] = clampQty(cart.items[productId] + 1);
      writeCart(cart);
    },
    remove: function (productId) {
      var cart = readCart();
      delete cart.items[productId];
      writeCart(cart);
    },
    getCount: function () {
      var cart = readCart();
      return Object.keys(cart.items).reduce(function (sum, k) {
        return sum + Number(cart.items[k] || 0);
      }, 0);
    },
    getLineItems: function () {
      var cart = readCart();
      var items = Object.keys(cart.items).map(function (id) {
        var p = getProductById(id);
        if (!p) return null;
        var qty = Number(cart.items[id] || 0);
        return {
          product: p,
          qty: qty,
          lineTotal: qty * p.price,
        };
      });
      return items.filter(Boolean);
    },
    getTotals: function () {
      var items = SC.cart.getLineItems();
      var subtotal = items.reduce(function (sum, li) {
        return sum + li.lineTotal;
      }, 0);
      var shipping = subtotal > 4999 ? 0 : subtotal === 0 ? 0 : 199;
      var total = subtotal + shipping;
      return { subtotal: subtotal, shipping: shipping, total: total };
    },
  };
})();
