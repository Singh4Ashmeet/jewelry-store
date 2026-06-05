import { detectorKindForAnchor } from '@/lib/mediapipe-detectors';

describe('MediaPipe detector routing', () => {
  it('uses hand tracking for rings and bracelets', () => {
    expect(detectorKindForAnchor('ring')).toBe('hands');
    expect(detectorKindForAnchor('bracelet')).toBe('hands');
  });

  it('uses face mesh tracking for earrings and necklaces', () => {
    expect(detectorKindForAnchor('earring')).toBe('face');
    expect(detectorKindForAnchor('necklace')).toBe('face');
  });
});
