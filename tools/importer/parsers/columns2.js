/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid which contains columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Defensive: get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // There should be three children: left main, right top, right bottom
  const [mainCol, rightTop, rightBottom] = gridChildren;
  // If any are missing, handle gracefully
  if (!mainCol && !rightTop && !rightBottom) return;

  // For the right column, combine rightTop and rightBottom stacked vertically
  // Only include if present
  const rightWrapper = document.createElement('div');
  if (rightTop) rightWrapper.appendChild(rightTop);
  if (rightBottom) rightWrapper.appendChild(rightBottom);

  // The table header must match exactly
  const headerRow = ['Columns (columns2)'];
  // Build columns row
  const contentRow = [];
  contentRow.push(mainCol || document.createElement('div'));
  contentRow.push(rightWrapper);

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}