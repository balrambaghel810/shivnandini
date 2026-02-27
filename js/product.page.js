(function () {
  window.SC = window.SC || {};
  SC.pages = SC.pages || {};

  function safe(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function findProduct(id) {
    return (SC.products || []).find(function (p) {
      return p.id === id;
    });
  }

  function renderSkeleton(container) {
    container.innerHTML =
      '<div class="grid gap-10 lg:grid-cols-2">' +
      '  <div class="space-y-3">' +
      '    <div class="skeleton h-80 w-full rounded-3xl bg-[#fbf7f5] sm:h-[420px]"></div>' +
      '    <div class="grid grid-cols-4 gap-2">' +
      '      <div class="skeleton h-20 rounded-2xl bg-[#fbf7f5]"></div>' +
      '      <div class="skeleton h-20 rounded-2xl bg-[#fbf7f5]"></div>' +
      '      <div class="skeleton h-20 rounded-2xl bg-[#fbf7f5]"></div>' +
      '      <div class="skeleton h-20 rounded-2xl bg-[#fbf7f5]"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="space-y-4">' +
      '    <div class="skeleton h-5 w-28 rounded-lg"></div>' +
      '    <div class="skeleton h-7 w-3/4 rounded-lg"></div>' +
      '    <div class="skeleton h-5 w-1/4 rounded-lg"></div>' +
      '    <div class="skeleton h-20 w-full rounded-2xl"></div>' +
      '    <div class="skeleton h-11 w-full rounded-2xl"></div>' +
      "  </div>" +
      "</div>";
  }

  SC.pages.product = function () {
    var container = SC.util.qs("#product-container");
    var crumbs = SC.util.qs("#product-breadcrumbs");
    if (!container) return;

    var id = SC.util.getParam("id");
    renderSkeleton(container);

    setTimeout(function () {
      var p = id ? findProduct(id) : null;
      if (!p) {
        container.innerHTML =
          '<div class="py-20 text-center">' +
          '  <p class="text-sm text-black/60">We couldn’t find this piece. It may have moved or sold out.</p>' +
          '  <a href="shop.html" class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white">' +
          '    Back to shop' +
          '    <i class="fa-solid fa-arrow-right text-[10px]"></i>' +
          "  </a>" +
          "</div>";
        if (crumbs) {
          crumbs.innerHTML =
            '<ol class="flex items-center gap-1">' +
            '  <li><a href="index.html" class="hover:text-black">Home</a></li>' +
            '  <li><span>/</span></li>' +
            '  <li><a href="shop.html" class="hover:text-black">Shop</a></li>' +
            '  <li><span>/</span></li>' +
            '  <li class="text-black/60">Not found</li>' +
            "</ol>";
        }
        return;
      }

      if (crumbs) {
        crumbs.innerHTML =
          '<ol class="flex flex-wrap items-center gap-1">' +
          '  <li><a href="index.html" class="hover:text-black">Home</a></li>' +
          '  <li><span>/</span></li>' +
          '  <li><a href="shop.html" class="hover:text-black">Shop</a></li>' +
          '  <li><span>/</span></li>' +
          '  <li><span class="capitalize text-black/70">' +
          safe(p.category || "") +
          "</span></li>" +
          '  <li><span>/</span></li>' +
          '  <li class="font-medium text-black">' +
          safe(p.name) +
          "</li>" +
          "</ol>";
      }

      var mainImg = (p.images && p.images[0]) || "";
      var thumbs = (p.images || []).slice(0, 4);

      container.innerHTML =
        '<div class="grid gap-10 lg:grid-cols-2">' +
        '  <div class="space-y-3" data-reveal>' +
        '    <div class="overflow-hidden rounded-3xl border border-black/5 bg-[#fbf7f5] shadow-soft">' +
        '      <img id="product-main-image" src="' +
        mainImg +
        '" alt="' +
        safe(p.name) +
        '" class="h-80 w-full object-cover sm:h-[420px]" />' +
        "    </div>" +
        '    <div class="hide-scrollbar flex gap-2 overflow-x-auto pt-1">' +
        thumbs
          .map(function (img, idx) {
            return (
              '<button class="group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-[#fbf7f5]">' +
              '  <img src="' +
              img +
              '" alt="Preview ' +
              (idx + 1) +
              '" class="h-full w-full object-cover transition group-hover:scale-105" />' +
              "</button>"
            );
          })
          .join("") +
        "    </div>" +
        "  </div>" +
        '  <div class="space-y-5" data-reveal>' +
        (p.badge
          ? '<span class="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">' +
            safe(p.badge) +
            "</span>"
          : "") +
        '    <h1 class="font-serif text-2xl text-black sm:text-3xl">' +
        safe(p.name) +
        "</h1>" +
        '    <div class="flex items-center justify-between gap-4">' +
        '      <div class="text-lg font-semibold text-black sm:text-xl">' +
        SC.util.money(p.price) +
        "</div>" +
        '      <div class="flex items-center gap-1 text-xs text-black/55">' +
        '        <i class="fa-solid fa-truck-fast"></i>' +
        "        Ships in 5–7 days" +
        "      </div>" +
        "    </div>" +
        '    <p class="text-sm leading-relaxed text-black/75">' +
        safe(p.description) +
        "</p>" +
        '    <ul class="mt-2 space-y-1 text-xs text-black/60">' +
        "      <li>· Hand woven inspired detailing</li>" +
        "      <li>· Soft pastel colour story</li>" +
        "      <li>· Designed for long-wear comfort</li>" +
        "    </ul>" +
        '    <div class="mt-4 flex items-center gap-3">' +
        '      <div class="inline-flex items-center rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm">' +
        '        <button id="qty-dec" class="px-1 text-black/60" type="button">-</button>' +
        '        <input id="qty-input" type="number" min="1" max="99" value="1" class="mx-1 w-10 border-none bg-transparent text-center text-sm focus:outline-none" />' +
        '        <button id="qty-inc" class="px-1 text-black/60" type="button">+</button>' +
        "      </div>" +
        '      <button id="product-add-to-cart" class="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">' +
        '        <i class="fa-solid fa-bag-shopping"></i>' +
        "        Add to cart" +
        "      </button>" +
        "    </div>" +
        '    <p class="text-xs text-black/50">Inclusive of all taxes · Secure checkout · Easy styling support over WhatsApp</p>' +
        "  </div>" +
        "</div>";

      // Bind gallery thumbnails
      var main = SC.util.qs("#product-main-image", container);
      var thumbButtons = container.querySelectorAll("button");
      thumbButtons.forEach(function (btn, idx) {
        btn.addEventListener("click", function () {
          var img = p.images && p.images[idx];
          if (!img || !main) return;
          main.src = img;
        });
      });

      // Quantity controls
      var qtyInput = SC.util.qs("#qty-input", container);
      var dec = SC.util.qs("#qty-dec", container);
      var inc = SC.util.qs("#qty-inc", container);
      if (dec && qtyInput) {
        dec.addEventListener("click", function () {
          var v = Number(qtyInput.value || 1);
          qtyInput.value = Math.max(1, v - 1);
        });
      }
      if (inc && qtyInput) {
        inc.addEventListener("click", function () {
          var v = Number(qtyInput.value || 1);
          qtyInput.value = Math.min(99, v + 1);
        });
      }

      // Add to cart
      var addBtn = SC.util.qs("#product-add-to-cart", container);
      if (addBtn && qtyInput) {
        addBtn.addEventListener("click", function () {
          var qty = Number(qtyInput.value || 1);
          SC.cart.add(p.id, qty);
          SC.ui.toast("Added to cart.");
        });
      }
    }, 350);
  };
})();
