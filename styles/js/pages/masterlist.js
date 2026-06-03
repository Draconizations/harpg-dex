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

        // Create the log dex
        if (charadex.tools.checkArray(listData.profileArray[0].lineage)) {
          let lineage = await charadex.initialize.page(
            listData.profileArray[0].lineage,
            charadex.page.masterlist.relatedData['lineage']
          );
        }

        let check = ["sirename", "ssname", "sdname", "ddname", "sssname", "ssdname", "sdsname", "sddname", "dsname", "dssname", "dsdname", "dddname"];
        
        for (const ancestor of check) {
          let el = $(`.${ancestor}`);
          if (!el.text()) el.remove();
        }

      }

    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});