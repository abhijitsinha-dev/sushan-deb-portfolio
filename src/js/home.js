import { renderArtworks } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
  const bestGrid = document.getElementById('best-works-grid');
  if (bestGrid) {
    fetch('/data/best-artwork.json')
      .then((response) => response.json())
      .then((data) => {
        renderArtworks(data, bestGrid);
      })
      .catch((error) => console.error('Error loading best artworks:', error));
  }

  const achievementsContainer = document.getElementById(
    'achievements-container'
  );
  if (achievementsContainer) {
    fetch('/data/achievements.json')
      .then((response) => response.json())
      .then((data) => {
        renderAchievements(data, 'achievements-container');
      })
      .catch((error) => console.error('Error loading achievements:', error));
  }
});

function renderAchievements(achievements, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  achievements.forEach((achievement) => {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.innerHTML = `
      <i class="${achievement.icon}"></i>
      <h3>${achievement.title}</h3>
      <p>${achievement.description}</p>
      <span>${achievement.detail}</span>
    `;
    container.appendChild(card);
  });
}
