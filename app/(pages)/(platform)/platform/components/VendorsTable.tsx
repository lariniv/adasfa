import { useEffect, useState } from 'react';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import {
  getVendorsByPage,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { setCurrentPage, VendorType } from '@/app/store/vendors/vendor-slice';
import {
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import VendorColumn from './VendorColumn';
import React from 'react';

type QAndA = {
  [key: `Q${number}`]: string[];
  [key: `A${number}`]: string[];
};

export default function VendorsTable() {
  const store = useAppStore();
  const [isFetched, setIsFetched] = useState(false);

  if (!isFetched) {
    store.dispatch(getVendorsByPage({ page: 1 }));
    setIsFetched(true);
  }

  const {
    vendors: currentVendors,
    state,
    vendorsAmount,
    currentPage,
  } = useAppSelector((state) => state.vendor);

  const [currentFilter, setCurrentFilter] = useState<{
    field: keyof VendorType | '';
    order: 'desc' | 'asc';
  }>({ field: '', order: 'desc' });
  const vendorsPerPage = 20;

  const handleFilterClick = (filter: keyof VendorType) => {
    setCurrentFilter((prev) => ({
      field: filter,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const indexOfLastVendor = currentPage * vendorsPerPage;

  const [cols, setCols] = useState<
    Array<{ col: keyof VendorType; list: string[] | string[][] }>
  >([
    { col: 'logoUrl', list: ['logoUrls'] },
    { col: 'detailUrl', list: ['detailUrls'] },
    { col: 'name', list: ['names'] },
    { col: 'shortDescription', list: ['shortDescriptions'] },
    { col: 'primaryTask', list: ['primaryTasks'] },
    { col: 'applicableTasks', list: ['applicableTasks'] },
    { col: 'fullDescription', list: ['fullDescriptions'] },
    { col: 'pros', list: ['pros'] },
    { col: 'cons', list: ['cons'] },
    { col: 'pricing', list: ['pricing'] },
    { col: 'visitWebsiteUrl', list: ['visitWebsiteUrls'] },
    { col: 'Q1', list: ['Q1s'] },
    { col: 'A1', list: ['A1s'] },
    { col: 'Q2', list: ['Q2s'] },
    { col: 'A2', list: ['A2s'] },
    { col: 'Q3', list: ['Q3s'] },
    { col: 'A3', list: ['A3s'] },
    { col: 'Q4', list: ['Q4s'] },
    { col: 'A4', list: ['A4s'] },
    { col: 'Q5', list: ['Q5s'] },
    { col: 'A5', list: ['A5s'] },
    { col: 'Q6', list: ['Q6s'] },
    { col: 'A6', list: ['A6s'] },
    { col: 'Q7', list: ['Q7s'] },
    { col: 'A7', list: ['A7s'] },
    { col: 'Q8', list: ['Q8s'] },
    { col: 'A8', list: ['A8s'] },
    { col: 'Q9', list: ['Q9s'] },
    { col: 'A9', list: ['A9s'] },
    { col: 'Q10', list: ['Q10s'] },
    { col: 'A10', list: ['A10s'] },
    { col: 'Q11', list: ['Q11s'] },
    { col: 'A11', list: ['A11s'] },
    { col: 'Q12', list: ['Q12s'] },
    { col: 'A12', list: ['A12s'] },
    { col: 'Q13', list: ['Q13s'] },
    { col: 'A13', list: ['A13s'] },
    { col: 'Q14', list: ['Q14s'] },
    { col: 'A14', list: ['A14s'] },
    { col: 'Q15', list: ['Q15s'] },
    { col: 'A15', list: ['A15s'] },
    { col: 'Q16', list: ['Q16s'] },
    { col: 'A16', list: ['A16s'] },
    { col: 'Q17', list: ['Q17s'] },
    { col: 'A17', list: ['A17s'] },
    { col: 'Q18', list: ['Q18s'] },
    { col: 'A18', list: ['A18s'] },
    { col: 'Q19', list: ['Q19s'] },
    { col: 'A19', list: ['A19s'] },
    { col: 'Q20', list: ['Q20s'] },
    { col: 'A20', list: ['A20s'] },
    { col: 'Q21', list: ['Q21s'] },
    { col: 'A21', list: ['A21s'] },
    { col: 'Q22', list: ['Q22s'] },
    { col: 'A22', list: ['A22s'] },
    { col: 'Q23', list: ['Q23s'] },
    { col: 'A23', list: ['A23s'] },
    { col: 'Q24', list: ['Q24s'] },
    { col: 'A24', list: ['A24s'] },
    { col: 'Q25', list: ['Q25s'] },
    { col: 'A25', list: ['A25s'] },
    { col: 'Q26', list: ['Q26s'] },
    { col: 'A26', list: ['A26s'] },
    { col: 'Q27', list: ['Q27s'] },
    { col: 'A27', list: ['A27s'] },
    { col: 'Q28', list: ['Q28s'] },
    { col: 'A28', list: ['A28s'] },
    { col: 'Q29', list: ['Q29s'] },
    { col: 'A29', list: ['A29s'] },
    { col: 'Q30', list: ['Q30s'] },
    { col: 'A30', list: ['A30s'] },
  ]);

  const extractQsAndAs = (vendors: VendorType[], numOfQuestions: number) => {
    const qAndAs: QAndA = {};
    for (let i = 1; i <= numOfQuestions; i++) {
      qAndAs[`Q${i}`] = vendors.map(
        (vendor) => (vendor[`Q${i}` as keyof VendorType] as string) || ''
      );
      qAndAs[`A${i}`] = vendors.map(
        (vendor) => (vendor[`A${i}` as keyof VendorType] as string) || ''
      );
    }
    return qAndAs;
  };

  useEffect(() => {
    if (!currentVendors) return;

    const names: string[] = [];
    const shortDescriptions: string[] = [];
    const primaryTasks: string[] = [];
    const applicableTasks: string[][] = [];
    const fullDescriptions: string[] = [];
    const pros: string[][] = [];
    const cons: string[][] = [];
    const pricing: string[] = [];
    const visitWebsiteUrls: string[] = [];
    const detailsUrls: string[] = [];
    const logoUrls: string[] = [];

    currentVendors.forEach((vendor) => {
      names.push(vendor.name);
      shortDescriptions.push(vendor.shortDescription);
      primaryTasks.push(vendor.primaryTask);
      applicableTasks.push(vendor.applicableTasks);
      fullDescriptions.push(vendor.fullDescription);
      pros.push(vendor.pros);
      cons.push(vendor.cons);
      pricing.push(vendor.pricing);
      visitWebsiteUrls.push(vendor.visitWebsiteUrl);
      detailsUrls.push(vendor.detailUrl);
      logoUrls.push(vendor.logoUrl);
    });

    const qAndAs = extractQsAndAs(currentVendors, 30);

    setCols((prevCols) =>
      prevCols.map((col) => {
        switch (col.col) {
          case 'name':
            return { ...col, list: names };
          case 'shortDescription':
            return { ...col, list: shortDescriptions };
          case 'primaryTask':
            return { ...col, list: primaryTasks };
          case 'applicableTasks':
            return { ...col, list: applicableTasks };
          case 'fullDescription':
            return { ...col, list: fullDescriptions };
          case 'pros':
            return { ...col, list: pros };
          case 'cons':
            return { ...col, list: cons };
          case 'pricing':
            return { ...col, list: pricing };
          case 'visitWebsiteUrl':
            return { ...col, list: visitWebsiteUrls };
          case 'detailUrl':
            return { ...col, list: detailsUrls };
          case 'logoUrl':
            return { ...col, list: logoUrls };
          // Handle Q&A properties dynamically
          default:
            return qAndAs[col.col as keyof QAndA]
              ? { ...col, list: qAndAs[col.col as keyof QAndA] }
              : col;
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

  const totalPages = Math.ceil(vendorsAmount / vendorsPerPage);

  useEffect(() => {}, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    store.dispatch(getVendorsByPage({ page: pageNumber }));
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
    <div className="w-full 2xl:w-5/6 h-full max-2xl:px-8 max-sm:px-2 overflow-x-auto min-w-[2000px]">
      <div className="flex pb-5 justify-between items-center min-w-[1000px] w-full">
        <div className="text-text ">
          {vendorsAmount !== 0 ? currentPage * 20 - 20 + 1 : 0}-
          {Math.min(indexOfLastVendor, vendorsAmount)} of {vendorsAmount}{' '}
          results
        </div>
        <div className="mt-4 flex justify-center">
          {renderPaginationButtons()}
        </div>
      </div>

      {!state.isLoading && (
        <ResizablePanelGroup
          direction="horizontal"
          className="border min-w-[2000px]"
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
