'use client';
import Filter from './components/Filter';
import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import VendorsTable from './components/VendorsTable';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import Image from 'next/image';
import {
  getAllHints,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { VendorType } from '@/app/store/vendors/vendor-slice';
import useOutsideClick from '@/app/hooks/use-outside-click';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [currentPage, setCurrentPage] = useState<keyof VendorType>('name');
  const store = useAppStore();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    store.dispatch(getAllHints());

    const handleResize = () => {
      if (window.innerWidth > 1536) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    store.dispatch(sortVendorsByFIlter({ field: currentPage }));
  }, [currentPage]);

  useOutsideClick('.filters', () => {
    if (window.innerWidth <= 1536) {
      setIsOpen(false);
    }
  });

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="w-full flex gap-0 pt-4 sm:px-8 text-text font-medium border-b max-md:flex-col">
        <div
          className={`py-4 px-2 sm:px-8 rounded-t-lg cursor-pointer duration-300 transition-colors flex gap-2 items-center ${
            currentPage === 'name' ? 'bg-secondary' : 'bg-white'
          }`}
          // onClick={() => setCurrentPage('name')}
          // onClick={() => setCurrentPage('name')}
        >
          <Image
            src={'/briefcase.svg'}
            width={24}
            height={24}
            alt="briefcase"
          />
          <span>Vendors</span>
        </div>
        <div
          className={`py-4 px-2 sm:px-8 rounded-t-lg duration-300 flex items-center gap-2 transition-colors cursor-not-allowed ${
            currentPage === 'primaryTask' ? 'bg-secondary' : 'bg-white'
          }`}
          // onClick={() => setCurrentPage('useCase')}
          // onClick={() => setCurrentPage('useCase')}
        >
          <Image src={'/bookmark.svg'} width={24} height={24} alt="bookmark" />
          Use Cases
        </div>
        <div
          className={`py-4 px-2 sm:px-8 rounded-t-lg  flex items-center gap-2 duration-300 transition-colors cursor-not-allowed ${
            currentPage === 'applicableTasks' ? 'bg-secondary' : 'bg-white'
          }`}
          // onClick={() => setCurrentPage('industry')}
          // onClick={() => setCurrentPage('industry')}
        >
          <Image src={'/claw.svg'} width={24} height={24} alt="filter-claw" />
          Industries
        </div>
        <div
          className={`py-4 px-2 sm:px-8 flex items-center gap-2 rounded-t-lg duration-300 transition-colors cursor-not-allowed ${
            currentPage === 'cons' ? 'bg-secondary' : 'bg-white'
          }`}
          // onClick={() => setCurrentPage('category')}
          // onClick={() => setCurrentPage('category')}
        >
          <Image
            src={'/corporate.svg'}
            width={24}
            height={24}
            alt="briefcase"
          />
          Categories
        </div>
      </div>
      <div className="flex gap-7 pt-3 relative overflow-x-auto">
        <motion.div
          key={'filters'}
          variants={{
            active: { opacity: 1, x: 0 },
            inactive: { opacity: 0, x: -50 },
          }}
          animate={isOpen ? 'active' : 'inactive'}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className="w-1/6 filters pl-8 flex flex-col gap-5 min-w-[360px] max-2xl:absolute max-2xl:bg-white z-[300] max-2xl:p-2 max-2xl:h-full max-2xl:rounded-r-md max-2xl:pl-4 max-2xl:border-r"
        >
          <div className="font-bold text-xl">Filters</div>
          <div className="flex flex-col gap-8">
            <Filter
              label="Overview"
              icon="filter-search"
              inputs={[
                {
                  field: 'name',
                  label: 'Vendor Name',
                },
                {
                  field: 'primaryTask',
                  label: 'Primary Task',
                },
                { field: 'fullDescription', label: 'Full Description' },
              ]}
            />
            <Filter
              label="Applicable Task"
              icon="filter-bookmark"
              inputs={[
                {
                  field: 'applicableTasks',
                  label: 'Applicable Task',
                },
              ]}
            />
            <Filter
              label="Pros"
              icon="filter-claw"
              inputs={[
                {
                  field: 'pros',
                  label: 'Pros',
                },
              ]}
            />
            <Filter
              label="Cons"
              icon="filter-corporate"
              inputs={[
                {
                  field: 'cons',
                  label: 'Cons',
                },
              ]}
            />
          </div>
        </motion.div>
        <VendorsTable />
      </div>
      <Image
        src={'./chevron-down.svg'}
        alt="show-filters"
        className={`absolute filters ${
          isOpen ? '-rotate-90' : 'rotate-90'
        } top-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer 2xl:hidden z-[310] transition-transform duration-300`}
        width={16}
        height={16}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
