import { collideGroup } from './collide';
import {
  nextObject,
  getDirection,
  getDirectionVector,
  getDistance,
} from './common';

export const createBullet = (state) => ({
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

const filterBullets = ({ objects, player }) => (bullet) =>
  getDistance(bullet.pos, player.pos) < 1000
  && !collideGroup(objects, bullet);

const nextBullets = (state) =>
  state.bullets
    .filter(filterBullets(state))
    .map(nextObject);

export const updateBullets = (state) =>
  state.mouse.pressed
    ? nextBullets(createBullet(state))
    : nextBullets(state);
