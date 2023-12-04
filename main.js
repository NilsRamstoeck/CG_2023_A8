// First three.js example – CG Lecture at Worms Univerity of Applied Sciences
// Developed by Alexander Wiebel, Hochschule Worms, 2023.
// Inspired by https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Licensed under CC-BY 4.0 https://creativecommons.org/licenses/by/4.0/

import * as THREE from 'three';
import { loadGLTFModel, loadHSWLogo } from './loadingExamples.js';
import { loadTeapot } from './loadingExamples.js';
import { loadMonkey } from './loadingExamples.js';
import * as uxvis from './uxvislib.js';

// Global constants to configure this example
const sceneRadius = 5; // Approximate size of the scene

// Global flags
let geometryHasBeenDescribed = false;

// Debugging function
function describeGeometryOnConsoleOnce() {
	// Look into loaded geometry
	console.log("monkey");
	console.log(monkeyParent);
	console.log("logo");
	console.log(logoParent);
	console.log("teapot");
	console.log(teapotParent);
	geometryHasBeenDescribed = true;
}

// A function that allows the scene to be rendered repeatedly
function animate() {
	requestAnimationFrame(animate);

	// Debug output
	//  if (!geomteryHasBeenDescribed)
	//   	describeGeometryOnConsoleOnce()

	uxvis.presentationRotation(cube);
	uxvis.presentationRotation(monkeyParent);
	uxvis.presentationRotation(logoParent);
	uxvis.presentationRotation(teapotParent);
	customModels.forEach(m => uxvis.presentationRotation(m));

	renderer.render(scene, camera);
}

//////////////////////////////////////////////
// START
//////////////////////////////////////////////

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = sceneRadius; // Move camera backwrds, away from scene origin

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 150);
document.body.appendChild(renderer.domElement);

uxvis.setupThreePointLighting(scene, sceneRadius);

// Exmample 1: Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const exampleMaterial = new THREE.MeshStandardMaterial({ color: '#00ee00' });
const cube = new THREE.Mesh(geometry, exampleMaterial);
scene.add(cube);
cube.position.y += 2; // move cube upwards a bit

const monkeyParent = new THREE.Object3D();
scene.add(monkeyParent);
loadMonkey(monkeyParent);

const logoParent = new THREE.Object3D();
scene.add(logoParent);
loadHSWLogo(logoParent);

const teapotParent = new THREE.Object3D();
scene.add(teapotParent);
loadTeapot(teapotParent);


const radios = [...document.querySelectorAll('input[type=radio]')];
const customModels = [];
for (const radio of radios) {

	const model = await loadGLTFModel(radio.value);
	model.scale.x /= 2;
	model.scale.y /= 2;
	model.scale.z /= 2;
	model.position.x += 2;
	customModels.push(model);

	radio.addEventListener('change', () => {
		if (!radio.checked) return;
		else radios.filter(r => r != radio).forEach(r => r.dispatchEvent(new Event('hide-model')));
		scene.add(model);
	});

	radio.addEventListener('hide-model', _ => scene.remove(model));

}

radios[0].checked = true;
radios[0].dispatchEvent(new Event('change'));

// Start repeated rendering (animation)
console.log("Start animation");
animate();
