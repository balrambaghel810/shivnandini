/* Motion-based micro-interactions. Uses Motion UMD (global Motion). */
(function () {
  window.SC = window.SC || {};

  function hasMotion() {
    return typeof window.Motion !== "undefined" && typeof window.Motion.animate === "function";
  }

  SC.anim = {
    reveal: function (selector) {
      if (!hasMotion()) return;
      var els = SC.util.qsa(selector || "[data-reveal]");
      els.forEach(function (el, idx) {
        window.Motion.animate(
          el,
          { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0px)"] },
          { duration: 0.55, delay: Math.min(0.35, idx * 0.04), easing: "ease-out" }
        );
      });
    },
    floatOnHover: function (selector) {
      if (!hasMotion()) return;
      var els = SC.util.qsa(selector);
      els.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          window.Motion.animate(el, { transform: "translateY(-2px)" }, { duration: 0.2 });
        });
        el.addEventListener("mouseleave", function () {
          window.Motion.animate(el, { transform: "translateY(0px)" }, { duration: 0.2 });
        });
      });
    },
  };
})();
