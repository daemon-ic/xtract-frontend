export const makeCopyOf = (state) => {
  return JSON.parse(JSON.stringify(state));
};

export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const sleepInterval = (
  timeout = 5000,
  increment = 100,
  callback = () => {}
) => {
  return new Promise((resolve) => {
    let interval;
    let total = 0;
    interval = setInterval(() => {
      if (total >= timeout) {
        if (interval) {
          clearInterval(interval);
          interval = false;
        }

        resolve();
      }
      total += increment;
      const progress = (timeout - total) / timeout;
      callback(progress);
    }, increment);
  });
};
