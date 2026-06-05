export type CursorIntent = 'pointer' | 'grab' | 'grabbing' | 'zoom-in';

export const cursorClassByIntent: Record<CursorIntent, string> = {
  pointer: 'cursor-pointer',
  grab: 'cursor-grab',
  grabbing: 'cursor-grabbing',
  'zoom-in': 'cursor-zoom-in',
};

export function cursorFor(intent: CursorIntent) {
  return cursorClassByIntent[intent];
}

export function interactiveCursor(isDisabled?: boolean) {
  return isDisabled ? 'cursor-not-allowed' : cursorClassByIntent.pointer;
}
