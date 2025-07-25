/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // According to the source HTML, the layout is two columns:
  // - First column: text content (h2 + p)
  // - Second column: vertical button group (2 a.button)
  // We want to keep the original structure and reference the original elements.

  // Table header row exactly as required
  const headerRow = ['Columns (columns3)'];

  // Content row with the two columns (as elements)
  // We reference the entire column element for each, preserving their structure.
  const contentRow = [columns[0], columns[1]];

  // Build the table using the helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
