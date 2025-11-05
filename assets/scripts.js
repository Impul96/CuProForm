// Copyright year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Language toggle
(function () {
  const toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;
  const root = document.documentElement;
  const body = document.body;
  const stored = window.localStorage?.getItem('lang');
  const defaultLang = stored === 'en' ? 'en' : 'fr';

  function apply(lang) {
    const next = lang === 'en' ? 'en' : 'fr';
    body.dataset.lang = next;
    root.lang = next;
    toggle.textContent = next.toUpperCase();
    toggle.setAttribute(
      'aria-label',
      next === 'fr' ? 'Afficher la version anglaise' : 'Switch to French version'
    );
    window.localStorage?.setItem('lang', next);
  }

  toggle.addEventListener('click', () => {
    const current = body.dataset.lang || defaultLang;
    apply(current === 'fr' ? 'en' : 'fr');
  });

  apply(defaultLang);
})();

// Étapes de production: clic liste -> change image
const stepList = document.querySelector('.steps-list');
if (stepList) {
  stepList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const step = li.dataset.step;
    stepList
      .querySelectorAll('li')
      .forEach((el) => el.classList.toggle('active', el === li));
    document.querySelectorAll('[data-step-image]').forEach((img) => {
      img.hidden = img.getAttribute('data-step-image') !== step;
    });
  });
}

// Galerie par onglets
const filterButtons = document.querySelectorAll('.filter-btn');
const gallery = document.getElementById('gallery');
if (filterButtons.length && gallery) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
      const id = btn.dataset.filter;
      gallery.querySelectorAll('[data-cat]').forEach((item) => {
        item.hidden = item.getAttribute('data-cat') !== id;
      });
    });
  });
}

// Contact form captcha (simple math)
const captchaQuestion = document.querySelector('[data-captcha-question]');
if (captchaQuestion) {
  const input = document.querySelector('#captcha');
  const message = document.querySelector('.form-message');
  const form = document.querySelector('form');
  function generate() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    captchaQuestion.textContent = `${a} + ${b} =`;
    captchaQuestion.dataset.answer = (a + b).toString();
    if (input) input.value = '';
  }
  generate();
  form?.addEventListener('submit', (e) => {
    if (!input) return;
    const expected = captchaQuestion.dataset.answer;
    if (input.value.trim() !== expected) {
      e.preventDefault();
      if (message) {
        message.textContent =
          document.body.dataset.lang === 'en'
            ? 'Captcha validation failed. Please try again.'
            : 'Validation du captcha échouée. Merci de réessayer.';
        message.style.color = '#b91c1c';
      }
      generate();
    } else if (message) {
      message.textContent =
        document.body.dataset.lang === 'en'
          ? 'Thank you! We will contact you shortly.'
          : 'Merci ! Nous vous répondrons rapidement.';
      message.style.color = '#047857';
    }
  });
}
