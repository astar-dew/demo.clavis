(function () {
  var rightMenu = document.querySelector(".topbar .menu.right");
  if (!rightMenu) return;

  var currentIsDark = window.location.pathname.indexOf("/dark/") !== -1;
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
    var url = new URL(window.location.href);
    var nextPath = url.pathname;

    if (currentIsDark) {
      nextPath = nextPath.replace("/dark/", "/white/");
    } else {
      nextPath = nextPath.replace("/white/", "/dark/");
    }

    window.location.href = nextPath + url.search + url.hash;
  });
})();
