/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block, header as in example
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Get all immediate child divs (card candidates)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach((child) => {
    // Find the image in the card
    const img = child.querySelector('img');
    // Find the text content block (should have both heading and paragraph, but can just use whatever is inside .utility-padding-all-2rem)
    const textContent = child.querySelector('.utility-padding-all-2rem');
    // Only include cards that have both an image and text content
    if (img && textContent && textContent.textContent.trim().length > 0) {
      rows.push([img, textContent]);
    }
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
