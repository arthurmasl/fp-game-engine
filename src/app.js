import { setDirection, pressKey } from './controls';
import {
  initialState, nextState,
} from './state';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let state = initialState();

const drawStage = () => {
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawObjects = (objects) =>
  objects.forEach(({ pos, size }) => {
    ctx.fillStyle = '#b40';
    ctx.fillRect(pos.x, pos.y, size, size);
  });

const drawPlayer = ({ pos, size, direction }) => {
  const cx = pos.x + size / 2;
  const cy = pos.y + size / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(direction);
  ctx.translate(-cx, -cy);


  ctx.fillStyle = '#333';
  ctx.fillRect(pos.x, pos.y, size, size);
  ctx.restore();
};

const draw = () => {
  drawStage();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.translate(-state.player.pos.x, -state.player.pos.y);

  drawPlayer(state.player);
  drawObjects(state.objects);
  ctx.restore();
};


const step = (t1) => (t2) => {
  if (t2 - t1 > 1000 / 60) {
    state = nextState(state);
    draw();
    window.requestAnimationFrame(step(t2));
  } else {
    window.requestAnimationFrame(step(t1));
  }
};

document.addEventListener('keydown', (e) => {
  state = pressKey(e, state);
});

document.addEventListener('keyup', (e) => {
  state = pressKey(e, state);
});

document.addEventListener('mousemove', ({ x, y }) => {
  state = setDirection(state, { x, y });
});

window.requestAnimationFrame(step(0));
