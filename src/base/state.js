import { collide } from '../common/collide';
import { nextPlayer } from '../player/player';
import { nextBullets, addBullet } from '../player/bullets';

const createObjects = () =>
  [...Array(20).keys()].map(() => ({
    size: 100,
    pos: {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
    },
  }));

const createPlayer = () => ({
  size: 50,
  speed: 1,
  pos: { x: 500, y: 500 },
  acc: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  direction: 0,
});

export const initialState = (canvas, ctx) => ({
  canvas,
  ctx,
  debug: false,
  camera: true,
  collide: true,
  mouse: { x: 0, y: 0, pressed: false },
  keys: [],
  objects: createObjects(),
  player: createPlayer(),
  bullets: [],
});

export const nextState = (state) => ({
  ...state,
  player: state.collide ? collide(state) : nextPlayer(state.player),
  bullets: state.mouse.pressed
    ? nextBullets(addBullet(state), state.player)
    : nextBullets(state.bullets, state.player),
});
