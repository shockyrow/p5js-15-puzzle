class Board {
    constructor(size) {
        this.size = size;
        this.solved = false;
    }

    resetTiles() {
        this.tiles = [];
        this.empty_index = this.size * this.size - 1;

        for (let i = 0; i < this.size * this.size - 1; i++) {
            this.tiles.push(new Tile(i + 1));
        }

        this.tiles.push(null);
        // this.shuffle();
    }

    shuffle() {
        for (let i = 0; i < 100; i++) {
            this.makeMove(random(['up', 'down', 'right', 'left']), false)
        }
    }

    canMove(move) {
        if (this.solved) {
            return false;
        }

        const empty_coordinates = this.#resolveCoordinates(this.empty_index);

        switch (move) {
            case 'up':
                return this.#isValidCoordinates({
                    x: empty_coordinates.x,
                    y: empty_coordinates.y + 1,
                });
            case 'right':
                return this.#isValidCoordinates({
                    x: empty_coordinates.x - 1,
                    y: empty_coordinates.y,
                });
            case 'down':
                return this.#isValidCoordinates({
                    x: empty_coordinates.x,
                    y: empty_coordinates.y - 1,
                });
            case 'left':
                return this.#isValidCoordinates({
                    x: empty_coordinates.x + 1,
                    y: empty_coordinates.y,
                });
            default:
                return false;
        }
    }

    makeMove(move, external = true) {
        if (this.canMove(move) === false) {
            return;
        }

        const coordinates = this.#resolveCoordinates(this.empty_index);

        switch (move) {
            case 'up':
                coordinates.y++;
                break;
            case 'right':
                coordinates.x--;
                break;
            case 'down':
                coordinates.y--;
                break;
            case 'left':
                coordinates.x++;
                break;
        }

        const index = this.#resolveIndex(coordinates);

        this.tiles[this.empty_index] = this.tiles[index];
        this.tiles[index] = null;
        this.empty_index = index;

        if (external) {
            let solved = true;

            this.tiles.forEach((tile, index) => {
                if (tile !== null && tile.title !== index + 1) {
                    solved = false;
                }
            });

            if (solved) {
                this.solved = true;
            }
        }
    }

    draw() {
        const min_size = min(width, height);
        const padding = min_size * .05;
        const gap = min_size * .05;
        const tile_size = (min_size - (this.size - 1) * gap - padding * 2) / this.size;

        this.tiles.forEach((tile, index) => {
            if (tile === null) return;
            const coordinates = this.#resolveCoordinates(index);

            tile.draw(
                coordinates.x * (tile_size + gap) + padding,
                coordinates.y * (tile_size + gap) + padding,
                tile_size
            );
        });
    }

    #resolveCoordinates(index) {
        return {
            x: index % this.size,
            y: Math.floor(index / this.size),
        };
    }

    #isValidCoordinates(coordinates) {
        return coordinates.x >= 0
            && coordinates.x < this.size
            && coordinates.y >= 0
            && coordinates.y < this.size
        ;
    }

    #resolveIndex(coordinates) {
        return coordinates.x + coordinates.y * this.size;
    }
}
