(() => {
  const buttons = document.querySelectorAll("[data-brand-view-button]");
  const views = document.querySelectorAll("[data-brand-view]");

  if (!buttons.length || !views.length) return;

  const setView = (target) => {
    views.forEach((view) => {
      const isActive = view.dataset.brandView === target;
      view.hidden = !isActive;
      view.classList.toggle("is-active", isActive);
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.brandViewButton === target;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.brandViewButton);
    });
  });
})();
