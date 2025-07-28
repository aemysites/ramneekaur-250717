/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the text content block for the card
  function getTextBlock(card) {
    const wrapper = document.createElement('div');
    // The heading is expected to be .h4-heading (h3)
    const heading = card.querySelector('.h4-heading');
    if (heading) wrapper.appendChild(heading);
    // The description is expected to be .paragraph-sm
    const description = card.querySelector('.paragraph-sm');
    if (description) wrapper.appendChild(description);
    return wrapper.children.length ? wrapper : '';
  }

  // For each tab-pane, transform its grid into a Cards (cards22) table
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.children).filter((el) => el.tagName === 'A');
    const rows = [['Cards (cards22)']];

    cards.forEach((card) => {
      // Card image: only if it exists
      let img = null;
      const aspect = card.querySelector('.utility-aspect-3x2');
      if (aspect) {
        img = aspect.querySelector('img');
      }
      // Get the text content block
      const textBlock = getTextBlock(card);
      rows.push([
        img || '',
        textBlock || ''
      ]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(table);
  });
  // The parent tabs remain in place, only the grids are replaced by tables
}
