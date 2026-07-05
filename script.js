  // Custom cursor
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    setTimeout(() => {
      trail.style.left = mx + 'px';
      trail.style.top = my + 'px';
    }, 60);
  });

  document.querySelectorAll('a, button, .skill-tag, .chip, .exp-item, .lift').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      trail.style.width = '54px';
      trail.style.height = '54px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      trail.style.width = '36px';
      trail.style.height = '36px';
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el, i) => {
    el.dataset.delay = i % 3;
    observer.observe(el);
  });

  // Stagger exp items
  document.querySelectorAll('.exp-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  // ── POSTER GALLERY ──
  const CATEGORIES = ['branding','editorial','illustration','event'];
  const brands = {

  "Belong": [
    "Posters/Branding/Belong/1.webp",
    "Posters/Branding/Belong/2.webp",
    "Posters/Branding/Belong/3.webp",
    "Posters/Branding/Belong/4.webp",
    "Posters/Branding/Belong/5.webp",
    "Posters/Branding/Belong/6.webp",
  ],

  "Cochin distillery": [
    "Posters/Branding/Cochindist/1.webp",
    "Posters/Branding/Cochindist/2.webp",
    "Posters/Branding/Cochindist/3.webp",
  ],

  "Lavista": [
    "Posters/Branding/Lavista/4.webp",
    "Posters/Branding/Lavista/5.webp",
  ],

  "College": [
    "Posters/College/1.webp",
    "Posters/College/2.webp",
    "Posters/College/3.webp",
    "Posters/College/4.webp",
    "Posters/College/5.webp",
    "Posters/College/6.webp",
    "Posters/College/7.webp",
    "Posters/College/8.webp",
    "Posters/College/9.webp",
    "Posters/College/10.webp",
    "Posters/College/11.webp",
    "Posters/College/12.webp",
    "Posters/College/13.webp",
    "Posters/College/14.webp",
    "Posters/College/15.webp",
    "Posters/College/16.webp",
    "Posters/College/17.webp",
    "Posters/College/18.webp",
    "Posters/College/19.webp",
    "Posters/College/20.webp",
  ]
};

const events = {

  "Sanskriti": [
    "Posters/Event/Sanskriti/1.webp",
    "Posters/Event/Sanskriti/2.webp",
    "Posters/Event/Sanskriti/3.webp",
    "Posters/Event/Sanskriti/4.webp",
    "Posters/Event/Sanskriti/5.webp",
    "Posters/Event/Sanskriti/6.webp",
    "Posters/Event/Sanskriti/7.webp",
    "Posters/Event/Sanskriti/8.webp"    
  ],

  "Takshak": [
    "Posters/Event/Takshak/1.webp",
    "Posters/Event/Takshak/2.webp",
    "Posters/Event/Takshak/3.webp",
    "Posters/Event/Takshak/4.webp"
  ],

  "Other": [
    "Posters/Event/Other/1.webp",
    "Posters/Event/Other/2.webp",
    "Posters/Event/Other/3.webp",
    "Posters/Event/Other/4.webp",
    "Posters/Event/Other/5.webp",
    "Posters/Event/Other/6.webp",
    "Posters/Event/Other/7.webp",
    "Posters/Event/Other/8.webp",
    "Posters/Event/Other/9.webp",
    "Posters/Event/Other/10.webp",
    "Posters/Event/Other/11.webp",
    "Posters/Event/Other/12.webp"
  ]

};

const posters = [];

const brandIndexes = {};

for (const brand in brands) {
  brandIndexes[brand] = 0;

  posters.push({
    src: brands[brand][0],
    title: brand.toUpperCase(),
    category: "branding",
    brand: brand
  });
}

const eventIndexes = {};

for (const event in events) {

  eventIndexes[event] = 0;

  posters.push({
    src: events[event][0],
    title: event.toUpperCase(),
    category: "event",
    event: event
  });

}

 // { src, title, category }
  let currentLbIndex = 0;
  let filteredPosters = [];
  let activeFilter = 'branding';
  const grid = document.getElementById('posterGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbTag = document.getElementById('lightboxTag');
  // Drag-over styles
    function renderGrid() {
    filteredPosters = posters.filter(p => p.category === activeFilter);
    grid.innerHTML = '';
    if (posters.length === 0) {
      // show placeholders
      for (let i = 1; i <= 6; i++) {
        grid.innerHTML += `<div class="poster-placeholder"><span class="ph-num">0${i}</span><span>Your Poster</span></div>`;
      }
      return;
    }
    if (filteredPosters.length === 0) {
      grid.innerHTML = `<div class="empty-state"><span class="es-icon">✦</span>No posters in this category yet</div>`;
      return;
    }
    filteredPosters.forEach((p, i) => {
      const realIndex = posters.indexOf(p);
      const card = document.createElement('div');
      card.className =
  p.category === 'event'
    ? 'poster-card event-card reveal'
    : 'poster-card reveal';
      card.innerHTML = `
        <img src="${p.src}" alt="${p.title}" loading="lazy">
        <div class="poster-card-overlay">
          <p class="poster-card-title">${p.title.toUpperCase()}</p>
          <p class="poster-card-tag">${p.category}</p>
        </div>
        <div class="poster-card-expand">⤢</div>
      `;
      card.addEventListener('click', (e) => {
        currentLbIndex = i;
        openLightbox();
      });
      grid.appendChild(card);
      // trigger reveal
      setTimeout(() => {
        observer.observe(card);
      }, 20);
    });
    // cursor hover on new cards
    grid.querySelectorAll('.poster-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        trail.style.width = '54px'; trail.style.height = '54px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px';
        trail.style.width = '36px'; trail.style.height = '36px';
      });
    });
  }
  // Category filter
  document.getElementById('filterBar').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderGrid();
  });
  // Allow changing category by clicking tag in lightbox
  function openLightbox() {
    const p = filteredPosters[currentLbIndex];
    if (!p) return;
    lbImg.src = p.src;
    lbTitle.textContent = p.title.toUpperCase();
    lbTag.textContent = p.category;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.getElementById('lbPrev').addEventListener('click', () => {
    currentLbIndex = (currentLbIndex - 1 + filteredPosters.length) % filteredPosters.length;
    openLightbox();
  });
  document.getElementById('lbNext').addEventListener('click', () => {
    currentLbIndex = (currentLbIndex + 1) % filteredPosters.length;
    openLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentLbIndex = (currentLbIndex - 1 + filteredPosters.length) % filteredPosters.length; openLightbox(); }
    if (e.key === 'ArrowRight') { currentLbIndex = (currentLbIndex + 1) % filteredPosters.length; openLightbox(); }
  });
renderGrid();

setInterval(() => {

  if (lightbox.classList.contains('open')) return;

  grid.classList.add('fade-out');

  setTimeout(() => {

    posters.length = 0;

    for (const brand in brands) {

      brandIndexes[brand]++;

      if (brandIndexes[brand] >= brands[brand].length) {
        brandIndexes[brand] = 0;
      }

      posters.push({
        src: brands[brand][brandIndexes[brand]],
        title: brand.toUpperCase(),
        category: "branding",
        brand: brand
      });
    }

for (const event in events) {

  eventIndexes[event]++;

  if (eventIndexes[event] >= events[event].length) {
    eventIndexes[event] = 0;
  }

  posters.push({
    src: events[event][eventIndexes[event]],
    title: event.toUpperCase(),
    category: "event",
    event: event
  });

}

    renderGrid();

    grid.classList.remove('fade-out');

  }, 600);

}, 10000);
