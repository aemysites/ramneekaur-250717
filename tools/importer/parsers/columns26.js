/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Direct children of grid are the columns
  const gridChildren = Array.from(grid.children);

  // The block expects two columns: left (text), right (image)
  let leftCol = null;
  let rightCol = null;

  // Typical source: first is text col, second is image col
  if (gridChildren.length === 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else {
    // Fallback: search by content
    gridChildren.forEach(child => {
      if (!leftCol && child.querySelector('h1, h2, h3, h4, h5, h6, p, a')) {
        leftCol = child;
      } else if (!rightCol && child.tagName === 'IMG') {
        rightCol = child;
      }
    });
  }

  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // The header row must have the same number of columns as the data row
  const headerRow = ['Columns (columns26)', ''];
  const contentRow = [leftCol, rightCol];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
