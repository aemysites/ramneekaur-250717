/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout element that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid-layout as columns
  const columns = Array.from(grid.children);
  // Defensive: if there are no columns, do nothing
  if (!columns.length) return;
  // Compose the table: header row, then columns row with each column's content
  const headerRow = ['Columns (columns29)'];
  const contentRow = columns.map(col => col);
  const tableCells = [headerRow, contentRow];
  // Create the block table using the helper
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element in the DOM with the new block
  element.replaceWith(block);
}
