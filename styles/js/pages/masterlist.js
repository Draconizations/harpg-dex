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
          $(".gallert-list").text("No gallery items found.")
        }
      }

    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});