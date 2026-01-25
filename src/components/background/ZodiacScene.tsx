import { OrbitControls } from "@react-three/drei";
import { CarouselGroup } from "../carousel/CarouselGroup";
import type { SceneProps } from "../../types/component.types";
import { CenterSceneGeometry } from "./CentreSceneGeometry";

export function ZodiacScene({
  onSegmentClick,
  items,
  isSpinning,
  mode,
}: SceneProps) {
  const fixedAngle = Math.PI / 2 - (12 * Math.PI) / 200;

  return (
    <group data-testid="zodiac-scene">
      <ambientLight intensity={1} data-testid="ambient-light" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        data-testid="directional-light-1"
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={1}
        data-testid="directional-light-2"
      />
      <CarouselGroup
        data-testid="carousel-group"
        onSegmentClick={onSegmentClick}
        items={items}
        isSpinning={isSpinning}
        mode={mode}
      />
      <CenterSceneGeometry data-testid="center-scene-geometry" />
      <OrbitControls
        data-testid="orbit-controls"
        enableDamping={false}
        minPolarAngle={fixedAngle}
        maxPolarAngle={fixedAngle}
        enablePan={false}
      />
    </group>
  );
}
