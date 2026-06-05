import type { TryOnAnchorType } from '@/types';
import type { FaceMesh } from '@mediapipe/face_mesh';
import type { Hands } from '@mediapipe/hands';

export type MediaPipeLandmark = {
  x: number;
  y: number;
  z?: number;
};

type ResultsWithHands = {
  multiHandLandmarks?: MediaPipeLandmark[][];
};

type ResultsWithFace = {
  multiFaceLandmarks?: MediaPipeLandmark[][];
};

type PendingDetection = (landmarks: MediaPipeLandmark[] | null) => void;

export class MediaPipeHandsDetector {
  private hands?: Hands;
  private pending?: PendingDetection;

  async init() {
    if (this.hands) return;
    const { Hands } = await import('@mediapipe/hands');
    this.hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
      selfieMode: true,
    });
    this.hands.onResults((results: ResultsWithHands) => {
      this.pending?.(results.multiHandLandmarks?.[0] ?? null);
      this.pending = undefined;
    });
  }

  async detect(video: HTMLVideoElement) {
    await this.init();
    return new Promise<MediaPipeLandmark[] | null>((resolve) => {
      this.pending = resolve;
      void this.hands?.send({ image: video });
    });
  }

  close() {
    this.pending = undefined;
    this.hands?.close();
    this.hands = undefined;
  }
}

export class MediaPipeFaceMeshDetector {
  private faceMesh?: FaceMesh;
  private pending?: PendingDetection;

  async init() {
    if (this.faceMesh) return;
    const { FaceMesh } = await import('@mediapipe/face_mesh');
    this.faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
      selfieMode: true,
    });
    this.faceMesh.onResults((results: ResultsWithFace) => {
      this.pending?.(results.multiFaceLandmarks?.[0] ?? null);
      this.pending = undefined;
    });
  }

  async detect(video: HTMLVideoElement) {
    await this.init();
    return new Promise<MediaPipeLandmark[] | null>((resolve) => {
      this.pending = resolve;
      void this.faceMesh?.send({ image: video });
    });
  }

  close() {
    this.pending = undefined;
    this.faceMesh?.close();
    this.faceMesh = undefined;
  }
}

export function detectorKindForAnchor(anchorType: TryOnAnchorType) {
  return anchorType === 'ring' || anchorType === 'bracelet' ? 'hands' : 'face';
}
