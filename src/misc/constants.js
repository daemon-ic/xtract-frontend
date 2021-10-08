export const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;
export const DOMAIN = process.env.REACT_APP_API_URL;
export const QUIZLET_DEFAULT_TARGET = ".TermText, .notranslate, .lang-en";

export const MODE_SETTINGS = {
  "Select mode": {
    NAME: {
      placeholder: "N/A",
      disable: true,
    },
    URL: {
      placeholder: "N/A",
      disable: true,
    },

    TARGET: {
      placeholder: "N/A",
      disable: true,
    },
  },
  Quizlet: {
    NAME: {
      placeholder: "Enter a name for the operation",
      disable: false,
    },
    URL: {
      placeholder: "Enter Quizlet URL",
      disable: false,
    },

    TARGET: {
      placeholder: "N/A",
      disable: true,
    },
  },
  Images: {
    NAME: {
      placeholder: "Enter a name for the operation",
      disable: false,
    },
    URL: {
      placeholder: "Enter URL to extract",
      disable: false,
    },

    TARGET: {
      placeholder: "This will extract every image from the page",
      disable: true,
    },
  },
  Class: {
    NAME: {
      placeholder: "Enter a name for the operation",
      disable: false,
    },
    URL: {
      placeholder: "Enter URL to extract",
      disable: false,
    },

    TARGET: {
      placeholder: "Enter classes to extract, seperated by space or comma",
      disable: false,
    },
  },
  Id: {
    NAME: {
      placeholder: "Enter a name for the operation",
      disable: false,
    },
    URL: {
      placeholder: "Enter URL to extract",
      disable: false,
    },

    TARGET: {
      placeholder: "Enter single ID to extract",
      disable: false,
    },
  },

  Tag: {
    NAME: {
      placeholder: "Enter a name for the operation",
      disable: false,
    },
    URL: {
      placeholder: "Enter URL to extract",
      disable: false,
    },

    TARGET: {
      placeholder: "Enter a single tag to extract",
      disable: false,
    },
  },
};
