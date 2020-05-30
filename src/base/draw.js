const drawStage = ({ ctx, canvas }) => {
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawObjects = ({ ctx, objects }) =>
  objects.forEach(({ pos, size }) => {
    ctx.fillStyle = '#b40';
    ctx.fillRect(pos.x, pos.y, size, size);
  });

const drawPlayer = ({ ctx, player }) => {
  const { pos, size, direction } = player;
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

export const draw = (state) => {
  drawStage(state);

  state.ctx.save();
  state.ctx.translate(state.canvas.width / 2, state.canvas.height / 2);
  state.ctx.translate(-state.player.pos.x, -state.player.pos.y);

  drawPlayer(state);
  drawObjects(state);
  state.ctx.restore();
};
