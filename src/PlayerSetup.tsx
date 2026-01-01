import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createBackgroundSpheres, updateBackgroundSpheres } from "./BackgroundSpheres";

function PlayerSetup() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.position.z = 3;
		const scene = new THREE.Scene();
		scene.add(camera);

		// Background spheres
		const { spheres, geometry: sphereGeometry } = createBackgroundSpheres(scene, 340);

		containerRef.current.append(renderer.domElement);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		const clock = new THREE.Clock();

		function update() {
			const t = clock.getElapsedTime();

			updateBackgroundSpheres(spheres, t);
		}

		function render() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
			update();
		}

		render();

		return () => {
			if (containerRef.current && renderer.domElement.parentNode) {
				containerRef.current.removeChild(renderer.domElement);
			}
			renderer.dispose();
			sphereGeometry.dispose();
		};
	}, []);

	return <div ref={containerRef} className="player-container"></div>;
}

export default PlayerSetup;
