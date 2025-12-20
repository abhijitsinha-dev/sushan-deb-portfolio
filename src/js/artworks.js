import { renderArtworks } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let allArtworks = [];

  if (portfolioGrid) {
    fetch('/data/all-artwork.json')
      .then((response) => response.json())
      .then((data) => {
        allArtworks = data;
        renderPortfolio(allArtworks);
      });
  }

  // Filtering
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach((b) => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === 'all') {
          renderPortfolio(allArtworks);
        } else {
          const filtered = allArtworks.filter(
            (art) => art.type === filterValue
          );
          renderPortfolio(filtered);
        }
      });
    });
  }

  function renderPortfolio(data) {
    if (!portfolioGrid) return;
    renderArtworks(data, portfolioGrid);
  }
});
