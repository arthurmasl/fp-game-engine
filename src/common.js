export const getPos = (player) => ({
  x: player.pos.x + player.vel.x,
  y: player.pos.y + player.vel.y,
});

export const getAcc = (keys) =>
  keys.reduce(
    (acc, key) => ({
      x: key === 'a' ? -1 : key === 'd' ? 1 : acc.x,
      y: key === 'w' ? -1 : key === 's' ? 1 : acc.y,
    }),
    { x: 0, y: 0 },
  );

export const getVel = (player) => ({
  x: player.vel.x * 0.85 + player.acc.x * player.speed,
  y: player.vel.y * 0.85 + player.acc.y * player.speed,
});

export const getDirection = (obj, direction) =>
  Math.atan2(window.innerHeight / 2 - direction.y, window.innerWidth / 2 - direction.x);

export const isCollide = (obj1, obj2) =>
  obj1.pos.x < obj2.pos.x + obj2.size
  && obj1.pos.x + obj1.size > obj2.pos.x
  && obj1.pos.y < obj2.pos.y + obj2.size
  && obj1.pos.y + obj1.size > obj2.pos.y;

export const collide = (state, player) =>
  state.objects
    .map((object) => isCollide(player, object))
    .some((i) => i)
    ? {
      ...state.player,
      vel: {
        x: 0,
        y: 0,
      },
    }
    : { ...player };
