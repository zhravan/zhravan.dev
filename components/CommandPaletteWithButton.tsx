'use client';

import { useEffect, useRef } from 'react';
import { CommandPalette, CommandPaletteHandle } from './CommandPalette';

export const OPEN_COMMAND_PALETTE_EVENT = 'open-command-palette';

interface ContentItemForPalette {
  slug: string;
  title: string;
  date: string;
  description: string;
  path: string;
}

interface CommandPaletteWithButtonProps {
  contentItems: ContentItemForPalette[];
  fuzzyThreshold?: number;
  showPages?: boolean;
  showPosts?: boolean;
}

export function CommandPaletteWithButton(props: CommandPaletteWithButtonProps) {
  const paletteRef = useRef<CommandPaletteHandle>(null);

  useEffect(() => {
    const open = () => paletteRef.current?.open();
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
    return () => window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
  }, []);

  return <CommandPalette ref={paletteRef} {...props} />;
}
