'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectDescriptionProps {
  description: string;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const isOverflow = ref.current.scrollHeight > ref.current.clientHeight;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [description]);

  return (
    <div className="project-description-wrapper">
      <p 
        ref={ref}
        className="project-description" 
        title={isOverflowing ? description : undefined}
      >
        {description}
      </p>
      {isOverflowing && (
        <div className="project-description-tooltip">
          {description}
        </div>
      )}
    </div>
  );
}





