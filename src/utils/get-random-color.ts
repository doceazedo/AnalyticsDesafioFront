// Source: https://css-tricks.com/snippets/javascript/random-hex-color/#comment-83815
export const getRandomColor = () => {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = 6 - x.length;
  const z = "000000";
  const z1 = z.substring(0, y);
  return "#" + z1 + x;
};
