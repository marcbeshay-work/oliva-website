document.getElementById('year').textContent = new Date().getFullYear();

if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    target.scrollIntoView(true);
    document.documentElement.style.scrollBehavior = previousBehavior;
  }
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

const revealTargets = document.querySelectorAll('.section__text, .section__media, .gallery__item, .menu-col, .hero__content');
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
