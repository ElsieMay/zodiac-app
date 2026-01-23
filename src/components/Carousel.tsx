import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ZODIAC_SIGNS, ORDER_SPECIES } from "../constants/config";
import Modal from "./Modal";
import { ZodiacModalContent } from "./ZodiacModalContent";
import { ZodiacScene } from "./ZodiacScene";

export const CAROUSEL_CONFIG = {
  cylinderHeight: 0.7,
  spacing: 1.05,
  textYOffset: -0.45,
  cornerRadius: 0.15,
} as const;

function Carousel() {
  const [mode, setMode] = useState<"zodiac" | "species">("zodiac");
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [selectedArmoury, setSelectedArmoury] = useState<number[]>([]);

  const currentItems = mode === "zodiac" ? ZODIAC_SIGNS : ORDER_SPECIES;

  const handleModeTransition = useCallback(() => {
    console.log("Transitioning mode...");
    console.log("Current mode:", mode);
    setSelectedSign(null);
    setSelectedOrder(null);
    setIsSpinning(true);

    setTimeout(() => {
      setMode(mode === "zodiac" ? "species" : "zodiac");
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }, 2000);
  }, [mode]);

  return (
    <>
      <div className="carousel">
        <Canvas
          camera={{ position: [0, 7, 16], fov: 12 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <Suspense fallback={null}>
            <ZodiacScene
              onSegmentClick={
                mode == "zodiac" ? setSelectedSign : setSelectedOrder
              }
              items={currentItems}
              isSpinning={isSpinning}
              mode={mode}
            />
          </Suspense>
        </Canvas>
      </div>
      <Modal
        isOpen={!!selectedSign || !!selectedOrder}
        onClose={() => {
          setSelectedSign(null);
          setSelectedOrder(null);
          setSelectedSkills([]);
          setSelectedArmoury([]);
        }}
        sign={selectedSign || selectedOrder || ""}
        backgroundImage="/images/bg.png"
      >
        {selectedSign && (
          <ZodiacModalContent
            selectedSign={selectedSign}
            mode={mode}
            selectedSkills={selectedSkills}
            selectedArmoury={selectedArmoury}
            selectedOrder={selectedOrder}
            onSkillsChange={setSelectedSkills}
            onArmouryChange={setSelectedArmoury}
            onAwaken={handleModeTransition}
          />
        )}
      </Modal>
    </>
  );
}

export default Carousel;
