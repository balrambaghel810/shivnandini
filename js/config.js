/* Global config + tiny helpers. Kept framework-free for easy hosting. */
(function () {
  window.SC = window.SC || {};

  SC.config = {
    brandName: "Shivnandani Creations",
    tagline: "By Manisha Sharma",
    currency: "INR",
    supportEmail: "support@shivnandanicreations.com",
    instagram: "#",
    facebook: "#",
    whatsapp: "#",
  };

  SC.routes = {
    home: "index.html",
    shop: "shop.html",
    sarees: "sarees.html",
    product: "product.html",
    cart: "cart.html",
    about: "about.html",
    contact: "contact.html",
  };

  SC.util = {
    qs: function (sel, root) {
      return (root || document).querySelector(sel);
    },
    qsa: function (sel, root) {
      return Array.from((root || document).querySelectorAll(sel));
    },
    on: function (el, evt, cb) {
      if (!el) return;
      el.addEventListener(evt, cb);
    },
    getParam: function (name) {
      var url = new URL(window.location.href);
      return url.searchParams.get(name);
    },
    setParam: function (name, value) {
      var url = new URL(window.location.href);
      if (value === null || value === undefined || value === "")
        url.searchParams.delete(name);
      else url.searchParams.set(name, value);
      window.history.replaceState({}, "", url.toString());
    },
    money: function (amount) {
      try {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: SC.config.currency,
          maximumFractionDigits: 0,
        }).format(amount);
      } catch (e) {
        return "₹" + Math.round(amount);
      }
    },
    uid: function () {
      return Math.random().toString(16).slice(2) + Date.now().toString(16);
    },
  };
})();
