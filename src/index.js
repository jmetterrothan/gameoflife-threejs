import 'reset-css';
import './assets/sass/style.scss';

import SHAPES from './shapes';
import Scene from './Scene';

const scene = new Scene();

scene.init();
scene.start();


/**
* UI setup
*/

// pause / resume toggle buttons
const $uiToggleBtn = document.querySelector('#uiToggleBtn');

const resume = () => {
    scene.gameOfLife.resume();

        $uiToggleBtn.textContent = 'PAUSE';
        $uiToggleBtn.classList.add('btn_pause');
        $uiToggleBtn.classList.remove('btn_play');
};

const pause = () => {
    scene.gameOfLife.pause();

    $uiToggleBtn.textContent = 'PLAY';
    $uiToggleBtn.classList.add('btn_play');
    $uiToggleBtn.classList.remove('btn_pause');
};

if (scene.gameOfLife.running) {
    resume();
} else {
    pause();
}

$uiToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (scene.gameOfLife.running) {
        pause();
    } else {
        resume();
    }
});

// delay input
const $uiSpeedVal = document.querySelector('#uiSpeedVal');
$uiSpeedVal.addEventListener('input', () => {
    scene.gameOfLife.setSpeed($uiSpeedVal.value);
});


// camera lock checkbox
const $uiCamLock = document.querySelector('#uiCamLock');
$uiCamLock.addEventListener('input', () => {
    scene.controls.enabled = !$uiCamLock.checked;
});


// shapes selection
const $uiShape = document.querySelector('#uiShape');

SHAPES.forEach((shape, i) => {
    const $option = document.createElement('option');
    $option.value = i;
    $option.textContent = shape.name;

    $uiShape.appendChild($option);
});

$uiShape.addEventListener('input', () => {
    const index = parseInt($uiShape.value, 10);
    scene.gameOfLife.selectShape(index);
});


// reset button
const $uiReset = document.querySelector('#uiReset');
$uiReset.addEventListener('click', () => {
    scene.gameOfLife.reset();
});


// randomize button
const $uiRandomize = document.querySelector('#uiRandomize');
$uiRandomize.addEventListener('click', () => {
    scene.gameOfLife.randomize();
});