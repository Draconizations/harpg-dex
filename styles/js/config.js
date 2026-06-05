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
  title: "hARPG Dex",
  url: "https://draconizations.github.io/harpg-dex/",
  description: `A horse ARPG character tracker.`
}

/* ==================================================================== */
/* Sheet Config
/* Your sheet configuration
/* ==================================================================== */
charadex.sheet = {

  id: "1O44LBbOudteR7Ir9o4OPNiXzCDB1VO9hx8dAiKcmj9Y",

  pages: {
    masterlist: "masterlist",
    lineage: "lineage",
    gallery: "gallery",
    slots: "slots"
  },

  experience: {
    toggle: true, // set this to "false" if you don't want to track experience!
    ranks: [ // you're free to change the ranks here
      [25, 'Quality Merit'],
      [75, 'Refined Merit'],
      [150, 'Superior Merit'],
      [250, 'Exemplary Merit'],
      [400, 'Noble Merit'],
      [425, 'Quality Pretige'],
      [475, 'Refined Prestige'],
      [550, 'Superior Prestige'],
      [650, 'Exemplary Prestige'],
      [800, 'Noble Prestige'],
      [1000, 'Hall Of Fame']
    ]
  },

  options: {
    designTypes: ['Import', 'Lineaged'],
    statuses: ['Resell', 'Trade', 'Gift', 'For Sale', 'Purchased', 'Adopted', 'Designed'],
    genders: ["Stallion", "Mare", "Gelding", "Mare (infertile)"],
    breeds: ["Loshenka"],
    slotStatutes: ['Available', 'Pending', 'Used', 'Relinquished'],
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
    text: 'callname',
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
      sitePage: 'gallery',

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

    [charadex.sheet.pages.slots]: {

      sheetPage: charadex.sheet.pages.slots,
      primaryProperty: 'id',
      relatedProperty: 'horse',
      dexSelector: 'slots',
      profileProperty: 'design',
      profileToggle: false,

      sort: {
        toggle: true,
        key: "timestamp",
        order: "asc",
        parameters: []
      },

      pagination: {
        toggle: false,
        bottomToggle: true,
        amount: 6,
      },
    },

  }

};

/* Slots
/* --------------------------------------------------------------- */
charadex.page.slots = {

  sheetPage: charadex.sheet.pages.slots,
  sitePage: 'slots',
  dexSelector: 'charadex',

  sort: {
    toggle: true,
    key: "timestamp",
    order: "desc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 10,
  },

  filters: {
    toggle: true,
    parameters: {
      'Status': charadex.sheet.options.slotStatutes,
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Timestamp', 'Horse Name', 'Owner']
  },

  prevNext: {
    toggle: false,
    text: '',
  },

};


/* Gallery
/* --------------------------------------------------------------- */
charadex.page.gallery = {

  sheetPage: charadex.sheet.pages.gallery,
  sitePage: 'gallery',
  dexSelector: 'charadex',
  profileProperty: 'id',

  sort: {
    toggle: true,
    key: "timestamp",
    order: "desc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {}
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Title', 'Artist', 'Timestamp']
  },

  prevNext: {
    toggle: true,
    text: 'title',
  },

  relatedData: {

    [charadex.sheet.pages.masterlist]: {

      sheetPage: charadex.sheet.pages.masterlist,
      primaryProperty: 'horse',
      relatedProperty: 'id',
      dexSelector: 'designs',
      profileProperty: 'design',
      profileToggle: true,
      sitePage: 'masterlist',

      sort: {
        toggle: false,
        key: "timestamp",
        order: "desc",
        parameters: []
      },

      pagination: {
        toggle: false,
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
    ...charadex.page.masterlist,
    dexSelector: 'design',
    amount: 4,
  },

  gallery: {
    ...charadex.page.gallery,
    dexSelector: 'artwork',
    amount: 4,
  },

};

export { charadex };