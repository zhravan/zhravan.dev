'use client';

import { useRef } from 'react';
import { CommandPalette, CommandPaletteHandle } from './CommandPalette';
import { MobileSearchButton } from './MobileSearchButton';

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

  return (
    <>
      <div className="fixed top-16 right-4 z-30 lg:hidden">
        <MobileSearchButton onClick={() => paletteRef.current?.open()} />
      </div>
      <CommandPalette ref={paletteRef} {...props} />
    </>
  );
}
