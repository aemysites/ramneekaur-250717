/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the column content
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Use immediate children (columns) of the grid
    columns = Array.from(grid.children);
  } else {
    // fallback: use direct children of the element
    columns = Array.from(element.children);
  }

  // Defensive: if no columns found, fallback to empty columns array
  if (columns.length === 0) {
    columns = [];
  }

  // The block header, as required by the spec
  const headerRow = ['Columns (columns14)'];

  // Each column's content is referenced as-is to preserve structure and semantics
  // This also makes the code robust to variations in child content
  const contentRow = columns;

  // Compose table data: first row is header, second is content columns
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the block table using WebImporter utility
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}
