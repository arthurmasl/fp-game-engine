import { getVel, getPos } from '../common/common';

export const nextPlayer = (player) => ({
  ...player,
  vel: getVel(player),
  pos: getPos(player),
});
