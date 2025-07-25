/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches the block name exactly as per the example
  const headerRow = ['Cards (cards20)'];

  // Find the card content structure
  // Top-level: sticky > ix-card-rotate-2 > card > card-body > .h4-heading + img
  // For this HTML, there is only one card
  let cardRoot = element;
  let cardRotate = cardRoot.querySelector('.ix-card-rotate-2') || cardRoot;
  let cardDiv = cardRotate.querySelector('.card') || cardRotate;
  let cardBody = cardDiv.querySelector('.card-body') || cardDiv;

  // Extract image (first img in cardBody)
  const img = cardBody.querySelector('img');

  // Extract heading (first .h4-heading in cardBody)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell (heading, description, CTA - only heading is present in this example)
  // If heading is missing, fallback to empty text
  const textCell = heading ? [heading] : [];

  // Build the table rows (first is header, second is card row)
  const tableRows = [headerRow, [img, textCell]];

  // Create the table block and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
