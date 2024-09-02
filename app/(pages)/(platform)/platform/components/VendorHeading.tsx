import { ResizablePanel } from '@/components/ui/resizable';
import Image from 'next/image';

export default function VendorHeading({
  title,
  isSelected,
  col,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
}: {
  title: string;
  isSelected: boolean;
  col: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}) {
  return (
    <ResizablePanel defaultSize={100 / 72}>
      <div
        className="relative cursor-move h-full flex p-4 font-semibold whitespace-nowrap"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        id={col}
      >
        <span>{title}</span>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 p-1 border rounded-full"
          onClick={onClick}
        >
          <Image
            src="/chevron-down.svg"
            width={16}
            height={16}
            alt="chevron"
            className={`duration-300 transition-transform ${
              isSelected ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
    </ResizablePanel>
  );
}
