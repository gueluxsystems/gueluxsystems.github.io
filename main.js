/* ============================================================
   GUELUX — main.js v2
   IIFE — no ES modules — works on file:// and all hosts
   ============================================================ */
(function () {
  "use strict";

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    var nav = document.getElementById("nav");
    var burger = nav && nav.querySelector(".nav-burger");
    var mobileMenu = document.getElementById("navMobile");
    if (!nav) return;

    var isOpen = false;

    function onScroll() {
      nav.classList.toggle("is-solid", window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (burger && mobileMenu) {
      burger.addEventListener("click", function () {
        isOpen = !isOpen;
        burger.classList.toggle("is-open", isOpen);
        mobileMenu.classList.toggle("is-open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
      });
      mobileMenu.querySelectorAll(".nav-mobile-link").forEach(function (link) {
        link.addEventListener("click", function () {
          isOpen = false;
          burger.classList.remove("is-open");
          mobileMenu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  /* ============================================================
     MOUSE-REACTIVE GRADIENT
     ============================================================ */
  function initMouseGradient() {
    if (window.matchMedia("(hover: none)").matches) return;
    var tX = 40, tY = 55, cX = 40, cY = 55, rafId = null;
    function lerp(a, b, t) { return a + (b - a) * t; }
    function tick() {
      cX = lerp(cX, tX, 0.06);
      cY = lerp(cY, tY, 0.06);
      document.documentElement.style.setProperty("--mx", cX.toFixed(2) + "%");
      document.documentElement.style.setProperty("--my", cY.toFixed(2) + "%");
      rafId = requestAnimationFrame(tick);
    }
    window.addEventListener("mousemove", function (e) {
      tX = (e.clientX / window.innerWidth) * 100;
      tY = (e.clientY / window.innerHeight) * 100;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }, { passive: true });
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  function initReveals() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.02, rootMargin: "0px 0px -2% 0px" });

    els.forEach(function (el) { io.observe(el); });

    // Safety: force-reveal anything still hidden after 5s
    setTimeout(function () {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 5000);
  }

  /* ============================================================
     HERO LINES
     ============================================================ */
  function initHeroLines() {
    setTimeout(function () {
      document.querySelectorAll(".hero-line").forEach(function (line) {
        line.classList.add("is-visible");
      });
    }, 120);
  }

  /* ============================================================
     COUNT-UP
     ============================================================ */
  function initCountUp() {
    var els = document.querySelectorAll("[data-count-to]");
    if (!els.length) return;
    var done = {};

    function run(el) {
      var key = el.dataset.countTo;
      if (done[key]) return;
      done[key] = true;
      var target = parseInt(el.dataset.countTo, 10);
      var start = performance.now();
      var dur = 1500;
      function ease(t) { return 1 - Math.pow(1 - t, 3); }
      function frame(now) {
        var t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(ease(t) * target);
        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      els.forEach(run); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     CASE CARDS — expandable on click / hover
     ============================================================ */
  function initCaseCards() {
    var cards = document.querySelectorAll("[data-case]");
    if (!cards.length) return;

    var isTouchDevice = window.matchMedia("(hover: none)").matches;

    cards.forEach(function (card) {
      if (isTouchDevice) {
        // Touch: expand/collapse on click
        card.addEventListener("click", function () {
          var isOpen = card.classList.contains("is-expanded");
          // Close all others
          cards.forEach(function (c) { c.classList.remove("is-expanded"); });
          if (!isOpen) card.classList.add("is-expanded");
        });
      } else {
        // Desktop: expand on hover
        card.addEventListener("mouseover", function (e) {
          if (!card.contains(e.relatedTarget)) {
            cards.forEach(function (c) { c.classList.remove("is-expanded"); });
            card.classList.add("is-expanded");
          }
        });
        card.addEventListener("mouseout", function (e) {
          if (!card.contains(e.relatedTarget)) {
            card.classList.remove("is-expanded");
          }
        });
      }
    });
  }

  /* ============================================================
     SERVICE CARDS — accent glow on hover
     ============================================================ */
  function initServiceCards() {
    document.querySelectorAll(".service-card").forEach(function (card) {
      card.addEventListener("mouseover", function (e) {
        if (!card.contains(e.relatedTarget)) {
          card.style.boxShadow = "inset 0 0 0 1px rgba(150,255,56,0.2)";
        }
      });
      card.addEventListener("mouseout", function (e) {
        if (!card.contains(e.relatedTarget)) {
          card.style.boxShadow = "";
        }
      });
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    safe(initNav, "initNav");
    safe(initMouseGradient, "initMouseGradient");
    safe(initHeroLines, "initHeroLines");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initCaseCards, "initCaseCards");
    safe(initServiceCards, "initServiceCards");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
