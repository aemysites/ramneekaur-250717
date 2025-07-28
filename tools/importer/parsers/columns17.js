/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns (should be one per section)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // We'll store references for left (text+list) and right (image) columns
  let leftColContent = [];
  let rightColContent = null;

  // Identify main text block(s), contact list, and image
  let textBlock = null;
  let contactList = null;
  let imageBlock = null;

  // Classifying children
  for (const child of gridChildren) {
    if (child.tagName === 'UL' || child.tagName === 'OL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      imageBlock = child;
    } else {
      // Assume anything else is the main text block (headings, paragraphs)
      textBlock = child;
    }
  }

  // Group text block and contact list in left column
  if (textBlock) leftColContent.push(textBlock);
  if (contactList) leftColContent.push(contactList);

  // Right column is the image, if found
  if (imageBlock) rightColContent = imageBlock;
  else rightColContent = '';

  // Compose table as per requirements: header row is a single cell; content row has all columns
  const cells = [];
  // Header row: single cell (spanning all columns visually, but createTable will handle that)
  cells.push(['Columns (columns17)']);
  // Content row: two columns
  cells.push([
    leftColContent.length === 1 ? leftColContent[0] : leftColContent,
    rightColContent
  ]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
