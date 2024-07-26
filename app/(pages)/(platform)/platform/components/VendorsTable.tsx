import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import {
  getAllVendors,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { VendorType } from '@/app/store/vendors/vendor-slice';
import {
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import VendorColumn from './VendorColumn';
import React from 'react';

export default function VendorsTable() {
  const store = useAppStore();
  const [isFetched, setIsFetched] = useState(false);

  if (!isFetched) {
    store.dispatch(getAllVendors());
    setIsFetched(true);
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

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = useMemo(
    () => vendors.slice(indexOfFirstVendor, indexOfLastVendor),
    [vendors, indexOfFirstVendor, indexOfLastVendor]
  );

  const [cols, setCols] = useState<
    Array<{ col: keyof VendorType; list: string[] | string[][] }>
  >([
    { col: 'name', list: ['names'] },
    { col: 'location', list: ['locations'] },
    { col: 'foundedDate', list: ['dates'] },
    { col: 'industry', list: ['industries'] },
    { col: 'useCase', list: ['useCases'] },
    { col: 'category', list: ['categories'] },
    { col: 'description', list: ['descriptions'] },
    { col: 'websiteUrl', list: ['urls'] },
  ]);

  useEffect(() => {
    const names = currentVendors.map((vendor) => vendor.name);
    const locations = currentVendors.map((vendor) => vendor.location);
    const dates = currentVendors.map((vendor) => vendor.foundedDate);
    const industries = currentVendors.map((vendor) => vendor.industry);
    const useCases = currentVendors.map((vendor) => vendor.useCase);
    const categories = currentVendors.map((vendor) => vendor.category);
    const descriptions = currentVendors.map((vendor) => vendor.description);
    const urls = currentVendors.map((vendor) => vendor.websiteUrl);

    setCols((prevCols) =>
      prevCols.map((col) => {
        switch (col.col) {
          case 'name':
            return { ...col, list: names };
          case 'location':
            return { ...col, list: locations };
          case 'foundedDate':
            return { ...col, list: dates };
          case 'industry':
            return { ...col, list: industries };
          case 'useCase':
            return { ...col, list: useCases };
          case 'category':
            return { ...col, list: categories };
          case 'description':
            return { ...col, list: descriptions };
          case 'websiteUrl':
            return { ...col, list: urls };
          default:
            return col;
        }
      })
    );
  }, [currentVendors]);

  useEffect(() => {
    currentFilter.field &&
      store.dispatch(
        sortVendorsByFIlter({
          field: currentFilter.field,
          order: currentFilter.order,
        })
      );
  }, [currentFilter]);

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

  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: keyof VendorType
  ) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      const draggedIndex = cols.findIndex(({ col }) => col === draggedColumn);
      const targetIndex = cols.findIndex(({ col }) => col === columnId);
      const newColumns = [...cols];
      const [removed] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, removed);
      setCols(newColumns);
    }
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
  };

  return (
    <div className="w-full 2xl:w-5/6 h-full max-2xl:px-8 max-sm:px-2">
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

      {!state.isLoading && (
        <ResizablePanelGroup
          direction="horizontal"
          className="border min-w-[1400px] w-full"
        >
          {cols.map(({ col, list }, index) => {
            return (
              <React.Fragment key={index}>
                <VendorColumn
                  list={list}
                  col={col}
                  isSelected={
                    currentFilter.field === col &&
                    currentFilter.order !== 'desc'
                  }
                  onDragEnd={handleDragEnd}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                    handleDragOver(e, col)
                  }
                  onDragStart={() => handleDragStart(col)}
                  onClick={() => handleFilterClick(col)}
                />
                {index !== cols.length - 1 && <ResizableHandle />}
              </React.Fragment>
            );
          })}
        </ResizablePanelGroup>
      )}
      {state.isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
}
