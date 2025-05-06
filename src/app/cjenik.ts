export type CiscenjeTip = "OSNOVNO" | "OSNOVNO/NAKON GOSTIJU" | "GENERALNO";

type CjenikEntry = {
  do?: number;
  cijene: { [key in CiscenjeTip]?: number };
  iznad?: {
    cijene: { [key in CiscenjeTip]?: number };
  };
};

export const cjenik: { [tipNekretnine: string]: CjenikEntry } = {

    "APARTMAN": {
      do: 50,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1,
        "GENERALNO": 2
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1,
          "GENERALNO": 1.8
        }
      }
    },
    "KUĆA ZA ODMOR": {
      do: 100,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1.5,
        "GENERALNO": 2.5
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.3,
          "GENERALNO": 2
        }
      }
    },
    "VILA": {
      do: 130,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1.5,
        "GENERALNO": 3
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.3,
          "GENERALNO": 2
        }
      }
    },
    "STUDIO": {
      do: 25,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1.8,
        "GENERALNO": 3.2
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.3,
          "GENERALNO": 2.2
        }
      }
    },
    "GARSONIJERA": {
      do: 20,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1.8,
        "GENERALNO": 3.5
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.3,
          "GENERALNO": 2.4
        }
      }
    },
    "SOBA": {
      do: 10,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 2,
        "GENERALNO": 4
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.8,
          "GENERALNO": 2.5
        }
      }
    },
    "KUĆANSTVO SA UKUĆANIMA": {
      do: 60,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1,
        "GENERALNO": 2
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.2,
          "GENERALNO": 1.8
        }
      }
    },
    "KAMP/MONTAŽNA KUĆICA": {
      do: 15,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 1.5,
        "GENERALNO": 3
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 1.3,
          "GENERALNO": 2.5
        }
      }
    },
    "ČIŠĆENJE NAKON RADOVA": {
      do: 20,
      cijene: {
        "OSNOVNO/NAKON GOSTIJU": 4,
        "GENERALNO": 5
      },
      iznad: {
        cijene: {
          "OSNOVNO/NAKON GOSTIJU": 3,
          "GENERALNO": 4
        }
      }
    },
  };