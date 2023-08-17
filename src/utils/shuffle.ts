// Source: https://stackoverflow.com/a/2450976/10514863
export const shuffle = <T>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};
