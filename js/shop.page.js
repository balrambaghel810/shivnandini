(function () {
  window.SC = window.SC || {};
  SC.pages = SC.pages || {};

  function renderSkeletons(grid) {
    var skeletons = [];
    for (var i = 0; i < 8; i++) skeletons.push(SC.ui.skeletonCard());
    grid.innerHTML = skeletons.join("");
  }

  function applyFilters(options) {
    var list = (SC.products || []).slice();
    var search = (options.search || "").toLowerCase();
    var category = options.category || "All";
    var sort = options.sort || "recommended";

    if (category && category !== "All") {
      list = list.filter(function (p) {
        return p.category === category;
      });
    }
    if (search) {
      list = list.filter(function (p) {
        return (
          p.name.toLowerCase().indexOf(search) !== -1 ||
          (p.category || "").toLowerCase().indexOf(search) !== -1
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
    } else if (sort === "recommended") {
      list.sort(function (a, b) {
        return (b.featured === true) - (a.featured === true) || a.price - b.price;
      });
    }

    return list;
  }

  SC.pages.shop = function () {
    var grid = SC.util.qs("#shop-grid");
    var searchInput = SC.util.qs("#shop-search");
    var categorySelect = SC.util.qs("#shop-category");
    var sortSelect = SC.util.qs("#shop-sort");
    var countEl = SC.util.qs("#shop-count");

    if (!grid) return;

    // Populate categories
    if (categorySelect) {
      var cats = (SC.catalog && SC.catalog.categories) || ["All"];
      categorySelect.innerHTML = cats
        .map(function (c) {
          return '<option value="' + c + '">' + c + "</option>";
        })
        .join("");
    }

    renderSkeletons(grid);

    setTimeout(function () {
      var state = {
        search: "",
        category: categorySelect ? categorySelect.value : "All",
        sort: sortSelect ? sortSelect.value : "recommended",
      };

      function sync() {
        var list = applyFilters(state);
        if (!list.length) {
          grid.innerHTML =
            '<p class="col-span-full text-sm text-black/60">No products match your filters yet. Try clearing filters.</p>';
        } else {
          grid.innerHTML = list
            .map(function (p) {
              return SC.ui.productCard(p);
            })
            .join("");
          SC.anim.reveal("#shop-grid > *");
        }
        if (countEl) {
          countEl.textContent = list.length + " styles · " + state.category + " · " + state.sort;
        }
      }

      function handleSearch() {
        state.search = (searchInput && searchInput.value) || "";
        sync();
      }

      if (searchInput) {
        var searchTimeout;
        searchInput.addEventListener("input", function () {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(handleSearch, 200);
        });
      }
      if (categorySelect) {
        categorySelect.addEventListener("change", function () {
          state.category = categorySelect.value;
          sync();
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
