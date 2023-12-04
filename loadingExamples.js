// First three.js example – CG Lecture at Worms Univerity of Applied Sciences
// Developed by Alexander Wiebel, Hochschule Worms, 2023.
// Inspired by https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Licensed under CC-BY 4.0 https://creativecommons.org/licenses/by/4.0/

import * as THREE from 'three';
import { GLTFLoader } from 'gltf';
import { PLYLoader } from 'ply';

// Example 1: Load 3D model mesh from GLTF file
// The loading happens asynchronoulsy
//
// Model https://en.wikipedia.org/wiki/Utah_teapot
export function loadTeapot(parent) {
	const loaderGLTF = new GLTFLoader();
	loaderGLTF.load('models/teapot.gltf',
		function (gltf) {
			parent.add(gltf.scene);

			// Move the object away from the center
			parent.position.x -= 2.0;
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded of GLTF');
		},
		function (error) {
			console.error(error);
			console.log("ERROR LOADING GLTF");
		});
}

// Example 2: Load 3D model mesh from PLY file
// The loading happens asynchronoulsy
//
// Model: https://en.wikipedia.org/wiki/Suzanne_(3D_model)
export function loadMonkey(parent) {
	const loader = new PLYLoader();
	loader.load('models/monkey.ply',
		function (geometry) {
			let tmp = new THREE.Mesh(geometry);
			tmp.material = new THREE.MeshStandardMaterial({ color: '#0000ee' });
			parent.add(tmp);

			// Move the object away from the center
			parent.position.y -= 2;

			parent.scale.x *= .5;
			parent.scale.y *= .5;
			parent.scale.z *= .5;
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded of PLY');
		}, function (error) {
			console.error(error);
			console.log("ERROR LOADING PLY");
		});
}

// Example 3: Load 3D model mesh from GLB (binary GLTF) file
// The loading happens asynchronoulsy
//
// Model: Logo of Hochschule Worms extruded to 3D
export function loadHSWLogo(parent) {
	const loaderGLTF = new GLTFLoader();
	loaderGLTF.load('models/logo.glb',
		function (gltf) {
			parent.add(gltf.scene);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded of GLB');
		},
		function (error) {
			console.error(error);
			console.log("ERROR LOADING GLB");
		});
}

export function loadGLTFModel(path) {
	return new Promise((resolve, reject) => {
		const loaderGLTF = new GLTFLoader();
		loaderGLTF.load(path,
			function (gltf) {
				resolve(gltf.scene);
				// parent.add(gltf.scene);
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded of GLB');
			},
			function (error) {
				console.error(error);
				console.log("ERROR LOADING GLB");
				reject(error);
			});
	});
}