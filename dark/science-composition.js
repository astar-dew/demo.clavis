(() => {
  const buttons = document.querySelectorAll("[data-science-view-button]");
  const views = document.querySelectorAll("[data-science-view]");

  if (!buttons.length || !views.length) return;

  const setView = (target) => {
    views.forEach((view) => {
      const isActive = view.dataset.scienceView === target;
      view.hidden = !isActive;
      view.classList.toggle("is-active", isActive);
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.scienceViewButton === target;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.scienceViewButton);
    });
  });
})();
