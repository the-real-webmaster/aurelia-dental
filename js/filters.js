(function () {
  const setup = (rootSel, itemSel) => {
    const root = document.querySelector(rootSel);
    if (!root) return;
    const buttons = root.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll(itemSel);
    if (!buttons.length || !items.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const key = btn.getAttribute("data-filter");
        items.forEach((item) => {
          const show = key === "all" || item.getAttribute("data-cat") === key;
          if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            if (show) {
              item.classList.remove("is-hidden");
              gsap.fromTo(item, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
            } else {
              gsap.to(item, {
                opacity: 0,
                scale: 0.96,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => { item.classList.add("is-hidden"); }
              });
            }
          } else {
            item.classList.toggle("is-hidden", !show);
          }
        });
      });
    });
  };

  setup("[data-price-filters]", "[data-price-item]");
  setup("[data-gallery-filters]", "[data-gallery-item]");
  setup("[data-journal-filters]", "[data-journal-item]");
})();
