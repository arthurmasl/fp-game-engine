import { collideGroup } from './collide';
import {
  getVel,
  getPos,
  getDirection,
  getDirectionVector,
  getDistance,
} from './common';

export const addBullet = (state) => ({
  ...state,
  bullets:
  [
    ...state.bullets,
    {
      speed: 2,
      size: 10,
      pos: {
        x: state.player.pos.x + state.player.size / 2,
        y: state.player.pos.y + state.player.size / 2,
      },
      acc: getDirectionVector(getDirection(state.mouse)),
      vel: { x: 0, y: 0 },
    },
  ],
});

export const nextBullets = (state) =>
  state.bullets
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
