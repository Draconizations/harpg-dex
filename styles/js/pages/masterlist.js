/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {

  let dex = await charadex.initialize.page(
    null,
    charadex.page.masterlist,
    null, 
    async (listData) => {

      if (listData.type == 'profile') {

        // Create the lineage tab
        if (charadex.tools.checkArray(listData.profileArray[0].lineage)) {
          let lineage = await charadex.initialize.page(
            listData.profileArray[0].lineage,
            charadex.page.masterlist.relatedData['lineage']
          );

        let check = ["sirename", "ssname", "sdname", "ddname", "sssname", "ssdname", "sdsname", "sddname", "dsname", "dssname", "dsdname", "dddname"];
        
          for (const ancestor of check) {
            let el = $(`.${ancestor}`);
            if (!el.text()) el.remove();
          }
        } else {
          $(".lineaged-list").text("No lineage found.")
        }

        if (charadex.tools.checkArray(listData.profileArray[0].gallery)) {
          let gallery = await charadex.initialize.page(
            listData.profileArray[0].gallery,
            charadex.page.masterlist.relatedData['gallery']
          );
        } else {
          $(".gallery-list").html("<div class='text-center w-100'>No gallery items found.</div>")
        }

        if (charadex.tools.checkArray(listData.profileArray[0].slots)) {
          let slots = await charadex.initialize.page(
            listData.profileArray[0].slots,
            charadex.page.masterlist.relatedData['slots'],
            () => {},
            (data) => {
              // add background images to characters
              $('.cd-slot-container').each(function(i) {
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
          );
        } else {
          $(".slots-list").html("<div class='text-center w-100'>No slots found.</div>")
        }
      }

    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});