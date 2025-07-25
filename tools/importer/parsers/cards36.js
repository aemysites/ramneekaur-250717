/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the markdown example
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // The main grid containing cards can be nested - handle both levels
  let grids = Array.from(element.querySelectorAll(':scope > .container > .grid-layout, :scope > .container > .w-layout-grid'));
  if (grids.length === 0) {
    grids = Array.from(element.querySelectorAll('.grid-layout, .w-layout-grid'));
  }

  let cardElements = [];
  grids.forEach(grid => {
    cardElements.push(...Array.from(grid.children).filter(child => child.classList.contains('utility-link-content-block')));
    // Handle nested grid-layouts for cards as well
    Array.from(grid.children).forEach(child => {
      if (child.classList.contains('grid-layout') || child.classList.contains('w-layout-grid')) {
        cardElements.push(...Array.from(child.children).filter(nested => nested.classList.contains('utility-link-content-block')));
      }
    });
  });

  cardElements.forEach((card) => {
    // Get the image: from the first .utility-aspect-* inside the card (or img.cover-image)
    let imgDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let imgEl = imgDiv ? imgDiv.querySelector('img.cover-image') : card.querySelector('img.cover-image');
    // If there is no image, leave the cell empty (should still be present for structure)
    let imageCell = imgEl || '';

    // Locate the text content: either in .utility-padding-all-2rem or directly in card (for small cards)
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    // Find heading (h3), description (p), and CTA (button/cta/etc)
    let heading = textContainer.querySelector('h3');
    let desc = textContainer.querySelector('p');
    let cta = textContainer.querySelector('.button, .btn, .cta');

    // Compose right cell content: keep order heading, desc, cta (if present)
    const rightCell = [];
    if (heading) rightCell.push(heading);
    if (desc) rightCell.push(desc);
    if (cta) rightCell.push(cta);

    rows.push([
      imageCell,
      rightCell.length === 1 ? rightCell[0] : rightCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
