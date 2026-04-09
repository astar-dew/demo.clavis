(function () {
  var panel = document.querySelector(".layout-switcher-panel");
  if (!panel) return;

  var LAYOUT_KEY = "clavis-layout";
  var THEME_KEY = "clavis-theme";

  function normalizeLayout(value) {
    return value === "layout2" ? "layout2" : "layout1";
  }

  function normalizeTheme(value) {
    return value === "dark" ? "dark" : "light";
  }

  function isDarkPath(pathname) {
    return pathname.indexOf("/dark/") !== -1;
  }

  function swapThemePath(pathname, toDark) {
    if (toDark) return pathname.replace("/white/", "/dark/");
    return pathname.replace("/dark/", "/white/");
  }

  var currentTheme = isDarkPath(window.location.pathname) ? "dark" : "light";
  var currentLayout = normalizeLayout(localStorage.getItem(LAYOUT_KEY));
  localStorage.setItem(LAYOUT_KEY, currentLayout);
  localStorage.setItem(THEME_KEY, currentTheme);

  var buttons = Array.from(panel.querySelectorAll("[data-layout][data-theme]"));

  function syncActiveState() {
    buttons.forEach(function (button) {
      var layout = normalizeLayout(button.getAttribute("data-layout"));
      var theme = normalizeTheme(button.getAttribute("data-theme"));
      var isActive = layout === currentLayout && theme === currentTheme;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var nextLayout = normalizeLayout(button.getAttribute("data-layout"));
      var nextTheme = normalizeTheme(button.getAttribute("data-theme"));
      var nextIsDark = nextTheme === "dark";

      localStorage.setItem(LAYOUT_KEY, nextLayout);
      localStorage.setItem(THEME_KEY, nextTheme);

      var nextPath = swapThemePath(window.location.pathname, nextIsDark);
      if (nextPath === window.location.pathname) {
        window.location.reload();
        return;
      }

      window.location.href = nextPath + window.location.search + window.location.hash;
    });
  });

  syncActiveState();
})();
