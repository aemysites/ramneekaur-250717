/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // Find all top-level card links
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // IMAGE CELL: The first immediate child div contains img
    const imageDiv = card.querySelector(':scope > div');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // TEXT CELL: The text content is in the next div
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const content = [];

    if (textDiv) {
      // Tag (optional)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        // Only include the tag(s) group if it has content
        content.push(tagGroup);
      }
      // Title (h3)
      const title = textDiv.querySelector('h3');
      if (title) {
        content.push(title);
      }
      // Description (p)
      const desc = textDiv.querySelector('p');
      if (desc) {
        content.push(desc);
      }
    }
    // Push row: [img, text cell]
    cells.push([
      img ? img : '',
      content.length === 1 ? content[0] : content,
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
