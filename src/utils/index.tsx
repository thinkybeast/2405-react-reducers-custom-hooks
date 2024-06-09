export const randomErrorString = (percentChance: number = 0.3) => {
  return Math.random() > percentChance ? "" : "asdf";
};
