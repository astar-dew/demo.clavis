(function () {
  if (document.querySelector(".topbar")) return;

  var root = document.getElementById("gnb-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "gnb-root";
    document.body.insertBefore(root, document.body.firstChild);
  }

  var LAYOUT_KEY = "clavis-layout";
  var savedLayout = localStorage.getItem(LAYOUT_KEY);
  var layout = savedLayout === "layout2" || savedLayout === "layout3" ? savedLayout : "layout1";
  localStorage.setItem(LAYOUT_KEY, layout);

  function ensureLayoutStyles() {
    if (document.getElementById("clavis-layout-styles")) return;

    var style = document.createElement("style");
    style.id = "clavis-layout-styles";
    style.textContent =
      ".topbar.layout-2 .topbar-inner{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:20px;height:70px;}" +
      ".topbar.layout-2 .menu.left{gap:22px;flex-wrap:nowrap;justify-content:flex-start;min-width:0;}" +
      ".topbar.layout-2 .logo{justify-self:center;margin:0;}" +
      ".topbar.layout-2 .menu.right{gap:12px;flex-wrap:nowrap;justify-content:flex-end;min-width:0;}" +
      ".topbar.layout-2 .menu.right > a{font-weight:600;letter-spacing:0.1em;}" +
      ".topbar.layout-3 .topbar-inner{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:24px;height:70px;}" +
      ".topbar.layout-3 .logo{margin:0;}" +
      ".topbar.layout-3 .menu.left{gap:22px;flex-wrap:nowrap;justify-content:center;min-width:0;}" +
      ".topbar.layout-3 .menu.right{gap:12px;flex-wrap:nowrap;justify-content:flex-end;min-width:0;}" +
      ".topbar.layout-3 .menu.right > a{font-weight:600;letter-spacing:0.1em;}" +
      "@media (max-width:720px){.footer-inner{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px 16px;padding:56px 20px;}.footer-inner>div:first-child{grid-column:1/-1;}.footer-inner>div:last-child{grid-column:1/-1;border-top:1px solid var(--line);padding-top:16px;}.footer-logo{font-size:56px;}.footer-inner h5{font-size:14px;line-height:1.2;margin:0 0 10px;}.footer-inner a,.footer-inner p{font-size:13px;line-height:1.6;margin:4px 0;}.footer .contact{font-size:13px;line-height:1.7;}}" +
      "@media (max-width:760px){.topbar.layout-2 .topbar-inner,.topbar.layout-3 .topbar-inner{display:flex;height:56px;}}";
    document.head.appendChild(style);
  }

  ensureLayoutStyles();
  document.documentElement.setAttribute("data-clavis-layout", layout);

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

  var leftMenuLayout1 =
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
    "</nav>";

  var leftMenuLayout2 =
    '<nav class="menu left">' +
    '<a class="' +
    activeBrand +
    '" href="./brand.html">BRAND</a>' +
    '<a class="' +
    activeScience +
    '" href="./science.html">SCIENCE</a>' +
    '<a class="' +
    activeTechtrust +
    '" href="./techtrust.html">TECH &amp; TRUST</a>' +
    '<div class="menu-item has-submenu">' +
    '<a class="' +
    (collectionMenuKey ? "active" : "") +
    '" href="./medi-jewelry.html">COLLECTION</a>' +
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
    "</nav>";

  var logo = '<a class="logo" href="./index.html"><img class="logo-mark" src="../asset/etc/logo.svg" alt="ClaviS" /><span class="sr-only">ClaviS</span></a>';

  var rightMenuLayout1 =
    '<nav class="menu right">' +
    '<a href="./shop.html">SHOP</a>' +
    '<button aria-label="검색" class="icon-btn icon-search"><span aria-hidden="true"></span></button>' +
    '<button aria-label="로그인" class="icon-btn icon-user"><span aria-hidden="true"></span></button>' +
    '<button aria-label="장바구니" class="icon-btn icon-cart"><span aria-hidden="true"></span><span class="cart-count" aria-hidden="true">0</span></button>' +
    "</nav>";

  var rightMenuLayout2 =
    '<nav class="menu right">' +
    '<a href="./shop.html">SHOP</a>' +
    '<button aria-label="검색" class="icon-btn icon-search"><span aria-hidden="true"></span></button>' +
    '<a href="#" class="mypage-link">MYPAGE</a>' +
    '<button aria-label="장바구니" class="icon-btn icon-cart"><span aria-hidden="true"></span><span class="cart-count" aria-hidden="true">0</span></button>' +
    "</nav>";

  var isLayout2Like = layout === "layout2" || layout === "layout3";
  var leftMenu = isLayout2Like ? leftMenuLayout2 : leftMenuLayout1;
  var rightMenu = isLayout2Like ? rightMenuLayout2 : rightMenuLayout1;
  var inner = layout === "layout3" ? logo + leftMenu + rightMenu : leftMenu + logo + rightMenu;

  root.innerHTML =
    '<header class="topbar layout-' +
    (layout === "layout2" ? "2" : layout === "layout3" ? "3" : "1") +
    '">' +
    '<div class="topbar-inner">' +
    inner +
    "</div></header>";

  function syncFooterByLayout() {
    if (layout !== "layout2" && layout !== "layout3") return;
    var footerBlocks = document.querySelectorAll(".footer-inner > div");
    footerBlocks.forEach(function (block) {
      var heading = block.querySelector("h5");
      if (heading && heading.textContent.trim().toUpperCase() === "ABOUT") {
        heading.remove();
      }
    });
  }

  syncFooterByLayout();
})();
