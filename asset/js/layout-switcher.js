(function () {
  var panel = document.querySelector(".layout-switcher-panel");
  if (!panel) return;

  var LAYOUT_KEY = "clavis-layout";
  var THEME_KEY = "clavis-theme";

  function normalizeLayout(value) {
    return value === "layout2" || value === "layout3" ? value : "layout1";
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

  function applyLayout3WhiteCompliantCopy() {
    var isWhitePath = window.location.pathname.indexOf("/white/") !== -1;
    var enabled = isWhitePath && currentTheme === "light" && currentLayout === "layout3";
    var replacements = [
      {
        selector: ".hero-overlay p",
        text: "PREMIUM WELLNESS COLLECTION"
      },
      {
        selector: ".collection .eyebrow",
        text: "PREMIUM WELLNESS SOLUTION"
      },
      {
        selector: ".experience h2",
        text: "프리미엄 웰니스 케어의 새로운 기준"
      },
      {
        selector: ".experience p",
        text:
          "클라비스 라인즈를 위한 프리미엄 웰니스 밴드로 일상 속 편안한 케어 루틴을 제안합니다."
      },
      {
        selector: ".main-tail-label",
        text: "PREMIUM WELLNESS COLLECTION"
      },
      {
        selector: ".feature-card.feature-living p",
        text: "일상에 스며드는 웰니스 케어"
      },
      {
        selector: ".feature-card.feature-medi p",
        text: "프리미엄 웰니스 주얼리"
      },
      {
        selector: ".footer-inner > div:first-child p",
        html: "네오디움 기반 프리미엄<br />웰니스 케어"
      }
    ];

    replacements.forEach(function (item) {
      var node = document.querySelector(item.selector);
      if (!node) return;

      if (!node.hasAttribute("data-original-copy")) {
        node.setAttribute(
          "data-original-copy",
          item.html !== undefined ? node.innerHTML : node.textContent
        );
      }

      if (enabled) {
        if (item.html !== undefined) node.innerHTML = item.html;
        else node.textContent = item.text;
        return;
      }

      var originalCopy = node.getAttribute("data-original-copy");
      if (originalCopy === null) return;
      if (item.html !== undefined) node.innerHTML = originalCopy;
      else node.textContent = originalCopy;
    });
  }

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
  applyLayout3WhiteCompliantCopy();
})();
