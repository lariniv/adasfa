import { useEffect, useRef, useState } from 'react';
import VendorHeading from './VendorHeading';
import VendorRow from './VendorRow';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import {
  getAllVendors,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { VendorType } from '@/app/store/vendors/vendor-slice';

export default function VendorsTable() {
  const store = useAppStore();
  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(getAllVendors());
    initialized.current = true;
  }

  const { vendors, state } = useAppSelector((state) => state.vendor);

  const [currentFilter, setCurrentFilter] = useState<{
    field: keyof VendorType | '';
    order: 'desc' | 'asc';
  }>({ field: '', order: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 20;

  const handleFilterClick = (filter: keyof VendorType) => {
    setCurrentFilter((prev) => ({
      field: filter,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    currentFilter.field &&
      store.dispatch(
        sortVendorsByFIlter({
          field: currentFilter.field,
          order: currentFilter.order,
        })
      );
  }, [currentFilter]);

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;
    let startPage, endPage;

    if (totalPages <= maxVisibleButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.floor(maxVisibleButtons / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxVisibleButtons;
      } else if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - maxVisibleButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {startPage > 1 && (
          <div>
            <button
              key={1}
              onClick={() => handlePageChange(1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              1
            </button>
            <span className="mx-1">...</span>
          </div>
        )}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <div>
            <span className="mx-1">...</span>
            <button
              key={totalPages}
              onClick={() => handlePageChange(totalPages)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-primary text-white'
                  : 'bg-gray-200'
              }`}
            >
              {totalPages}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full 2xl:w-5/6 h-full max-2xl:px-8 max-sm:px-2 overflow-x-auto">
      <div className="flex pb-5 justify-between items-center min-w-[1000px] w-full">
        <div className="text-text ">
          {vendors.length !== 0 ? indexOfFirstVendor + 1 : 0}-
          {Math.min(indexOfLastVendor, vendors.length)} of {vendors.length}{' '}
          results
        </div>
        <div className="mt-4 flex justify-center">
          {renderPaginationButtons()}
        </div>
      </div>
      <div className="dashboard-table min-w-[1000px]">
        <div className="table-heading" />
        <VendorHeading
          title="Vendor Name"
          isSelected={
            currentFilter.field === 'name' && currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('name')}
        />
        <VendorHeading
          title="Location"
          isSelected={
            currentFilter.field === 'location' && currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('location')}
        />
        <VendorHeading
          title="Founded Date"
          isSelected={
            currentFilter.field === 'foundedDate' &&
            currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('foundedDate')}
        />
        <VendorHeading
          title="Industry"
          isSelected={
            currentFilter.field === 'industry' && currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('industry')}
        />
        <VendorHeading
          title="Use Case"
          isSelected={
            currentFilter.field === 'useCase' && currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('useCase')}
        />
        <VendorHeading
          title="Category"
          isSelected={
            currentFilter.field === 'category' && currentFilter.order !== 'desc'
          }
          onClick={() => handleFilterClick('category')}
        />
        {currentVendors &&
          !state.isLoading &&
          currentVendors.map((vendor) => (
            <VendorRow
              key={vendor._id}
              name={vendor.name}
              location={vendor.location}
              foundedDate={vendor.foundedDate}
              industries={vendor.industry}
              useCases={vendor.useCase}
              categories={vendor.category}
            />
          ))}
      </div>
      {!currentVendors.length && (
        <div className="w-full flex items-center justify-center text-2xl font-semibold">
          No vendors found.
        </div>
      )}
      {state.isLoading && (
        <div className="w-full flex items-center justify-center pt-16">
          <div className="w-20 h-20 rounded-full border-4 border-text border-t-text/50 animate-spin" />
        </div>
      )}
    </div>
  );
}
