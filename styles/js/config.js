/* ==================================================================== */
/* Charadex
=======================================================================  /

  The charadex namespace. You can use it if you like, but this should
  prevent charadex from messing with any other imported code.
    
======================================================================= */
let charadex = {};

/* ==================================================================== */
/* Site
/* If you don't want to hard code your site information, you
/* can fill this out instead
/* Any preview links will still show Charadex's information
/* ==================================================================== */
charadex.site = {
  title: "hARPG Tracker",
  url: "https://charadex-team.github.io/charadex-v1.0/",
  description: `A horse ARPG character tracker.`
}

/* ==================================================================== */
/* Sheet Config
/* Your sheet configuration
/* ==================================================================== */
charadex.sheet = {

  id: "1JUZJObJgZY2L2ih3Yd94c-R81HckluLsxYX3sqFmves",

  pages: {
    masterlist: "masterlist",
    lineage:    "lineage",
    gallery:    "gallery",
  },

  owner: "Fulmn",

  options: {
    designTypes: ['Import', 'Lineaged'],
    statuses: ['Resell', 'Trade', 'Gift', 'Voided', 'For Sale', 'Purchased'],
    genders: ["Stallion", "Mare", "Gelding", "Mare (infertile)"],
    breeds: ["Loshenka"],
  }
}


/* ==================================================================== */
/* Page configuration
/* ==================================================================== */
charadex.page = {};


/* Masterlist
/* --------------------------------------------------------------- */
charadex.page.masterlist = {

  sheetPage: charadex.sheet.pages.masterlist,
  sitePage: 'masterlist',
  dexSelector: 'charadex',
  profileProperty: 'design',

  sort: {
    toggle: true,
    key: "id",
    order: "desc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: true,
    parameters: {
      'Design Type': charadex.sheet.options.designTypes,
      'Status': charadex.sheet.options.statuses,
      'gender': charadex.sheet.options.genders,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Breed',
    parameters: charadex.sheet.options.breeds,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'ID', 'Showname', 'Callname', 'Owner', 'Designer', 'Artist']
  },

  prevNext: {
    toggle: true,
  },

  relatedData: {

    [charadex.sheet.pages.lineage]: {

      sheetPage: charadex.sheet.pages.lineage,
      primaryProperty: 'id',
      relatedProperty: 'horse',
      dexSelector: 'lineaged',
      profileProperty: 'id',
      profileToggle: false,

      sort: {
        toggle: true,
        key: "",
        order: "asc",
        parameters: []
      },

      pagination: {
        toggle: false,
        bottomToggle: false,
        amount: 12,
      },

    },


    [charadex.sheet.pages.gallery]: {

      sheetPage: charadex.sheet.pages.gallery,
      primaryProperty: 'id',
      relatedProperty: 'horse',
      dexSelector: 'gallery',
      profileProperty: 'id',
      profileToggle: true,

      sort: {
        toggle: true,
        key: "timestamp",
        order: "desc",
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: true,
        amount: 6,
      },
    },

  }

};

/* Index
/* --------------------------------------------------------------- */
charadex.page.index = {

  designs: {
    ... charadex.page.masterlist,
    dexSelector: 'design',
    amount: 4,
  },

  gallery: {
    ... charadex.page.gallery,
    dexSelector: 'gallery',
    amount: 4,
  },

};


export { charadex };