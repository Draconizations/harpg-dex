/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


function updateEntries(data) {
  $('.cd-slot-container').each(function (i) {
    const element = $(this);
    const status = data.array[i]?.status;
    if (status === 'Used') {
      element.addClass('cd-slot-unavailable');

      const foal = data.array[i]?.foallink;
      if (foal) element.find('.cd-slot-status').html(`(<a href="${foal}">Used</a>)`)
    }
    else if (status === 'Available') element.find('.cd-slot-status').remove();
  });
}

/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {

  // fetch sheets so we can associate horses with IDs before the page loads
  let slotData = await charadex.importSheet(charadex.page.slots.sheetPage);
  let horseData = await charadex.importSheet(charadex.page.masterlist.sheetPage);

  // can't use the regular relateData() for this unfortunately
  for (let slotEntry of slotData) {
    for (let horseEntry of horseData) {
      let horseEntries = horseEntry['id'].split(',');
      for (let prop of horseEntries) {
        if (slotEntry['horse'] === prop) {
          slotEntry['horsename'] = horseEntry['callname']
          slotEntry['horselink'] = `${charadex.page.masterlist.sitePage}.html?profile=${horseEntry.design.toLowerCase()}`
        }
      }
    }
  }

  let dex = await charadex.initialize.page(
    slotData,
    charadex.page.slots,
    null,
    (data) => {
      updateEntries(data);

      // bind to page changes
      document.getElementById('charadex-gallery').addEventListener('click', function(e) {
        const page = e.target?.getAttribute('data-page');
        if (!page) return;

        updateEntries(data);
      })
    }
  );

  charadex.tools.loadPage('.softload', 500);
});