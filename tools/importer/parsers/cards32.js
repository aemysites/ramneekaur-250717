/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block, exactly matching example
  const headerRow = ['Cards (cards32)'];

  // Get all direct child card anchors
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Build rows for each card
  const rows = cards.map(card => {
    // First cell: image
    const img = card.querySelector('img');

    // Second cell: all text content (tags, meta, heading, description, CTA)
    const textParts = [];
    // Tag and meta row (if present)
    const tagMetaRow = card.querySelector('.flex-horizontal.align-center');
    if (tagMetaRow) {
      // Tag (optional)
      const tagDiv = tagMetaRow.querySelector('.tag > div');
      if (tagDiv && tagDiv.textContent.trim()) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagDiv.textContent.trim();
        tagSpan.style.fontWeight = 'bold';
        textParts.push(tagSpan);
      }
      // Meta (e.g., '3 min read')
      const metaDiv = tagMetaRow.querySelector('.paragraph-sm');
      if (metaDiv && metaDiv.textContent.trim()) {
        if (textParts.length > 0) {
          textParts.push(document.createTextNode(' '));
        }
        const metaSpan = document.createElement('span');
        metaSpan.textContent = metaDiv.textContent.trim();
        textParts.push(metaSpan);
      }
      if (textParts.length > 0) {
        const metaPara = document.createElement('div');
        textParts.forEach(p => metaPara.appendChild(p));
        textParts.length = 0;
        textParts.push(metaPara);
      }
    }
    // Heading (title, required)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading && heading.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      const hDiv = document.createElement('div');
      hDiv.appendChild(strong);
      textParts.push(hDiv);
    }
    // Description (p)
    const desc = card.querySelector('p');
    if (desc && desc.textContent.trim()) {
      const descDiv = document.createElement('div');
      descDiv.textContent = desc.textContent.trim();
      textParts.push(descDiv);
    }
    // CTA (the 'Read' div at the bottom, if present)
    // Only if it is a direct child of the card's inner content area
    // This prevents picking up unrelated 'Read' text elsewhere
    const allDivs = card.querySelectorAll('div');
    let ctaDiv = null;
    for (const div of allDivs) {
      if (div.textContent.trim().toLowerCase() === 'read') {
        ctaDiv = div;
        break;
      }
    }
    if (ctaDiv) {
      const ctaLink = document.createElement('a');
      ctaLink.href = card.href;
      ctaLink.textContent = ctaDiv.textContent.trim();
      const ctaWrapper = document.createElement('div');
      ctaWrapper.appendChild(ctaLink);
      textParts.push(ctaWrapper);
    }
    return [img, textParts];
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
