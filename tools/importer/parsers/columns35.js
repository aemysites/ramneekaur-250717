/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid with two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const topLevelCols = Array.from(mainGrid.children);
  if (topLevelCols.length < 2) return;

  // Left: text content (headline, subheading, button group)
  const textCol = topLevelCols[0];
  const leftColContent = [];
  const h1 = textCol.querySelector('h1');
  if (h1) leftColContent.push(h1);
  const subheading = textCol.querySelector('p');
  if (subheading) leftColContent.push(subheading);
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.push(buttonGroup);

  // Right: images block
  const imagesCol = topLevelCols[1];
  // Find the nested grid that has the images
  const imageGrid = imagesCol.querySelector('.w-layout-grid');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  } else {
    // Fallback: look for imgs directly under imagesCol
    images = Array.from(imagesCol.querySelectorAll('img'));
  }

  // The block should be: header, then one row with two columns (left: text, right: images)
  const cells = [
    ['Columns (columns35)'],
    [leftColContent, images]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
