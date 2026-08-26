(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 993px)").matches;

  const revealContent = () => {
    document.querySelectorAll("[data-reveal], [data-reveal-stagger] > *").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  };

  const runPreloader = () => {
    const pre = document.querySelector("[data-preloader]");
    if (!pre) return Promise.resolve();
    const seen = sessionStorage.getItem("aurelia-preloader");
    if (seen || reduced) {
      pre.remove();
      return Promise.resolve();
    }
    sessionStorage.setItem("aurelia-preloader", "1");
    const bar = pre.querySelector("[data-preloader-bar]");
    return new Promise((resolve) => {
      if (window.gsap && bar) {
        const tl = gsap.timeline({ onComplete: () => { pre.remove(); resolve(); } });
        tl.to(bar, { width: "100%", duration: 0.7, ease: "power2.out" })
          .to(pre, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "-=0.05");
      } else {
        pre.remove();
        resolve();
      }
    });
  };

  const initLenis = () => {
    if (reduced || !desktop || typeof Lenis !== "function") return null;
    const lenis = new Lenis({
      lerp: 0.16,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4
    });
    window.__aureliaLenis = lenis;
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        document.dispatchEvent(new CustomEvent("aurelia:scroll"));
      });
      gsap.ticker.add((time) => lenis.raf(time * 1000));
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on("scroll", () => document.dispatchEvent(new CustomEvent("aurelia:scroll")));
    }
    return lenis;
  };

  const bindLenisScrollTrigger = (lenis) => {
    if (!lenis || !window.ScrollTrigger) return;
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });
    ScrollTrigger.addEventListener("refresh", () => {
      requestAnimationFrame(() => lenis.resize());
    });
  };

  const initHscroll = () => {
    const pin = document.querySelector("[data-hscroll]");
    if (!pin || !window.gsap || !window.ScrollTrigger) return;

    const track = pin.querySelector("[data-hscroll-track]");
    if (!track) return;

    gsap.matchMedia().add("(min-width: 993px)", () => {
      const getScroll = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.set(track, { clearProps: "transform" });

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + Math.max(getScroll(), window.innerHeight * 0.75),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true
        }
      });

      pin.querySelectorAll("img").forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => ScrollTrigger.refresh(true), { once: true });
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });
  };

  const initMotion = () => {
    if (!window.gsap) {
      revealContent();
      return;
    }
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    }

    const hero = document.querySelector("[data-hero]");
    if (hero && !reduced) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", immediateRender: false } });
      tl.from(".header", { opacity: 0, y: -16, duration: 0.7 })
        .from(".hero__media img", { scale: 1.08, duration: 1.1, ease: "power2.out" }, 0)
        .fromTo(".hero__media", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.95, ease: "power3.inOut" }, 0)
        .from("[data-hero-copy] > *", { y: 36, opacity: 0, duration: 0.85, stagger: 0.08 }, 0.35)
        .from(".hero__aside > *", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.55);
    }

    if (reduced) {
      revealContent();
      return;
    }

    ScrollTrigger.batch("[data-reveal]", {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          overwrite: true
        });
      }
    });

    gsap.utils.toArray("[data-reveal-stagger]").forEach((wrap) => {
      gsap.from(wrap.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: wrap, start: "top 90%", once: true }
      });
    });

    gsap.utils.toArray(".reveal-img img").forEach((img) => {
      gsap.fromTo(img, { scale: 1.06 }, {
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: img, start: "top 90%", once: true }
      });
    });

    gsap.utils.toArray("[data-parallax]").forEach((img) => {
      gsap.to(img, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 }
      });
    });

    initHscroll();

    document.querySelectorAll("[data-counter]").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-suffix") || "";
      const decimals = el.getAttribute("data-decimals") ? 1 : 0;
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = (decimals ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
            }
          });
        }
      });
    });

    gsap.utils.toArray(".timeline .tl-item").forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -32,
        duration: 0.75,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: item, start: "top 90%", once: true }
      });
    });
  };

  const start = async () => {
    const lenis = initLenis();
    bindLenisScrollTrigger(lenis);
    if (!reduced) await runPreloader();
    else {
      const pre = document.querySelector("[data-preloader]");
      if (pre) pre.remove();
    }
    initMotion();
    if (window.ScrollTrigger) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  };

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
