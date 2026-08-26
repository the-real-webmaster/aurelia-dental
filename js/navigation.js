(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-nav-close]");
  const links = document.querySelectorAll(".nav a, .mobile-nav a");
  const lock = window.AureliaScrollLock;

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const setMenu = (open) => {
    if (!toggle || !mobile) return;

    toggle.classList.toggle("is-open", open);
    mobile.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mobile.setAttribute("aria-hidden", open ? "false" : "true");

    if (open) {
      if (lock) lock.lock();
      document.body.classList.add("nav-open");
    } else {
      if (lock) lock.unlock();
      document.body.classList.remove("nav-open");
    }

    const items = mobile.querySelectorAll(".mobile-nav__list li");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.gsap && !reduced) {
      if (open) {
        gsap.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out", delay: 0.1 });
      } else {
        gsap.set(items, { clearProps: "opacity,transform" });
      }
    }
  };

  if (toggle && mobile) {
    toggle.addEventListener("click", () => setMenu(!mobile.classList.contains("is-open")));

    if (closeBtn) {
      closeBtn.addEventListener("click", () => setMenu(false));
    }

    mobile.querySelectorAll(".mobile-nav__list a, .mobile-nav__meta button").forEach((el) => {
      el.addEventListener("click", () => setMenu(false));
    });

    mobile.addEventListener("click", (e) => {
      if (e.target === mobile) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobile.classList.contains("is-open")) setMenu(false);
    });
  }

  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").split("?")[0].toLowerCase();
    if (href && href === file) a.classList.add("is-active");
    if (file.startsWith("service-") && href === "services.html") a.classList.add("is-active");
    if (file === "doctor.html" && href === "doctors.html") a.classList.add("is-active");
    if ((file === "blog-article.html" || file === "article.html") && (href === "journal.html" || href === "blog.html")) a.classList.add("is-active");
    if (file === "journal.html" && href === "journal.html") a.classList.add("is-active");
  });
})();
