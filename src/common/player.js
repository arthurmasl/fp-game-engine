import { nextObject } from './common';
import { collide } from './collide';

export const createPlayer = () => ({
  size: 50,
  speed: 1,
  pos: { x: 500, y: 500 },
  acc: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  direction: 0,
});

export const updatePlayer = (state) =>
  state.collide ? collide(state) : nextObject(state.player);
