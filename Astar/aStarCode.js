class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Cell {
    constructor() {
        this.isWall = true; // с начала все ячейки стенами будут
    }

    make_wall() {
        this.isWall = true;
    }

    clear_cell() {
        this.isWall = false;
    }

    is_clear() {
        return !this.isWall;
    }

    is_wall() {
        return this.isWall;
    }
}

function printMaze(map) {
    let output = '';
    for (let y = 0; y < map[0].length; y++) {
        for (let x = 0; x < map.length; x++) {
            output += map[x][y].is_wall() ? '#' : ' ';
        }
        output += '\n';
    }
    console.log(output);
}

function generateMaze(width, height) {
    const map = new Array(width);
    for (let w = 0; w < width; w++) {
        map[w] = new Array(height);
        for (let h = 0; h < height; h++) {
            map[w][h] = new Cell();
            map[w][h].make_wall();
        }
    }

    let x = Math.floor(Math.random() * Math.floor(width / 2)) * 2 + 1;
    let y = Math.floor(Math.random() * Math.floor(height / 2)) * 2 + 1;
    map[x][y].clear_cell();

    let to_check = [];
    if (y - 2 >= 0) {
        to_check.push(new Point(x, y - 2));
    }
    if (y + 2 < height) {
        to_check.push(new Point(x, y + 2));
    }
    if (x - 2 >= 0) {
        to_check.push(new Point(x - 2, y));
    }
    if (x + 2 < width) {
        to_check.push(new Point(x + 2, y));
    }

    while (to_check.length > 0) { // основной цикл
        const index = Math.floor(Math.random() * to_check.length);
        const cell = to_check[index];
        x = cell.x;
        y = cell.y;

        map[x][y].clear_cell();
        to_check.splice(index, 1);

        let directions = ["NORTH", "SOUTH", "EAST", "WEST"];
        directions = directions.sort(() => Math.random() - 0.5);

        let connected = false;
        for (const dir of directions) {
            switch (dir) {
                case "NORTH":
                    if (y - 2 >= 0 && map[x][y - 2].is_clear()) {
                        map[x][y - 1].clear_cell();
                        connected = true;
                    }
                    break;
                case "SOUTH":
                    if (y + 2 < height && map[x][y + 2].is_clear()) {
                        map[x][y + 1].clear_cell();
                        connected = true;
                    }
                    break;
                case "EAST":
                    if (x + 2 < width && map[x + 2][y].is_clear()) {
                        map[x + 1][y].clear_cell();
                        connected = true;
                    }
                    break;
                case "WEST":
                    if (x - 2 >= 0 && map[x - 2][y].is_clear()) {
                        map[x - 1][y].clear_cell();
                        connected = true;
                    }
                    break;
            }
            if (connected) break;
        }

        if (y - 2 >= 0 && map[x][y - 2].is_wall()) {
            to_check.push(new Point(x, y - 2));
        }
        if (y + 2 < height && map[x][y + 2].is_wall()) {
            to_check.push(new Point(x, y + 2));
        }
        if (x - 2 >= 0 && map[x - 2][y].is_wall()) {
            to_check.push(new Point(x - 2, y));
        }
        if (x + 2 < width && map[x + 2][y].is_wall()) {
            to_check.push(new Point(x + 2, y));
        }
    }

    return map;
}

const mazeWidth = 27; // при четных ломается 
const mazeHeight = 27;
const maze = generateMaze(mazeWidth, mazeHeight);
printMaze(maze);