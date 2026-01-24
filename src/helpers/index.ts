import type { SphereData } from "../types/component.types";
import * as THREE from "three";

export function calculateSpherePosition(
  t: number,
  data: SphereData,
  mesh: THREE.Mesh,
) {
  const a = data.speed * t + data.phase;
  mesh.position
    .set(Math.cos(a), 0, -Math.sin(a))
    .multiplyScalar(data.radius)
    .setY(data.posY);

  const twinkle =
    Math.sin(t * data.twinkleSpeed + data.twinklePhase) * 0.5 + 0.5;
  const material = mesh.material as THREE.MeshStandardMaterial;
  material.emissiveIntensity = data.baseIntensity * (twinkle * 0.4 + 0.2);

  const scalePulse =
    1 + Math.sin(t * data.twinkleSpeed * 2 + data.twinklePhase) * 0.1;
  mesh.scale.setScalar(data.scale * scalePulse);
}
