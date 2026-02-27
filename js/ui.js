/* Shared UI components. Pages call these to keep markup consistent. */
(function () {
  window.SC = window.SC || {};

  function badgePill(badge) {
    if (!badge) return "";
    var style =
      badge === "Sale"
        ? "bg-rose-600 text-white"
        : badge === "Best Seller"
          ? "bg-black text-white"
          : "bg-white text-black border border-black/10";
    return (
      '<span class="absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ' +
      style +
      '">' +
      badge +
      "</span>"
    );
  }

  function safeText(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  SC.ui = {
    mountLayout: function (active) {
      var header = document.getElementById("site-header");
      var footer = document.getElementById("site-footer");
      if (header) header.innerHTML = SC.ui.navbar(active);
      if (footer) footer.innerHTML = SC.ui.footer();
      SC.ui.bindNavbar();
      SC.ui.updateCartBadge();
    },

    navbar: function (active) {
      function isActive(key) {
        return active === key ? "text-black" : "text-black/70 hover:text-black";
      }

      return (
        '<div class="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">' +
        '  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">' +
        '    <div class="flex h-16 items-center justify-between gap-3">' +
        '      <a href="' +
        SC.routes.home +
        '" class="group flex items-center gap-2">' +
        '        <div class="grid place-items-center">' +
        '        <img alt="" src="./logo.png" class="h-auto w-12" loading="lazy" />' +
        "        </div>" +
        '        <div class="leading-tight">' +
        '          <div class="font-serif text-sm sm:text-base tracking-tight text-black">' +
        safeText(SC.config.brandName) +
        "</div>" +
        '          <div class="text-xs text-black/60">' +
        safeText(SC.config.tagline) +
        "</div>" +
        "        </div>" +
        "      </a>" +
        "" +
        '      <div class="hidden items-center gap-6 md:flex">' +
        '        <a class="text-sm font-medium ' +
        isActive("home") +
        '" href="' +
        SC.routes.home +
        '">Home</a>' +
        '        <a class="text-sm font-medium ' +
        isActive("shop") +
        '" href="' +
        SC.routes.shop +
        '">Shop</a>' +
        '        <a class="text-sm font-medium ' +
        isActive("sarees") +
        '" href="' +
        SC.routes.sarees +
        '">Sarees</a>' +
        '        <a class="text-sm font-medium ' +
        isActive("about") +
        '" href="' +
        SC.routes.about +
        '">About</a>' +
        '        <a class="text-sm font-medium ' +
        isActive("contact") +
        '" href="' +
        SC.routes.contact +
        '">Contact</a>' +
        "      </div>" +
        "" +
        '      <div class="flex items-center gap-2">' +
        '        <a href="' +
        SC.routes.cart +
        '" class="relative inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">' +
        '          <span class="hidden sm:inline">Cart</span>' +
        '          <i class="fa-solid fa-bag-shopping"></i>' +
        '          <span id="nav-cart-badge" class="absolute -right-2 -top-2 hidden min-w-5 rounded-full bg-black px-1.5 py-0.5 text-center text-xs font-bold text-white"></span>' +
        "        </a>" +
        '        <button id="mobile-menu-btn" class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:hidden" aria-label="Open menu">' +
        '          <i class="fa-solid fa-bars"></i>' +
        "        </button>" +
        "      </div>" +
        "    </div>" +
        "" +
        '    <div id="mobile-menu" class="hidden pb-4 md:hidden">' +
        '      <div class="grid gap-2 rounded-2xl border border-black/5 bg-white p-3 shadow-sm">' +
        '        <a class="rounded-xl px-3 py-2 text-sm font-semibold ' +
        isActive("home") +
        '" href="' +
        SC.routes.home +
        '">Home</a>' +
        '        <a class="rounded-xl px-3 py-2 text-sm font-semibold ' +
        isActive("shop") +
        '" href="' +
        SC.routes.shop +
        '">Shop</a>' +
        '        <a class="rounded-xl px-3 py-2 text-sm font-semibold ' +
        isActive("sarees") +
        '" href="' +
        SC.routes.sarees +
        '">Sarees</a>' +
        '        <a class="rounded-xl px-3 py-2 text-sm font-semibold ' +
        isActive("about") +
        '" href="' +
        SC.routes.about +
        '">About</a>' +
        '        <a class="rounded-xl px-3 py-2 text-sm font-semibold ' +
        isActive("contact") +
        '" href="' +
        SC.routes.contact +
        '">Contact</a>' +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
      );
    },

    footer: function () {
      return (
        '<div class="border-t border-black/5 bg-white">' +
        '  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">' +
        '    <div class="grid gap-8 lg:grid-cols-12">' +
        '      <div class="lg:col-span-5">' +
        '        <div class="text-xl text-black">' +
        safeText(SC.config.brandName) +
        "</div>" +
        '        <p class="mt-2 max-w-md text-sm text-black/60">Our Address - 143/23 Scheme no. 140 near by Pipliyahana Sqaure , Indore.</p>' +
        '        <div class="mt-4 flex items-center gap-3 text-black/70">' +
        '          <a class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="' +
        SC.config.instagram +
        '" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
        '          <a class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="' +
        SC.config.facebook +
        '" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '          <a class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="' +
        SC.config.whatsapp +
        '" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>' +
        "        </div>" +
        "      </div>" +
        "" +
        '      <div class="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">' +
        '        <div><div class="text-sm font-semibold text-black">Shop</div>' +
        '          <div class="mt-3 grid gap-2 text-sm text-black/60">' +
        '            <a class="hover:text-black" href="' +
        SC.routes.shop +
        '">All Products</a>' +
        '            <a class="hover:text-black" href="' +
        SC.routes.sarees +
        '">Saree Collection</a>' +
        '            <a class="hover:text-black" href="' +
        SC.routes.cart +
        '">Cart</a>' +
        "          </div></div>" +
        '        <div><div class="text-sm font-semibold text-black">Company</div>' +
        '          <div class="mt-3 grid gap-2 text-sm text-black/60">' +
        '            <a class="hover:text-black" href="' +
        SC.routes.about +
        '">About Us</a>' +
        '            <a class="hover:text-black" href="' +
        SC.routes.contact +
        '">Contact</a>' +
        "          </div></div>" +
        '        <div><div class="text-sm font-semibold text-black">Newsletter</div>' +
        '          <p class="mt-3 text-sm text-black/60">Get early access to new drops & limited-time offers.</p>' +
        '          <form id="newsletter-form" class="mt-3 flex gap-2">' +
        '            <input class="focus-premium w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" type="email" required placeholder="Email address" />' +
        '            <button class="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md" type="submit">Join</button>' +
        "          </form>" +
        "        </div>" +
        "      </div>" +
        "    </div>" +
        "" +
        '    <div class="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">' +
        "      <div>© " +
        new Date().getFullYear() +
        " " +
        safeText(SC.config.brandName) +
        ". All rights reserved.</div>" +
        '      <div class="text-black/40">Designed by Balram Baghel.</div>' +
        "    </div>" +
        "  </div>" +
        "</div>"
      );
    },

    bindNavbar: function () {
      var btn = document.getElementById("mobile-menu-btn");
      var menu = document.getElementById("mobile-menu");
      SC.util.on(btn, "click", function () {
        if (!menu) return;
        menu.classList.toggle("hidden");
      });

      var newsletter = document.getElementById("newsletter-form");
      SC.util.on(newsletter, "submit", function (e) {
        e.preventDefault();
        SC.ui.toast("Thanks! You’re subscribed.");
        newsletter.reset();
      });
    },

    updateCartBadge: function () {
      var badge = document.getElementById("nav-cart-badge");
      if (!badge) return;
      var count = SC.cart ? SC.cart.getCount() : 0;
      if (count > 0) {
        badge.textContent = String(count);
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    },

    toast: function (message) {
      var root = document.getElementById("toast-root");
      if (!root) {
        root = document.createElement("div");
        root.id = "toast-root";
        root.className = "fixed bottom-4 right-4 z-[60] grid gap-2";
        document.body.appendChild(root);
      }

      var el = document.createElement("div");
      el.className =
        "shadow-soft pointer-events-auto max-w-sm rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black";
      el.textContent = message;
      root.appendChild(el);

      setTimeout(function () {
        try {
          root.removeChild(el);
        } catch (e) {}
      }, 2400);
    },

    productCard: function (p) {
      var href = SC.routes.product + "?id=" + encodeURIComponent(p.id);
      var img = (p.images && p.images[0]) || "";
      return (
        '<div class="group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">' +
        badgePill(p.badge) +
        '  <a href="' +
        href +
        '" class="block">' +
        '    <div class="aspect-[4/5] overflow-hidden bg-[#fbf7f5]">' +
        '      <img alt="' +
        safeText(p.name) +
        '" src="' +
        img +
        '" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />' +
        "    </div>" +
        "  </a>" +
        '  <div class="p-4">' +
        '    <div class="flex items-start justify-between gap-3">' +
        "      <div>" +
        '        <a href="' +
        href +
        '" class="font-medium text-black hover:underline">' +
        safeText(p.name) +
        "</a>" +
        '        <div class="mt-1 text-xs text-black/60">' +
        safeText(p.category) +
        "</div>" +
        "      </div>" +
        '      <div class="shrink-0 text-right font-semibold text-black">' +
        SC.util.money(p.price) +
        "</div>" +
        "    </div>" +
        '    <button data-add-to-cart="' +
        safeText(p.id) +
        '" class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md">' +
        '      <i class="fa-solid fa-plus"></i>' +
        "      Add to Cart" +
        "    </button>" +
        "  </div>" +
        "</div>"
      );
    },

    skeletonCard: function () {
      return (
        '<div class="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">' +
        '  <div class="skeleton aspect-[4/5] bg-[#fbf7f5]"></div>' +
        '  <div class="p-4">' +
        '    <div class="skeleton h-4 w-3/4 rounded-lg"></div>' +
        '    <div class="mt-2 skeleton h-3 w-1/3 rounded-lg"></div>' +
        '    <div class="mt-4 skeleton h-10 w-full rounded-2xl"></div>' +
        "  </div>" +
        "</div>"
      );
    },
  };
})();
