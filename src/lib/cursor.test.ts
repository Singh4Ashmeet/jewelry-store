import { cursorFor, interactiveCursor } from '@/lib/cursor';

describe('cursor utilities', () => {
  it('maps cursor intents to Tailwind cursor classes', () => {
    expect(cursorFor('pointer')).toBe('cursor-pointer');
    expect(cursorFor('grab')).toBe('cursor-grab');
    expect(cursorFor('grabbing')).toBe('cursor-grabbing');
    expect(cursorFor('zoom-in')).toBe('cursor-zoom-in');
  });

  it('uses a disabled cursor for unavailable controls', () => {
    expect(interactiveCursor(true)).toBe('cursor-not-allowed');
    expect(interactiveCursor(false)).toBe('cursor-pointer');
  });
});
