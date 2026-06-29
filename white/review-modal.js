(() => {
  const modal = document.querySelector("[data-review-modal]");
  if (!modal) return;

  const modalImage = modal.querySelector("[data-review-modal-img]");
  const modalMetric = modal.querySelector("[data-review-modal-metric]");
  const modalTitle = modal.querySelector("#review-modal-title");
  const modalCopy = modal.querySelector("[data-review-modal-copy]");
  const modalName = modal.querySelector("[data-review-modal-name]");
  const modalProfile = modal.querySelector("[data-review-modal-profile]");
  const closeButtons = modal.querySelectorAll("[data-review-close]");
  const triggers = document.querySelectorAll(".review-image-button");

  const openModal = (trigger) => {
    modalImage.src = trigger.dataset.reviewImg || "";
    modalImage.alt = `${trigger.dataset.reviewName || "고객"} 상세 후기 이미지`;
    modalMetric.textContent = trigger.dataset.reviewMetric || "";
    modalTitle.textContent = `"${trigger.dataset.reviewTitle || "상세 후기"}"`;
    modalCopy.textContent = `"${trigger.dataset.reviewCopy || ""}"`;
    modalName.textContent = trigger.dataset.reviewName || "";
    modalProfile.textContent = trigger.dataset.reviewProfile || "";
    modal.hidden = false;
    document.body.classList.add("review-modal-open");
    modal.querySelector(".review-modal-close").focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("review-modal-open");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
})();
