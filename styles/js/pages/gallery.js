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
    charadex.page.gallery,
    null, 
    async (listData) => {

      if (listData.type == 'profile') {

        // Create the log dex
        if (charadex.tools.checkArray(listData.profileArray[0].masterlist)) {
          let masterlist = await charadex.initialize.page(
            listData.profileArray[0].masterlist,
            charadex.page.gallery.relatedData['masterlist'],
            () => {},
            (data) => {
              // add background images to characters
              $('.cd-design-background').each(function(i) {
                  const element = $(this);
                  const image = data.array[i]?.image;
                  element.attr('style', `background-image: url(${image})`);
              });
            }
          );
        }
      }
    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});