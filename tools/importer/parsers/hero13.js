/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match exactly
  const headerRow = ['Hero (hero13)'];

  // Find the main grid-layout
  const gridDiv = element.querySelector('.w-layout-grid.grid-layout');

  let backgroundImg = null;
  let contentCell = [];

  if (gridDiv) {
    const gridChildren = Array.from(gridDiv.children);
    // First column: background image
    if (gridChildren.length > 0) {
      const firstCol = gridChildren[0];
      const img = firstCol.querySelector('img');
      if (img) backgroundImg = img;
    }
    // Second column: content
    if (gridChildren.length > 1) {
      const secondCol = gridChildren[1];
      // Get all relevant content in the second column
      // (typically a div wrapping the heading and buttons)
      // We'll grab all immediate children and put into array
      const contentDivs = Array.from(secondCol.children);
      // Only push non-empty elements
      contentDivs.forEach(child => {
        if (child.textContent.trim() || child.querySelector('img,svg,picture')) {
          contentCell.push(child);
        }
      });
    }
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentCell.length === 1 ? contentCell[0] : contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
