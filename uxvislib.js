// First three.js example – CG Lecture at Worms Univerity of Applied Sciences
// Developed by Alexander Wiebel, Hochschule Worms, 2023.
// Inspired by https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Licensed under CC-BY 4.0 https://creativecommons.org/licenses/by/4.0/

import * as THREE from 'three';

// Helper function for some simple rotation
export function presentationRotation(group) {
	group.rotation.x += 0.01;
	group.rotation.y += 0.01;
}

// Setup light (https://en.wikipedia.org/wiki/Three-point_lighting)
export function setupThreePointLighting(scene, sceneRadius)
{
    const color = 0xFFFFFF;

    const keyIntensity = 1;
    const keyLight = new THREE.DirectionalLight(color, keyIntensity);
    keyLight.position.set(-sceneRadius, sceneRadius, sceneRadius);
    keyLight.target.position.set(0, 0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);

    const fillIntensity =.5;
    const fillLight = new THREE.DirectionalLight(color, fillIntensity);
    fillLight.position.set(sceneRadius, 0, sceneRadius);
    fillLight.target.position.set(0, 0, 0);
    scene.add(fillLight);
    scene.add(fillLight.target);

    const backIntensity = 3;
    const backLight = new THREE.DirectionalLight(color, backIntensity);
    backLight.position.set(-sceneRadius, 0, -sceneRadius);
    backLight.target.position.set(0, 0, 0);
    scene.add(backLight);
    scene.add(backLight.target);
}