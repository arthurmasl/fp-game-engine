import { createObjects, createPlayer } from './create';
import { collide } from './collide';

export const initialState = () => ({
  keys: [],
  objects: createObjects(),
  player: createPlayer(),
});

export const nextState = (state) => ({
  ...state,
  player: collide(state),
});
