/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {

  /* Designs
  ===================================================================== */
  let designs = await charadex.initialize.page(null, charadex.page.index.designs, (arr) => {

    // Sort the array in desc order
    arr.sort((a,b) => b.id - a.id);

    // Splice the silly little array
    let sliceAmount = charadex.page.index.designs.amount || 6;
    arr.splice(sliceAmount, arr.length);
    arr.reverse();

  });

  /* Gallery
  ===================================================================== */
  let gallery = await charadex.initialize.page(null, charadex.page.index.gallery, (arr) => {

    // Sort the array in desc order
    arr.sort((a,b) => b.timestamp - a.timestamp);

    // Splice the silly little array
    let sliceAmount = charadex.page.index.gallery.amount || 6;
    arr.splice(sliceAmount, arr.length);
    arr.reverse();

  });


  /* Load Page
  ===================================================================== */
  charadex.tools.loadPage('.softload', 500);

});