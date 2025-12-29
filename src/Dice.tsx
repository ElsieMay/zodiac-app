import { useEffect, useRef } from "react";
import * as THREE from "three";

function Dice() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		const camera = new THREE.PerspectiveCamera();
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.position.z = 3;
		const scene = new THREE.Scene();
		scene.add(camera);
		const mesh = new THREE.MeshStandardMaterial({
			metalness: 1.0,
			roughness: 0.5,
			color: 0xe9d491,
		});
		const meshDark = new THREE.MeshStandardMaterial({
			metalness: 0.6,
			roughness: 1.0,
			color: 0x213547,
		});
		const meshMid = new THREE.MeshPhongMaterial({ color: 0x7b393b, shininess: 100, specular: 0xaaaaaa });
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);
		const geometry = new THREE.Mesh(new THREE.IcosahedronGeometry(), meshMid);
		scene.add(geometry);
		geometry.scale.set(0.15, 0.15, 0.15);
		var geoSmall = new THREE.TorusGeometry(0.4, 0.04, 16, 100);
		var ringSmall = new THREE.Mesh(geoSmall, mesh);
		scene.add(ringSmall);
		ringSmall.scale.set(0.7, 0.7, 0.7);
		var geoFlat = new THREE.TorusGeometry(0.9, 0.2, 16, 400);
		var ringFlat = new THREE.Mesh(geoFlat, meshDark);
		scene.add(ringFlat);
		var geoMedium = new THREE.TorusGeometry(1.06, 0.1, 16, 100);
		var ringMedium = new THREE.Mesh(geoMedium, mesh);
		scene.add(ringMedium);
		var geoThin = new THREE.TorusGeometry(0.5, 0.004, 16, 100);
		var ringThin = new THREE.Mesh(geoThin, mesh);
		scene.add(ringThin);
		var geoLarge = new THREE.TorusGeometry(1.24, 0.007, 16, 100);
		var ringLarge = new THREE.Mesh(geoLarge, mesh);
		scene.add(ringLarge);

		renderer.setSize(700, 700);
		containerRef.current.append(renderer.domElement);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		const textureLoader = new THREE.TextureLoader();
		const zodiacSigns = ["aries.png", "taurus.png", "gemini.png", "leo.png", "sagittarius.png", "libra.png", "pisces.png"];
		const radius = 0.9;
		const planes = [];

		zodiacSigns.forEach((sign, index) => {
			const angle = (index / 7) * Math.PI * 2;

			const texture = textureLoader.load(`../public/${sign}`);
			const planeGeometry = new THREE.PlaneGeometry(0.1, 0.1);
			const planeMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
			});
			const plane = new THREE.Mesh(planeGeometry, planeMaterial);

			plane.position.x = Math.cos(angle) * radius;
			plane.position.y = Math.sin(angle) * radius;
			plane.position.z = 0.2;

			scene.add(plane);
			planes.push(plane);
		});

		function update() {
			geometry.rotation.x += 2 / 200;
			geometry.rotation.y += 2 / 200;
			ringSmall.rotation.x += 0.03;
			ringSmall.rotation.y += 0.03;
			ringThin.rotation.x += 0.02;
			ringThin.rotation.y += 0.02;
			ringLarge.rotation.x += 0.004;
			ringLarge.rotation.y += 0.004;
		}

		function render() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
			update();
		}

		render();

		return () => {
			containerRef.current?.removeChild(renderer.domElement);
			renderer.dispose();
		};
	}, []);

	return <div ref={containerRef}></div>;
}

export default Dice;
