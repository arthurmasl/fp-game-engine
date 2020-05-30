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

export const setAcc = (state) => ({
  ...state,
  player: {
    ...state.player,
    acc: getAcc(state.keys),
  },
});

export const getVel = (player) => ({
  x: player.vel.x * 0.85 + player.acc.x * player.speed,
  y: player.vel.y * 0.85 + player.acc.y * player.speed,
});

export const getDirection = (direction) =>
  Math.atan2(window.innerHeight / 2 - direction.y, window.innerWidth / 2 - direction.x);

const nextPlayer = (player) => ({
  ...player,
  vel: getVel(player),
  pos: getPos(player),
});

export const isCollide = (obj1, obj2) =>
  obj1.pos.x < obj2.pos.x + obj2.size
  && obj1.pos.x + obj1.size > obj2.pos.x
  && obj1.pos.y < obj2.pos.y + obj2.size
  && obj1.pos.y + obj1.size > obj2.pos.y;

const getPosByDir = (player, dir) => ({
  ...player,
  pos: { ...player.pos, [dir]: player.pos[dir] + player.acc[dir] },
});

const collideGroup = (group, obj) => group.map((gi) => isCollide(obj, gi)).some((i) => i);

export const collide = ({ objects, player }) => {
  const isCollideX = collideGroup(objects, nextPlayer(getPosByDir(player, 'x')));
  const isCollideY = collideGroup(objects, nextPlayer(getPosByDir(player, 'y')));

  return nextPlayer({
    ...player,
    vel: {
      x: isCollideX ? 0 : player.vel.x,
      y: isCollideY ? 0 : player.vel.y,
    },
  });
};
