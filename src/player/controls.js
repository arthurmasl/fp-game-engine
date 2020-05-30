import { getAcc, getDirection } from '../common/common';

const addKey = (state, key) => ({
  ...state,
  keys: !state.keys.includes(key) ? [...state.keys, key] : state.keys,
});

const removeKey = (state, key) => ({
  ...state,
  keys: state.keys.filter((k) => k !== key),
});

const setAcc = (state) => ({
  ...state,
  player: { ...state.player, acc: getAcc(state.keys) },
});

export const setDirection = (state, direction) => ({
  ...state,
  player: { ...state.player, direction: getDirection(direction) },
  mouse: {
    ...state.mouse,
    x: direction.x,
    y: direction.y,
  },
});

export const pressKey = ({ type, key }, state) =>
  setAcc(type === 'keydown' ? addKey(state, key) : removeKey(state, key));

export const pressMouse = ({ type }, state) => ({
  ...state,
  mouse: { ...state.mouse, pressed: type === 'mousedown' },
});
