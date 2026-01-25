import { describe, it, expect } from "vitest";
import {
  TextGeometry,
  LineBasicMaterial,
  Clock,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
} from "./three.module";

describe("Three.js mocks", () => {
  it("should create TextGeometry with provided options", () => {
    const geometry = new TextGeometry({
      size: 2,
      height: 0.5,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 5,
    });

    expect(geometry.parameters.size).toBe(2);
    expect(geometry.parameters.height).toBe(0.5);
    expect(geometry.parameters.bevelEnabled).toBe(true);
  });

  it("should create TextGeometry with default options", () => {
    const geometry = new TextGeometry();

    expect(geometry.parameters.size).toBe(1);
    expect(geometry.parameters.height).toBe(0.2);
    expect(geometry.parameters.bevelEnabled).toBe(false);
  });

  it("should create MeshStandardMaterial with default color", () => {
    const material = new MeshStandardMaterial();
    expect(material.color).toBe(0xffffff);
  });

  it("should create MeshStandardMaterial with provided options", () => {
    const material = new MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0x00ff00,
      emissiveIntensity: 2,
      metalness: 0.8,
      roughness: 0.3,
    });
    expect(material.color).toBe(0xff0000);
    expect(material.emissive).toBe(0x00ff00);
    expect(material.emissiveIntensity).toBe(2);
    expect(material.metalness).toBe(0.8);
    expect(material.roughness).toBe(0.3);
  });

  it("should create LineBasicMaterial with color", () => {
    const material = new LineBasicMaterial({ color: 0xff0000 });
    expect(material.color).toBe(0xff0000);
  });

  it("should create LineBasicMaterial with default color", () => {
    const material = new LineBasicMaterial();
    expect(material.color).toBe(0xffffff);
  });

  it("should create MeshBasicMaterial with default options", () => {
    const material = new MeshBasicMaterial();
    expect(material.color).toBe(0xffffff);
    expect(material.opacity).toBe(1);
    expect(material.transparent).toBe(false);
  });

  it("should create MeshBasicMaterial with provided options", () => {
    const material = new MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.5,
    });
    expect(material.color).toBe(0xff0000);
    expect(material.transparent).toBe(true);
    expect(material.opacity).toBe(0.5);
  });

  it("should create MeshBasicMaterial with opacity of 0", () => {
    const material = new MeshBasicMaterial({ opacity: 0 });
    expect(material.opacity).toBe(0);
  });

  it("should create MeshPhongMaterial with provided options", () => {
    const material = new MeshPhongMaterial({
      color: 0xff0000,
      shininess: 50,
      specular: 0x00ff00,
    });
    expect(material.color).toBe(0xff0000);
    expect(material.shininess).toBe(50);
    expect(material.specular).toBe(0x00ff00);
  });

  it("should create MeshPhongMaterial with default options", () => {
    const material = new MeshPhongMaterial();
    expect(material.color).toBe(0xffffff);
    expect(material.shininess).toBe(30);
    expect(material.specular).toBe(0x111111);
  });
});

describe("Three.js mock coverage - Clock", () => {
  it("should create Clock and call getElapsedTime", () => {
    const clock = Clock();
    const elapsedTime = clock.getElapsedTime();

    expect(elapsedTime).toBe(0);
  });
});
