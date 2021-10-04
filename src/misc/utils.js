export const makeCopyOf = (state) => {
  return JSON.parse(JSON.stringify(state));
};

export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
