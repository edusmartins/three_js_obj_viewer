import {
	Scene,
	Color,
	PerspectiveCamera,
	AmbientLight,
	DirectionalLight,
	PointLight,
	WebGLRenderer,
} from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'https://unpkg.com/three/examples/jsm/loaders/MTLLoader';

function init() {
	const renderer = new WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const scene = new Scene();
	scene.background = new Color(0xdddddd);

	const camera = new PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
	camera.rotation.y = (45 / 180) * Math.PI;
	camera.position.x = 800;
	camera.position.y = 100;
	camera.position.z = 1000;

	const controls = new OrbitControls(camera, renderer.domElement);

	// const hlight = new AmbientLight(0x404040, 10);
	// scene.add(hlight);

	// const directionalLight = new DirectionalLight(0xffffff, 1);
	// directionalLight.position.set(10, 1, 0);
	// directionalLight.castShadow = true;
	// scene.add(directionalLight);

	const light1 = new PointLight(0xc4c4c4, 1);
	light1.position.set(0, 300, 500);
	scene.add(light1);

	const light2 = new PointLight(0xc4c4c4, 1);
	light2.position.set(500, 100, 0);
	scene.add(light2);

	const light3 = new PointLight(0xc4c4c4, 1);
	light3.position.set(0, 100, -500);
	scene.add(light3);

	const light4 = new PointLight(0xc4c4c4, 1);
	light4.position.set(-500, 300, 500);
	scene.add(light4);

	const mltLoader = new MTLLoader();
	mltLoader.load(
		'../img/3d/xbox-controller/Controller.mtl',
		(materials) => {
			materials.preload();

			const objLoader = new OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load(
				'../img/3d/xbox-controller/Controller.obj',
				(object) => {
					object.scale.set(50, 50, 50);
					scene.add(object);
				},
				(xhr) => {
					console.log(
						'Carregando objeto: ' + (xhr.loaded / xhr.total) * 100 + '% loaded'
					);
				},
				(err) => {
					console.log('An error happened');
				}
			);
		},
		(xhr) => {
			console.log(
				'Carregando material: ' + (xhr.loaded / xhr.total) * 100 + '% loaded'
			);
		},
		(err) => {
			console.log('An error happened');
		}
	);

	const animate = function animate() {
		requestAnimationFrame(animate);

		// required if controls.enableDamping or controls.autoRotate are set to true
		controls.update();

		renderer.render(scene, camera);
	};

	animate();
}

init();
