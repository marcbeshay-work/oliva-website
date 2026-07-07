document.getElementById('year').textContent = new Date().getFullYear();
// The reservationWidgetStatus cookie is set in an inline script in the HTML,
// before the eet.nu widget script loads — setting it here would be too late.

if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    target.scrollIntoView(true);
    document.documentElement.style.scrollBehavior = previousBehavior;
  }
}

const reservationScript = document.getElementById('eetnuReservationWidget');
let reservationUserRequestedOpen = false;
// The inline cookie in the HTML should make the widget start collapsed.
// As a fallback (e.g. if eet.nu ignores the cookie), collapse at most ONE
// auto-expansion, and only in the first moments after page load — every
// later expansion is a real user click and must be left alone.
let reservationSuppressUsed = false;
const reservationLoadTime = Date.now();
if (reservationScript) {
  reservationScript.addEventListener('reservation-widget-expanded', () => {
    const withinLoadWindow = Date.now() - reservationLoadTime < 1500;
    if (withinLoadWindow && !reservationSuppressUsed && !reservationUserRequestedOpen) {
      reservationSuppressUsed = true;
      const widget = reservationScript.reservationWidget;
      if (widget && typeof widget.collapse === 'function') {
        widget.collapse();
      }
    }
  });
}

const reserveTriggers = document.querySelectorAll('[data-open-reservation], .hero__reserve-cta');
if (reserveTriggers.length && reservationScript) {
  reserveTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      reservationUserRequestedOpen = true;
      suppressReservationAutoExpand = false;

      const target = document.getElementById('reserveren');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // eet.nu's SDK listens for this exact hash convention and opens
      // the floating widget itself, regardless of load timing.
      if (window.location.hash === '#reservation_widget_expanded') {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } else {
        window.location.hash = 'reservation_widget_expanded';
      }

      // Belt-and-braces: also call the JS API directly once it's available.
      let attempts = 0;
      const tryExpand = () => {
        const widget = reservationScript.reservationWidget;
        if (widget && typeof widget.expand === 'function') {
          widget.expand();
        } else if (attempts < 40) {
          attempts += 1;
          setTimeout(tryExpand, 200);
        }
      };
      tryExpand();
    });
  });
}

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const heroLogoFull = document.getElementById('heroLogoFull');
const heroLogoMark = document.getElementById('heroLogoMark');
if (heroLogoFull && heroLogoMark) {
  const fadeDistance = 100;
  const updateHeroLogo = () => {
    const t = Math.min(1, Math.max(0, window.scrollY / fadeDistance));
    heroLogoFull.style.opacity = String(1 - t);
    heroLogoMark.style.opacity = String(t);
  };
  window.addEventListener('scroll', updateHeroLogo, { passive: true });
  updateHeroLogo();
}

const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (parallaxEls.length && !prefersReducedMotion) {
  let ticking = false;
  const updateParallax = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const strength = parseFloat(el.dataset.parallax) || 8;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      el.style.backgroundPositionY = `${50 - clamped * strength}%`;
    });
    ticking = false;
  };
  const requestParallax = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  updateParallax();
}

const revealTargets = document.querySelectorAll('.section__text, .section__media, .gallery__item, .menu-col, .hero__content, .intro-collage, .quote-band__text, .gallery--even > div, .menukaart-photo, .catering-collage, .testimonial-card, .quick-links, .kaart-section__eyebrow, .kaart-intro__photo, .kaart-list, .menukaart-col');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

const kaartNav = document.getElementById('kaartNav');
if (kaartNav) {
  const kaartLinks = Array.from(kaartNav.querySelectorAll('a[href^="#"]'));
  const kaartSections = kaartLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);

  const setActiveKaartLink = (id) => {
    let activeLink = null;
    kaartLinks.forEach((link) => {
      const isActive = link.hash === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) activeLink = link;
    });
    // Keep the active chip in view inside the horizontally scrollable bar.
    if (activeLink) {
      const bar = kaartNav.querySelector('.kaart-nav__inner');
      const barRect = bar.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.left < barRect.left || linkRect.right > barRect.right) {
        bar.scrollTo({
          left: activeLink.offsetLeft - barRect.width / 2 + linkRect.width / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  let kaartSpyTicking = false;
  const kaartSpy = () => {
    const fromTop = window.scrollY + 130;
    let current = kaartSections[0];
    kaartSections.forEach((section) => {
      if (section.offsetTop <= fromTop) current = section;
    });
    if (current) setActiveKaartLink(current.id);
    kaartSpyTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!kaartSpyTicking) {
      requestAnimationFrame(kaartSpy);
      kaartSpyTicking = true;
    }
  }, { passive: true });
  kaartSpy();
}

const carousel = document.getElementById('testimonialCarousel');
if (carousel) {
  const pages = Array.from(carousel.querySelectorAll('.testimonial-grid'));
  const dots = Array.from(carousel.querySelectorAll('.testimonial-dot'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer;

  function showPage(index) {
    if (index === current) return;
    const outgoing = pages[current];
    const incoming = pages[index];

    const revealIncoming = () => {
      // outgoing is now hidden (no longer takes up layout space) before
      // incoming appears, so the two grids are never both visible at once.
      outgoing.hidden = true;
      outgoing.classList.remove('is-fading', 'is-active');
      incoming.hidden = false;
      incoming.classList.add('is-fading');
      void incoming.offsetWidth; // force layout so the fade-in can transition
      requestAnimationFrame(() => {
        incoming.classList.add('is-active');
        incoming.classList.remove('is-fading');
      });
    };

    if (reduceMotion) {
      outgoing.hidden = true;
      outgoing.classList.remove('is-active');
      incoming.hidden = false;
      incoming.classList.add('is-active');
    } else {
      outgoing.classList.add('is-fading');
      setTimeout(revealIncoming, 260);
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
    current = index;
  }

  function nextPage() {
    showPage((current + 1) % pages.length);
  }

  function resetTimer() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(nextPage, 7000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showPage(Number(dot.dataset.page));
      resetTimer();
    });
  });

  resetTimer();
}
