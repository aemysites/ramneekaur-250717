/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child by class name
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Get the container inside the section
  const container = getChildByClass(element, 'container');
  if (!container) return;

  // Find the first (outer) grid-layout containing the main content
  const outerGrid = getChildByClass(container, 'grid-layout');
  if (!outerGrid) return;

  // The first two direct children are:
  // [0]: p.h2-heading
  // [1]: p.paragraph-lg (quote)
  // [2]: inner grid (bottom row)
  const children = Array.from(outerGrid.children);
  const heading = children.find(el => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const quote = children.find(el => el.tagName === 'P' && el.classList.contains('paragraph-lg'));
  const innerGrid = children.find(el => el.classList.contains('grid-layout') && el !== outerGrid);

  // Compose left column:
  // Keep the heading and quote as is, in original order, referencing nodes directly
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (quote) leftCol.appendChild(quote);

  // Compose right column:
  // innerGrid contains div.divider (can be omitted), testimonial row (avatar+name), and logo svg
  // We'll include only the testimonial row (with avatar/name) and logo svg
  let rightCol = document.createElement('div');
  if (innerGrid) {
    // Find the horizontal flex row (avatar, name)
    const testimonialRow = Array.from(innerGrid.children).find(child => child.classList.contains('flex-horizontal'));
    if (testimonialRow) rightCol.appendChild(testimonialRow);
    // Find the logo svg wrapper
    const logoWrapper = Array.from(innerGrid.children).find(child => child.classList.contains('utility-display-inline-block'));
    if (logoWrapper) rightCol.appendChild(logoWrapper);
  }

  // Compose table structure
  const tableCells = [
    ['Columns (columns25)'],
    [leftCol, rightCol]
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
