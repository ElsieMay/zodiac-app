import { vi } from "vitest";

class MockVector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
}

class MockEuler {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class MockTexture {
  image: HTMLImageElement | null = null;
  needsUpdate = false;
}

class MockWebGLRenderer {
  domElement: HTMLCanvasElement;

  constructor() {
    this.domElement = document.createElement("canvas");
  }

  render = vi.fn();
  setPixelRatio = vi.fn();
  setClearColor = vi.fn();
  setSize = vi.fn();
  dispose = vi.fn();
}

class MockPerspectiveCamera {
  position = new MockVector3();

  constructor(
    public fov = 50,
    public aspect = 1,
    public near = 0.1,
    public far = 2000,
  ) {}
}

class MockScene {
  children: unknown[] = [];
  add = vi.fn();
}

class MockAmbientLight {
  position = new MockVector3();

  constructor(
    public color = 0xffffff,
    public intensity = 1,
  ) {}
}

class MockDirectionalLight {
  position = new MockVector3();

  constructor(
    public color = 0xffffff,
    public intensity = 1,
  ) {}
}

class MockIcosahedronGeometry {
  scale: MockVector3 = new MockVector3();
  position: MockVector3 = new MockVector3();

  constructor() {}
}

class MockTextureLoader {
  load = vi.fn(() => {
    const texture = new MockTexture();

    return texture;
  });
}

class MockCylinderGeometry {
  parameters: {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
  };

  constructor(
    radiusTop = 1,
    radiusBottom = 1,
    height = 1,
    radialSegments = 8,
    heightSegments = 1,
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
  ) {
    this.parameters = {
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    };
  }
}

class MockMesh {
  scale = new MockVector3(1, 1, 1);
  position = new MockVector3();
  rotation = new MockEuler();

  constructor(
    public geometry?: unknown,
    public material?: unknown,
  ) {}
}

interface MockMeshStandardMaterialOptions {
  color?: number;
  emissive?: number;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
}

class MockMeshStandardMaterial {
  color: number;
  emissive: number;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;

  constructor(options: MockMeshStandardMaterialOptions = {}) {
    this.color = options.color || 0xffffff;
    this.emissive = options.emissive || 0x000000;
    this.emissiveIntensity = options.emissiveIntensity || 1;
    this.metalness = options.metalness || 0.5;
    this.roughness = options.roughness || 0.5;
  }
}

interface MockMeshBasicMaterialOptions {
  color?: number;
  map?: MockTexture;
  transparent?: boolean;
  opacity?: number;
}

class MockMeshBasicMaterial {
  color: number;
  map?: MockTexture;
  transparent: boolean;
  opacity: number;

  constructor(options: MockMeshBasicMaterialOptions = {}) {
    this.color = options.color || 0xffffff;
    this.map = options.map;
    this.transparent = options.transparent || false;
    this.opacity = options.opacity !== undefined ? options.opacity : 1;
  }
}

interface MockMeshPhongMaterialOptions {
  color?: number;
  shininess?: number;
  specular?: number;
}

class MockMeshPhongMaterial {
  color: number;
  shininess: number;
  specular: number;

  constructor(options: MockMeshPhongMaterialOptions = {}) {
    this.color = options.color || 0xffffff;
    this.shininess = options.shininess || 30;
    this.specular = options.specular || 0x111111;
  }
}

interface MockTextGeometryParameters {
  font?: unknown;
  size: number;
  height: number;
  curveSegments: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  bevelSegments: number;
}

class MockTextGeometry {
  parameters: MockTextGeometryParameters;

  constructor(options: Record<string, unknown> = {}) {
    this.parameters = {
      font: options.font,
      size: (typeof options.size === "number" ? options.size : undefined) || 1,
      height:
        (typeof options.height === "number" ? options.height : undefined) ||
        0.2,
      curveSegments:
        (typeof options.curveSegments === "number"
          ? options.curveSegments
          : undefined) || 12,
      bevelEnabled:
        (typeof options.bevelEnabled === "boolean"
          ? options.bevelEnabled
          : undefined) || false,
      bevelThickness:
        (typeof options.bevelThickness === "number"
          ? options.bevelThickness
          : undefined) || 0.1,
      bevelSize:
        (typeof options.bevelSize === "number"
          ? options.bevelSize
          : undefined) || 0.05,
      bevelSegments:
        (typeof options.bevelSegments === "number"
          ? options.bevelSegments
          : undefined) || 3,
    };
  }
}

class MockPlaneGeometry {
  parameters: {
    width: number;
    height: number;
  };

  constructor(width = 1, height = 1) {
    this.parameters = { width, height };
  }
}

class MockTorusGeometry {
  parameters: {
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
  };

  constructor(radius = 1, tube = 0.4, radialSegments = 8, tubularSegments = 6) {
    this.parameters = {
      radius,
      tube,
      radialSegments,
      tubularSegments,
    };
  }
}

class MockBufferGeometry {
  setFromPoints = vi.fn(() => this);
}

class MockLine {
  constructor(
    public geometry?: unknown,
    public material?: unknown,
  ) {}
}

interface MockLineBasicMaterialOptions {
  color?: number;
}

class MockLineBasicMaterial {
  color: number;

  constructor(options: MockLineBasicMaterialOptions = {}) {
    this.color = options.color || 0xffffff;
  }
}

const mockThree = {
  Scene: MockScene,
  PerspectiveCamera: MockPerspectiveCamera,
  WebGLRenderer: MockWebGLRenderer,
  Mesh: MockMesh,
  Vector3: MockVector3,
  Euler: MockEuler,
  Texture: MockTexture,
  TextureLoader: MockTextureLoader,
  CylinderGeometry: MockCylinderGeometry,
  PlaneGeometry: MockPlaneGeometry,
  TextGeometry: MockTextGeometry,
  Clock: vi.fn(() => ({ getElapsedTime: vi.fn(() => 0) })),
  DoubleSide: 2,
  MeshStandardMaterial: MockMeshStandardMaterial,
  MeshBasicMaterial: MockMeshBasicMaterial,
  MeshPhongMaterial: MockMeshPhongMaterial,
  LineBasicMaterial: MockLineBasicMaterial,
  BufferGeometry: MockBufferGeometry,
  Line: MockLine,
  SphereGeometry: vi.fn(),
  AmbientLight: MockAmbientLight,
  DirectionalLight: MockDirectionalLight,
  PointLight: vi.fn(),
  IcosahedronGeometry: MockIcosahedronGeometry,
  TorusGeometry: MockTorusGeometry,
  ACESFilmicToneMapping: 0,
};

export default mockThree;
export const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Vector3,
  Euler,
  Texture,
  TextureLoader,
  CylinderGeometry,
  PlaneGeometry,
  TextGeometry,
  Clock,
  DoubleSide,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  SphereGeometry,
  AmbientLight,
  DirectionalLight,
  PointLight,
  IcosahedronGeometry,
  TorusGeometry,
} = mockThree;
export const ACESFilmicToneMapping = 0;
