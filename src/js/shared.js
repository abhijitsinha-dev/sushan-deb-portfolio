// Shared functionality
export function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.setAttribute('data-theme', 'dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

export function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
}

export function initFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Modal Logic
let currentImages = [];
let currentImageIndex = 0;

export function openModal(art) {
  const modal = document.getElementById('art-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalType = document.getElementById('modal-type');
  const modalDesc = document.getElementById('modal-desc');
  const modalSize = document.getElementById('modal-size');
  const modalPrice = document.getElementById('modal-price');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  modal.style.display = 'block';
  modalTitle.textContent = art.title;
  modalType.textContent =
    art.type === 'commercial' ? 'Commercial' : 'Non-Commercial';
  modalDesc.textContent = art.description;
  modalSize.textContent = art.size;
  modalPrice.textContent = art.price;

  currentImages =
    art.images && art.images.length > 0 ? art.images : [art.thumbnail];
  currentImageIndex = 0;
  updateModalImage();

  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  if (prevBtn) {
    prevBtn.onclick = () => {
      currentImageIndex =
        currentImageIndex > 0
          ? currentImageIndex - 1
          : currentImages.length - 1;
      updateModalImage();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentImageIndex =
        currentImageIndex < currentImages.length - 1
          ? currentImageIndex + 1
          : 0;
      updateModalImage();
    };
  }
}

function updateModalImage() {
  const modalImg = document.getElementById('modal-img');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (modalImg) {
    modalImg.src = currentImages[currentImageIndex];
  }

  if (prevBtn && nextBtn) {
    if (currentImages.length > 1) {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }
}

// Render Artworks
export function renderArtworks(data, container) {
  if (!container) return;
  container.innerHTML = '';
  const count = data.length;
  const isMobile = window.innerWidth <= 768;
  let columns;

  if (isMobile) {
    if (count === 1) columns = 1;
    else if (count === 2) columns = 2;
    else columns = 3;
  } else {
    if (count > 0 && count < 4) columns = count;
    else columns = 4;
  }

  container.style.setProperty('--grid-cols', columns);

  data.forEach((art) => {
    const card = document.createElement('div');
    card.className = 'art-card';
    card.innerHTML = `
      <img loading="lazy" src="${art.thumbnail}" alt="${art.title} painting by Sushan Deb" width="300" height="300">
      <div class="art-overlay">
        <h3>${art.title}</h3>
        <span class="art-type">${art.type}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(art));
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFooterYear();
  initMobileNav();
});
