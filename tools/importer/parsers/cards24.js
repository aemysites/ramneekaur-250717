/* global WebImporter */
export default function parse(element, { document }) {
  // Header for the block per instructions
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is a direct child <a>
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');
  cardLinks.forEach(card => {
    // Image cell (first <img> under div.utility-aspect-2x3)
    let imageCell = '';
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) imageCell = img;
    }

    // Content cell: meta (tag/date) and heading
    const contentCell = [];
    // Meta: tag and date side by side, if present
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) {
      const metaWrapper = document.createElement('div');
      // Reference tag and date directly if present
      const tag = metaDiv.querySelector('.tag');
      const date = metaDiv.querySelector('.paragraph-sm');
      if (tag) metaWrapper.appendChild(tag);
      if (date) metaWrapper.appendChild(date);
      contentCell.push(metaWrapper);
    }
    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) contentCell.push(heading);

    rows.push([
      imageCell,
      contentCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
