'use client';

import { useMemo } from 'react';
import { cursorFor, type CursorIntent } from '@/lib/cursor';

export function useCursor(intent: CursorIntent) {
  return useMemo(() => cursorFor(intent), [intent]);
}
