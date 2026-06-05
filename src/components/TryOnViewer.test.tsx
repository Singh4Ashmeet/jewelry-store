import { render, screen } from '@testing-library/react';
import { calculateAnchorTransform, TryOnViewer } from '@/components/TryOnViewer';
import { products } from '@/lib/data';

jest.mock('@/lib/loadModel', () => ({
  hasRenderableChildren: jest.fn(() => false),
  loadModel: jest.fn(),
}));

describe('TryOnViewer', () => {
  it('shows a privacy notice before activating camera', () => {
    const product = products.find((item) => item.tryOn)!;

    render(<TryOnViewer product={product} tryOn={product.tryOn!} />);

    expect(screen.getByText('Private Virtual Try-On')).toBeInTheDocument();
    expect(screen.getByText(/processed in-memory/i)).toBeInTheDocument();
  });

  it('calculates hand anchor transforms for ring placement', () => {
    const landmarks = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
    landmarks[5] = { x: 0.42, y: 0.5, z: 0 };
    landmarks[13] = { x: 0.5, y: 0.48, z: 0 };
    landmarks[14] = { x: 0.51, y: 0.46, z: 0 };
    landmarks[17] = { x: 0.58, y: 0.5, z: 0 };

    expect(calculateAnchorTransform('ring', landmarks, 1000, 800)).toEqual(
      expect.objectContaining({ x: expect.any(Number), y: expect.any(Number), scale: expect.any(Number) }),
    );
  });
});
