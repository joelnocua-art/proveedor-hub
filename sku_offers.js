// SKU Offers — PROELCO, ADLER, LAUMAYER, SELDA, 4S
// Updated: 2026-03-17

(function() {
  var OFFERS_KEY = 'skuOffersById';
  try {
    var existing = localStorage.getItem(OFFERS_KEY);
    var store = existing ? JSON.parse(existing) : {};
    if (typeof store !== 'object' || store === null) store = {};

    var seed = {
  "360": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1943000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "1": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1985000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "2": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1490000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "3": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1425000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "4": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 590000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "8": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 805000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "376": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1943000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "106": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 190000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 170000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "107": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 340000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 270000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "105": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 550000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "100": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 1428000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "116": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "19": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "145": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "26": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "152": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "20": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "146": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 71000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "22": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 80000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "148": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 80000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "24": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "150": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 150000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "121": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 235000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "197": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 235000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "18": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 252000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 120000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "144": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 252000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 120000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "23": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 298000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 136000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "149": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 298000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 136000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "25": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 315000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 140000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "151": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 315000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 140000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "28": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "154": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "33": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "159": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "30": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "156": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "29": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "155": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "31": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "157": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 232000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "120": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 336000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "196": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 336000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "27": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 336000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "153": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 336000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "32": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 365000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "158": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 365000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "371": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 377000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "372": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 377000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "373": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 377000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "374": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 377000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "14": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "140": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "17": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "143": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "15": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "141": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "10": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "136": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "9": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "135": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 195000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "12": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 260000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "138": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 260000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "11": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 260000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "137": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 260000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "16": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 540000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "142": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 540000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "446": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 540000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "160": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2220000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "161": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "163": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "164": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "165": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "167": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "168": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "170": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "35": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "37": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "38": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "39": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "41": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "42": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "44": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "248": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "250": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "251": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "252": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "254": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "255": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "257": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 2100000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "52": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "178": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "53": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "179": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "118": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "194": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3840000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "55": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "181": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "393": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    }
  ],
  "54": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "180": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "289": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "290": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "56": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "182": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "58": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "184": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "59": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "185": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "57": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "60": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "186": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "61": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "187": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "265": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "266": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "268": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "271": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "272": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "273": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "274": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "46": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "172": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "47": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "173": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "48": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "174": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "49": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "175": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "50": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "176": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "51": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "177": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "259": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "260": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "261": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "262": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "263": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "264": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4700000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "62": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5940000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "188": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5940000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "63": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "189": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "64": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "190": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "65": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "191": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "66": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "192": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "67": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "193": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "275": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "276": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "277": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "278": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "279": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "280": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 5800000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "69": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "205": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "225": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "75": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "211": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "231": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "74": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3630000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "210": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3630000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "230": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3630000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "68": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "204": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "224": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "82": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "218": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "238": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "80": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4830000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 7300000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "216": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4830000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 7300000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "236": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4830000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 7300000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "81": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "217": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "237": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 4472000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "124": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "222": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "242": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "79": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "215": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "235": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 7500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "84": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "220": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "240": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "85": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "221": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "241": [
    {
      "provider": "PROELCO",
      "price_sin_iva": 8500000,
      "createdAt": "2026-03-01T01:12:00.241038Z",
      "updatedAt": "2026-03-01T01:12:00.241038Z"
    },
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "500": [
    {
      "provider": "ADLER",
      "price_sin_iva": 4177,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "501": [
    {
      "provider": "ADLER",
      "price_sin_iva": 4770,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "502": [
    {
      "provider": "ADLER",
      "price_sin_iva": 6883,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "503": [
    {
      "provider": "ADLER",
      "price_sin_iva": 8632,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "504": [
    {
      "provider": "ADLER",
      "price_sin_iva": 11568,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "505": [
    {
      "provider": "ADLER",
      "price_sin_iva": 9359,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "506": [
    {
      "provider": "ADLER",
      "price_sin_iva": 15634,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "507": [
    {
      "provider": "ADLER",
      "price_sin_iva": 21671,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "508": [
    {
      "provider": "ADLER",
      "price_sin_iva": 29042,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "509": [
    {
      "provider": "ADLER",
      "price_sin_iva": 40736,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "510": [
    {
      "provider": "ADLER",
      "price_sin_iva": 39348,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "511": [
    {
      "provider": "ADLER",
      "price_sin_iva": 18768,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "512": [
    {
      "provider": "ADLER",
      "price_sin_iva": 21094,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 18800,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "513": [
    {
      "provider": "ADLER",
      "price_sin_iva": 24247,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 23400,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "514": [
    {
      "provider": "ADLER",
      "price_sin_iva": 31395,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 26800,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "515": [
    {
      "provider": "ADLER",
      "price_sin_iva": 41169,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 37500,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "516": [
    {
      "provider": "ADLER",
      "price_sin_iva": 63198,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 66400,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "517": [
    {
      "provider": "ADLER",
      "price_sin_iva": 25237,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "520": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2046,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 2100,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "521": [
    {
      "provider": "ADLER",
      "price_sin_iva": 5618,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 4000,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "522": [
    {
      "provider": "ADLER",
      "price_sin_iva": 8694,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 7200,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "523": [
    {
      "provider": "ADLER",
      "price_sin_iva": 11970,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "524": [
    {
      "provider": "ADLER",
      "price_sin_iva": 13410,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 15900,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "525": [
    {
      "provider": "ADLER",
      "price_sin_iva": 23735,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 17500,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "526": [
    {
      "provider": "ADLER",
      "price_sin_iva": 66675,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 55800,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "527": [
    {
      "provider": "ADLER",
      "price_sin_iva": 89191,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "530": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1836,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "531": [
    {
      "provider": "ADLER",
      "price_sin_iva": 3129,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "532": [
    {
      "provider": "ADLER",
      "price_sin_iva": 3262,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "540": [
    {
      "provider": "ADLER",
      "price_sin_iva": 400,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 2000,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "541": [
    {
      "provider": "ADLER",
      "price_sin_iva": 502,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 2000,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "542": [
    {
      "provider": "ADLER",
      "price_sin_iva": 632,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 3200,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "543": [
    {
      "provider": "ADLER",
      "price_sin_iva": 734,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 3200,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "544": [
    {
      "provider": "ADLER",
      "price_sin_iva": 940,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 3200,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "545": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1331,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 5400,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "546": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2277,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 8100,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "547": [
    {
      "provider": "ADLER",
      "price_sin_iva": 3502,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "548": [
    {
      "provider": "ADLER",
      "price_sin_iva": 4679,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "549": [
    {
      "provider": "ADLER",
      "price_sin_iva": 5118,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "550": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1102,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "551": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2430,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "560": [
    {
      "provider": "ADLER",
      "price_sin_iva": 612,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "561": [
    {
      "provider": "ADLER",
      "price_sin_iva": 664,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 600,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "562": [
    {
      "provider": "ADLER",
      "price_sin_iva": 786,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 700,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "563": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1072,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 700,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "564": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1352,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 1400,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "565": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1547,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 1500,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "566": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2879,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    },
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 3700,
      "createdAt": "2026-03-04T05:00:00.000000Z",
      "updatedAt": "2026-03-04T05:00:00.000000Z"
    }
  ],
  "570": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1265,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "571": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1472,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "572": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1536,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "573": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1756,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "574": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1802,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "575": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2837,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "576": [
    {
      "provider": "ADLER",
      "price_sin_iva": 985,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "577": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1187,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "578": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1295,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "579": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1792,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "580": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2070,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "581": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2481,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "582": [
    {
      "provider": "ADLER",
      "price_sin_iva": 3151,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "583": [
    {
      "provider": "ADLER",
      "price_sin_iva": 4045,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "584": [
    {
      "provider": "ADLER",
      "price_sin_iva": 1933,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "585": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2650,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "586": [
    {
      "provider": "ADLER",
      "price_sin_iva": 4447,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "587": [
    {
      "provider": "ADLER",
      "price_sin_iva": 2426,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "588": [
    {
      "provider": "ADLER",
      "price_sin_iva": 3304,
      "createdAt": "2026-03-01T02:22:37.511000Z",
      "updatedAt": "2026-03-01T02:22:37.511000Z"
    }
  ],
  "404": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 181700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "405": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 182800,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "406": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 183700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "407": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 193300,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "408": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 230900,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "409": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 323000,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "410": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 393300,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "411": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 180800,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "412": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 186700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "413": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 184700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "414": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 188700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "415": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 332500,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "109": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 181700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "110": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 183700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "111": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 184700,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "112": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 193300,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "113": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 230900,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "114": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 323000,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "115": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 182800,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "361": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 569900,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "362": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 414200,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "363": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 393300,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "399": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 380100,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "400": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 487500,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "401": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 619500,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "402": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 868500,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "403": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 1401200,
      "createdAt": "2026-03-03T14:00:00.000000Z",
      "updatedAt": "2026-03-03T14:00:00.000000Z"
    }
  ],
  "392": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "442": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "394": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "395": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "396": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "397": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "398": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 54500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "132": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 83600,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "365": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 92900,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "131": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 100200,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "366": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 152500,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "367": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 155100,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "368": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 198700,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "428": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 1206600,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "441": [
    {
      "provider": "LAUMAYER",
      "price_sin_iva": 1206600,
      "createdAt": "2026-03-04T06:00:00.000000Z",
      "updatedAt": "2026-03-04T06:00:00.000000Z"
    }
  ],
  "309": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "310": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "311": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "312": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "313": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "314": [
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "315": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "316": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "317": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "318": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "319": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "320": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "321": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "322": [
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "323": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "324": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "325": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "326": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "327": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "328": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "329": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "330": [
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "331": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "332": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "333": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "334": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "335": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "336": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "337": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "338": [
    {
      "provider": "SELDA",
      "price_sin_iva": 220000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "339": [
    {
      "provider": "SELDA",
      "price_sin_iva": 110000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "340": [
    {
      "provider": "SELDA",
      "price_sin_iva": 130000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "389": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "445": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "390": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "34": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "36": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "40": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "43": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "45": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "122": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "123": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "127": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "128": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "134": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "162": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "166": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "169": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "171": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "198": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "203": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "247": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "249": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "253": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "256": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "258": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "283": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "288": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "341": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "345": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "349": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "353": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "355": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "357": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "382": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 1450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "126": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "183": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "200": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "267": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "269": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "270": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "281": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "285": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "291": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "299": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "303": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "307": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "343": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "347": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "351": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "378": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2000000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2430000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "119": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "195": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "199": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "282": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "298": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "302": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "306": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "342": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "346": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "350": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "354": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "356": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "358": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "381": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3670000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "387": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "292": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "293": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "294": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "300": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "304": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "308": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "344": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "348": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "352": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "385": [
    {
      "provider": "SELDA",
      "price_sin_iva": 3500000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 5100000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "70": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "71": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "72": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "73": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "76": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "78": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "206": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "207": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "208": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "209": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "212": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "214": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "226": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "227": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "228": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "229": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "232": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "234": [
    {
      "provider": "SELDA",
      "price_sin_iva": 1400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 2450000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "388": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "370": [
    {
      "provider": "SELDA",
      "price_sin_iva": 2200000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 3250000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "77": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 4800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "213": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 4800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "233": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4400000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 4800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "447": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "83": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "125": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "219": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "223": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "239": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "243": [
    {
      "provider": "SELDA",
      "price_sin_iva": 4900000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    },
    {
      "provider": "4S",
      "price_sin_iva": 6800000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ],
  "104": [
    {
      "provider": "SELDA",
      "price_sin_iva": 120000,
      "createdAt": "2026-03-17T12:00:00.000Z",
      "updatedAt": "2026-03-17T12:00:00.000Z"
    }
  ]
};

    var added = 0;
    for (var skuId in seed) {
      var current = Array.isArray(store[skuId]) ? store[skuId] : [];
      var seedOffers = seed[skuId];
      var changed = false;
      for (var i = 0; i < seedOffers.length; i++) {
        var so = seedOffers[i];
        var pNorm = String(so.provider || '').trim().toLowerCase();
        var exists = false;
        for (var j = 0; j < current.length; j++) {
          if (String(current[j].provider || '').trim().toLowerCase() === pNorm) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          current.push(so);
          changed = true;
          added++;
        }
      }
      if (changed) store[skuId] = current;
    }

    if (added > 0) {
      localStorage.setItem(OFFERS_KEY, JSON.stringify(store));
      console.log('[SKU Offers] ' + added + ' precios nuevos cargados.');
    } else {
      console.log('[SKU Offers] Precios ya cargados.');
    }
  } catch(e) {
    console.warn('[SKU Offers] Error:', e);
  }
})();

window.skuOffersData = [["360", [{"provider": "PROELCO", "price_sin_iva": 1943000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["1", [{"provider": "PROELCO", "price_sin_iva": 1985000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["2", [{"provider": "PROELCO", "price_sin_iva": 1490000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["3", [{"provider": "PROELCO", "price_sin_iva": 1425000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["4", [{"provider": "PROELCO", "price_sin_iva": 590000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["8", [{"provider": "PROELCO", "price_sin_iva": 805000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["376", [{"provider": "PROELCO", "price_sin_iva": 1943000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["106", [{"provider": "PROELCO", "price_sin_iva": 190000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 170000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["107", [{"provider": "PROELCO", "price_sin_iva": 340000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 270000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["105", [{"provider": "PROELCO", "price_sin_iva": 550000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["100", [{"provider": "PROELCO", "price_sin_iva": 1428000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["116", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["19", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["145", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["26", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["152", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["20", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["146", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 71000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["22", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 80000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["148", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 80000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["24", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["150", [{"provider": "PROELCO", "price_sin_iva": 150000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["121", [{"provider": "PROELCO", "price_sin_iva": 235000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["197", [{"provider": "PROELCO", "price_sin_iva": 235000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["18", [{"provider": "PROELCO", "price_sin_iva": 252000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 120000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["144", [{"provider": "PROELCO", "price_sin_iva": 252000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 120000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["23", [{"provider": "PROELCO", "price_sin_iva": 298000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 136000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["149", [{"provider": "PROELCO", "price_sin_iva": 298000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 136000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["25", [{"provider": "PROELCO", "price_sin_iva": 315000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 140000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["151", [{"provider": "PROELCO", "price_sin_iva": 315000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 140000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["28", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["154", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["33", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["159", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["30", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["156", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["29", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["155", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["31", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["157", [{"provider": "PROELCO", "price_sin_iva": 232000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["120", [{"provider": "PROELCO", "price_sin_iva": 336000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["196", [{"provider": "PROELCO", "price_sin_iva": 336000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["27", [{"provider": "PROELCO", "price_sin_iva": 336000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["153", [{"provider": "PROELCO", "price_sin_iva": 336000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["32", [{"provider": "PROELCO", "price_sin_iva": 365000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["158", [{"provider": "PROELCO", "price_sin_iva": 365000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["371", [{"provider": "PROELCO", "price_sin_iva": 377000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["372", [{"provider": "PROELCO", "price_sin_iva": 377000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["373", [{"provider": "PROELCO", "price_sin_iva": 377000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["374", [{"provider": "PROELCO", "price_sin_iva": 377000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["14", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["140", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["17", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["143", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["15", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["141", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["10", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["136", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["9", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["135", [{"provider": "PROELCO", "price_sin_iva": 195000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["12", [{"provider": "PROELCO", "price_sin_iva": 260000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["138", [{"provider": "PROELCO", "price_sin_iva": 260000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["11", [{"provider": "PROELCO", "price_sin_iva": 260000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["137", [{"provider": "PROELCO", "price_sin_iva": 260000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["16", [{"provider": "PROELCO", "price_sin_iva": 540000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["142", [{"provider": "PROELCO", "price_sin_iva": 540000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["446", [{"provider": "PROELCO", "price_sin_iva": 540000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["160", [{"provider": "PROELCO", "price_sin_iva": 2220000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["161", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["163", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["164", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["165", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["167", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["168", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["170", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["35", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["37", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["38", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["39", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["41", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["42", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["44", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["248", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["250", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["251", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["252", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["254", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["255", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["257", [{"provider": "PROELCO", "price_sin_iva": 2100000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["52", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["178", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["53", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["179", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["118", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["194", [{"provider": "PROELCO", "price_sin_iva": 3840000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["55", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["181", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["393", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}]], ["54", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["180", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["289", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["290", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["56", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["182", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["58", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["184", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["59", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["185", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["57", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["60", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["186", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["61", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["187", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["265", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["266", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["268", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["271", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["272", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["273", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["274", [{"provider": "PROELCO", "price_sin_iva": 3700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["46", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["172", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["47", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["173", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["48", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["174", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["49", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["175", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["50", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["176", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["51", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["177", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["259", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["260", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["261", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["262", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["263", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["264", [{"provider": "PROELCO", "price_sin_iva": 4700000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["62", [{"provider": "PROELCO", "price_sin_iva": 5940000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["188", [{"provider": "PROELCO", "price_sin_iva": 5940000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["63", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["189", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["64", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["190", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["65", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["191", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["66", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["192", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["67", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["193", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["275", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["276", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["277", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["278", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["279", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["280", [{"provider": "PROELCO", "price_sin_iva": 5800000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["69", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["205", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["225", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["75", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["211", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["231", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["74", [{"provider": "PROELCO", "price_sin_iva": 3630000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["210", [{"provider": "PROELCO", "price_sin_iva": 3630000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["230", [{"provider": "PROELCO", "price_sin_iva": 3630000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["68", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["204", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["224", [{"provider": "PROELCO", "price_sin_iva": 3250000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["82", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["218", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["238", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["80", [{"provider": "PROELCO", "price_sin_iva": 4830000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 7300000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["216", [{"provider": "PROELCO", "price_sin_iva": 4830000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 7300000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["236", [{"provider": "PROELCO", "price_sin_iva": 4830000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 7300000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["81", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["217", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["237", [{"provider": "PROELCO", "price_sin_iva": 4472000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["124", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["222", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["242", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["79", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["215", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["235", [{"provider": "PROELCO", "price_sin_iva": 7500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["84", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["220", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["240", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["85", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["221", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["241", [{"provider": "PROELCO", "price_sin_iva": 8500000, "createdAt": "2026-03-01T01:12:00.241038Z", "updatedAt": "2026-03-01T01:12:00.241038Z"}, {"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["500", [{"provider": "ADLER", "price_sin_iva": 4177, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["501", [{"provider": "ADLER", "price_sin_iva": 4770, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["502", [{"provider": "ADLER", "price_sin_iva": 6883, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["503", [{"provider": "ADLER", "price_sin_iva": 8632, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["504", [{"provider": "ADLER", "price_sin_iva": 11568, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["505", [{"provider": "ADLER", "price_sin_iva": 9359, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["506", [{"provider": "ADLER", "price_sin_iva": 15634, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["507", [{"provider": "ADLER", "price_sin_iva": 21671, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["508", [{"provider": "ADLER", "price_sin_iva": 29042, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["509", [{"provider": "ADLER", "price_sin_iva": 40736, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["510", [{"provider": "ADLER", "price_sin_iva": 39348, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["511", [{"provider": "ADLER", "price_sin_iva": 18768, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["512", [{"provider": "ADLER", "price_sin_iva": 21094, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 18800, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["513", [{"provider": "ADLER", "price_sin_iva": 24247, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 23400, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["514", [{"provider": "ADLER", "price_sin_iva": 31395, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 26800, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["515", [{"provider": "ADLER", "price_sin_iva": 41169, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 37500, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["516", [{"provider": "ADLER", "price_sin_iva": 63198, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 66400, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["517", [{"provider": "ADLER", "price_sin_iva": 25237, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["520", [{"provider": "ADLER", "price_sin_iva": 2046, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 2100, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["521", [{"provider": "ADLER", "price_sin_iva": 5618, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 4000, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["522", [{"provider": "ADLER", "price_sin_iva": 8694, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 7200, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["523", [{"provider": "ADLER", "price_sin_iva": 11970, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["524", [{"provider": "ADLER", "price_sin_iva": 13410, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 15900, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["525", [{"provider": "ADLER", "price_sin_iva": 23735, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 17500, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["526", [{"provider": "ADLER", "price_sin_iva": 66675, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 55800, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["527", [{"provider": "ADLER", "price_sin_iva": 89191, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["530", [{"provider": "ADLER", "price_sin_iva": 1836, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["531", [{"provider": "ADLER", "price_sin_iva": 3129, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["532", [{"provider": "ADLER", "price_sin_iva": 3262, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["540", [{"provider": "ADLER", "price_sin_iva": 400, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 2000, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["541", [{"provider": "ADLER", "price_sin_iva": 502, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 2000, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["542", [{"provider": "ADLER", "price_sin_iva": 632, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 3200, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["543", [{"provider": "ADLER", "price_sin_iva": 734, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 3200, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["544", [{"provider": "ADLER", "price_sin_iva": 940, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 3200, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["545", [{"provider": "ADLER", "price_sin_iva": 1331, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 5400, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["546", [{"provider": "ADLER", "price_sin_iva": 2277, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 8100, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["547", [{"provider": "ADLER", "price_sin_iva": 3502, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["548", [{"provider": "ADLER", "price_sin_iva": 4679, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["549", [{"provider": "ADLER", "price_sin_iva": 5118, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["550", [{"provider": "ADLER", "price_sin_iva": 1102, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["551", [{"provider": "ADLER", "price_sin_iva": 2430, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["560", [{"provider": "ADLER", "price_sin_iva": 612, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["561", [{"provider": "ADLER", "price_sin_iva": 664, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 600, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["562", [{"provider": "ADLER", "price_sin_iva": 786, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 700, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["563", [{"provider": "ADLER", "price_sin_iva": 1072, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 700, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["564", [{"provider": "ADLER", "price_sin_iva": 1352, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 1400, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["565", [{"provider": "ADLER", "price_sin_iva": 1547, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 1500, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["566", [{"provider": "ADLER", "price_sin_iva": 2879, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}, {"provider": "LAUMAYER", "price_sin_iva": 3700, "createdAt": "2026-03-04T05:00:00.000000Z", "updatedAt": "2026-03-04T05:00:00.000000Z"}]], ["570", [{"provider": "ADLER", "price_sin_iva": 1265, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["571", [{"provider": "ADLER", "price_sin_iva": 1472, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["572", [{"provider": "ADLER", "price_sin_iva": 1536, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["573", [{"provider": "ADLER", "price_sin_iva": 1756, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["574", [{"provider": "ADLER", "price_sin_iva": 1802, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["575", [{"provider": "ADLER", "price_sin_iva": 2837, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["576", [{"provider": "ADLER", "price_sin_iva": 985, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["577", [{"provider": "ADLER", "price_sin_iva": 1187, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["578", [{"provider": "ADLER", "price_sin_iva": 1295, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["579", [{"provider": "ADLER", "price_sin_iva": 1792, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["580", [{"provider": "ADLER", "price_sin_iva": 2070, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["581", [{"provider": "ADLER", "price_sin_iva": 2481, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["582", [{"provider": "ADLER", "price_sin_iva": 3151, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["583", [{"provider": "ADLER", "price_sin_iva": 4045, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["584", [{"provider": "ADLER", "price_sin_iva": 1933, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["585", [{"provider": "ADLER", "price_sin_iva": 2650, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["586", [{"provider": "ADLER", "price_sin_iva": 4447, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["587", [{"provider": "ADLER", "price_sin_iva": 2426, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["588", [{"provider": "ADLER", "price_sin_iva": 3304, "createdAt": "2026-03-01T02:22:37.511000Z", "updatedAt": "2026-03-01T02:22:37.511000Z"}]], ["404", [{"provider": "LAUMAYER", "price_sin_iva": 181700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["405", [{"provider": "LAUMAYER", "price_sin_iva": 182800, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["406", [{"provider": "LAUMAYER", "price_sin_iva": 183700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["407", [{"provider": "LAUMAYER", "price_sin_iva": 193300, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["408", [{"provider": "LAUMAYER", "price_sin_iva": 230900, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["409", [{"provider": "LAUMAYER", "price_sin_iva": 323000, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["410", [{"provider": "LAUMAYER", "price_sin_iva": 393300, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["411", [{"provider": "LAUMAYER", "price_sin_iva": 180800, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["412", [{"provider": "LAUMAYER", "price_sin_iva": 186700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["413", [{"provider": "LAUMAYER", "price_sin_iva": 184700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["414", [{"provider": "LAUMAYER", "price_sin_iva": 188700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["415", [{"provider": "LAUMAYER", "price_sin_iva": 332500, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["109", [{"provider": "LAUMAYER", "price_sin_iva": 181700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["110", [{"provider": "LAUMAYER", "price_sin_iva": 183700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["111", [{"provider": "LAUMAYER", "price_sin_iva": 184700, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["112", [{"provider": "LAUMAYER", "price_sin_iva": 193300, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["113", [{"provider": "LAUMAYER", "price_sin_iva": 230900, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["114", [{"provider": "LAUMAYER", "price_sin_iva": 323000, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["115", [{"provider": "LAUMAYER", "price_sin_iva": 182800, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["361", [{"provider": "LAUMAYER", "price_sin_iva": 569900, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["362", [{"provider": "LAUMAYER", "price_sin_iva": 414200, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["363", [{"provider": "LAUMAYER", "price_sin_iva": 393300, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["399", [{"provider": "LAUMAYER", "price_sin_iva": 380100, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["400", [{"provider": "LAUMAYER", "price_sin_iva": 487500, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["401", [{"provider": "LAUMAYER", "price_sin_iva": 619500, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["402", [{"provider": "LAUMAYER", "price_sin_iva": 868500, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["403", [{"provider": "LAUMAYER", "price_sin_iva": 1401200, "createdAt": "2026-03-03T14:00:00.000000Z", "updatedAt": "2026-03-03T14:00:00.000000Z"}]], ["392", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["442", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["394", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["395", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["396", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["397", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["398", [{"provider": "LAUMAYER", "price_sin_iva": 54500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["132", [{"provider": "LAUMAYER", "price_sin_iva": 83600, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["365", [{"provider": "LAUMAYER", "price_sin_iva": 92900, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["131", [{"provider": "LAUMAYER", "price_sin_iva": 100200, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["366", [{"provider": "LAUMAYER", "price_sin_iva": 152500, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["367", [{"provider": "LAUMAYER", "price_sin_iva": 155100, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["368", [{"provider": "LAUMAYER", "price_sin_iva": 198700, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["428", [{"provider": "LAUMAYER", "price_sin_iva": 1206600, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["441", [{"provider": "LAUMAYER", "price_sin_iva": 1206600, "createdAt": "2026-03-04T06:00:00.000000Z", "updatedAt": "2026-03-04T06:00:00.000000Z"}]], ["309", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["310", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["311", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["312", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["313", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["314", [{"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["315", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["316", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["317", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["318", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["319", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["320", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["321", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["322", [{"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["323", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["324", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["325", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["326", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["327", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["328", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["329", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["330", [{"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["331", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["332", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["333", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["334", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["335", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["336", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["337", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["338", [{"provider": "SELDA", "price_sin_iva": 220000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["339", [{"provider": "SELDA", "price_sin_iva": 110000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["340", [{"provider": "SELDA", "price_sin_iva": 130000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["389", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["445", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["390", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["34", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["36", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["40", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["43", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["45", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["122", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["123", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["127", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["128", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["134", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["162", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["166", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["169", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["171", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["198", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["203", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["247", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["249", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["253", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["256", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["258", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["283", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["288", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["341", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["345", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["349", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["353", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["355", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["357", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["382", [{"provider": "SELDA", "price_sin_iva": 1100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 1450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["126", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["183", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["200", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["267", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["269", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["270", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["281", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["285", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["291", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["299", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["303", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["307", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["343", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["347", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["351", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["378", [{"provider": "SELDA", "price_sin_iva": 2000000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2430000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["119", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["195", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["199", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["282", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["298", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["302", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["306", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["342", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["346", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["350", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["354", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["356", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["358", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["381", [{"provider": "SELDA", "price_sin_iva": 3200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3670000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["387", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["292", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["293", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["294", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["300", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["304", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["308", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["344", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["348", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["352", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["385", [{"provider": "SELDA", "price_sin_iva": 3500000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 5100000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["70", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["71", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["72", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["73", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["76", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["78", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["206", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["207", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["208", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["209", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["212", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["214", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["226", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["227", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["228", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["229", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["232", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["234", [{"provider": "SELDA", "price_sin_iva": 1400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 2450000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["388", [{"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["370", [{"provider": "SELDA", "price_sin_iva": 2200000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 3250000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["77", [{"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 4800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["213", [{"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 4800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["233", [{"provider": "SELDA", "price_sin_iva": 4400000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 4800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["447", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["83", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["125", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["219", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["223", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["239", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["243", [{"provider": "SELDA", "price_sin_iva": 4900000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}, {"provider": "4S", "price_sin_iva": 6800000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]], ["104", [{"provider": "SELDA", "price_sin_iva": 120000, "createdAt": "2026-03-17T12:00:00.000Z", "updatedAt": "2026-03-17T12:00:00.000Z"}]]];
