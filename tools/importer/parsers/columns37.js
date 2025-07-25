/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, if only one child, use it; else, use the column itself
  const contentRow = columns.map(col => {
    if (col.childElementCount === 1) {
      return col.firstElementChild;
    }
    return col;
  });
  // The cells array: header row must be an array with one cell, and the next is the column array
  const tableCells = [
    ['Columns (columns37)'],
    contentRow
  ];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Ensure the header row has exactly one th with correct colspan
  const th = table.querySelector('th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }
  element.replaceWith(table);
}
