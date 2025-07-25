/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level direct children that could be columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include all its direct children as the cell content.
  // For this HTML, each column is just the div with the image. But if there was more content (text, buttons),
  // this would include it all in the cell.
  const columns = columnDivs.map((col) => {
    // If the column div has multiple children, put them all in an array
    const children = Array.from(col.childNodes).filter(node => {
      // Exclude empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    // If there's only one content node, return that directly
    if (children.length === 1) return children[0];
    // Otherwise, return an array of all direct children
    return children;
  });

  // Table: header row (single column), then one row with N columns
  const cells = [
    ['Columns (columns11)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
