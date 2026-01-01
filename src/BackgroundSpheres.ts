import * as THREE from "three";

function randomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export function createBackgroundSpheres(scene: THREE.Scene, count: number = 340) {
	const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
	const spheres: THREE.Mesh[] = [];

	function addBackgroundSphere() {
		const starColor = new THREE.Color(1, randomArbitrary(230, 255) / 255, randomArbitrary(180, 220) / 255);

		const s = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshStandardMaterial({
				color: starColor,
				emissive: starColor,
				emissiveIntensity: 20.0,
				blending: THREE.AdditiveBlending,
				transparent: true,
				opacity: 1.0,
				toneMapped: false,
			})
		);

		s.userData = {
			posY: THREE.MathUtils.randFloat(-10, 10),
			radius: THREE.MathUtils.randFloat(5, 10),
			phase: Math.random() * Math.PI * 2,
			speed: (0.1 - Math.random() * 0.2) * Math.PI,
			twinkleSpeed: Math.random() * 3 + 0.5,
			twinklePhase: Math.random() * Math.PI * 2,
			baseIntensity: randomArbitrary(1.5, 3.0),
		};
		spheres.push(s);
		scene.add(s);
	}

	for (let i = 0; i < count; i++) {
		addBackgroundSphere();
	}

	return {
		spheres,
		geometry: sphereGeometry,
	};
}

export function updateBackgroundSpheres(spheres: THREE.Mesh[], elapsedTime: number) {
	spheres.forEach((s) => {
		const ud = s.userData;
		const a = ud.speed * elapsedTime + ud.phase;
		s.position.set(Math.cos(a), 0, -Math.sin(a)).multiplyScalar(ud.radius).setY(ud.posY);

		// Twinkling effect
		const twinkle = Math.sin(elapsedTime * ud.twinkleSpeed + ud.twinklePhase) * 0.5 + 0.5;
		const material = s.material as THREE.MeshStandardMaterial;
		material.emissiveIntensity = ud.baseIntensity * (twinkle * 0.4 + 0.2);

		// Subtle scale pulsing for sparkle effect
		const scalePulse = 1 + Math.sin(elapsedTime * ud.twinkleSpeed * 2 + ud.twinklePhase) * 0.1;
		s.scale.setScalar(THREE.MathUtils.randFloat(0.01, 0.03) * scalePulse);
	});
}
