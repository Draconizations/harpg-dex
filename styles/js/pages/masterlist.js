/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


function getRankData(xp) {

  const ranks = charadex.sheet.experience.ranks;
  let current = [0, 'Unranked'];
  let next = ranks[0];

  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i][0]) {
      current = ranks[i];

      // check if we're not at the final rank
      if (i !== ranks.length - 1)
        next = ranks[i + 1];
      else next = ranks[i]; // else set to the same rank
    }
  }

  return { current, next }
}


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

        // if we aren't tracking experience, get rid of this entire thing
        if (!charadex.sheet.experience.toggle) {
          $('.cd-experience-container').remove();
        } else {
          // create the XP progress bar
          const experience = $('.experience').text();

          const { current, next } = getRankData(experience);
          console.log(next)

          // display progress from current rank to the next
          if (current[0] !== next[0]) {
            $('.xp-progress-bar').css('width', ((experience - current[0]) / (next[0] - current[0]) * 100) + '%');
            $('.cd-next-rank').text(`Next rank: ${next[1]}`);
          } else {
            $('.xp-progress-bar').css('width', '100%');
            $('.xp-progress-bar').removeClass(('bg-secondary'));
            $('.cd-next-rank').remove();
          }

          // change some text displays
          $('.experience').text(`${experience}/${next[0]}`)
          $('.cd-rank').text(current[1]);
        }

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
            () => { },
            (data) => {
              // add background images to characters
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
          );
        } else {
          $(".slots-list").html("<div class='text-center w-100'>No slots found.</div>")
        }
      }

    }
  );

  charadex.tools.loadPage('.softload', 500);

});