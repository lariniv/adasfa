'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVendorsByPage } from '../store/vendors/vendor-thunks';
import useOutsideClick from '../hooks/use-outside-click';
import { AnimatePresence, motion } from 'framer-motion';
import { setCurrentFilter } from '../store/vendors/vendor-slice';

export default function HeaderDashboard() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.vendor);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  useEffect(() => {
    if (inputValue === '') dispatch(getVendorsByPage({ page: 1 }));
    else if (inputValue.length >= 3) {
      dispatch(
        getVendorsByPage({
          page: 1,
          filter: { filter: 'name', value: inputValue },
        })
      );
    } else if (inputValue.length === 0) {
      dispatch(setCurrentFilter({ filter: null, value: null }));
      dispatch(getVendorsByPage({ page: 1 }));
    }
  }, [inputValue, dispatch]);

  useOutsideClick('.input-popup', () => setIsOpen(false));

  useOutsideClick('.burger-popup', () => setIsPopup(false));

  return (
    <header className="w-full h-fit grid 2xl:grid-cols-[1fr_4fr_3fr] sm:grid-cols-[minmax(175px,1fr)_4fr_20px] grid-cols-[40px_1fr_20px] p-3 gap-4 bg-zenith-gradient-to-t relative">
      <Link href={'/'} className="flex gap-2 items-center justify-start w-full">
        <div className="w-10 h-10 bg-zenith-gradient-to-t rounded-full" />
        <div className="text-white font-bold min-xl:text-3xl text-2xl max-sm:hidden">
          <span className="drop-shadow-2xl">Zenith AI</span>
        </div>
      </Link>
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
          <div className="w-full input-popup h-auto absolute bg-white border z-[100] p-2 py-1 md:p-6 md:py-4 rounded-b-lg top-full text-[#737373]/80 flex flex-col gap-2">
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
                    <div>Primary Task · {vendor.primaryTask}</div>
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
      <div className="text-sm text-white w-full items-center justify-between hidden 2xl:flex">
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
      <div
        className="flex 2xl:hidden flex-col gap-1 max-w-[20px] cursor-pointer burger-popup"
        onClick={() => setIsPopup(!isPopup)}
      >
        <div className="h-[2px] w-full bg-white"></div>
        <div className="h-[2px] w-full bg-white"></div>
        <div className="h-[2px] w-full bg-white"></div>
      </div>

      <AnimatePresence>
        {isPopup && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key={'popup'}
            className="burger-popup absolute w-fit top-full max-w-[360px] right-0 bg-white p-4 rounded-b-lg shadow-lg z-[100] flex flex-col gap-2 text-sm text-text 2xl:hidden"
          >
            <div className="font-bold cursor-not-allowed">Explore Platform</div>
            <div className="cursor-not-allowed">Ask AI consultant</div>
            <Link
              href="mailto:maciej@zenithstrategy.ai"
              className="font-medium"
              target="_blank"
            >
              Support
            </Link>
            <div className="font-medium cursor-not-allowed ">Account</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
