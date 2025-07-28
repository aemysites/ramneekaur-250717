/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get background image (first .w-layout-grid > div > img)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // 2. Get content area (second .w-layout-grid > div)
  let contentCellElements = [];
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      // In the card-body, there is a grid with 3 columns
      const contentGrid = cardBody.querySelector('.grid-layout');
      if (contentGrid) {
        const gridChildren = Array.from(contentGrid.children);
        // The first child is the promo image
        const promoImg = gridChildren.find((child) => child.tagName === 'IMG');
        // The next child is the text block (has h2, features, button)
        const textBlock = gridChildren.find((child) => child.tagName === 'DIV');

        const contentElements = [];
        if (promoImg) {
          contentElements.push(promoImg);
        }
        if (textBlock) {
          // Gather all children of the textBlock (h2, features, button group)
          for (const child of textBlock.children) {
            contentElements.push(child);
          }
        }
        if (contentElements.length > 0) {
          contentCellElements = contentElements;
        }
      }
    }
  }

  // 3. Compose the table rows
  const rows = [];
  // Header row
  rows.push(['Hero (hero6)']);
  // Second row: background image
  rows.push([bgImg ? bgImg : '']);
  // Third row: content elements (image, heading, features, cta)
  rows.push([contentCellElements.length > 0 ? contentCellElements : '']);

  // 4. Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
