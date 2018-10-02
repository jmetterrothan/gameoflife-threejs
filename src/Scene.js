import THREE from 'three';

import './OrbitControls';

import GameOfLife from './GameOfLife';

class Scene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        // state of the animation (play/pause)
        this.running = false;

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

        document.body.appendChild(this.renderer.domElement);


        // window resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        });


        // scene basic lights
        const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambLight);

        const light = new THREE.PointLight(0xffffff, 0.6);
        light.position.set(50, 50, 150);
        light.castShadow = true;
        this.scene.add(light);
 
        const rows = 10;
        const cols = 10;
        const size = 1;

        this.gameOfLife = new GameOfLife(size, rows, cols);
        this.gameOfLife.init(this.scene);
    
        // camera position
        this.camera.position.set(0, 0, 30);
        this.controls.center.set(0, 0, 0);

        this.controls.update();
    }

    update(delta) {
        this.controls.update();
        this.gameOfLife.update();
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
        this.controls.enabled = true;
    }

    pause() {
        this.running = false;
        this.controls.enabled = false;
    }

    clean() {
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
    } 
}

export default Scene;
