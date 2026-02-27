/* Bootstraps shared behavior across pages. */
(function () {
  window.SC = window.SC || {};

  function bindGlobalAddToCart() {
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-add-to-cart]") : null;
      if (!btn) return;
      var id = btn.getAttribute("data-add-to-cart");
      if (!id) return;

      SC.cart.add(id, 1);
      SC.ui.toast("Added to cart.");
    });
  }

  function bindCartBadgeUpdates() {
    window.addEventListener("sc:cart-changed", function () {
      SC.ui.updateCartBadge();
    });
  }

  SC.boot = function (activeNavKey) {
    SC.ui.mountLayout(activeNavKey);
    bindGlobalAddToCart();
    bindCartBadgeUpdates();

    // Gentle reveal for above-the-fold blocks (keeps UI feeling premium).
    setTimeout(function () {
      SC.anim.reveal();
    }, 80);
  };
})();
