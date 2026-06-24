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
  var layout = savedLayout === "layout2" || savedLayout === "layout3" ? savedLayout : "layout3";
  localStorage.setItem(LAYOUT_KEY, layout);

  function getCurrentSection() {
    var hash = (window.location.hash || "").replace("#", "");
    return hash || "dump-main";
  }

  function isActiveSection(sectionId, currentSection) {
    if (!sectionId) return false;
    return currentSection === sectionId || currentSection.indexOf(sectionId + "/") === 0;
  }

  function isProductSection(currentSection) {
    return (
      currentSection.indexOf("product-") === 0 ||
      currentSection.indexOf("bracelet") === 0 ||
      currentSection === "energetic-ring" ||
      currentSection === "reju-ring" ||
      currentSection === "power-belt" ||
      currentSection === "magnetic-pillow" ||
      currentSection === "magnetic-blanket" ||
      currentSection === "etc"
    );
  }

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
      ".topbar .menu a{position:relative;transition:color .18s ease;}" +
      ".topbar .menu a.active{color:var(--accent,#b89e78);font-weight:700;}" +
      ".topbar .menu a.active::after{content:\"\";position:absolute;left:0;right:0;bottom:-9px;height:2px;background:currentColor;}" +
      ".topbar .submenu a.active::after{display:none;}" +
      ".mobile-nav-direct.active,.mobile-nav-links a.active{color:var(--accent,#b89e78);font-weight:700;background:rgba(184,158,120,.12);}" +
      "@media (max-width:720px){.footer-inner{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px 16px;padding:56px 20px;}.footer-inner>div:first-child{grid-column:1/-1;}.footer-inner>div:last-child{grid-column:1/-1;border-top:1px solid var(--line);padding-top:16px;}.footer-logo{font-size:56px;}.footer-inner h5{font-size:14px;line-height:1.2;margin:0 0 10px;}.footer-inner a,.footer-inner p{font-size:13px;line-height:1.6;margin:4px 0;}.footer .contact{font-size:13px;line-height:1.7;}}" +
      "@media (max-width:760px){.topbar.layout-2 .topbar-inner,.topbar.layout-3 .topbar-inner{display:flex;height:56px;}}";
    document.head.appendChild(style);
  }

  ensureLayoutStyles();
  document.documentElement.setAttribute("data-clavis-layout", layout);

  var currentSection = getCurrentSection();
  var activeBrand = isActiveSection("dump-brand", currentSection) ? "active" : "";
  var activeScience = isActiveSection("dump-science", currentSection) ? "active" : "";
  var activeTechtrust = isActiveSection("dump-techtrust", currentSection) ? "active" : "";
  var activeMedi = isActiveSection("medi-jewelry", currentSection) ? "active" : "";
  var activeActive = isActiveSection("active-lifestyle", currentSection) ? "active" : "";
  var activeLiving = isActiveSection("living-health", currentSection) ? "active" : "";
  var activeCollection = activeMedi || activeActive || activeLiving;
  var activeShop =
    isActiveSection("dump-shop", currentSection) ||
    isProductSection(currentSection) ||
    isActiveSection("bracelet", currentSection) ||
    isActiveSection("bracelet-consumer", currentSection)
      ? "active"
      : "";
  var isActiveShopClass = activeShop ? "active" : "";

  var leftMenuLayout1 =
    '<nav class="menu left">' +
    '<div class="menu-item has-submenu">' +
    '<a href="#dump-main">ABOUT</a>' +
    '<div class="submenu">' +
    '<a href="#dump-brand" class="' +
    activeBrand +
    '">BRAND</a>' +
    '<a href="#dump-science" class="' +
    activeScience +
    '">SCIENCE</a>' +
    '<a href="#dump-techtrust" class="' +
    activeTechtrust +
    '">TRUST</a>' +
    "</div></div>" +
    '<div class="menu-item has-submenu">' +
    '<a href="#dump-collection" class="' +
    (activeCollection ? "active" : "") +
    '">COLLECTION</a>' +
    '<div class="submenu">' +
    '<a href="#medi-jewelry" class="' +
    activeMedi +
    '">MEDI JEWELRY</a>' +
    '<a href="#active-lifestyle" class="' +
    activeActive +
    '">ACTIVE LIFESTYLE</a>' +
    '<a href="#living-health" class="' +
    activeLiving +
    '">LIVING &amp; HEALTH</a>' +
    "</div></div>" +
    '<a class="' +
    isActiveShopClass +
    '" href="#dump-shop">SHOP</a>' +
    "</nav>";

  var leftMenuLayout2 =
    '<nav class="menu left">' +
    '<a class="' +
    activeBrand +
    '" href="#dump-brand">BRAND</a>' +
    '<a class="' +
    activeScience +
    '" href="#dump-science">SCIENCE</a>' +
    '<a class="' +
    activeTechtrust +
    '" href="#dump-techtrust">TRUST</a>' +
    '<div class="menu-item has-submenu">' +
    '<a class="' +
    (activeCollection ? "active" : "") +
    '" href="#dump-collection">COLLECTION</a>' +
    '<div class="submenu">' +
    '<a href="#medi-jewelry" class="' +
    activeMedi +
    '">MEDI JEWELRY</a>' +
    '<a href="#active-lifestyle" class="' +
    activeActive +
    '">ACTIVE LIFESTYLE</a>' +
    '<a href="#living-health" class="' +
    activeLiving +
    '">LIVING &amp; HEALTH</a>' +
    "</div></div>" +
    '<a class="' +
    isActiveShopClass +
    '" href="#dump-shop">SHOP</a>' +
    "</nav>";

  var logo = '<a class="logo" href="#dump-main"><img class="logo-mark" src="./asset/etc/logo.svg" alt="ClaviS" /><span class="sr-only">ClaviS</span></a>';

  var rightMenuLayout1 =
    '<nav class="menu right">' +
    '<button aria-label="검색" class="icon-btn icon-search"><span aria-hidden="true"></span></button>' +
    '<button aria-label="로그인" class="icon-btn icon-user"><span aria-hidden="true"></span></button>' +
    '<button aria-label="장바구니" class="icon-btn icon-cart"><span aria-hidden="true"></span><span class="cart-count" aria-hidden="true">0</span></button>' +
    "</nav>";

  var rightMenuLayout2 =
    '<nav class="menu right">' +
    '<button aria-label="검색" class="icon-btn icon-search"><span aria-hidden="true"></span></button>' +
    '<a href="#dump-main" class="mypage-link">MYPAGE</a>' +
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

  Array.from(root.querySelectorAll("a.active")).forEach(function (link) {
    link.setAttribute("aria-current", "page");
  });

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
