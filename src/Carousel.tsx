import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

function Carousel() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(0x000000, 0);
		let camera = new THREE.PerspectiveCamera(12, innerWidth / innerHeight, 1, 100);
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.position.z = 1;
		const scene = new THREE.Scene();
		scene.add(camera);
		camera.position.set(0, 0.125, 1).setLength(16);
		containerRef.current.append(renderer.domElement);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		const playerClass = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

		let controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		const tiltAngle = (10 * Math.PI) / 180;
		controls.minPolarAngle = Math.PI / 2 - tiltAngle; // Lock
		controls.maxPolarAngle = Math.PI / 2 + tiltAngle;
		controls.enablePan = false; // Disable panning

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);
		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight1.position.set(5, 5, 5);
		scene.add(directionalLight1);
		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight2.position.set(-5, 5, -5);
		scene.add(directionalLight2);

		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		let hoveredSegment: THREE.Mesh | null = null;

		let totalAmount = 12; // Total segments
		let len = totalAmount * 1.1; // Add 10% spacing between segments
		let r = len / (Math.PI * 2); //  radius from circumference
		let segAngle = (Math.PI * 2) / len / 1.1; // ~0.228 radians per segment

		const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

		const loadingManager = new THREE.LoadingManager();
		const textureLoader = new THREE.TextureLoader(loadingManager);
		const textures: THREE.Texture[] = [];

		zodiacSigns.forEach((sign, i) => {
			const texture = textureLoader.load(`/zodiacs/icons/${sign.toLowerCase()}.png`, (tex) => {
				tex.colorSpace = "srgb";
				tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
			});
			textures[i] = texture;
		});

		const carouselGroup = new THREE.Group();
		scene.add(carouselGroup);
		const segments: THREE.Mesh[] = [];

		const fontLoader = new FontLoader();
		loadingManager.onLoad = () => {
			fontLoader.load("../public/fonts/Cormorant_Unicase_Light_Regular.json", function (font) {
				for (let i = 0; i < totalAmount; i++) {
					const angle = ((Math.PI * 2) / totalAmount) * i;

					let segGeom = new THREE.CylinderGeometry(r, r, 0.7, 10, 1, true, 0, segAngle);
					segGeom.rotateY(angle);

					let material = new THREE.MeshStandardMaterial({
						side: THREE.DoubleSide,
						map: textures[i],
						emissive: 0x000000,
						emissiveIntensity: 0,
						alphaTest: 0.5,
						transparent: true,
					});

					let segment = new THREE.Mesh(segGeom, material);
					segment.userData.segmentIndex = i;
					segment.userData.className = playerClass[i];

					segments.push(segment);
					carouselGroup.add(segment);

					// Text for each segment
					const textGeom = new TextGeometry(playerClass[i], {
						font: font,
						size: 0.08,
						depth: 0.01,
						curveSegments: 20,
						bevelEnabled: true,
						bevelThickness: 0.02,
						bevelSize: 0.001,
						bevelOffset: 0,
						bevelSegments: 10,
					});

					const textMat = new THREE.MeshStandardMaterial({ color: 0xe9d491, metalness: 0.8, roughness: 0.5 });
					const textMesh = new THREE.Mesh(textGeom, textMat);
					// textGeom.center();
					const textOffset = 0.05;
					const textAngle = angle + textOffset;

					textMesh.position.set(Math.sin(textAngle) * r, -0.45, Math.cos(textAngle) * r);
					textMesh.lookAt(Math.sin(textAngle) * r * 2, -0.45, Math.cos(textAngle) * r * 2);
					carouselGroup.add(textMesh);
				}
			});
		};

		const meshMid = new THREE.MeshPhongMaterial({ color: 0x860808, shininess: 100, specular: 0xaaaaaa });
		const mesh = new THREE.MeshStandardMaterial({
			metalness: 1,
			roughness: 0.5,
			color: 0xe9d491,
		});
		const geometry = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5), meshMid);
		scene.add(geometry);
		geometry.scale.set(0.5, 0.5, 0.5);
		var geoSmall = new THREE.TorusGeometry(0.6, 0.02, 16, 100);
		var ringSmall = new THREE.Mesh(geoSmall, mesh);
		scene.add(ringSmall);
		var geoLarge = new THREE.TorusGeometry(1.2, 0.01, 16, 100);
		var ringLarge = new THREE.Mesh(geoLarge, mesh);
		scene.add(ringLarge);

		function onPointerMove(event: PointerEvent) {
			if (hoveredSegment) {
				const mat = hoveredSegment.material as THREE.MeshStandardMaterial;
				mat.emissive.setHex(0x000000);
				mat.emissiveIntensity = 0;
			}

			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(segments);

			if (intersects.length > 0) {
				const segment = intersects[0].object as THREE.Mesh;
				hoveredSegment = segment;
				const mat = segment.material as THREE.MeshStandardMaterial;
				mat.emissive.setHex(0x860808);
				mat.emissiveIntensity = 0.25;
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

			geometry.rotation.x += 2 / 200;
			geometry.rotation.y += 2 / 200;
			ringSmall.rotation.x += 0.03;
			ringSmall.rotation.y += 0.03;
			ringLarge.rotation.x += 0.01;
			ringLarge.rotation.y += 0.01;
		}

		function render() {
			requestAnimationFrame(render);
			controls.update();

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
			textures.forEach((tex) => tex.dispose());
			renderer.dispose();
		};
	}, []);

	return <div ref={containerRef} className="carousel"></div>;
}

export default Carousel;
