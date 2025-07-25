/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero38)'];

  // Find the direct grid child columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // First column: likely the image/background
  let imageEl = null;
  if (gridChildren[0]) {
    imageEl = gridChildren[0].querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // Second column: text and CTA
  let contentFragment = document.createDocumentFragment();
  if (gridChildren[1]) {
    // Find the main heading (h1-h6)
    const heading = gridChildren[1].querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentFragment.appendChild(heading);
    // Find paragraphs (all p elements)
    const paragraphs = gridChildren[1].querySelectorAll('p');
    paragraphs.forEach(par => contentFragment.appendChild(par));
    // Find CTA button
    const buttonGroup = gridChildren[1].querySelector('.button-group');
    if (buttonGroup) {
      const cta = buttonGroup.querySelector('a,button');
      if (cta) contentFragment.appendChild(cta);
    }
  }
  const textRow = [contentFragment];

  // Build the final table block
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
