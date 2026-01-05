import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { ZODIAC_SIGNS } from "./helpers/config";
import Modal from "./Modal";

const CONFIG = {
  cylinderHeight: 0.7,
  spacing: 1.1,
  textYOffset: -0.45,
  cornerRadius: 0.15,
  tiltAngle: (10 * Math.PI) / 180,
} as const;

const len = ZODIAC_SIGNS.length * CONFIG.spacing;
const radius = len / (Math.PI * 2);
const segAngle = (Math.PI * 2) / len / CONFIG.spacing;

function CenterGeometry() {
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const ringSmallRef = useRef<THREE.Mesh>(null);
  const ringLargeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x += 2 / 200;
      icosahedronRef.current.rotation.y += 2 / 200;
    }
    if (ringSmallRef.current) {
      ringSmallRef.current.rotation.x += 0.03;
      ringSmallRef.current.rotation.y += 0.03;
    }
    if (ringLargeRef.current) {
      ringLargeRef.current.rotation.x += 0.01;
      ringLargeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={icosahedronRef} scale={0.5}>
        <icosahedronGeometry args={[0.5]} />
        <meshPhongMaterial
          color={0x860808}
          shininess={100}
          specular={0xaaaaaa}
        />
      </mesh>
      <mesh ref={ringSmallRef}>
        <torusGeometry args={[0.6, 0.02, 16, 100]} />
        <meshStandardMaterial metalness={1} roughness={0.5} color={0xe9d491} />
      </mesh>
      <mesh ref={ringLargeRef}>
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshStandardMaterial metalness={1} roughness={0.5} color={0xe9d491} />
      </mesh>
    </>
  );
}

// Individual carousel segments
function CarouselSegment({
  index,
  angle,
  texture,
  onSegmentClick,
}: {
  index: number;
  angle: number;
  texture: THREE.Texture;
  onSegmentClick?: (sign: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    CONFIG.cylinderHeight,
    10,
    1,
    true,
    0,
    segAngle
  );
  geometry.rotateY(angle);

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: texture,
    emissive: hovered ? 0x860808 : 0x000000,
    emissiveIntensity: hovered ? 0.25 : 0,
    alphaTest: 0.5,
    transparent: true,
  });

  const textAngle = angle + segAngle / 2;
  const lookAtTarget = new THREE.Vector3(
    Math.sin(textAngle) * radius * 2,
    CONFIG.textYOffset,
    Math.cos(textAngle) * radius * 2
  );

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSegmentClick?.(ZODIAC_SIGNS[index])}
        userData={{ segmentIndex: index, className: ZODIAC_SIGNS[index] }}
      /> 
      <Text3D
        font="/fonts/Cormorant_Unicase_Light_Regular.json"
        size={0.08}
        height={0.01}
        curveSegments={20}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.001}
        bevelSegments={10}
        position={[
          Math.sin(textAngle) * radius,
          CONFIG.textYOffset,
          Math.cos(textAngle) * radius,
        ]}
        onUpdate={(self) => self.lookAt(lookAtTarget)}
      >
        {ZODIAC_SIGNS[index]}
        <meshStandardMaterial
          color={0xe9d491}
          metalness={0.8}
          roughness={0.5}
        />
      </Text3D>
    </>
  );
}

// Carousel group component
function CarouselGroup({ onSegmentClick }: { onSegmentClick?: (sign: string) => void }) {

  const textures = useLoader(
    TextureLoader,
    ZODIAC_SIGNS.map((sign) => `/zodiacs/icons/${sign.toLowerCase()}.png`)
  );

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
  });

  return (
    <group>
      {ZODIAC_SIGNS.map((_, i) => {
        const angle = ((Math.PI * 2) / ZODIAC_SIGNS.length) * i;
        return (
          <CarouselSegment
            key={i}
            index={i}
            angle={angle}
            texture={textures[i]}
            onSegmentClick={onSegmentClick}
          />
        );
      })}
    </group>
  );
}

// Main scene
function Scene({ onSegmentClick }: { onSegmentClick?: (sign: string) => void }) {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      <CarouselGroup onSegmentClick={onSegmentClick} />
      <CenterGeometry />
      <OrbitControls
        enableDamping={false}
        minPolarAngle={Math.PI / 2 - CONFIG.tiltAngle}
        maxPolarAngle={Math.PI / 2 + CONFIG.tiltAngle}
        enablePan={false}
      />
    </>
  );
}

// Main component
function Carousel() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  return (
    <>
      <div className="carousel" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          camera={{ position: [0, 10, 16], fov: 12 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <Scene onSegmentClick={setSelectedSign} />
        </Canvas>
      </div>
      <Modal isOpen={!!selectedSign} onClose={() => setSelectedSign(null)}>
        <h2>{selectedSign}</h2>
        <p>You selected {selectedSign}!</p>
      </Modal>
    </>
  );
}

export default Carousel;
