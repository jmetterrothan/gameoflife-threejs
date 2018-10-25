import THREE from 'three';

import './OrbitControls';

import SHAPES from './shapes';
import GameOfLife from './GameOfLife';

class Scene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        // vars that detect if the mouse is dragged or not (means we move around the grid)
        this.moving = false;
        this.mousePos = { x: 0, y: 0 };

        // state of the animation (play/pause)
        this.running = false;

        this.raycaster = null;

        this.gameOfLife = null;
    }
    
    /**
     * Main initialization of the scene
     */
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.shadowMap.enabled = true;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);


        this.raycaster = new THREE.Raycaster(); 

        document.body.appendChild(this.renderer.domElement);


        // window resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        });

        // mouse handlers
        this.renderer.domElement.addEventListener('mousedown', (e) => {
            this.moving = false;
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        this.renderer.domElement.addEventListener('mousemove', (e) => {
            /*
            * if mouse position has changed since last time the button has been pressed, 
            * then we dragged the cursor around 
            */
            if (this.mousePos.x !== e.clientX || this.mousePos.y !== e.clientY) {
                this.moving = true;
            }
        });

        this.renderer.domElement.addEventListener('mouseup', (e) => {   
            // disable the listener if we moved
            if (this.moving) {
                return false;
            }

            // use ray tracing to detect clics on the grid in 3d space and change the target cell status
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * -2 + 1;

            const mouse = new THREE.Vector2(x, y);
            this.raycaster.setFromCamera(mouse, this.camera); 

            const intersects = this.raycaster.intersectObjects(this.scene.children[2].children);
            
            // loops through all the objects that intersect
            for(let temp of intersects) {
                const row = temp.object.coords.row;
                const col = temp.object.coords.col;
                const alive = !temp.object.alive;

                const shape = SHAPES[this.gameOfLife.selectedShape];
                // apply the current shape pattern with the coordinates of the click as the origin
                shape.points.forEach(point => {
                    this.gameOfLife.temp[row + point.y][col + point.x] = alive;
                    this.gameOfLife.setCellStatus(row + point.y, col + point.x, alive);
                });

                break; // break because we stop at the first element that intersects the ray
            }
        });

        // scene basic lights
        const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambLight);

        const light = new THREE.PointLight(0xffffff, 0.65);
        light.position.set(50, 50, 150);
        light.castShadow = true;
        this.scene.add(light);
 
        const rows = 64;
        const cols = 72;
        const size = 0.75;

        this.gameOfLife = new GameOfLife(size, rows, cols);
        this.gameOfLife.init(this.scene);
    
        // camera position
        this.camera.position.set(0, 0, Math.max(rows, cols) * size + 10);
        this.controls.center.set(0, 0, 0);

        this.controls.update();
    }

    update(delta) {
        this.controls.update();
        this.gameOfLife.update(delta);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    run(delta = 0) {
        requestAnimationFrame(this.run.bind(this));
        
        if (this.running) {
            this.update(delta);
        }
        this.render();
    }

    start() {
        this.running = true;
        this.run();
    }

    resume() {
        this.running = true;
    }

    pause() {
        this.running = false;
    }

    /**
     * Removes all elements from the scene
     */
    clean() {
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
    }
}

export default Scene;
