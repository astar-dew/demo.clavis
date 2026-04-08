(function () {
  var hero = document.querySelector(".hero");
  if (!hero) return;

  var banners = ["../asset/banner/main/banner1.png", "../asset/banner/main/banner2.png", "../asset/banner/main/banner3.png"];
  var categories = ["medi", "active", "living"];
  var captions = [
    "THE MOST ELEGANT WAY TO GAIN ENEGY",
    "INVISIBLE POWER CLAVIS",
    "provides energy closely integrated into daily life"
  ];
  var current = 0;
  var autoTimer = null;
  var isDragging = false;
  var dragStartX = 0;
  var dragDeltaX = 0;
  var dragMoved = false;
  var isDark = window.location.pathname.indexOf("/dark/") !== -1;

  function backgroundFor(src) {
    if (isDark) {
      return (
        "linear-gradient(to bottom, rgba(16, 20, 28, 0.72), rgba(16, 20, 28, 0.8)), " +
        'url("' +
        src +
        '")'
      );
    }

    return 'url("' + src + '")';
  }

  hero.style.position = "relative";
  hero.style.overflow = "hidden";
  hero.style.backgroundImage = "none";
  hero.style.cursor = "grab";
  hero.style.touchAction = "pan-y";

  var track = document.createElement("div");
  track.className = "main-banner-track";
  track.style.position = "absolute";
  track.style.left = "0";
  track.style.top = "0";
  track.style.width = banners.length * 100 + "%";
  track.style.height = "100%";
  track.style.display = "flex";
  track.style.transform = "translate3d(0, 0, 0)";
  track.style.transition = "transform 560ms ease";
  track.style.willChange = "transform";
  track.style.zIndex = "0";

  banners.forEach(function (src) {
    var slide = document.createElement("div");
    slide.className = "main-banner-slide";
    slide.style.flex = "0 0 " + 100 / banners.length + "%";
    slide.style.height = "100%";
    slide.style.backgroundImage = backgroundFor(src);
    slide.style.backgroundPosition = "center";
    slide.style.backgroundSize = "cover";
    slide.style.backgroundRepeat = "no-repeat";
    track.appendChild(slide);
  });

  hero.insertBefore(track, hero.firstChild);

  var overlay = hero.querySelector(".hero-overlay");
  var overlayTitle = hero.querySelector(".hero-overlay h1");
  var overlayEyebrow = hero.querySelector(".hero-overlay p");
  if (overlay) {
    overlay.style.position = "relative";
    overlay.style.zIndex = "1";
  }

  function updateCaption() {
    if (overlayTitle) {
      overlayTitle.textContent = captions[current] || captions[0];
    }
    if (overlayEyebrow) {
      overlayEyebrow.style.display = "none";
      overlayEyebrow.textContent = "";
    }
  }

  function updateTrack(withAnimation) {
    var width = hero.clientWidth || 1;
    var baseX = -current * width;
    track.style.transition = withAnimation ? "transform 560ms ease" : "none";
    track.style.transform = "translate3d(" + (baseX + dragDeltaX) + "px, 0, 0)";
  }

  function goTo(index) {
    if (index < 0) index = banners.length - 1;
    if (index >= banners.length) index = 0;
    current = index;
    dragDeltaX = 0;
    updateTrack(true);
    updateCaption();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, 3000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function onPointerDown(event) {
    isDragging = true;
    dragStartX = event.clientX;
    dragDeltaX = 0;
    dragMoved = false;
    hero.style.cursor = "grabbing";
    stopAuto();
    if (hero.setPointerCapture) {
      try {
        hero.setPointerCapture(event.pointerId);
      } catch (_e) {}
    }
  }

  function onPointerMove(event) {
    if (!isDragging) return;
    dragDeltaX = event.clientX - dragStartX;
    if (Math.abs(dragDeltaX) > 8) {
      dragMoved = true;
    }
    updateTrack(false);
  }

  function onPointerUp(event) {
    if (!isDragging) return;
    isDragging = false;
    hero.style.cursor = "grab";

    var width = hero.clientWidth || 1;
    var threshold = width * 0.15;
    var moved = event.clientX - dragStartX;

    if (moved <= -threshold) {
      goTo(current + 1);
    } else if (moved >= threshold) {
      goTo(current - 1);
    } else {
      dragDeltaX = 0;
      updateTrack(true);
    }

    startAuto();
  }

  hero.addEventListener("pointerdown", onPointerDown);
  hero.addEventListener("pointermove", onPointerMove);
  hero.addEventListener("pointerup", onPointerUp);
  hero.addEventListener("pointercancel", onPointerUp);
  hero.addEventListener("mouseleave", function () {
    if (isDragging) {
      isDragging = false;
      dragDeltaX = 0;
      hero.style.cursor = "grab";
      updateTrack(true);
      startAuto();
    }
  });

  window.addEventListener("resize", function () {
    dragDeltaX = 0;
    updateTrack(false);
  });

  hero.addEventListener("click", function () {
    if (dragMoved) return;
    var cat = categories[current] || categories[0];
    window.location.href = "./shop.html?cat=" + encodeURIComponent(cat);
  });

  updateTrack(false);
  updateCaption();
  startAuto();
})();
