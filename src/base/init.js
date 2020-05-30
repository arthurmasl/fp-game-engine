import { draw } from './draw';
import {
  moveMouse, pressKey, pressMouse,
} from '../common/events';
import { initialState, nextState } from './state';

export const init = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const dev = document.querySelector('#dev');
  let state = initialState(canvas, ctx);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  dev.addEventListener('change', (e) => {
    state[e.target.id] = !state[e.target.id];
  });

  document.addEventListener('keydown', (e) => {
    state = pressKey(e, state);
  });

  document.addEventListener('keyup', (e) => {
    state = pressKey(e, state);
  });

  document.addEventListener('mousemove', ({ x, y }) => {
    state = moveMouse(state, { x, y });
  });

  document.addEventListener('mousedown', (e) => {
    state = pressMouse(e, state);
  });

  document.addEventListener('mouseup', (e) => {
    state = pressMouse(e, state);
  });

  const step = (t1) => (t2) => {
    if (t2 - t1 > 1000 / 60) {
      state = nextState(state);
      draw(state);

      window.requestAnimationFrame(step(t2));
    } else {
      window.requestAnimationFrame(step(t1));
    }
  };

  window.requestAnimationFrame(step(0));
};
