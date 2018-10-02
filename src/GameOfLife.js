import THREE from 'three';

class GameOfLife {
    constructor(size = 1, rows = 16, cols = 16) {
        this.size = size;
        this.cols = cols;
        this.rows = rows;

        this.cells = [];
    }

    init(scene) {
        const group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        const material = new THREE.MeshPhongMaterial({ color: 0xffff00 , shininess: 50 });
        const mesh = new THREE.Mesh(geometry, material);

        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.cols; col++) {
                if(col == 0) {
                    this.cells[row] = [];
                }

                this.cells[row][col] = mesh.clone();
                this.cells[row][col].position.set(col * this.size, row * this.size, 0);

                group.add(this.cells[row][col]);
            } 
        }
        group.position.set(-this.rows * this.size / 2, -this.cols * this.size / 2, 0);

        scene.add(group);
    }

    update() {
        
    }
}

export default GameOfLife;
