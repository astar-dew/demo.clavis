(function () {
  var STORAGE_KEY = "clavis-theme";
  var rightMenu = document.querySelector(".topbar .menu.right");
  if (!rightMenu) return;

  localStorage.setItem(STORAGE_KEY, "light");

  var existingBtn = rightMenu.querySelector(".theme-toggle-btn");
  if (existingBtn) {
    existingBtn.remove();
  }
})();
