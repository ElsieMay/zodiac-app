import { OrbitControls } from "@react-three/drei";
import { CarouselGroup } from "./CarouselGroup";
import { CenterSceneGeometry } from "./CentreSceneGeometry";
import type { SceneProps } from "../types/component.types";

export function ZodiacScene({
  onSegmentClick,
  items,
  isSpinning,
  mode,
}: SceneProps) {
  const fixedAngle = Math.PI / 2 - (12 * Math.PI) / 200;

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
      <CenterSceneGeometry />
      <OrbitControls
        enableDamping={false}
        minPolarAngle={fixedAngle}
        maxPolarAngle={fixedAngle}
        enablePan={false}
      />
    </>
  );
}
