import 'reset-css';
import './assets/sass/style.scss';

import Scene from './Scene';

const scene = new Scene();

scene.init();
scene.start();

// ui

const $uiToggleBtn = document.querySelector('#uiToggleBtn');

$uiToggleBtn.addEventListener('click', (e) => {
    if (scene.running) {
        scene.pause();

        $uiToggleBtn.textContent = 'Run';
        $uiToggleBtn.classList.add('btn_stop');
        $uiToggleBtn.classList.remove('btn_run');
    } else {
        scene.resume();

        $uiToggleBtn.textContent = 'Stop';
        $uiToggleBtn.classList.add('btn_stop');
        $uiToggleBtn.classList.remove('btn_run');
    }
});