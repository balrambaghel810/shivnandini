/* Small localStorage wrapper to keep reads/writes consistent. */
(function () {
  window.SC = window.SC || {};

  var KEY_PREFIX = "sc:";

  SC.storage = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(KEY_PREFIX + key);
        if (raw === null || raw === undefined) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    remove: function (key) {
      try {
        localStorage.removeItem(KEY_PREFIX + key);
        return true;
      } catch (e) {
        return false;
      }
    },
  };
})();
