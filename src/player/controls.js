const addKey = (state, key) => ({
  ...state,
  keys: !state.keys.includes(key) ? [...state.keys, key] : state.keys,
});

const removeKey = (state, key) => ({
  ...state,
  keys: state.keys.filter((k) => k !== key),
});

const getDirection = (direction) =>
  Math.atan2(
    window.innerHeight / 2 - direction.y,
    window.innerWidth / 2 - direction.x,
  );

const getAcc = (keys) =>
  keys.reduce(
    (acc, key) => ({
      x: key === 'a' ? -1 : key === 'd' ? 1 : acc.x,
      y: key === 'w' ? -1 : key === 's' ? 1 : acc.y,
    }),
    { x: 0, y: 0 },
  );

const setAcc = (state) => ({
  ...state,
  player: { ...state.player, acc: getAcc(state.keys) },
});

export const setDirection = (state, direction) => ({
  ...state,
  player: { ...state.player, direction: getDirection(direction) },
});

export const pressKey = ({ type, key }, state) =>
  setAcc(type === 'keydown' ? addKey(state, key) : removeKey(state, key));
