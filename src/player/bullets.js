import { collideGroup } from '../common/collide';
import {
  getVel,
  getPos,
  getDirection,
  getDirectionVector,
  getDistance,
} from '../common/common';

export const addBullet = ({ bullets, player, mouse }) => [
  ...bullets,
  {
    speed: 2,
    size: 10,
    pos: { x: player.pos.x + player.size / 2, y: player.pos.y + player.size / 2 },
    acc: getDirectionVector(getDirection(mouse)),
    vel: { x: 0, y: 0 },
  },
];

export const nextBullets = (bullets, state) =>
  bullets
    .map((bullet) => ({
      ...bullet,
      pos: getPos(bullet),
      vel: getVel(bullet),
    }))
    .filter(
      (bullet) => (
        getDistance(bullet.pos, state.player.pos) < 1000
          && !collideGroup(state.objects, bullet)
      ),
    );

// && !collideGroup(state.objects, bullet),
