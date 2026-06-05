'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Download, ImagePlus, Move, RotateCcw, Share2, ShoppingBag, ZoomIn } from 'lucide-react';
import * as THREE from 'three';
import { toast } from 'sonner';
import { Button } from '@/components/common/button';
import { useCursor } from '@/hooks/useCursor';
import { hasRenderableChildren, loadModel } from '@/lib/loadModel';
import { useCartStore } from '@/store/cart-store';
import { METAL_LABELS, type Product, type ProductVariant, type TryOnAnchorType, type TryOnMetadata } from '@/types';

type ViewerMode = 'camera' | 'photo';
type Landmark = { x: number; y: number; z?: number };
type Transform = { x: number; y: number; z: number; scale: number; rotationZ: number };

const metalColors: Record<string, number> = {
  YELLOW_GOLD: 0xd4a44f,
  ROSE_GOLD: 0xc98f7a,
  WHITE_GOLD: 0xe8e5df,
  PLATINUM: 0xd9dde1,
  SILVER: 0xcfd4d9,
};

export function calculateAnchorTransform(
  anchorType: TryOnAnchorType,
  landmarks: Landmark[],
  width: number,
  height: number,
): Transform | null {
  if (!landmarks.length || width <= 0 || height <= 0) return null;

  const point = (index: number) => landmarks[index];
  const distance = (a: Landmark, b: Landmark) => Math.hypot((a.x - b.x) * width, (a.y - b.y) * height);

  if ((anchorType === 'ring' || anchorType === 'bracelet') && point(13) && point(14)) {
    const base = point(anchorType === 'ring' ? 14 : 0);
    const widthHint = point(5) && point(17) ? distance(point(5), point(17)) : width * 0.14;
    return { x: base.x - 0.5, y: 0.5 - base.y, z: 0, scale: widthHint / width, rotationZ: 0 };
  }

  if (anchorType === 'earring' && point(132) && point(361)) {
    const leftEar = point(132);
    const rightEar = point(361);
    return {
      x: (leftEar.x + rightEar.x) / 2 - 0.5,
      y: 0.5 - (leftEar.y + rightEar.y) / 2,
      z: 0,
      scale: distance(leftEar, rightEar) / width,
      rotationZ: 0,
    };
  }

  if (anchorType === 'necklace' && point(152)) {
    const chin = point(152);
    return { x: chin.x - 0.5, y: 0.33 - chin.y, z: 0, scale: 0.34, rotationZ: 0 };
  }

  return null;
}

function fallbackJewellery(anchorType: TryOnAnchorType, material: THREE.Material) {
  if (anchorType === 'ring') return new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 16, 48), material);
  if (anchorType === 'bracelet') return new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 16, 64), material);
  if (anchorType === 'necklace') return new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 16, 96, Math.PI), material);
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.SphereGeometry(0.08, 24, 24), material));
  group.add(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 24), material));
  group.children[1].position.y = -0.14;
  return group;
}

