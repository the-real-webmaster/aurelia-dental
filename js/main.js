(function () {

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const coarse = window.matchMedia("(pointer: coarse)").matches;



  const year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());



  if (document.querySelector(".mobile-cta")) {

    document.body.classList.add("has-mobile-cta");

  }



  const progress = document.querySelector(".scroll-progress");

  const back = document.querySelector("[data-back-top]");

  const onScroll = () => {

    const h = document.documentElement;

    const max = h.scrollHeight - h.clientHeight;

    if (progress && max > 0) progress.style.width = (h.scrollTop / max) * 100 + "%";

    if (back) back.classList.toggle("is-visible", h.scrollTop > 600);

  };

  window.addEventListener("scroll", onScroll, { passive: true });

  onScroll();

  if (back) back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));



  document.querySelectorAll("[data-ba]").forEach((ba) => {

    const after = ba.querySelector(".ba__after");

    const handle = ba.querySelector(".ba__handle");

    const setPos = (clientX) => {

      const rect = ba.getBoundingClientRect();

      let x = (clientX - rect.left) / rect.width;

      x = Math.min(0.92, Math.max(0.08, x));

      const pct = x * 100;

      if (after) after.style.clipPath = "inset(0 0 0 " + pct + "%)";

      if (handle) handle.style.left = pct + "%";

      ba.setAttribute("aria-valuenow", String(Math.round(pct)));

    };

    let drag = false;

    let pointerId = null;

    const getX = (e) => (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);

    const start = (e) => {

      drag = true;

      ba.classList.add("is-dragging");

      if (e.pointerId !== undefined && ba.setPointerCapture) {

        pointerId = e.pointerId;

        ba.setPointerCapture(e.pointerId);

      }

      setPos(getX(e));

    };

    const move = (e) => {

      if (!drag) return;

      if (e.cancelable) e.preventDefault();

      setPos(getX(e));

    };

    const end = () => {

      if (!drag) return;

      drag = false;

      ba.classList.remove("is-dragging");

      if (pointerId !== null && ba.releasePointerCapture) {

        try { ba.releasePointerCapture(pointerId); } catch (_) { /* noop */ }

        pointerId = null;

      }

    };

    if (window.PointerEvent) {

      ba.addEventListener("pointerdown", start);

      ba.addEventListener("pointermove", move);

      ba.addEventListener("pointerup", end);

      ba.addEventListener("pointercancel", end);

    } else {

      ba.addEventListener("mousedown", start);

      ba.addEventListener("touchstart", start, { passive: true });

      window.addEventListener("mousemove", move);

      window.addEventListener("touchmove", move, { passive: false });

      window.addEventListener("mouseup", end);

      window.addEventListener("touchend", end);

    }

    ba.addEventListener("keydown", (e) => {

      const current = parseFloat(ba.getAttribute("aria-valuenow") || "50");

      const rect = ba.getBoundingClientRect();

      if (e.key === "ArrowLeft") {

        e.preventDefault();

        setPos(rect.left + ((current - 4) / 100) * rect.width);

      }

      if (e.key === "ArrowRight") {

        e.preventDefault();

        setPos(rect.left + ((current + 4) / 100) * rect.width);

      }

    });

  });



  const svcRows = document.querySelectorAll("[data-svc-row]");

  const svcImg = document.querySelector("[data-svc-image]");

  const svcCap = document.querySelector("[data-svc-cap], [data-svc-caption]");

  svcRows.forEach((row) => {

    const apply = () => {

      if (svcImg && row.dataset.image) svcImg.src = row.dataset.image;

      if (svcCap) svcCap.textContent = row.dataset.caption || "";

    };

    row.addEventListener("mouseenter", apply);

    row.addEventListener("focus", apply);

  });



  if (!coarse && !reduced) {

    const cursor = document.querySelector("[data-cursor]");

    if (cursor) {

      document.body.classList.add("has-cursor");

      const label = cursor.querySelector(".cursor__label");

      if (label) label.remove();

      const dot = cursor.querySelector(".cursor__dot");

      const ring = cursor.querySelector(".cursor__ring");

      if (!dot || !ring) return;

      let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;

      window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

      const loop = () => {

        dx += (mx - dx) * 0.32;

        dy += (my - dy) * 0.32;

        rx += (mx - rx) * 0.14;

        ry += (my - ry) * 0.14;

        dot.style.transform = "translate(" + dx + "px," + dy + "px) translate(-50%, -50%)";

        ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%, -50%)";

        requestAnimationFrame(loop);

      };

      loop();

      document.addEventListener("mouseover", (e) => {

        const imgHost = e.target.closest("a img, .media, [data-lightbox], figure img");

        const linkHost = e.target.closest("a, button, [data-open-booking], input, select, textarea");

        cursor.classList.toggle("is-hover-image", Boolean(imgHost));

        cursor.classList.toggle("is-hover-link", Boolean(linkHost) && !imgHost);

      });

      document.addEventListener("mouseout", (e) => {

        if (!e.relatedTarget || !document.contains(e.relatedTarget)) {

          cursor.classList.remove("is-hover-image", "is-hover-link");

        }

      });

    }



  }



  const profile = document.querySelector("[data-doctor-page]");

  if (profile && window.AURELIA) {

    const params = new URLSearchParams(location.search);

    const id = params.get("id") || "volkov";

    const d = window.AURELIA.doctors[id] || window.AURELIA.doctors.volkov;

    const set = (sel, val) => {

      profile.querySelectorAll(sel).forEach((el) => { el.textContent = val; });

    };

    set("[data-d-name]", d.name);

    set("[data-d-role]", d.role);

    set("[data-d-spec]", d.spec);

    set("[data-d-years]", d.years);

    set("[data-d-edu]", d.education);

    set("[data-d-approach]", d.approach);

    set("[data-d-interests]", d.interests);

    set("[data-d-conf]", d.conferences);

    const img = profile.querySelector("[data-d-image]");

    if (img) {

      img.src = d.image;

      img.alt = d.name + ", " + d.role + " — Aurelia Dental";

    }

    const title = document.querySelector("title");

    if (title) title.textContent = d.name + " — Aurelia Dental";

    const certs = profile.querySelector("[data-d-certs]");

    if (certs) {

      certs.innerHTML = d.certs.map((c) =>

        '<a href="assets/icons/certificate.svg" data-lightbox data-caption="' + c + '"><span class="caption">Сертификат</span><strong class="serif" style="display:block;margin-top:12px;font-size:1.15rem">' + c + "</strong></a>"

      ).join("");

    }

  }



  const articleRoot = document.querySelector("[data-article-page]");

  if (articleRoot && window.AURELIA) {

    const slug = new URLSearchParams(location.search).get("slug") || "veneers";

    const a = window.AURELIA.articles[slug] || window.AURELIA.articles.veneers;

    articleRoot.querySelectorAll("[data-a-title]").forEach((el) => { el.textContent = a.title; });

    articleRoot.querySelectorAll("[data-a-cat]").forEach((el) => { el.textContent = a.category; });

    articleRoot.querySelectorAll("[data-a-date]").forEach((el) => { el.textContent = a.date; });

    articleRoot.querySelectorAll("[data-a-time]").forEach((el) => { el.textContent = a.time; });

    articleRoot.querySelectorAll("[data-a-author]").forEach((el) => { el.textContent = a.author; });

    const img = articleRoot.querySelector("[data-a-image]");

    if (img) { img.src = a.image; img.alt = a.title; }

    const title = document.querySelector("title");

    if (title) title.textContent = a.title + " — Журнал Aurelia";

  }

})();

