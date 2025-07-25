/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs of a parent
  function immediateDivs(parent) {
    return Array.from(parent.children).filter(c => c.tagName === 'DIV');
  }

  // Header row -- must match exactly
  const headerRow = ['Columns (columns16)'];

  // The first grid with 2 columns: left (text, heading, etc), right (description & author)
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  let mainGrid = null;
  for (const grid of grids) {
    if (grid.classList.contains('tablet-1-column')) {
      mainGrid = grid;
      break;
    }
  }

  let leftCell = null, rightCell = null;
  if (mainGrid) {
    const gridDivs = immediateDivs(mainGrid);
    if (gridDivs.length >= 2) {
      // left: heading, eyebrow
      leftCell = gridDivs[0];
      // right: description, author, button
      rightCell = gridDivs[1];
    }
  }

  // Second major grid: two square images
  let imageGrid = null;
  for (const grid of grids) {
    if (grid.classList.contains('mobile-portrait-1-column')) {
      imageGrid = grid;
      break;
    }
  }
  let image1 = null, image2 = null;
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imageDivs.length >= 2) {
      image1 = imageDivs[0].querySelector('img');
      image2 = imageDivs[1].querySelector('img');
    }
  }

  // Compose table rows
  const cells = [
    headerRow,
    [leftCell, rightCell],
    [image1, image2]
  ];

  // Clean up any undefined (in case of missing content)
  for (let row = 1; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      if (!cells[row][col]) {
        // If missing, use empty string for resilience
        cells[row][col] = '';
      }
    }
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
