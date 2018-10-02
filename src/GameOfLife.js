import THREE from 'three';

class GameOfLife {
    constructor(size, rows, cols) {
        this.size = size;
        this.cols = cols;
        this.rows = rows;

        this.cells = [];
    }

    init(scene) {
        const group = new THREE.Group();

        const geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
        const material = new THREE.MeshPhongMaterial({ color: 0xffff00 , shininess: 50 });
        const mesh = new THREE.Mesh(geometry, material);

        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                if(col == 0) {
                    this.cells[row] = [];
                }

                const cell = mesh.clone();

                cell.position.set(col * this.size, row * this.size, 0);
                //cell.visible = false;

                group.add(cell);
                this.cells[row][col] = cell;
            } 
        }
        group.position.set(-this.cols * this.size / 2, -this.rows * this.size / 2, 0);

        scene.add(group);
    }

    update() {
        
    }
}

export default GameOfLife;
