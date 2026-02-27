(function () {
  window.SC = window.SC || {};
  SC.pages = SC.pages || {};

  SC.pages.home = function () {
    var grid = SC.util.qs("#featured-grid");
    if (!grid) return;

    var skeletons = [];
    for (var i = 0; i < 4; i++) {
      skeletons.push(SC.ui.skeletonCard());
    }
    grid.innerHTML = skeletons.join("");

    setTimeout(function () {
      var featured = (SC.products || []).filter(function (p) {
        return p.featured;
      });
      if (!featured.length) {
        grid.innerHTML =
          '<p class="col-span-full text-sm text-black/60">Featured products will appear here soon.</p>';
        return;
      }
      grid.innerHTML = featured
        .slice(0, 8)
        .map(function (p) {
          return SC.ui.productCard(p);
        })
        .join("");
      SC.anim.reveal("#featured-grid > *");
    }, 350);
  };
})();
