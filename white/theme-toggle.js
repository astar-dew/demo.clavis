(function () {
  var STORAGE_KEY = "clavis-theme";
  var rightMenu = document.querySelector(".topbar .menu.right");
  if (!rightMenu) return;

  var currentIsDark = window.location.pathname.indexOf("/dark/") !== -1;
  localStorage.setItem(STORAGE_KEY, currentIsDark ? "dark" : "light");

  var existingBtn = rightMenu.querySelector(".theme-toggle-btn");
  if (existingBtn) {
    existingBtn.remove();
  }
})();
