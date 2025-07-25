/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid used for the columns layout
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // The grid should have two children: left (content), right (image)
  const gridChildren = Array.from(mainGrid.children);

  // Defensive: filter only non-empty elements
  const columns = gridChildren.filter(child => child && (child.textContent.trim() || child.querySelector('img')));
  if (columns.length < 2) return;

  // First column: content (with heading, subheading, buttons)
  // Second column: image
  let contentCol = null;
  let imageCol = null;

  // Identify columns: one with .h1-heading is content, one with <img> is image
  columns.forEach(col => {
    if (col.querySelector('img')) imageCol = col;
    else contentCol = col;
  });

  // If not found, just fallback to order
  if (!contentCol || !imageCol) {
    contentCol = columns[0];
    imageCol = columns[1];
  }

  // Table header as per block spec
  const headerRow = ['Columns (columns15)'];
  // Reference the actual column elements from the DOM
  const row = [contentCol, imageCol && imageCol.querySelector('img') ? imageCol.querySelector('img') : imageCol];
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
