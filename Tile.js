class Tile {
  constructor(title) {
    this.title = title;
  }

  draw(x, y, size) {
    push();

    stroke(16);
    fill(64);
    rect(x, y, size, size, size / 8);
    fill(120);
    textAlign(CENTER, CENTER);
    textSize(size / 2);
    textStyle(BOLD);
    text(this.title, x + size / 2, y + size / 2);

    pop();
  }
}
