const clonedScene = { cloned: true, clone: jest.fn(() => ({ cloned: true })) };
const sourceScene = { clone: jest.fn(() => clonedScene) };
const load = jest.fn((_url, onLoad) => onLoad({ scene: sourceScene }));

jest.mock('three/examples/jsm/loaders/GLTFLoader.js', () => ({
  GLTFLoader: jest.fn().mockImplementation(() => ({
    setDRACOLoader: jest.fn(),
    load,
  })),
}));

jest.mock('three/examples/jsm/loaders/DRACOLoader.js', () => ({
  DRACOLoader: jest.fn().mockImplementation(() => ({
    setDecoderPath: jest.fn(),
  })),
}));

describe('loadModel', () => {
  beforeEach(() => {
    jest.resetModules();
    load.mockClear();
  });

  it('caches model load promises and returns cloned scenes', async () => {
    const { clearModelCache, loadModel } = await import('@/lib/loadModel');
    clearModelCache();

    const first = await loadModel('/models/ring-starter.glb');
    const second = await loadModel('/models/ring-starter.glb');

    expect(first).toEqual({ cloned: true });
    expect(second).toEqual({ cloned: true });
    expect(load).toHaveBeenCalledTimes(1);
    expect(sourceScene.clone).toHaveBeenCalledTimes(1);
  });
});
