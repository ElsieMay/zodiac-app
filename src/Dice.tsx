import { useEffect, useRef } from "react";
import * as THREE from "three";

function Dice() {
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

		const mesh = new THREE.MeshStandardMaterial({
			metalness: 1.0,
			roughness: 0.5,
			color: 0xe9d491,
		});
		const meshDark = new THREE.MeshStandardMaterial({
			metalness: 0.6,
			roughness: 1.0,
			color: 0x001a6b,
		});
		const meshGoldDark = new THREE.MeshStandardMaterial({
			metalness: 0,
			roughness: 0.2,
			color: 0x6b5d30,
		});
		const meshMid = new THREE.MeshPhongMaterial({ color: 0x860808, shininess: 100, specular: 0xaaaaaa });

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Add point light for background spheres
		const pointLight = new THREE.PointLight();
		scene.add(pointLight);

		// Main dice geometry
		const geometry = new THREE.Mesh(new THREE.IcosahedronGeometry(), meshMid);
		scene.add(geometry);
		geometry.scale.set(0.13, 0.13, 0.13);
		geometry.position.set(0, 0, 0.2);

		// Rings
		var geoSmall = new THREE.TorusGeometry(0.44, 0.04, 16, 100);
		var ringSmall = new THREE.Mesh(geoSmall, mesh);
		scene.add(ringSmall);
		ringSmall.scale.set(0.7, 0.7, 0.7);

		var geoFlat = new THREE.TorusGeometry(0.07, 0.2, 16, 400);
		var ringFlat = new THREE.Mesh(geoFlat, meshDark);
		scene.add(ringFlat);

		var geoFlat2 = new THREE.TorusGeometry(0.9, 0.2, 16, 400);
		var ringFlat2 = new THREE.Mesh(geoFlat2, meshDark);
		scene.add(ringFlat2);

		var geoMedium = new THREE.TorusGeometry(1.07, 0.1, 16, 100);
		var ringMedium = new THREE.Mesh(geoMedium, mesh);
		scene.add(ringMedium);

		var geoThin = new THREE.TorusGeometry(0.5, 0.004, 16, 100);
		var ringThin = new THREE.Mesh(geoThin, mesh);
		scene.add(ringThin);

		var geoLarge = new THREE.TorusGeometry(1.24, 0.007, 16, 100);
		var ringLarge = new THREE.Mesh(geoLarge, mesh);
		scene.add(ringLarge);

		var geoMed = new THREE.TorusGeometry(0.69, 0.015, 16, 100);
		var ringMed = new THREE.Mesh(geoMed, meshGoldDark);
		scene.add(ringMed);

		// Zodiac signs
		const textureLoader = new THREE.TextureLoader();
		const zodiacSigns = ["aries.png", "taurus.png", "gemini.png", "cancer.png", "leo.png", "virgo.png", "libra.png", "scorpio.png", "sagittarius.png", "capricorn.png", "aquarius.png", "pisces.png"];
		const radius = 0.85;
		const zodiacs: THREE.Mesh[] = [];

		zodiacSigns.forEach((sign, index) => {
			const angle = (index / 12) * Math.PI * 2;

			const texture = textureLoader.load(`../public/${sign}`);
			const planeGeometry = new THREE.PlaneGeometry(0.1, 0.1);
			const planeMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
			});
			const zodiac = new THREE.Mesh(planeGeometry, planeMaterial);

			zodiac.position.x = Math.cos(angle) * radius;
			zodiac.position.y = Math.sin(angle) * radius;
			zodiac.position.z = 0.2;

			scene.add(zodiac);
			zodiacs.push(zodiac);
		});

		// Lines between zodiacs (at midpoints)
		for (let i = 0; i < 12; i++) {
			const innerRadius = 0.66; // Gap in center - where lines start
			const outerRadius = 1.03; // Where lines end
			const lineAngle = ((i + 0.5) / 12) * Math.PI * 2; // Midpoint between zodiacs

			const points = [new THREE.Vector3(Math.cos(lineAngle) * innerRadius, Math.sin(lineAngle) * innerRadius, 0.2), new THREE.Vector3(Math.cos(lineAngle) * outerRadius, Math.sin(lineAngle) * outerRadius, 0.2)];

			const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
			const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe9d491 });
			const line = new THREE.Line(lineGeometry, lineMaterial);
			scene.add(line);
		}

		// Background spheres (from Background component)
		const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
		const spheres: THREE.Mesh[] = [];
		const spheresCount = 150;

		for (let i = 0; i < spheresCount; i++) {
			addBackgroundSphere();
		}

		function addBackgroundSphere() {
			const s = new THREE.Mesh(
				sphereGeometry,
				new THREE.MeshStandardMaterial({
					color: 0xe9d491,
					blending: THREE.AdditiveBlending,
				})
			);
			s.scale.setScalar(THREE.MathUtils.randFloat(0.04, 0.06));
			s.userData = {
				posY: THREE.MathUtils.randFloat(-10, 10),
				radius: THREE.MathUtils.randFloat(5, 10),
				phase: Math.random() * Math.PI * 2,
				speed: (0.1 - Math.random() * 0.2) * Math.PI,
			};
			spheres.push(s);
			scene.add(s);
		}

		containerRef.current.append(renderer.domElement);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;

		const clock = new THREE.Clock();

		function update() {
			const t = clock.getElapsedTime();

			// Update background spheres
			spheres.forEach((s) => {
				const ud = s.userData;
				const a = ud.speed * t + ud.phase;
				s.position.set(Math.cos(a), 0, -Math.sin(a)).multiplyScalar(ud.radius).setY(ud.posY);
			});

			// Update dice elements
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
			if (containerRef.current && renderer.domElement.parentNode) {
				containerRef.current.removeChild(renderer.domElement);
			}
			renderer.dispose();
			sphereGeometry.dispose();
		};
	}, []);

	return <div ref={containerRef} className="dice-container"></div>;
}

export default Dice;
