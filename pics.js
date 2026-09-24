const pics = Array.from(
  { length: 120 },
  (_, index) => `https://picsum.photos/id/${index + 1}/800/500`
);

module.exports = pics;
