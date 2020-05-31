import { nextObject } from './common';
import { isTrue } from './helpers';

const isCollide = (obj1, obj2) =>
  obj1.pos.x < obj2.pos.x + obj2.size
  && obj1.pos.x + obj1.size > obj2.pos.x
  && obj1.pos.y < obj2.pos.y + obj2.size
  && obj1.pos.y + obj1.size > obj2.pos.y;

const moveByDir = (player, dir) => ({
  ...player,
  pos: { ...player.pos, [dir]: player.pos[dir] + player.acc[dir] },
});

export const collideGroup = (group, obj) =>
  group
    .map((gi) => isCollide(obj, gi))
    .some(isTrue);

const isCollideX = (objects, player) => collideGroup(objects, nextObject(moveByDir(player, 'x')));
const isCollideY = (objects, player) => collideGroup(objects, nextObject(moveByDir(player, 'y')));

export const collide = ({ objects, player }) => nextObject({
  ...player,
  vel: {
    x: isCollideX(objects, player) ? 0 : player.vel.x,
    y: isCollideY(objects, player) ? 0 : player.vel.y,
  },
});
