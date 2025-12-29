import { useEffect, useRef } from "react";
import * as THREE from "three";

function Dice() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		const camera = new THREE.PerspectiveCamera();
		camera.position.z = 3;
		const scene = new THREE.Scene();
		scene.add(camera);
		const mesh = new THREE.MeshNormalMaterial();
		const geometry = new THREE.Mesh(new THREE.IcosahedronGeometry(), mesh);
		scene.add(geometry);
		geometry.scale.set(0.15, 0.15, 0.15);
		var geoSmall = new THREE.TorusGeometry(0.6, 0.03, 16, 100);
		var ringSmall = new THREE.Mesh(geoSmall, mesh);
		scene.add(ringSmall);
		ringSmall.scale.set(0.7, 0.7, 0.7);
		var geoMedium = new THREE.TorusGeometry(0.9, 0.2, 16, 400);
		var ringMedium = new THREE.Mesh(geoMedium, mesh);
		scene.add(ringMedium);
		var geoThin = new THREE.TorusGeometry(0.6, 0.004, 16, 100);
		var ringThin = new THREE.Mesh(geoThin, mesh);
		scene.add(ringThin);
		var geoLarge = new THREE.TorusGeometry(1.2, 0.007, 16, 100);
		var ringLarge = new THREE.Mesh(geoLarge, mesh);
		scene.add(ringLarge);
		renderer.setSize(700, 700);
		containerRef.current.append(renderer.domElement);

		function update() {
			geometry.rotation.x += 2 / 200;
			geometry.rotation.y += 2 / 200;
			ringSmall.rotation.x += 0.003;
			ringSmall.rotation.y += 0.003;
			ringThin.rotation.x += 0.002;
			ringThin.rotation.y += 0.002;
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
