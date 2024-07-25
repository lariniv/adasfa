import { VendorType } from '@/app/store/vendors/vendor-slice';
import { ISOStringToLL } from '@/app/utils/date-helpers';
import {
  capitalizeString,
  splitByUpperCaseAndCapitalize,
  transformUnderscoreString,
} from '@/app/utils/string-helpers';
import { ResizablePanel } from '@/components/ui/resizable';
import Image from 'next/image';
export default function VendorColumn({
  list,
  col,
  isSelected,
  onDragStart,
  onDragOver,
  onDragEnd,
  onClick,
}: {
  list: string[][] | string[];
  col: keyof VendorType;
  isSelected: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}) {
  let title = 'Vendor Name';
  if (
    col === 'description' ||
    col === 'category' ||
    col === 'location' ||
    col === 'industry'
  ) {
    title = capitalizeString(col);
  }
  if (col === 'useCase' || col === 'foundedDate' || col === 'websiteUrl')
    title = splitByUpperCaseAndCapitalize(col);

  if (Array.isArray(list[0])) {
    return (
      <ResizablePanel defaultSize={100 / 8}>
        <div id={col} className="w-full">
          <div
            className="relative cursor-move h-full flex p-4 font-semibold whitespace-nowrap"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <span>{title}</span>
            <div
              className="absolute top-1/2 -translate-y-1/2 right-2 p-1 border  rounded-full z-[100] cursor-pointer"
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

          <div className="w-full flex flex-col">
            {list.map((item, index) => (
              <div
                key={index}
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t"
              >
                {(item as string[])
                  .map((i) => transformUnderscoreString(i))
                  .join(', ')}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
    );
  }

  return (
    <ResizablePanel defaultSize={100 / 8}>
      <div id={col} className="w-full">
        <div
          className="relative cursor-move h-full flex p-4 font-semibold whitespace-nowrap"
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <span>{title}</span>
          <div
            className="absolute top-1/2 -translate-y-1/2 right-2 p-1 border rounded-full z-[100] cursor-pointer"
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

        <div className="w-full flex flex-col">
          {col === 'foundedDate' &&
            list.map((item, index) => (
              <div
                key={index}
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t"
              >
                {ISOStringToLL(item as string)}
              </div>
            ))}

          {col !== 'foundedDate' &&
            list.map((item, index) => (
              <div
                key={index}
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t"
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </ResizablePanel>
  );
}
