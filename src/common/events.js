import {
  setAcc, getDirection, removeKey, addKey,
} from './common';

export const moveMouse = (state, direction) => ({
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
