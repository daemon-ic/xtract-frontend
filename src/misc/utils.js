export const makeCopyOf = (state) => {
  return JSON.parse(JSON.stringify(state));
};

export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
