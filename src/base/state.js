import { updateBullets } from '../common/bullets';
import { createPlayer, updatePlayer } from '../common/player';
import { createObjects } from '../common/objects';

export const createState = (canvas, ctx) => ({
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

export const updateState = (state) => ({
  ...state,
  player: updatePlayer(state),
  bullets: updateBullets(state),
});
