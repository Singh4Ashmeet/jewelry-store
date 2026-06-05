import type { Group, Object3D } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelCache = new Map<string, Promise<Group>>();

export function clearModelCache() {
  modelCache.clear();
}

export async function loadModel(url: string) {
  if (typeof window === 'undefined') {
    throw new Error('3D models can only be loaded in the browser');
  }

  if (!modelCache.has(url)) {
    modelCache.set(
      url,
      new Promise<Group>((resolve, reject) => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
          url,
          (gltf) => resolve(gltf.scene.clone(true)),
          undefined,
          reject,
        );
      }),
    );
  }

  return modelCache.get(url)!.then((group) => group.clone(true));
}

export function hasRenderableChildren(model: Object3D) {
  let hasRenderable = false;
  model.traverse((child) => {
    if ('isMesh' in child && child.isMesh) hasRenderable = true;
  });
  return hasRenderable;
}
