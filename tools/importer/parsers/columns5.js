/* global WebImporter */
export default function parse(element, { document }) {
  // Create the block header row exactly as required
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs; each represents a column
  const columns = Array.from(element.querySelectorAll(':scope > div')).map(colDiv => {
    // If the column has an image inside, use the img element directly
    const img = colDiv.querySelector('img');
    if (img) {
      return img;
    }
    // If not, use the entire column div (handles edge cases/future content)
    return colDiv;
  });

  // Build the table data structure as per the columns block format
  const tableData = [
    headerRow, // header row
    columns    // content row with as many columns as needed
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
