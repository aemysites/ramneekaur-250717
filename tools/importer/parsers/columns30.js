/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all the immediate children of the grid
  const columnWrappers = Array.from(grid.children);
  // For each column, get the innermost image
  const images = columnWrappers.map(col => {
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect) {
      const img = aspect.querySelector('img');
      if (img) return img;
    }
    return null;
  }).filter(Boolean);

  // Create a header row with only one column (EXACTLY as the example)
  const headerRow = ['Columns (columns30)'];
  // The images should be in a single row, with one image per cell
  const contentRow = images;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the whole section with the new table
  element.replaceWith(table);
}
