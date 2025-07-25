/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Cards (cards8)'];

  // Each card is a direct child div with an image, but no text in the supplied HTML.
  // Since there is no text in the source, the second cell should be an empty string (to match the required structure of 2 columns).
  // But if there were text blocks in the card div, they would go in the second cell.
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(div => {
    // Find image
    const img = div.querySelector('img');
    // Find any non-image, non-empty text content (if present)
    // For this specific HTML, there is no text content, so this will be blank
    let textContent = '';
    // If the div contains other elements, collect them for the text cell
    // We'll gather all non-img nodes as text content
    const childNodes = Array.from(div.childNodes).filter(node => {
      return node.nodeType === 1 && node.tagName !== 'IMG';
    });
    if (childNodes.length > 0) {
      textContent = childNodes;
    }
    return [img, textContent];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
