(function () {
  var body = document.body;
  if (!body) return;
  body.classList.add("mobile-nav-enabled");

  var topbar = document.querySelector(".topbar");
  if (!topbar) return;

  var topbarInner = topbar.querySelector(".topbar-inner");
  var rightMenu = topbar.querySelector(".menu.right");
  var logo = topbar.querySelector(".logo");
  if (!rightMenu || !logo || !topbarInner) return;

  var openBtn = topbarInner.querySelector(".mobile-menu-open");
  if (!openBtn) {
    openBtn = document.createElement("button");
    openBtn.className = "mobile-menu-open";
    openBtn.setAttribute("aria-label", "메뉴 열기");
    openBtn.innerHTML = "<span></span><span></span><span></span>";
    topbarInner.insertBefore(openBtn, logo);
  } else if (openBtn.parentElement !== topbarInner) {
    topbarInner.insertBefore(openBtn, logo);
  }

  var overlay = document.querySelector(".mobile-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("aside");
    overlay.className = "mobile-nav-overlay";
    overlay.setAttribute("aria-hidden", "true");

    var groupsHtml = "";
    var layout = document.documentElement.getAttribute("data-clavis-layout");
    if (layout === "layout2" || layout === "layout3") {
      groupsHtml += '<section class="mobile-nav-group"><a class="mobile-nav-direct" href="./brand.html">BRAND</a></section>';
      groupsHtml += '<section class="mobile-nav-group"><a class="mobile-nav-direct" href="./science.html">SCIENCE</a></section>';
      groupsHtml += '<section class="mobile-nav-group"><a class="mobile-nav-direct" href="./techtrust.html">TRUST</a></section>';
      groupsHtml +=
        '<section class="mobile-nav-group open">' +
        '<button class="mobile-nav-toggle" type="button" aria-expanded="true">' +
        "<span>COLLECTION</span><span class=\"chev\"></span></button>" +
        '<div class="mobile-nav-links">' +
        '<a href="./medi-jewelry.html">- medi-jewelry</a>' +
        '<a href="./active-lifestyle.html">- active lifestyle</a>' +
        '<a href="./living-health.html">- living &amp; health</a>' +
        "</div></section>";
      groupsHtml += '<section class="mobile-nav-group"><a class="mobile-nav-direct" href="./shop.html">SHOP</a></section>';
    } else {
      var leftGroups = Array.from(document.querySelectorAll(".menu.left .menu-item.has-submenu"));
      leftGroups.forEach(function (group, index) {
        var rootLink = group.querySelector(":scope > a");
        var title = rootLink ? rootLink.textContent.trim() : "MENU";
        var links = Array.from(group.querySelectorAll(".submenu a"));
        var linkHtml = links
          .map(function (a) {
            return '<a href="' + a.getAttribute("href") + '">' + a.textContent.trim() + "</a>";
          })
          .join("");

        groupsHtml +=
          '<section class="mobile-nav-group' +
          (index === 0 ? " open" : "") +
          '">' +
          '<button class="mobile-nav-toggle" type="button" aria-expanded="' +
          (index === 0 ? "true" : "false") +
          '">' +
          "<span>" +
          title +
          '</span><span class="chev"></span></button>' +
          '<div class="mobile-nav-links">' +
          linkHtml +
          "</div></section>";
      });
      groupsHtml += '<section class="mobile-nav-group"><a class="mobile-nav-direct" href="./shop.html">SHOP</a></section>';
    }

    overlay.innerHTML =
      '<div class="mobile-nav-head">' +
      '<a class="mobile-nav-logo" href="' +
      logo.getAttribute("href") +
      '">' +
      logo.innerHTML +
      "</a>" +
      '<button aria-label="메뉴 닫기" class="mobile-menu-close">✕</button>' +
      "</div>" +
      '<div class="mobile-nav-body">' +
      groupsHtml +
      "</div>";
    body.appendChild(overlay);
  }

  var closeBtn = overlay.querySelector(".mobile-menu-close");
  var toggles = Array.from(overlay.querySelectorAll(".mobile-nav-toggle"));
  var overlayLinks = Array.from(overlay.querySelectorAll("a"));

  function getFileName(value) {
    return (value || "").split("?")[0].split("#")[0].split("/").pop();
  }

  function getCurrentMenuFile() {
    var file = getFileName(window.location.pathname) || "index.html";
    var hash = (window.location.hash || "").replace("#", "");

    if (file === "product-ares.html" || file === "product-astra.html") return "medi-jewelry.html";
    if (file === "product-bach.html") return "active-lifestyle.html";
    if (file === "product-circle.html") return "living-health.html";
    if (file === "collection.html") {
      if (hash === "active-lifestyle") return "active-lifestyle.html";
      if (hash === "living-health") return "living-health.html";
      return "medi-jewelry.html";
    }
    if (file === "consumer.html" || file === "medical.html" || file === "magnetic-patch.html" || file === "astra-rose.html") {
      return "shop.html";
    }

    return file;
  }

  function markActiveLinks() {
    var currentFile = getCurrentMenuFile();

    overlayLinks.forEach(function (a) {
      var targetFile = getFileName(a.getAttribute("href"));
      var isActive = targetFile === currentFile;
      a.classList.toggle("active", isActive);
      if (isActive) {
        a.setAttribute("aria-current", "page");
        var group = a.closest(".mobile-nav-group");
        var toggle = group ? group.querySelector(".mobile-nav-toggle") : null;
        if (group && toggle) {
          group.classList.add("open");
          toggle.setAttribute("aria-expanded", "true");
        }
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  markActiveLinks();

  function openMenu() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    body.classList.add("mobile-nav-open");
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    body.classList.remove("mobile-nav-open");
  }

  openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".mobile-nav-group");
      if (!group) return;
      var open = group.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  overlayLinks.forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
})();
