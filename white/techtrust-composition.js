(() => {
  const buttons = document.querySelectorAll("[data-tt-view-button]");
  const views = document.querySelectorAll("[data-tt-view]");

  if (!buttons.length || !views.length) return;

  const setView = (target) => {
    views.forEach((view) => {
      const isActive = view.dataset.ttView === target;
      view.hidden = !isActive;
      view.classList.toggle("is-active", isActive);
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.ttViewButton === target;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.ttViewButton);
    });
  });
})();
