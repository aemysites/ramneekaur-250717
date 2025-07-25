/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must have exactly one cell
  const headerRow = ['Columns (columns28)'];

  // Find all direct children, which are the columns
  const columns = Array.from(element.querySelectorAll(':scope > *'));

  // Each cell in the content row contains either the <img> or the whole column if not an image
  const cellsRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Build the block table with one-cell header row and multi-cell content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the element with the new table
  element.replaceWith(table);
}
