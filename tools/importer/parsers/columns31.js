/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column elements (image, content)
  // Defensive: Only use direct children
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The left column is an <img>
  const imgCol = columns[0];
  // The right column is a <div> containing all text content
  const contentCol = columns[1];

  // According to the example, two columns in the second row
  // Reference the existing nodes directly
  const headerRow = ['Columns (columns31)'];
  const row = [imgCol, contentCol];

  // Construct the block table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the entire section with the new table
  element.replaceWith(table);
}
