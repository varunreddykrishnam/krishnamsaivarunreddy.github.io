/* ===========================
   THEME TOGGLE (with persistence)
=========================== */
const toggleBtn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close menu on link click (mobile) */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   TYPEWRITER EFFECT
=========================== */
const typewriterEl = document.querySelector('.typewriter');
if (typewriterEl) {
  const text = typewriterEl.getAttribute('data-text');
  let idx = 0;
  const typeSpeed = 60;

  function type() {
    typewriterEl.textContent = text.slice(0, idx++);
    if (idx <= text.length) requestAnimationFrame(type);
  }
  requestAnimationFrame(type);
}

/* ===========================
   INTERSECTION OBSERVER (Reveal on scroll)
=========================== */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

/* ===========================
   SCROLL PROGRESS BAR
=========================== */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});

/* ===========================
   BACK TO TOP BUTTON
=========================== */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===========================
   SCROLL SPY (Active nav link)
=========================== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href') === `#${current}`) li.classList.add('active');
  });
});

/* ===========================
   PROJECT FILTERING
=========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags').split(' ');
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ===========================
   DYNAMIC YEAR
=========================== */
document.getElementById('year').textContent = new Date().getFullYear();
