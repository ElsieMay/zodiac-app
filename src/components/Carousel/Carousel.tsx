import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  ZODIAC_SIGNS,
  ORDER_SPECIES,
  BACKGROUNDS,
} from "../../constants/config";
import Modal from "../common/modal/Modal";
import { ZodiacModalContent } from "../common/modal/ZodiacModalContent";
import { ZodiacScene } from "../background/ZodiacScene";
import styles from "./Carousel.module.css";
import type { ancestryConfig } from "../../../public/content/order_options";
import { DetailsModalContent } from "../common/modal/DetailsModalContent";

export const CAROUSEL_CONFIG = {
  cylinderHeight: 0.7,
  spacing: 1.05,
  textYOffset: -0.45,
  cornerRadius: 0.15,
} as const;

type AnimationPhase =
  | "idle"
  | "closing-modal"
  | "spinning-segment"
  | "showing-confirmation";

function Carousel() {
  const [mode, setMode] = useState<"zodiac" | "backgrounds" | "species">(
    "zodiac",
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedArmoury, setSelectedArmoury] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [lineage, setLineage] = useState<ancestryConfig | undefined>(undefined);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );

  // Animation state management
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmedZodiac, setConfirmedZodiac] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<string | null>(null);
  const [confirmedBackground, setConfirmedBackground] = useState<string | null>(
    null,
  );
  const [isModalClosing, setIsModalClosing] = useState(false);

  const currentItems =
    mode === "zodiac"
      ? ZODIAC_SIGNS
      : mode === "species"
        ? ORDER_SPECIES
        : BACKGROUNDS;

  // Complex animation sequence when user clicks "Awaken" button
  const handleAwaken = useCallback(() => {
    // Store the confirmed selections
    if (mode === "zodiac") {
      setConfirmedZodiac(selectedSign);
    } else if (mode === "backgrounds") {
      setConfirmedBackground(selectedBackground);
    } else if (mode === "species") {
      setConfirmedOrder(selectedOrder);
    }

    // Phase 1: Close the current modal with animation
    setAnimationPhase("closing-modal");
    setIsModalClosing(true);

    setTimeout(() => {
      // Close the current selection modal
      setSelectedSign(null);
      setSelectedBackground(null);
      setSelectedOrder(null);
      setIsModalClosing(false);

      // Phase 2: Spin the carousel segment
      setAnimationPhase("spinning-segment");
      setIsSpinning(true);

      setTimeout(() => {
        setIsSpinning(false);

        // Phase 3: Show the confirmation modal spinning in
        setAnimationPhase("showing-confirmation");
        setShowConfirmationModal(true);
      }, 1500); // Duration of carousel spin
    }, 500); // Duration of modal close animation
  }, [mode, selectedSign, selectedOrder, selectedBackground]);

  // Handle continuation from confirmation modal
  const handleConfirmationContinue = useCallback(() => {
    setShowConfirmationModal(false);
    setAnimationPhase("idle");

    // Transition order: zodiac → backgrounds → species
    if (mode === "zodiac") {
      setIsSpinning(true);
      setTimeout(() => {
        setMode("backgrounds");
        setTimeout(() => {
          setIsSpinning(false);
        }, 1000);
      }, 500);
    } else if (mode === "backgrounds") {
      setIsSpinning(true);
      setTimeout(() => {
        setMode("species");
        setTimeout(() => {
          setIsSpinning(false);
        }, 1000);
      }, 500);
    } else {
      // Final selection complete - you can handle this as needed
      // For example, navigate to a character summary or save the character
      console.log("Character creation complete!", {
        zodiac: confirmedZodiac,
        background: confirmedBackground,
        species: confirmedOrder,
        skills: selectedSkills,
        armoury: selectedArmoury,
        languages: selectedLanguages,
        lineage,
      });
    }
  }, [
    mode,
    confirmedZodiac,
    confirmedBackground,
    confirmedOrder,
    selectedSkills,
    selectedArmoury,
    selectedLanguages,
    lineage,
  ]);

  const handleConfirmationClose = useCallback(() => {
    setShowConfirmationModal(false);
    setAnimationPhase("idle");
  }, []);

  return (
    <>
      <div
        className={styles.carousel}
        data-testid="carousel-container"
        data-animation-phase={animationPhase}
      >
        <Canvas
          data-testid="carousel-canvas"
          camera={{ position: [0, 7, 16], fov: 12 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <Suspense fallback={null}>
            <ZodiacScene
              data-testid="zodiac-scene"
              onSegmentClick={
                mode === "zodiac"
                  ? setSelectedSign
                  : mode === "backgrounds"
                    ? setSelectedBackground
                    : setSelectedOrder
              }
              items={currentItems}
              isSpinning={isSpinning}
              mode={mode}
            />
          </Suspense>
        </Canvas>
      </div>
      <Modal
        data-testid="carousel-modal"
        isOpen={
          (!!selectedSign || !!selectedBackground || !!selectedOrder) &&
          !isModalClosing
        }
        onClose={() => {
          setSelectedSign(null);
          setSelectedBackground(null);
          setSelectedOrder(null);
          setSelectedSkills([]);
          setSelectedArmoury([]);
        }}
        sign={selectedSign || selectedBackground || selectedOrder || ""}
        backgroundImage="/images/bg.png"
        isClosing={isModalClosing}
      >
        {(selectedSign || selectedBackground || selectedOrder) && (
          <ZodiacModalContent
            data-testid="zodiac-modal-content"
            selectedSign={selectedSign || undefined}
            mode={mode}
            selectedSkills={selectedSkills}
            selectedArmoury={selectedArmoury}
            selectedOrder={selectedOrder}
            selectedBackground={selectedBackground}
            selectedLineage={lineage}
            selectedLanguages={selectedLanguages}
            onSkillsChange={setSelectedSkills}
            onArmouryChange={setSelectedArmoury}
            onAwaken={handleAwaken}
            onLanguageChange={setSelectedLanguages}
            onLineageChange={setLineage}
          />
        )}
      </Modal>
      <Modal
        data-testid="carousel-modal"
        isOpen={showConfirmationModal}
        onClose={handleConfirmationClose}
        sign={selectedSign || ""}
        backgroundImage="/images/do.png"
        isClosing={isModalClosing}
      >
        <DetailsModalContent
          onContinue={handleConfirmationContinue}
          selectedSign={selectedSign || undefined}
        />
      </Modal>
    </>
  );
}

export default Carousel;
