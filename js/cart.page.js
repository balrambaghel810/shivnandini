(function () {
  window.SC = window.SC || {};
  SC.pages = SC.pages || {};

  function renderCart() {
    var listEl = SC.util.qs("#cart-list");
    var emptyEl = SC.util.qs("#cart-empty");
    var summaryEl = SC.util.qs("#cart-summary");
    if (!listEl || !summaryEl) return;

    var items = SC.cart.getLineItems();

    if (!items.length) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("hidden");
      summaryEl.innerHTML =
        '<p class="text-sm text-black/60">Your cart is empty. Start exploring our collections to fill it with hand picked pieces.</p>';
      return;
    }
    if (emptyEl) emptyEl.classList.add("hidden");

    listEl.innerHTML = items
      .map(function (li) {
        var p = li.product;
        var img = (p.images && p.images[0]) || "";
        return (
          '<div class="flex gap-4 border-b border-black/5 py-4 last:border-none" data-cart-line="' +
          p.id +
          '">' +
          '  <div class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-[#fbf7f5]">' +
          '    <img src="' +
          img +
          '" alt="' +
          p.name +
          '" class="h-full w-full object-cover" />' +
          "  </div>" +
          '  <div class="flex flex-1 flex-col justify-between gap-2">' +
          '    <div class="flex items-start justify-between gap-3">' +
          '      <div>' +
          '        <a href="product.html?id=' +
          encodeURIComponent(p.id) +
          '" class="text-sm font-semibold text-black hover:underline">' +
          p.name +
          "</a>" +
          '        <div class="mt-1 text-xs text-black/60">' +
          (p.category || "") +
          "</div>" +
          "      </div>" +
          '      <div class="text-right text-sm font-semibold text-black">' +
          SC.util.money(p.price) +
          "</div>" +
          "    </div>" +
          '    <div class="flex flex-wrap items-center justify-between gap-3 text-xs">' +
          '      <div class="inline-flex items-center rounded-2xl border border-black/10 bg-white px-3 py-1.5">' +
          '        <button class="px-1 text-black/60" data-cart-dec="' +
          p.id +
          '" type="button">-</button>' +
          '        <input type="number" min="1" max="99" value="' +
          li.qty +
          '" data-cart-qty-input="' +
          p.id +
          '" class="mx-1 w-10 border-none bg-transparent text-center text-xs focus:outline-none" />' +
          '        <button class="px-1 text-black/60" data-cart-inc="' +
          p.id +
          '" type="button">+</button>' +
          "      </div>" +
          '      <button class="inline-flex items-center gap-1 text-black/55 hover:text-black" data-cart-remove="' +
          p.id +
          '" type="button">' +
          '        <i class="fa-regular fa-trash-can text-[11px]"></i>' +
          "        Remove" +
          "      </button>" +
          '      <div class="ml-auto text-right text-xs text-black/60">' +
          "        Line total: " +
          SC.util.money(li.lineTotal) +
          "      </div>" +
          "    </div>" +
          "  </div>" +
          "</div>"
        );
      })
      .join("");

    var totals = SC.cart.getTotals();
    summaryEl.innerHTML =
      '<h2 class="font-serif text-lg text-black">Order summary</h2>' +
      '<div class="mt-4 space-y-2 text-sm text-black/70">' +
      "  <div class=\"flex justify-between\"><span>Subtotal</span><span>" +
      SC.util.money(totals.subtotal) +
      "</span></div>" +
      "  <div class=\"flex justify-between\"><span>Shipping</span><span>" +
      (totals.shipping === 0 ? "Complimentary" : SC.util.money(totals.shipping)) +
      "</span></div>" +
      "</div>" +
      '<div class="mt-4 flex justify-between border-t border-black/5 pt-4 text-sm font-semibold text-black">' +
      "  <span>Total</span><span>" +
      SC.util.money(totals.total) +
      "</span>" +
      "</div>" +
      '<button id="cart-checkout-btn" class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">' +
      '  <i class="fa-solid fa-arrow-right-to-bracket"></i>' +
      "  Proceed to checkout" +
      "</button>" +
      '<button id="cart-continue-btn" class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">' +
      "  Continue shopping" +
      "</button>" +
      '<p class="mt-3 text-xs text-black/55">This is a front-end preview. Integrate your preferred payment gateway or platform for live orders.</p>';
  }

  function bindEvents() {
    var listEl = SC.util.qs("#cart-list");
    if (!listEl) return;

    listEl.addEventListener("click", function (e) {
      var target = e.target;
      var dec = target.closest("[data-cart-dec]");
      var inc = target.closest("[data-cart-inc]");
      var remove = target.closest("[data-cart-remove]");
      if (dec) {
        SC.cart.dec(dec.getAttribute("data-cart-dec"));
        renderCart();
      } else if (inc) {
        SC.cart.inc(inc.getAttribute("data-cart-inc"));
        renderCart();
      } else if (remove) {
        SC.cart.remove(remove.getAttribute("data-cart-remove"));
        renderCart();
      }
    });

    listEl.addEventListener("change", function (e) {
      var input = e.target.closest("[data-cart-qty-input]");
      if (!input) return;
      var id = input.getAttribute("data-cart-qty-input");
      var qty = Number(input.value || 1);
      SC.cart.setQty(id, qty);
      renderCart();
    });

    document.addEventListener("click", function (e) {
      var checkout = e.target.closest("#cart-checkout-btn");
      var cont = e.target.closest("#cart-continue-btn");
      if (checkout) {
        e.preventDefault();
        SC.ui.toast("Checkout flow not connected yet. Integrate your payment gateway here.");
      } else if (cont) {
        e.preventDefault();
        window.location.href = "shop.html";
      }
    });

    window.addEventListener("sc:cart-changed", function () {
      renderCart();
    });
  }

  SC.pages.cart = function () {
    renderCart();
    bindEvents();
  };
})();
