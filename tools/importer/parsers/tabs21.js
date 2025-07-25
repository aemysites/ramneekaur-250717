/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('a') : [];

  // Get tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // Determine column count (2 for label/content)
  const colCount = 2;
  // Header row: single cell spanning both columns
  const headerRow = ['Tabs'];
  // We'll set colspan=2 after table creation since createTable doesn't support it directly

  const rows = [headerRow];

  // For each tab, create row [label, content]
  tabLinks.forEach((tabLink, i) => {
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    let tabContentElement = '';
    const pane = tabPanes[i];
    if (pane) {
      const grid = pane.querySelector('.w-layout-grid');
      tabContentElement = grid ? grid : pane;
    }
    rows.push([label, tabContentElement]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set header cell to span all columns
  const th = table.querySelector('th');
  if (th && colCount > 1) {
    th.setAttribute('colspan', String(colCount));
  }
  element.replaceWith(table);
}
