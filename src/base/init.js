import { draw } from './draw';
import { setDirection, pressKey } from '../player/controls';
import { initialState, nextState } from './state';

export const init = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let state = initialState(canvas, ctx);

  document.addEventListener('keydown', (e) => {
    state = pressKey(e, state);
  });

  document.addEventListener('keyup', (e) => {
    state = pressKey(e, state);
  });

  document.addEventListener('mousemove', ({ x, y }) => {
    state = setDirection(state, { x, y });
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
