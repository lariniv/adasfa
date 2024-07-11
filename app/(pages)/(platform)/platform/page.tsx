'use client';
import Filter from './components/Filter';
import { useEffect, useRef, useState } from 'react';
import VendorsTable from './components/VendorsTable';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import Image from 'next/image';
import {
  getAllHints,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { VendorType } from '@/app/store/vendors/vendor-slice';

export default function LoginPage() {
  const [currentPage, setCurrentPage] = useState<keyof VendorType>('name');
  const store = useAppStore();

  useEffect(() => {
    store.dispatch(getAllHints());
  }, []);

  useEffect(() => {
    store.dispatch(sortVendorsByFIlter({ field: currentPage }));
  }, [currentPage]);

  const { locations, useCases, industries, categories } = useAppSelector(
    (state) => state.vendor.hints
  );

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex gap-0 pt-4 px-8 text-text font-medium border-b">
        <div
          className={`py-4 px-8 rounded-t-lg cursor-pointer duration-300 transition-colors flex gap-2 items-center ${
            currentPage === 'name' ? 'bg-secondary' : 'bg-white'
          }`}
          onClick={() => setCurrentPage('name')}
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
          className={`py-4 px-8 rounded-t-lg cursor-pointer duration-300 flex items-center gap-2 transition-colors ${
            currentPage === 'useCase' ? 'bg-secondary' : 'bg-white'
          }`}
          onClick={() => setCurrentPage('useCase')}
        >
          <Image src={'/bookmark.svg'} width={24} height={24} alt="bookmark" />
          Use Cases
        </div>
        <div
          className={`py-4 px-8 rounded-t-lg  flex items-center gap-2 cursor-pointer duration-300 transition-colors ${
            currentPage === 'industry' ? 'bg-secondary' : 'bg-white'
          }`}
          onClick={() => setCurrentPage('industry')}
        >
          <Image src={'/claw.svg'} width={24} height={24} alt="filter-claw" />
          Industries
        </div>
        <div
          className={`py-4 px-8 flex items-center gap-2 rounded-t-lg cursor-pointer duration-300 transition-colors ${
            currentPage === 'category' ? 'bg-secondary' : 'bg-white'
          }`}
          onClick={() => setCurrentPage('category')}
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
      <div className="flex gap-7 pt-3">
        <div className="w-1/6 pl-8 flex flex-col gap-5 min-w-[360px]">
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
                { field: 'location', label: 'Location', hints: locations },
                { field: 'description', label: 'Keyword' },
              ]}
            />
            <Filter
              label="Use Cases"
              icon="filter-bookmark"
              inputs={[
                { field: 'useCase', label: 'Use Cases', hints: useCases },
              ]}
            />
            <Filter
              label="Industries"
              icon="filter-claw"
              inputs={[
                { field: 'industry', label: 'Industries', hints: industries },
              ]}
            />
            <Filter
              label="Categories"
              icon="filter-corporate"
              inputs={[
                { field: 'category', label: 'Category', hints: categories },
              ]}
            />
          </div>
        </div>
        <VendorsTable />
      </div>
    </div>
  );
}