export function TryOnViewer({ product, tryOn }: { product: Product; tryOn: TryOnMetadata }) {
  const [mode, setMode] = useState<ViewerMode>('camera');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState('Camera is paused until you allow in-browser try-on.');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [scale, setScale] = useState(tryOn.scale);
  const [offsetX, setOffsetX] = useState(tryOn.offset.x);
  const [offsetY, setOffsetY] = useState(tryOn.offset.y);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerCursor = useCursor('pointer');
  const dragCursor = useCursor(isDragging ? 'grabbing' : 'grab');
  const zoomCursor = useCursor('zoom-in');
  const addItem = useCartStore((state) => state.addItem);
  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? product.variants[0],
    [product.variants, selectedVariantId],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      rendererRef.current?.dispose();
    };
  }, [photoUrl]);

  useEffect(() => {
    if (!privacyAccepted) return;
    void initScene();
    // Scene setup must run once after the privacy gate opens; subsequent control state changes update refs/state in the render loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privacyAccepted]);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;
    model.traverse((child) => {
      if ('isMesh' in child && child.isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: metalColors[selectedVariant?.metal ?? 'YELLOW_GOLD'],
          metalness: 0.85,
          roughness: 0.22,
        });
      }
    });
  }, [selectedVariant?.metal]);

  async function initScene() {
    const canvas = canvasRef.current;
    if (!canvas || rendererRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth || 960, canvas.clientHeight || 540, false);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(0, 1, 2);
    scene.add(key);
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 100);
    camera.position.z = 4;
    cameraRef.current = camera;

    const material = new THREE.MeshStandardMaterial({
      color: metalColors[selectedVariant?.metal ?? 'YELLOW_GOLD'],
      metalness: 0.85,
      roughness: 0.22,
    });

    try {
      const loaded = await loadModel(tryOn.modelUrl);
      const model = hasRenderableChildren(loaded) ? loaded : fallbackJewellery(tryOn.anchorType, material);
      modelRef.current = model;
      scene.add(model);
    } catch {
      const model = fallbackJewellery(tryOn.anchorType, material);
      modelRef.current = model;
      scene.add(model);
    }

    if (mode === 'camera') await startCamera();
    renderLoop();
  }

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMode('photo');
      setStatus('Camera is unavailable on this device. Upload a photo to continue.');
      return;
    }

    try {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus('Live try-on is active. If placement drifts, use the manual controls.');
      void initTracking();
    } catch {
      setMode('photo');
      setStatus('Camera permission was not granted. Upload a photo to use try-on.');
    }
  }

  async function initTracking() {
    try {
      const { FaceLandmarker, FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision');
      const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');
      const common = { baseOptions: { modelAssetPath: '' }, runningMode: 'VIDEO' as const, numHands: 1 };
      const hand = tryOn.anchorType === 'ring' || tryOn.anchorType === 'bracelet'
        ? await HandLandmarker.createFromOptions(vision, { ...common, baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task' } })
        : null;
      const face = !hand
        ? await FaceLandmarker.createFromOptions(vision, { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task' }, runningMode: 'VIDEO', numFaces: 1 })
        : null;

      const detect = () => {
        const video = videoRef.current;
        if (!video || video.readyState < 2 || mode !== 'camera') return;
        const now = performance.now();
        const result = hand?.detectForVideo(video, now).landmarks[0] ?? face?.detectForVideo(video, now).faceLandmarks[0];
        const transform = result ? calculateAnchorTransform(tryOn.anchorType, result, video.videoWidth, video.videoHeight) : null;
        if (transform && modelRef.current) {
          modelRef.current.position.set(transform.x + offsetX, transform.y + offsetY, transform.z);
          modelRef.current.scale.setScalar(Math.max(0.05, scale * transform.scale * 3));
          modelRef.current.rotation.z = transform.rotationZ;
        }
        frameRef.current = requestAnimationFrame(detect);
      };
      detect();
    } catch {
      setStatus('Automatic landmark tracking is unavailable. Manual placement controls are enabled.');
    }
  }

  function renderLoop() {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const model = modelRef.current;
    if (renderer && scene && camera) {
      if (model && mode === 'photo') {
        model.position.set(offsetX, offsetY, 0);
        model.scale.setScalar(scale * 0.45);
      }
      renderer.render(scene, camera);
    }
    frameRef.current = requestAnimationFrame(renderLoop);
  }

  function handlePhoto(file?: File | null) {
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setMode('photo');
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setStatus('Photo mode is active. Drag and resize the model until it aligns.');
  }

  function addToCart() {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url ?? '',
      metal: selectedVariant.metal,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity: 1,
      stock: selectedVariant.stock,
      sku: selectedVariant.sku,
    });
    toast.success('Try-on selection added to bag');
  }

  async function saveAndShare() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return;
    const file = new File([blob], `${product.slug}-try-on.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: `${product.name} try-on`, files: [file] });
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="overflow-hidden rounded-[8px] border border-[#EAE5DF] bg-[#111]">
        <div className="relative aspect-[4/3] min-h-[420px] touch-none bg-[#1C1C1A]">
          {!privacyAccepted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1C1C1A]/95 p-6 text-center text-white">
              <div className="max-w-md">
                <h2 className="font-display text-4xl">Private Virtual Try-On</h2>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  Camera and photo frames are processed in-memory in your browser. Aurelia does not store them unless you choose Save & Share.
                </p>
                <Button className={`mt-6 border-white bg-white text-[#1C1C1A] ${pointerCursor}`} onClick={() => setPrivacyAccepted(true)}>
                  Start Try-On
                </Button>
              </div>
            </div>
          )}
          {mode === 'camera' ? (
            <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" playsInline muted aria-label="Live camera preview" />
          ) : photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Uploaded try-on reference" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white/70">
              Upload a face or hand photo to start photo try-on.
            </div>
          )}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full ${dragCursor}`}
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
          />
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-sm text-white/75">{status}</p>
      </section>

      <aside className="rounded-[8px] border border-[#EAE5DF] bg-white p-5">
        <h1 className="font-display text-4xl">{product.name}</h1>
        <p className="mt-2 text-sm capitalize text-[#6B6B68]">{tryOn.anchorType} try-on</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant={mode === 'camera' ? 'primary' : 'secondary'} className={pointerCursor} onClick={() => { setMode('camera'); void startCamera(); }}>
            <Camera size={15} /> Live
          </Button>
          <label className={`inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[#B58E62] px-5 text-xs font-medium tracking-[0.18em] uppercase ${pointerCursor}`}>
            <ImagePlus size={15} />
            Photo
            <input className="sr-only" type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} />
          </label>
        </div>

        <label className="mt-6 grid gap-2 text-sm">
          Variant
          <select className={`h-11 border border-[#EAE5DF] bg-[#FCFAF8] px-3 ${pointerCursor}`} value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)}>
            {product.variants.map((variant: ProductVariant) => (
              <option key={variant.id} value={variant.id}>
                {METAL_LABELS[variant.metal]} {variant.size ? `size ${variant.size}` : ''}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="flex items-center gap-2"><ZoomIn size={15} /> Scale</span>
            <input className={zoomCursor} type="range" min="0.2" max="2" step="0.02" value={scale} onChange={(event) => setScale(Number(event.target.value))} />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="flex items-center gap-2"><Move size={15} /> Horizontal offset</span>
            <input className={dragCursor} type="range" min="-0.7" max="0.7" step="0.01" value={offsetX} onChange={(event) => setOffsetX(Number(event.target.value))} />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="flex items-center gap-2"><Move size={15} /> Vertical offset</span>
            <input className={dragCursor} type="range" min="-0.7" max="0.7" step="0.01" value={offsetY} onChange={(event) => setOffsetY(Number(event.target.value))} />
          </label>
        </div>

        <div className="mt-6 grid gap-3">
          <Button className={pointerCursor} onClick={addToCart} disabled={!selectedVariant || selectedVariant.stock < 1}>
            <ShoppingBag size={15} /> Add to Bag
          </Button>
          <Button variant="secondary" className={pointerCursor} onClick={saveAndShare}>
            <Share2 size={15} /> Save & Share
          </Button>
          <Button variant="ghost" className={pointerCursor} onClick={() => { setScale(tryOn.scale); setOffsetX(tryOn.offset.x); setOffsetY(tryOn.offset.y); }}>
            <RotateCcw size={15} /> Reset Placement
          </Button>
          <a className={`inline-flex h-11 items-center justify-center rounded-sm border border-transparent text-xs font-medium tracking-[0.18em] uppercase ${pointerCursor}`} href={tryOn.modelUrl} download>
            <Download size={15} /> Model file
          </a>
        </div>
      </aside>
    </div>
  );
}
