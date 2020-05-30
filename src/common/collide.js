import { nextPlayer } from '../player/player';

const isCollide = (obj1, obj2) =>
  obj1.pos.x < obj2.pos.x + obj2.size
  && obj1.pos.x + obj1.size > obj2.pos.x
  && obj1.pos.y < obj2.pos.y + obj2.size
  && obj1.pos.y + obj1.size > obj2.pos.y;

const moveByDir = (player, dir) => ({
  ...player,
  pos: { ...player.pos, [dir]: player.pos[dir] + player.acc[dir] },
});

const collideGroup = (group, obj) =>
  group.map((gi) => isCollide(obj, gi)).some((i) => i);

export const collide = ({ objects, player }) => {
  const isCollideX = collideGroup(objects, nextPlayer(moveByDir(player, 'x')));
  const isCollideY = collideGroup(objects, nextPlayer(moveByDir(player, 'y')));

  return nextPlayer({
    ...player,
    vel: {
      x: isCollideX ? 0 : player.vel.x,
      y: isCollideY ? 0 : player.vel.y,
    },
  });
};
