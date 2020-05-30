import { createObjects, createPlayer } from './create';
import {
  getDirection, collide,
} from './common';

export const initialState = () => ({
  keys: [],
  objects: createObjects(),
  player: createPlayer(),
});

export const nextState = (state) => ({
  ...state,
  player: collide(state),
});

export const addKey = (state, key) => ({
  ...state,
  keys: !state.keys.includes(key) ? [...state.keys, key] : state.keys,
});

export const removeKey = (state, key) => ({
  ...state,
  keys: state.keys.filter((k) => k !== key),
});

export const setDirection = (state, direction) => ({
  ...state,
  player: { ...state.player, direction: getDirection(direction) },
});
