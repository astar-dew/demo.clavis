(function () {
  var STORAGE_KEY = "clavis-theme";
  var rightMenu = document.querySelector(".topbar .menu.right");
  if (!rightMenu) return;

  function isDarkPath(pathname) {
    return pathname.indexOf("/dark/") !== -1;
  }

  function swapThemePath(pathname, toDark) {
    if (toDark) return pathname.replace("/white/", "/dark/");
    return pathname.replace("/dark/", "/white/");
  }

  var url = new URL(window.location.href);
  var currentIsDark = isDarkPath(url.pathname);
  localStorage.setItem(STORAGE_KEY, currentIsDark ? "dark" : "light");

  var targetLabel = currentIsDark ? "LIGHT" : "DARK";
  var btn = rightMenu.querySelector(".theme-toggle-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.className = "icon-btn theme-toggle-btn";
    btn.type = "button";
    var shopLink = rightMenu.querySelector('a[href*="shop"]');
    if (shopLink && shopLink.nextSibling) {
      rightMenu.insertBefore(btn, shopLink.nextSibling);
    } else {
      rightMenu.insertBefore(btn, rightMenu.firstChild);
    }
  }

  btn.textContent = targetLabel;
  btn.setAttribute("aria-label", targetLabel + " 모드로 전환");

  btn.addEventListener("click", function () {
    var now = new URL(window.location.href);
    var nowIsDark = isDarkPath(now.pathname);
    var nextIsDark = !nowIsDark;
    localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");

    var nextPath = swapThemePath(now.pathname, nextIsDark);
    window.location.href = nextPath + now.search + now.hash;
  });
})();
