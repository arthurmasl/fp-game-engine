export const createObjects = () =>
  [...Array(10).keys()].map(() => ({
    size: 100,
    pos: {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
    },
  }));

export const createPlayer = () => ({
  size: 50,
  speed: 1,
  pos: { x: 500, y: 500 },
  acc: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  direction: 0,
});
