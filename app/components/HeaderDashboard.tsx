'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllVendors, searchVendors } from '../store/vendors/vendor-thunks';
import useOutsideClick from '../hooks/use-outside-click';

export default function HeaderDashboard() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.vendor);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (inputValue === '') dispatch(getAllVendors());
    else if (inputValue.length > 2)
      dispatch(searchVendors({ search: inputValue, field: 'name' }));
  }, [inputValue, dispatch]);

  useOutsideClick('.input-popup', () => setIsOpen(false));

  return (
    <header className="w-full h-fit grid grid-cols-[1fr_4fr_3fr] p-3 gap-4 bg-zenith-gradient-to-t">
      <div className="flex gap-2 items-center justify-start w-full">
        <div className="w-10 h-10 bg-zenith-gradient-to-t rounded-full" />
        <div className="text-white font-bold text-3xl">
          <span className="drop-shadow-2xl">Zenith AI</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center relative">
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocusCapture={() => setIsOpen(true)}
          value={inputValue}
          type="text"
          className="placeholder:text-[#737373]/80 input-popup text-[#737373]/80 bg-white w-full h-full py-2 pr-9 pl-6 outline-none rounded-sm"
          placeholder="Search Zenith AI"
        />
        <Image
          src={'search.svg'}
          width={24}
          height={24}
          alt="search"
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        {inputValue.length > 2 && isOpen && (
          <div className="w-full input-popup h-auto absolute bg-white border z-[100] pl-6 py-4 rounded-b-lg top-full text-[#737373]/80 flex flex-col gap-2">
            {vendors
              .filter((vendor) => new RegExp(inputValue, 'i').test(vendor.name))
              .slice(0, vendors.length > 5 ? 5 : vendors.length)
              .map((vendor) => (
                <div
                  key={vendor._id}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setInputValue(vendor.name)}
                >
                  <div className="border w-10 h-10 bg-primary rounded"></div>
                  <div className="flex flex-col text-text font-medium text-xs">
                    <div>{vendor.name}</div>
                    <div>Location · {vendor.location}</div>
                  </div>
                </div>
              ))}
            {vendors.filter((vendor) =>
              new RegExp(inputValue, 'i').test(vendor.name)
            ).length === 0 && (
              <div className="font-medium text-text">No vendors found</div>
            )}
          </div>
        )}
      </div>
      <div className="text-sm text-white flex w-full items-center justify-between">
        <div className="font-bold cursor-not-allowed">Explore Platform</div>
        <div className="cursor-not-allowed">Ask AI consultant</div>
        <Link
          href="mailto:maciej@zenithstrategy.ai"
          className="font-medium"
          target="_blank"
        >
          Support
        </Link>
        <div className="font-medium cursor-not-allowed">Account</div>
      </div>
    </header>
  );
}
