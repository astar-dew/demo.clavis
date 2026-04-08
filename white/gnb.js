(function () {
  if (document.querySelector(".topbar")) return;

  var root = document.getElementById("gnb-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "gnb-root";
    document.body.insertBefore(root, document.body.firstChild);
  }

  var file = window.location.pathname.split("/").pop() || "index.html";
  function getCollectionMenuKey() {
    if (file === "medi-jewelry.html" || file === "product-ares.html" || file === "product-astra.html") {
      return "medi";
    }

    if (file === "active-lifestyle.html" || file === "product-bach.html") {
      return "active";
    }

    if (file === "living-health.html" || file === "product-circle.html") {
      return "living";
    }

    if (file === "collection.html") {
      var hash = (window.location.hash || "").replace("#", "");
      if (hash === "active-lifestyle") return "active";
      if (hash === "living-health") return "living";
      return "medi";
    }

    return "";
  }

  var collectionMenuKey = getCollectionMenuKey();

  var activeBrand = file === "brand.html" ? "active" : "";
  var activeScience = file === "science.html" ? "active" : "";
  var activeTechtrust = file === "techtrust.html" ? "active" : "";
  var activeMedi = collectionMenuKey === "medi" ? "active" : "";
  var activeActive = collectionMenuKey === "active" ? "active" : "";
  var activeLiving = collectionMenuKey === "living" ? "active" : "";

  root.innerHTML =
    '<header class="topbar">' +
    '<div class="topbar-inner">' +
    '<nav class="menu left">' +
    '<div class="menu-item has-submenu">' +
    '<a href="./brand.html">ABOUT</a>' +
    '<div class="submenu">' +
    '<a class="' +
    activeBrand +
    '" href="./brand.html">BRAND</a>' +
    '<a class="' +
    activeScience +
    '" href="./science.html">SCIENCE</a>' +
    '<a class="' +
    activeTechtrust +
    '" href="./techtrust.html">TECH &amp; TRUST</a>' +
    "</div></div>" +
    '<div class="menu-item has-submenu">' +
    '<a href="./medi-jewelry.html">COLLECTION</a>' +
    '<div class="submenu">' +
    '<a class="' +
    activeMedi +
    '" href="./medi-jewelry.html">MEDI JEWELRY</a>' +
    '<a class="' +
    activeActive +
    '" href="./active-lifestyle.html">ACTIVE LIFESTYLE</a>' +
    '<a class="' +
    activeLiving +
    '" href="./living-health.html">LIVING &amp; HEALTH</a>' +
    "</div></div>" +
    "</nav>" +
    '<a class="logo" href="./index.html"><img class="logo-mark" src="../asset/etc/logo.svg" alt="ClaviS" /><span class="sr-only">ClaviS</span></a>' +
    '<nav class="menu right">' +
    '<a href="./shop.html">SHOP</a>' +
    '<button aria-label="검색" class="icon-btn icon-search"><span aria-hidden="true"></span></button>' +
    '<button aria-label="로그인" class="icon-btn icon-user"><span aria-hidden="true"></span></button>' +
    '<button aria-label="장바구니" class="icon-btn icon-cart"><span aria-hidden="true"></span><span class="cart-count" aria-hidden="true">0</span></button>' +
    "</nav></div></header>";
})();
