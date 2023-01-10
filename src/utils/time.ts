import SECONDS_IN_MINUTE from '../const/time.js';

const getCurrentSeconds = (): number => {
  const date = new Date();

  return date.getSeconds()
        + (date.getMinutes() * SECONDS_IN_MINUTE)
        + (SECONDS_IN_MINUTE * SECONDS_IN_MINUTE * date.getHours());
};

export default getCurrentSeconds;
