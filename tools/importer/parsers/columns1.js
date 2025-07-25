/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the columns (assume 2: image and content)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // First column: image
  let imgEl = null;
  if (cols[0].tagName === 'IMG') {
    imgEl = cols[0];
  } else {
    imgEl = cols[0].querySelector('img');
  }
  // Defensive: If imgEl not found, just use the left col content
  const leftCell = imgEl || cols[0];

  // Second column: content (heading, subheading, buttons)
  const rightCell = cols[1];

  // Build table: Header row (one column), then second row (two columns)
  const cells = [
    ['Columns (columns1)'], // header row: exactly one column
    [leftCell, rightCell]   // second row: two columns
  ];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Make the header row span two columns via colspan, if needed
  // (The importer expects this for exact example match)
  const firstRow = block.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }

  element.replaceWith(block);
}
