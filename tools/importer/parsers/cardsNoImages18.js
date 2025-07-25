/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const rows = [['Cards']];

  // Get all immediate card items
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each card has a <p> as its content (description)
    const p = cardDiv.querySelector('p');
    // Defensive: skip if p is missing
    if (p) {
      rows.push([p]);
    }
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
