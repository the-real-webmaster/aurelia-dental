(function () {
  let count = 0;
  let scrollY = 0;
  let scrollbarWidth = 0;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  function measureScrollbar() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function stopLenis() {
    if (window.__aureliaLenis && typeof window.__aureliaLenis.stop === "function") {
      window.__aureliaLenis.stop();
    }
  }

  function startLenis() {
    if (window.__aureliaLenis && typeof window.__aureliaLenis.start === "function") {
      window.__aureliaLenis.start();
    }
  }

  window.AureliaScrollLock = {
    lock() {
      if (count === 0) {
        scrollY = window.scrollY || document.documentElement.scrollTop;
        scrollbarWidth = measureScrollbar();
        document.documentElement.classList.add("scroll-locked");
        document.body.classList.add("scroll-locked");

        if (coarse) {
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.top = "-" + scrollY + "px";
          document.body.style.width = "100%";
          if (scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + "px";
            const header = document.querySelector("[data-header]");
            if (header) header.style.paddingRight = scrollbarWidth + "px";
          }
        }

        stopLenis();
      }
      count += 1;
    },

    unlock() {
      if (count <= 0) return;
      count -= 1;
      if (count > 0) return;

      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");

      if (coarse) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      } else {
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.paddingRight = "";
        const header = document.querySelector("[data-header]");
        if (header) header.style.paddingRight = "";
        window.scrollTo(0, scrollY);
      }

      startLenis();

      if (window.ScrollTrigger) {
        requestAnimationFrame(function () {
          ScrollTrigger.refresh(true);
        });
      }
    }
  };
})();
