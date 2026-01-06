import {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import ReactMarkdown from "react-markdown";
import { ZODIAC_SIGNS, AWAKENED_ORDERS_SPECIES } from "./helpers/config";
import Modal from "./Modal";
import Button from "./Button";
import { memo } from "react";

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

const CarouselSegment = memo(function CarouselSegment({
  index,
  angle,
  texture,
  onSegmentClick,
  itemName,
}: {
  index: number;
  angle: number;
  texture: THREE.Texture;
  onSegmentClick?: (sign: string) => void;
  itemName: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(
      radius,
      radius,
      CONFIG.cylinderHeight,
      10,
      1,
      true,
      0,
      segAngle
    );
    return geom;
  }, []);

  const textAngle = angle + segAngle / 2;
  const lookAtTarget = new THREE.Vector3(
    Math.sin(textAngle) * radius * 2,
    CONFIG.textYOffset,
    Math.cos(textAngle) * radius * 2
  );

  const hasSpace = itemName.includes(" ");
  const textLines = hasSpace ? itemName.split(" ") : [itemName];
  const lineHeight = 0.1;
  const startY = hasSpace
    ? CONFIG.textYOffset + lineHeight / 2
    : CONFIG.textYOffset;

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[0, angle, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSegmentClick?.(itemName)}
        userData={{ segmentIndex: index, className: itemName }}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={texture}
          emissive={hovered ? 0x860808 : 0x000000}
          emissiveIntensity={hovered ? 0.25 : 0}
          alphaTest={0.5}
          transparent
        />
      </mesh>
      {textLines.map((line, idx) => (
        <Text3D
          key={idx}
          font="/fonts/Cormorant_Unicase_Regular.json"
          size={0.08}
          height={0.01}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.002}
          bevelSize={0.001}
          bevelSegments={5}
          position={[
            Math.sin(textAngle) * radius,
            startY - idx * lineHeight,
            Math.cos(textAngle) * radius,
          ]}
          onUpdate={(self) => self.lookAt(lookAtTarget)}
        >
          {line}
          <meshStandardMaterial
            color={0xe9d491}
            metalness={0.8}
            roughness={0.5}
          />
        </Text3D>
      ))}
    </>
  );
});

// Carousel group component
function CarouselGroup({
  onSegmentClick,
  items,
  isSpinning,
  mode,
}: {
  onSegmentClick?: (sign: string) => void;
  items: string[];
  isSpinning: boolean;
  mode: "zodiac" | "species";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spinSpeed = useRef(0);

  useFrame(() => {
    if (groupRef.current && isSpinning) {
      spinSpeed.current = Math.min(spinSpeed.current + 0.002, 0.15);
      groupRef.current.rotation.y += spinSpeed.current;
    } else if (groupRef.current && !isSpinning && spinSpeed.current > 0) {
      spinSpeed.current = Math.max(spinSpeed.current - 0.005, 0);
      groupRef.current.rotation.y += spinSpeed.current;
    }
  });

  const textures = useLoader(
    TextureLoader,
    items.map((item) =>
      mode === "zodiac"
        ? `/zodiacs/icons/${item.toLowerCase()}.png`
        : `/zodiacs/orders/${item}.png`
    )
  );

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  });

  return (
    <group ref={groupRef}>
      {items.map((_, i) => {
        const angle = ((Math.PI * 2) / items.length) * i;
        return (
          <CarouselSegment
            key={i}
            index={i}
            angle={angle}
            texture={textures[i]}
            onSegmentClick={onSegmentClick}
            itemName={items[i]}
          />
        );
      })}
    </group>
  );
}

// Main scene
function Scene({
  onSegmentClick,
  items,
  isSpinning,
  mode,
}: {
  onSegmentClick?: (sign: string) => void;
  items: string[];
  isSpinning: boolean;
  mode: "zodiac" | "species";
}) {
  const fixedAngle = Math.PI / 2 - (12 * Math.PI) / 180;
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      <CarouselGroup
        onSegmentClick={onSegmentClick}
        items={items}
        isSpinning={isSpinning}
        mode={mode}
      />
      <CenterGeometry />
      <OrbitControls
        enableDamping={false}
        minPolarAngle={fixedAngle}
        maxPolarAngle={fixedAngle}
        enablePan={false}
      />
    </>
  );
}

