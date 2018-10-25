import THREE from 'three';

import utility from './utility';

/*
* Algorithm based on the following wikibooks resource :
* https://en.wikibooks.org/wiki/Algorithm_Implementation/Simulation/Conway%27s_Game_of_Life
*/

class GameOfLife {
    constructor(size, rows, cols) {
        this.size = size;
        this.cols = cols;
        this.rows = rows;

        this.cells = [];
        this.temp = [];

        this.running = false;

        this.selectedShape = 0;
        this.speed = 250;

        this.tick = 0;
        this.timer = null;
    }

    init(scene) {
        // build the grid
        const grid = new THREE.Group();

        // shared geometry
        const geometry = new THREE.PlaneBufferGeometry(this.size, this.size, this.size);

        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                if(col == 0) {
                    this.cells[row] = [];
                    this.temp[row] = [];
                }

                const cell = new THREE.Mesh(geometry, GameOfLife.CELL_MATERIAL_DEAD);
     
                // init cell
                cell.position.set(col * this.size, row * this.size, 0);
                cell.coords = { row: row, col: col };
                cell.alive = false;
                cell.material = GameOfLife.CELL_MATERIAL_DEAD;

                grid.add(cell);

                this.cells[row][col] = cell;
                this.temp[row][col] = false;
            } 
        }

        // centers the grid in (0, 0, 0)
        grid.position.set(-this.cols * this.size / 2, -this.rows * this.size / 2, 0);

        scene.add(grid);
    }

    update(delta) {
        // simulate the game of life
        if (this.running) {
            if (this.timer === null || delta >= this.timer) {
                // simulate a step
                this.step();
                this.timer = delta + this.speed;
            }
        }
    }

    step() {
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                this.setCellStatus(row, col, this.getCellStatus(row, col));
            }
        }
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                this.temp[row][col] = this.cells[row][col].alive;
            }
        }
    }

    /**
     * Count the number of neighbours of a cell
     * @param {number} row 
     * @param {number} col 
     */
    getNeighbourCount(row, col) {
        let n = 0;

        if (this.temp[utility.mod(row + 1, this.rows)][col]) n++;
        if (this.temp[utility.mod(row - 1, this.rows)][col]) n++;

        if (this.temp[utility.mod(row - 1, this.rows)][utility.mod(col - 1, this.cols)]) n++;
        if (this.temp[utility.mod(row - 1, this.rows)][utility.mod(col + 1, this.cols)]) n++;

        if (this.temp[utility.mod(row + 1, this.rows)][utility.mod(col + 1, this.cols)]) n++;
        if (this.temp[utility.mod(row + 1, this.rows)][utility.mod(col - 1, this.cols)]) n++;

        if (this.temp[row][utility.mod(col + 1, this.cols)]) n++;
        if (this.temp[row][utility.mod(col - 1, this.cols)]) n++;
        
        return n;
    }

    /**
     * Return the current state of a cell (alive or not)
     * based on the rules of Conway's game of life
     * @param {number} row 
     * @param {number} col 
     * @return boolean
     */
    getCellStatus(row, col) {
        const n = this.getNeighbourCount(row, col);

        return n === 3 || (this.temp[row][col] && n === 2);
    }

    resume() {
        this.running = true;
    }

    pause() {
        this.running = false;
    }

    /**
     * Change a cell status (dead or alive)
     * @param {number} row 
     * @param {number} col 
     * @param {bool} status 
     */
    setCellStatus(row, col, status) {
        const cell = this.cells[row][col];

        if (!status) {
            cell.material = GameOfLife.CELL_MATERIAL_DEAD;
        } else {
            cell.material = GameOfLife.CELL_MATERIAL_ALIVE;
        }

        cell.alive = status;
    }

    /**
     * Change the speed of the simulation
     * @param {number} speed 
     */
    setSpeed(speed) {
        this.speed = parseInt(speed, 10);
        if (this.speed < 25) {
            this.speed = 25;
        }
        this.timer = null;
    }

    selectShape(index) {
        this.selectedShape = index;
    }

    /**
     * Change the status of all cells randomly
     */
    randomize() {
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                const alive = Math.random() > 0.5;
                this.setCellStatus(row, col, alive);
                this.temp[row][col] = alive;
            }
        }
    }

    /**
     * Set all cells dead
     */
    reset() {
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                this.setCellStatus(row, col, false);
                this.temp[row][col] = false;
            }
        }
    }
}

GameOfLife.CELL_MATERIAL_ALIVE = new THREE.MeshPhongMaterial({ color: 0xffc300 , shininess: 35 });
GameOfLife.CELL_MATERIAL_ALIVE.side = THREE.DoubleSide;

GameOfLife.CELL_MATERIAL_DEAD = new THREE.MeshPhongMaterial({ color: 0x581845 , shininess: 0 });
GameOfLife.CELL_MATERIAL_DEAD.side = THREE.DoubleSide;

export default GameOfLife;
