import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import React from 'react';
import { useEffect, useRef } from 'react';

export default function VendorHeading({
  title,
  isSelected,
  col,
  index,
  setColWidth,
  onClick,
}: {
  title: string;
  isSelected: boolean;
  col: string;
  index: number;
  setColWidth: (width: number) => void;
  onClick: () => void;
}) {
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = document.getElementById(col) as HTMLDivElement | null;
    const resizer = resizerRef.current;

    if (!div || !resizer) return;

    let startX: number, startWidth: number;

    const initResize = (e: MouseEvent) => {
      console.log('initResize');
      startX = e.clientX;
      if (document.defaultView === null) return;

      startWidth = parseInt(
        document.defaultView.getComputedStyle(div).width,
        10
      );
      document.documentElement.addEventListener('mousemove', resize);
      document.documentElement.addEventListener('mouseup', stopResize);
    };

    const resize = (e: MouseEvent) => {
      const width = startWidth + e.clientX - startX;
      console.log('resize', width);
      setColWidth(width);
    };

    const stopResize = () => {
      document.documentElement.removeEventListener('mousemove', resize);
      document.documentElement.removeEventListener('mouseup', stopResize);
    };

    resizer.addEventListener('mousedown', initResize);

    return () => {
      resizer.removeEventListener('mousedown', initResize);
    };
  }, []);
  return (
    <div className="relative">
      <Draggable key={col} draggableId={col} index={index}>
        {(provided) => (
          <div
            className="table-heading w-fit"
            ref={provided.innerRef}
            id={col}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <span>{title}</span>
            <div className="img-wrapper" onClick={onClick}>
              <Image
                src={'chevron-down.svg'}
                width={16}
                height={16}
                alt="chevron"
                className={`duration-300 transition-transform ${
                  isSelected ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
        )}
      </Draggable>
      <div
        ref={resizerRef}
        className="absolute flex items-center justify-center h-full w-[4px] top-0 -right-[2.5px] z-[200] group cursor-ew-resize"
      >
        <div className="w-[1px] h-full bg-[#E5E7EB]"></div>
      </div>
    </div>
  );
}
