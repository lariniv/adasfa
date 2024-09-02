import { VendorType } from '@/app/store/vendors/vendor-slice';
import {
  capitalizeString,
  splitByUpperCaseAndCapitalize,
} from '@/app/utils/string-helpers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ResizablePanel } from '@/components/ui/resizable';
import { Expand } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  if (col === 'pros' || col === 'cons' || col === 'pricing') {
    title = capitalizeString(col);
  } else if (
    col === 'detailUrl' ||
    col === 'shortDescription' ||
    col === 'primaryTask' ||
    col === 'applicableTasks' ||
    col === 'fullDescription' ||
    col === 'visitWebsiteUrl'
  )
    title = splitByUpperCaseAndCapitalize(col);
  else if (col.includes('Q')) title = `Question ${col.slice(1)}`;
  else if (col.includes('A')) title = `Answer ${col.slice(1)}`;
  else if (col === 'logoUrl') title = ' ';

  if (col === 'detailUrl' || col === 'visitWebsiteUrl')
    return (
      <ResizablePanel defaultSize={parseFloat((100 / 72).toFixed(1))}>
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
            {list.map((item, index) => (
              <div
                key={index}
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t flex relative"
              >
                {item ? (
                  <Link href={item as string} target="_blank">
                    {item}
                  </Link>
                ) : (
                  'N/A'
                )}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
    );

  if (col === 'logoUrl')
    return (
      <ResizablePanel defaultSize={parseFloat((100 / 72).toFixed(1))}>
        <div id={col} className="w-full">
          <div
            className="relative cursor-move h-full flex p-4 font-semibold whitespace-nowrap min-h-[56px]"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <span>{title}</span>
          </div>

          <div className="w-full flex flex-col">
            {list.map((item, index) => (
              <div
                key={index}
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t flex h-[57px] relative"
              >
                {item ? (
                  <img
                    src={item as string}
                    className="w-4 h-4"
                    alt={item as string}
                  />
                ) : (
                  'N/A'
                )}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
    );

  if (Array.isArray(list[0])) {
    return (
      <ResizablePanel defaultSize={parseFloat((100 / 72).toFixed(1))}>
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
                className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t flex relative"
              >
                {item
                  ? Array.isArray(item)
                    ? item.map((word) => capitalizeString(word)).join(', ')
                    : capitalizeString(item)
                  : 'N/A'}
                <Dialog>
                  <DialogTrigger className="w-3 h-3 absolute left-1 bottom-0 cursor-pointer">
                    <Expand className="w-3 h-3" />
                  </DialogTrigger>
                  <DialogContent className="z-[9999]">
                    <DialogHeader>
                      <DialogTitle>
                        {item
                          ? Array.isArray(item)
                            ? item
                                .map((word) => capitalizeString(word))
                                .join(', ')
                            : capitalizeString(item)
                          : 'N/A'}
                      </DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
    );
  }

  return (
    <ResizablePanel defaultSize={parseFloat((100 / 72).toFixed(1))}>
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
          {list.map((item, index) => (
            <div
              key={index}
              className="whitespace-nowrap overflow-hidden px-2 text-ellipsis py-4 w-full text-[#183444] font-medium border-t flex relative"
            >
              {item
                ? Array.isArray(item)
                  ? item.map((word) => capitalizeString(word)).join(', ')
                  : capitalizeString(item)
                : 'N/A'}
              {(item && item.length > 50 && !Array.isArray(item)) ||
                (item && item.length > 15 && Array.isArray(item) && (
                  <Dialog>
                    <DialogTrigger className="w-3 h-3 absolute left-1 bottom-1 cursor-pointer">
                      <Expand className="w-3 h-3" />
                    </DialogTrigger>
                    <DialogContent className="z-[9999]">
                      <DialogHeader>
                        <DialogTitle>
                          {item
                            ? Array.isArray(item)
                              ? item
                                  .map((word) => capitalizeString(word))
                                  .join(', ')
                              : capitalizeString(item)
                            : 'N/A'}
                        </DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
          ))}
        </div>
      </div>
    </ResizablePanel>
  );
}
