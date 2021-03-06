export const getAcc = (keys) =>
  keys.reduce(
    (acc, key) => ({
      x: key === 'a' ? -1 : key === 'd' ? 1 : acc.x,
      y: key === 'w' ? -1 : key === 's' ? 1 : acc.y,
    }),
    { x: 0, y: 0 },
  );

export const setAcc = (state) => ({
  ...state,
  player: { ...state.player, acc: getAcc(state.keys) },
});

export const addKey = (state, key) => ({
  ...state,
  keys: !state.keys.includes(key) ? [...state.keys, key] : state.keys,
});

export const removeKey = (state, key) => ({
  ...state,
  keys: state.keys.filter((k) => k !== key),
});

export const getVel = (obj) => ({
  x: obj.vel.x * 0.85 + obj.acc.x * obj.speed,
  y: obj.vel.y * 0.85 + obj.acc.y * obj.speed,
});

export const getPos = (obj) => ({
  x: obj.pos.x + obj.vel.x,
  y: obj.pos.y + obj.vel.y,
});

export const nextObject = (object) => ({
  ...object,
  vel: getVel(object),
  pos: getPos(object),
});

export const getDirection = (direction) =>
  Math.atan2(
    -(window.innerHeight / 2 - direction.y),
    -(window.innerWidth / 2 - direction.x),
  );

export const getDirectionVector = (angle) => ({
  x: Math.cos(angle),
  y: Math.sin(angle),
});

export const getDistance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
