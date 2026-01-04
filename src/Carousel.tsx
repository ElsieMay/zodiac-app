import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function Carousel() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(0x000000, 0);
		let camera = new THREE.PerspectiveCamera(16, innerWidth / innerHeight, 1, 100);
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.position.z = 1;
		const scene = new THREE.Scene();
		scene.add(camera);
		camera.position.set(0, 0.125, 1).setLength(16);
		containerRef.current.append(renderer.domElement);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		let controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		let hoveredSegment: THREE.Mesh | null = null;

		let totalAmount = 12; // Total segments
		let len = totalAmount * 1.1; // Add 10% spacing between segments
		let r = len / (Math.PI * 2); //  radius from circumference
		let segAngle = (Math.PI * 2) / len / 1.1; // ~0.228 radians per segment

		const segments: THREE.Mesh[] = [];
		for (let i = 0; i < totalAmount; i++) {
			let segGeom = new THREE.CylinderGeometry(r, r, 0.7, 10, 1, true, 0, segAngle);
			segGeom.rotateY(((Math.PI * 2) / totalAmount) * i);

			let material = new THREE.MeshBasicMaterial({
				side: THREE.DoubleSide,
				color: 0x69f0ae,
			});

			let segment = new THREE.Mesh(segGeom, material);
			segment.userData.segmentIndex = i;

			segments.push(segment);
			scene.add(segment);
		}

		function onPointerMove(event: PointerEvent) {
			if (hoveredSegment) {
				(hoveredSegment.material as THREE.MeshBasicMaterial).color.setHex(0x69f0ae);
			}

			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(segments);

			if (intersects.length > 0) {
				const segment = intersects[0].object as THREE.Mesh;
				hoveredSegment = segment;
				(segment.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
				renderer.domElement.style.cursor = "pointer";
			} else {
				hoveredSegment = null;
				renderer.domElement.style.cursor = "default";
			}
		}

		window.addEventListener("pointermove", onPointerMove);

		function update() {
			camera.aspect = innerWidth / innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(innerWidth, innerHeight);
		}

		function render() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
			update();
		}

		render();

		return () => {
			window.removeEventListener("pointermove", onPointerMove);

			if (containerRef.current && renderer.domElement.parentNode) {
				containerRef.current.removeChild(renderer.domElement);
			}

			segments.forEach((seg) => {
				seg.geometry.dispose();
				(seg.material as THREE.Material).dispose();
			});
			renderer.dispose();
		};
	}, []);

	return <div ref={containerRef} className="carousel"></div>;
}

export default Carousel;
