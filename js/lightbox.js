(function () {
  const lock = window.AureliaScrollLock;
  const items = [...document.querySelectorAll("[data-lightbox]")];
  if (!items.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-hidden", "true");
  box.innerHTML = `
    <div class="lightbox__backdrop" data-lb-close></div>
    <button class="lightbox__close" type="button" data-lb-close aria-label="Закрыть">✕</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="Назад">←</button>
    <figure class="lightbox__figure">
      <img alt="">
      <figcaption class="caption" style="color:var(--text);margin-top:12px;text-align:center"></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="Вперёд">→</button>`;
  document.body.appendChild(box);

  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const el = items[index];
    const src = el.getAttribute("href") || el.getAttribute("data-full") || (el.querySelector("img") || {}).src;
    const alt = el.getAttribute("data-caption") || (el.querySelector("img") || {}).alt || "";
    if (src) img.src = src;
    img.alt = alt;
    cap.textContent = alt;
  };

  const open = (i) => {
    show(i);
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    if (lock) lock.lock();
  };

  const close = () => {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    if (lock) lock.unlock();
  };

  items.forEach((el, i) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      open(i);
    });
  });

  box.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1));
  box.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1));
  box.querySelectorAll("[data-lb-close]").forEach((b) => b.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
