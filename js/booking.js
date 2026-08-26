(function () {

  const arrow = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" stroke-width="1.2"/></svg>';

  const lock = window.AureliaScrollLock;



  const markup = `

    <div class="booking" data-booking role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-hidden="true">

      <div class="booking__backdrop" data-booking-close></div>

      <div class="booking__panel" data-lenis-prevent>

        <button class="booking__close" type="button" data-booking-close aria-label="Закрыть форму">✕</button>

        <form data-booking-form novalidate>

          <p class="eyebrow">Консультация</p>

          <h2 id="booking-title" class="h2" style="margin:10px 0 8px">Записаться на приём</h2>

          <p class="muted" style="margin-bottom:28px">Координатор подтвердит время по телефону. Демо: заявка не уходит на сервер.</p>

          <div class="field">

            <input id="bk-name" name="name" type="text" autocomplete="name" required placeholder=" ">

            <label for="bk-name">Имя</label>

            <p class="error">Пожалуйста, укажите имя.</p>

          </div>

          <div class="field">

            <input id="bk-phone" name="phone" type="tel" autocomplete="tel" required placeholder=" ">

            <label for="bk-phone">Телефон</label>

            <p class="error">Введите корректный номер телефона.</p>

          </div>

          <div class="field">

            <select id="bk-service" name="service" required>

              <option value="" selected disabled></option>

              <option>Консультация</option>

              <option>Виниры</option>

              <option>Имплантация</option>

              <option>Отбеливание</option>

              <option>Ортодонтия</option>

              <option>Терапия</option>

              <option>Гигиена</option>

            </select>

            <label for="bk-service">Выберите услугу</label>

            <p class="error">Выберите услугу.</p>

          </div>

          <div class="field">

            <input id="bk-date" name="date" type="date" required>

            <label for="bk-date">Желаемая дата</label>

            <p class="error">Выберите желаемую дату.</p>

          </div>

          <div class="field">

            <textarea id="bk-comment" name="comment" rows="3" placeholder=" "></textarea>

            <label for="bk-comment">Комментарий</label>

          </div>

          <button class="btn btn--primary btn--full" type="submit">Записаться на консультацию ${arrow}</button>

        </form>

        <div class="success-state hidden" data-booking-success>

          <div class="success-state__icon" aria-hidden="true">✓</div>

          <p class="eyebrow">Заявка отправлена</p>

          <h3>Спасибо!</h3>

          <p class="muted">Спасибо! Мы свяжемся с вами<br>в ближайшее время.</p>
          <p class="caption" style="margin-top:12px;opacity:.75">Демо: так выглядит подтверждение для пациента.</p>

          <button class="btn btn--primary" type="button" data-booking-success-close>Закрыть</button>

        </div>

      </div>

    </div>`;



  document.body.insertAdjacentHTML("beforeend", markup);



  const modal = document.querySelector("[data-booking]");

  const form = document.querySelector("[data-booking-form]");

  const success = document.querySelector("[data-booking-success]");

  if (!modal || !form) return;

  const panel = modal.querySelector(".booking__panel");

  if (panel) {
    panel.addEventListener("wheel", (e) => {
      const max = panel.scrollHeight - panel.clientHeight;
      if (max <= 0) return;

      const next = panel.scrollTop + e.deltaY;
      const atTop = panel.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) return;

      if (e.defaultPrevented) {
        panel.scrollTop = Math.max(0, Math.min(max, next));
      }
    }, { passive: false });
  }

  const fields = () => form.querySelectorAll(".field");

  const submitBtn = form.querySelector('[type="submit"]');

  const today = () => new Date().toISOString().split("T")[0];

  const dateInput = form.querySelector("#bk-date");

  if (dateInput) dateInput.min = today();



  const resetForm = () => {

    form.reset();

    form.classList.remove("hidden");

    if (success) success.classList.add("hidden");

    modal.classList.remove("is-loading");

    fields().forEach((wrap) => {

      wrap.classList.remove("is-invalid", "is-filled");

    });

    if (dateInput) dateInput.min = today();

  };



  const open = () => {

    resetForm();

    modal.classList.add("is-open");

    modal.setAttribute("aria-hidden", "false");

    if (lock) lock.lock();

    const first = form.querySelector("input");

    if (first) setTimeout(() => first.focus(), 80);

  };



  const close = () => {

    modal.classList.remove("is-open");

    modal.setAttribute("aria-hidden", "true");

    if (lock) lock.unlock();

    resetForm();

  };



  document.addEventListener("click", (e) => {

    const opener = e.target.closest("[data-open-booking]");

    if (opener) {

      e.preventDefault();

      open();

    }

    if (e.target.closest("[data-booking-close], [data-booking-success-close]")) close();

  });



  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal.classList.contains("is-open")) close();

  });



  fields().forEach((wrap) => {

    const input = wrap.querySelector("input, select, textarea");

    if (!input) return;

    const sync = () => wrap.classList.toggle("is-filled", Boolean(input.value));

    input.addEventListener("input", () => {

      wrap.classList.remove("is-invalid");

      sync();

    });

    input.addEventListener("blur", sync);

    sync();

  });



  const validPhone = (v) => v.replace(/\D/g, "").length >= 10;

  const validDate = (v) => {

    if (!v) return false;

    const d = new Date(v + "T12:00:00");

    if (Number.isNaN(d.getTime())) return false;

    return v >= today();

  };



  form.addEventListener("submit", (e) => {

    e.preventDefault();

    let ok = true;

    const name = form.name;

    const phone = form.phone;

    const service = form.service;

    const date = form.date;



    const invalidate = (el) => {

      el.closest(".field").classList.add("is-invalid");

      ok = false;

    };



    if (!name.value.trim() || name.value.trim().length < 2) invalidate(name);

    if (!validPhone(phone.value)) invalidate(phone);

    if (!service.value) invalidate(service);

    if (!validDate(date.value)) invalidate(date);



    if (!ok) return;



    modal.classList.add("is-loading");

    if (submitBtn) submitBtn.disabled = true;



    const finish = () => {

      modal.classList.remove("is-loading");

      if (submitBtn) submitBtn.disabled = false;

      form.classList.add("hidden");

      if (success) {

        success.classList.remove("hidden");

        if (window.gsap) {

          gsap.fromTo(success.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" });

        }

      }

    };



    setTimeout(finish, 900);

  });

})();

