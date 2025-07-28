/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (should be the only <img> inside the header)
  const bgImg = element.querySelector('img');

  // Find the content card, which contains heading, subheading, and CTAs
  const card = element.querySelector('.card');

  // Compose content cell: heading, subheading, button group (as elements, in order)
  const contentCell = [];
  if (card) {
    // Heading (supports h1-h6)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCell.push(heading);

    // Subheading (p with class subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentCell.push(subheading);

    // Button group (may not exist)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // Table structure: header, background image, content
  const rows = [
    ['Hero (hero7)'],
    [bgImg ? bgImg : ''],
    [contentCell.length > 0 ? contentCell : '']
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
