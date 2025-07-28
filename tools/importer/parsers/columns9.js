/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of grid - each is a column
  const columns = Array.from(grid.children);

  // Header row: must be a single column with exact block name
  const headerRow = ['Columns (columns9)'];

  // Content row: as many columns as appear in the grid
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
