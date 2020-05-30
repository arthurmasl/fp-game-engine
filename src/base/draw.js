const drawDebug = (ctx, pos, size) => {
  ctx.strokeStyle = '#0f0';
  ctx.strokeRect(pos.x, pos.y, size, size);
};

const drawStage = ({ ctx, canvas }) => {
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawObjects = ({ ctx, objects, debug }) =>
  objects.forEach(({ pos, size }) => {
    ctx.fillStyle = '#b40';
    ctx.fillRect(pos.x, pos.y, size, size);

    if (debug) drawDebug(ctx, pos, size);
  });

const drawPlayer = ({ ctx, player, debug }) => {
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

  if (debug) drawDebug(ctx, pos, size);
};

const drawBullets = ({ ctx, bullets }) => {
  bullets.forEach(({ pos, size }) => {
    ctx.fillStyle = '#0f77aa';
    ctx.fillRect(pos.x, pos.y, size, size);
  });
};

export const draw = (state) => {
  state.ctx.save();
  drawStage(state);

  if (state.camera) {
    state.ctx.translate(state.canvas.width / 2, state.canvas.height / 2);
    state.ctx.translate(-state.player.pos.x, -state.player.pos.y);
  }

  drawBullets(state);
  drawPlayer(state);

  drawObjects(state);
  state.ctx.restore();
};
