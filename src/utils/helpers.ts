export const randomNumber = (start = 100000, end = 999999) => {
  return Math.floor(Math.random() * end) + start;
};
