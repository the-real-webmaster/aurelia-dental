(function () {
  const items = document.querySelectorAll("[data-faq] .faq-item");
  if (!items.length) return;

  items.forEach((item, i) => {
    const btn = item.querySelector("button");
    const panel = item.querySelector(".faq-item__body");
    if (!btn || !panel) return;
    const id = "faq-panel-" + i;
    panel.id = id;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", id);

    btn.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      items.forEach((other) => {
        other.classList.remove("is-open");
        const b = other.querySelector("button");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
