(function () {
  window.SC = window.SC || {};
  SC.pages = SC.pages || {};

  function renderSkeletons(grid) {
    var skeletons = [];
    for (var i = 0; i < 8; i++) skeletons.push(SC.ui.skeletonCard());
    grid.innerHTML = skeletons.join("");
  }

  function applyFilters(options) {
    var list = (SC.products || []).filter(function (p) {
      return p.category === "Saree";
    });
    var search = (options.search || "").toLowerCase();
    var sort = options.sort || "recommended";

    if (search) {
      list = list.filter(function (p) {
        return (
          p.name.toLowerCase().indexOf(search) !== -1 ||
          (p.description || "").toLowerCase().indexOf(search) !== -1
        );
      });
    }

    if (sort === "price-asc") {
      list.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sort === "price-desc") {
      list.sort(function (a, b) {
        return b.price - a.price;
      });
    } else {
      list.sort(function (a, b) {
        return (b.featured === true) - (a.featured === true) || a.price - b.price;
      });
    }

    return list;
  }

  SC.pages.sarees = function () {
    var grid = SC.util.qs("#sarees-grid");
    var searchInput = SC.util.qs("#sarees-search");
    var sortSelect = SC.util.qs("#sarees-sort");
    var countEl = SC.util.qs("#sarees-count");
    if (!grid) return;

    renderSkeletons(grid);

    setTimeout(function () {
      var state = {
        search: "",
        sort: sortSelect ? sortSelect.value : "recommended",
      };

      function sync() {
        var list = applyFilters(state);
        if (!list.length) {
          grid.innerHTML =
            '<p class="col-span-full text-sm text-black/60">New sarees are dropping soon. Stay tuned.</p>';
        } else {
          grid.innerHTML = list
            .map(function (p) {
              return SC.ui.productCard(p);
            })
            .join("");
          SC.anim.reveal("#sarees-grid > *");
        }
        if (countEl) {
          countEl.textContent = list.length + " sarees · " + state.sort;
        }
      }

      if (searchInput) {
        var timeout;
        searchInput.addEventListener("input", function () {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            state.search = searchInput.value || "";
            sync();
          }, 200);
        });
      }
      if (sortSelect) {
        sortSelect.addEventListener("change", function () {
          state.sort = sortSelect.value;
          sync();
        });
      }

      sync();
    }, 350);
  };
})();
