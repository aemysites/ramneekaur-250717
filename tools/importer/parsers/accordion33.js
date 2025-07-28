/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell (one column)
  const rows = [['Accordion (accordion33)']];

  // Each accordion item should be a row with two columns: [title, content]
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');
  accordionItems.forEach((item) => {
    // Title cell: find the title element
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle.querySelector('div:not([class])') || toggle;
    } else {
      titleEl = document.createElement('span');
    }
    // Content cell: find the content/rich-text
    let contentEl = null;
    const contentNav = item.querySelector('.w-dropdown-list');
    if (contentNav) {
      contentEl = contentNav.querySelector('.w-richtext, .rich-text') || contentNav.querySelector('div') || contentNav;
    } else {
      contentEl = document.createElement('div');
    }
    // Push a row with two columns: [title, content]
    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