// Main component
function Carousel() {
  const [mode, setMode] = useState<"zodiac" | "species">("zodiac");
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [zodiacContent, setZodiacContent] = useState({
    name: "",
    symbol: "",
    class: "",
    classDescription: "",
  });

  const currentItems =
    mode === "zodiac" ? ZODIAC_SIGNS : AWAKENED_ORDERS_SPECIES;

  const handleModeTransition = useCallback(() => {
    setSelectedSign(null);
    setIsSpinning(true);

    setTimeout(() => {
      setMode(mode === "zodiac" ? "species" : "zodiac");
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }, 2000);
  }, [mode]);

  useEffect(() => {
    if (selectedSign) {
      fetch(`/content/${selectedSign.toLowerCase()}.md`)
        .then((res) => res.text())
        .then((text) => {
          const lines = text.split("\n");
          const firstLine = lines[0];
          const nameMatch = firstLine.match(/# (.+) (.+)/);
          const classLine = lines.find((line) => line.startsWith("## Class:"));
          const classMatch = classLine?.match(/## Class: (.+)/);
          const descIndex = lines.findIndex((line) => line.startsWith("**"));
          const descriptor =
            descIndex !== -1 ? lines[descIndex].replace(/\*\*/g, "") : "";
          const descSectionIndex = lines.findIndex(
            (line) => line.trim() === "## Description"
          );
          let descContent = "";
          if (descSectionIndex !== -1) {
            const descLines = [];
            for (let i = descSectionIndex + 1; i < lines.length; i++) {
              if (lines[i].startsWith("##")) break;
              if (lines[i].trim()) descLines.push(lines[i]);
            }
            descContent = descLines.join("\n\n");
          }
          const classDesc = [descriptor, descContent]
            .filter(Boolean)
            .join("\n\n");
          setZodiacContent({
            name: nameMatch?.[1] || selectedSign,
            symbol: nameMatch?.[2] || "",
            class: classMatch?.[1] || "",
            classDescription: classDesc,
          });
        })
        .catch(() => {
          setZodiacContent({
            name: selectedSign,
            symbol: "",
            class: "",
            classDescription: "",
          });
        });
    }
  }, [selectedSign]);

  const selected = selectedSign || "";
  return (
    <>
      <div className="carousel" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          camera={{ position: [0, 10, 16], fov: 10 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <Suspense fallback={null}>
            <Scene
              onSegmentClick={setSelectedSign}
              items={currentItems}
              isSpinning={isSpinning}
              mode={mode}
            />
          </Suspense>
        </Canvas>
      </div>
      <Modal
        isOpen={!!selectedSign}
        onClose={() => setSelectedSign(null)}
        sign={selected}
        backgroundImage="/images/bg.png"
      >
        <img
          src={
            mode === "zodiac"
              ? `/zodiacs/icons/sketched/${selected.toLowerCase()}.png`
              : `/zodiacs/icons/sketched-orders/${selected}.png`
          }
          alt={selected}
          id="modal-zodiac-icon"
        />
        <img src="/images/fg.png" id="modal-zodiac-edges" />
        <h2 className="zodiac-name">
          {zodiacContent.symbol} {zodiacContent.name}
        </h2>
        <h3>{zodiacContent.class}</h3>
        <div className="class-description">
          <ReactMarkdown>{zodiacContent.classDescription}</ReactMarkdown>
        </div>
        <img src="/images/lg.png" id="modal-zodiac-bottom" />
        <div className="modal-button">
          <Button
            onPress={handleModeTransition}
            text={`Awaken as ${selected}`}
            bgColour="#530001"
            colour="white"
          />
        </div>
      </Modal>
    </>
  );
}

export default Carousel;
