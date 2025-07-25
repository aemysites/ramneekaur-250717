/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: exactly as specified in requirements
  const headerRow = ['Hero (hero23)'];

  // 2. Visual/image row: The image is always present, use as-is
  const img = element.querySelector('img');
  let imageCell = img ? [img] : [''];

  // 3. Content row: Heading, subheading, CTA buttons
  // This is the first .section node inside the nested .container.grid-gap-xxl
  let contentCell = [''];
  const outerGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (outerGrid) {
    const container = outerGrid.querySelector('.container.grid-gap-xxl');
    if (container) {
      // The content area is the direct child div with class="section"
      const contentSection = Array.from(container.children).find(child => child.classList && child.classList.contains('section'));
      if (contentSection) {
        contentCell = [contentSection];
      }
    }
  }

  // Assemble the block table
  const cells = [
    headerRow,
    imageCell,
    contentCell,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
