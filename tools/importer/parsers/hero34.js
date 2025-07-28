/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row -- must match exactly
  const headerRow = ['Hero (hero34)'];

  // The example has 3 rows: header, background image, main content
  // No background image in this HTML, so row 2 is an empty string
  const bgRow = [''];

  // Find the main content: heading, subheading, CTA button
  // Structure: section > .container > .grid-layout > [div content, a button]
  let contentEls = [];
  const container = element.querySelector(':scope > .container');
  if (container) {
    const grid = container.querySelector(':scope > .grid-layout');
    if (grid) {
      // Find the div (with heading+subheading) and the a (CTA)
      const gridChildren = Array.from(grid.children);
      const contentDiv = gridChildren.find(child => child.tagName === 'DIV');
      if (contentDiv) {
        // Add all child elements (should be h2, p, etc)
        contentEls.push(...Array.from(contentDiv.children));
      }
      const cta = gridChildren.find(child => child.tagName === 'A');
      if (cta) {
        contentEls.push(cta);
      }
    }
  }
  // If we have no content, ensure the cell is empty string
  const contentRow = [contentEls.length ? contentEls : ''];

  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
