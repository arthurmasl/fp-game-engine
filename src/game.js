import { createObjects, createPlayer } from './create';
import {
  getAcc, getDirection, getVel, collide, getPos,
} from './common';

export const initialState = () => ({
  keys: [],
  objects: createObjects(),
  player: createPlayer(),
});

const nextPlayer = ({ player, keys }) => ({
  ...player,
  vel: getVel(player),
  acc: getAcc(keys),
  pos: getPos(player),
});

export const nextState = (state) => ({
  ...state,
  player: collide(state, nextPlayer(state)),
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
  player: { ...state.player, direction: getDirection(state.player, direction) },
});
