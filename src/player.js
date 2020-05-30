const getVel = (player) => ({
  x: player.vel.x * 0.85 + player.acc.x * player.speed,
  y: player.vel.y * 0.85 + player.acc.y * player.speed,
});

const getPos = (player) => ({
  x: player.pos.x + player.vel.x,
  y: player.pos.y + player.vel.y,
});

export const nextPlayer = (player) => ({
  ...player,
  vel: getVel(player),
  pos: getPos(player),
});
