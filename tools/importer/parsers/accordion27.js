/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row exactly as in the brief
  const headerRow = ['Accordion (accordion27)'];

  // Get all top-level .divider children (each is an accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each divider, extract the title and content block
  const rows = dividers.map(divider => {
    // Each .divider contains a .grid-layout with 2 children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return null; // Defensive for odd source HTML
    const children = Array.from(grid.children);
    // Get the first two children: the title element and the content element
    const [titleEl, contentEl] = children;
    // If either is missing, put an empty cell to maintain columns
    return [titleEl || document.createElement('div'), contentEl || document.createElement('div')];
  }).filter(Boolean);

  // Compose table array: header, then all data rows
  const tableData = [headerRow, ...rows];

  // Create the accordion block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
