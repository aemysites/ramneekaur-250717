/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero19)'];

  // 2nd row: Background images (multiple)
  // Find the grid that contains all the <img>s (the collage background)
  let imagesCell = '';
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  if (grid) {
    const imagesGrid = grid.querySelector('.grid-layout.desktop-3-column');
    if (imagesGrid) {
      const imgs = imagesGrid.querySelectorAll('img');
      if (imgs.length > 0) {
        // Place all images together in a div, preserve their order
        const div = document.createElement('div');
        imgs.forEach(img => div.appendChild(img));
        imagesCell = div;
      }
    }
  }

  // 3rd row: Headline, Subheading, CTA - all from the centered text area
  let contentCell = '';
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (content) {
    // Use the container with headline, paragraph, and cta
    const container = content.querySelector('.container');
    if (container) {
      contentCell = container;
    } else {
      contentCell = content;
    }
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [imagesCell],
    [contentCell],
  ], document);
  element.replaceWith(table);
}
