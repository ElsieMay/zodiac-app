import type * as THREE from "three";

export const CENTER_GEOMETRY_CONFIG = {
  icosahedronRotationSpeed: 2 / 200,
  ringSmallRotationSpeed: 0.03,
  ringLargeRotationSpeed: 0.01,
};

export function updateRotation(
  rotation: THREE.Euler | undefined,
  speed: number,
): void {
  if (!rotation) return;
  rotation.x += speed;
  rotation.y += speed;
}
