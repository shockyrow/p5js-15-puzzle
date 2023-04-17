const SKETCH_MARGIN = 32;

let ui = document.querySelector('.ui');
let canvas = null;
const board = new Board(4);

function getCanvasWidth() {
  return windowWidth - SKETCH_MARGIN * 2;
}

function getCanvasHeight() {
  return windowHeight - SKETCH_MARGIN * 2;
}

function getMinSize() {
  return Math.min(getCanvasWidth(), getCanvasHeight(), 360);
}

function setup() {
  restart();
  noLoop();
  createCanvas(getMinSize(), getMinSize());
  canvas = document.querySelector('canvas');

  var hammer = new Hammer(document.body, {
    preventDefault: true,
  });

  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
  });

  hammer.on('swipe', swiped);
}

function draw() {
  background(24);
  board.draw();

  if (board.solved) {
    ui.classList.remove('hidden');
    canvas.classList.add('hidden');
  }
}

function windowResized() {
  resizeCanvas(getMinSize(), getMinSize());
}

function keyPressed() {
  const KEY_CODE_MOVE_MAP = {
    [UP_ARROW]: 'up',
    [RIGHT_ARROW]: 'right',
    [DOWN_ARROW]: 'down',
    [LEFT_ARROW]: 'left',
  };
  const move = KEY_CODE_MOVE_MAP[keyCode] ?? '';

  if (move !== '') {
    board.makeMove(move);
    redraw();
  }
}

function swiped(event) {
  move = '';

  if (event.direction == 2) {
    move = 'left';
  } else if (event.direction == 4) {
    move = 'right';
  } else if (event.direction == 8) {
    move = 'up';
  } else if (event.direction == 16) {
    move = 'down';
  }

  if (move !== '') {
    board.makeMove(move);
    redraw();
  }
}

function restart() {
  ui.classList.add('hidden');

  if (canvas) {
    canvas.classList.remove('hidden');
  }

  board.resetTiles();
  redraw();
}
