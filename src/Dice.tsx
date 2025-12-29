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
		geometry.scale.set(0.5, 0.5, 0.5);
		// var geo = new THREE.RingGeometry(0.5, 1, 32, 2, 32);
		var geo = new THREE.TorusGeometry(0.6, 0.03, 16, 42);
		var ring = new THREE.Mesh(geo, mesh);
		scene.add(ring);
		renderer.setSize(600, 600);
		containerRef.current.append(renderer.domElement);

		function update() {
			geometry.rotation.x += 2 / 100;
			geometry.rotation.y += 2 / 100;
			ring.rotation.x += 0.009;
			ring.rotation.y += 0.009;
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
