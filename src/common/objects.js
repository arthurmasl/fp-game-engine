export const createObjects = () =>
  [...Array(30).keys()].map(() => ({
    size: 100,
    pos: {
      x: Math.floor(Math.random() * window.innerWidth * 3),
      y: Math.floor(Math.random() * window.innerHeight * 3),
    },
  }));
