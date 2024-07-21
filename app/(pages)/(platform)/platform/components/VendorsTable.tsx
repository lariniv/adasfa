import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import VendorHeading from './VendorHeading';
import VendorRow from './VendorRow';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import {
  getAllVendors,
  sortVendorsByFIlter,
} from '@/app/store/vendors/vendor-thunks';
import { VendorType } from '@/app/store/vendors/vendor-slice';
import {
  capitalizeString,
  splitByUpperCaseAndCapitalize,
} from '@/app/utils/string-helpers';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

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

  const [colsOrder, setColsOrder] = useState<Array<keyof VendorType>>([
    'name',
    'location',
    'foundedDate',
    'industry',
    'useCase',
    'category',
    'description',
    'websiteUrl',
  ]);

  const [colWidth, setColWidth] = useState<
    Array<{ col: keyof VendorType; width: string }>
  >([
    { col: 'name', width: '1fr' },
    { col: 'location', width: '1fr' },
    { col: 'foundedDate', width: '1fr' },
    { col: 'industry', width: '1fr' },
    { col: 'useCase', width: '1fr' },
    { col: 'category', width: '1fr' },
    { col: 'description', width: '1fr' },
    { col: 'websiteUrl', width: '1fr' },
  ]);

  const [tableStyle, setTableStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    console.log(colsOrder, colWidth);
    setTableStyle({
      gridTemplateColumns: `48px ${colsOrder
        .map(
          (col1) =>
            `minmax(110px,${
              colWidth.find((col2) => col1 === col2.col)?.width ?? '1fr'
            })`
        )
        .join(' ')}`,
    });
  }, [colsOrder, colWidth]);

  const reorder = (
    list: Array<keyof VendorType>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = reorder(
      colsOrder,
      result.source.index,
      result.destination.index
    );

    setColsOrder(items);
    console.log(colsOrder);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="dashboard-table min-w-[1400px]"
                style={tableStyle}
              >
                <div className="table-heading">
                  <div className="absolute h-full w-[1px] bg-[#E5E7EB] top-0 -right-[1px] z-[50]" />
                </div>

                {colsOrder.map((col, index) => {
                  let name: string = 'Vendor Name';
                  if (
                    col === 'location' ||
                    col === 'industry' ||
                    col === 'category' ||
                    col === 'description'
                  ) {
                    name = capitalizeString(col);
                  } else if (
                    col === 'useCase' ||
                    col === 'foundedDate' ||
                    col === 'websiteUrl'
                  ) {
                    name = splitByUpperCaseAndCapitalize(col);
                  }

                  return (
                    <VendorHeading
                      key={col}
                      col={col}
                      index={index}
                      title={name}
                      isSelected={currentFilter.field === col}
                      setColWidth={(width: number) =>
                        setColWidth((prev) =>
                          prev
                            .filter((c) => c.col !== col)
                            .concat({ col, width: `${width}px` })
                        )
                      }
                      onClick={() => handleFilterClick(col)}
                    />
                  );
                })}
                {provided.placeholder}
                {currentVendors &&
                  !state.isLoading &&
                  currentVendors.map((vendor) => (
                    <VendorRow
                      key={vendor._id}
                      list={colsOrder.map((field) => ({
                        field: field,
                        value: vendor[field],
                      }))}
                    />
                  ))}
                {!currentVendors.length && (
                  <div className="w-full flex items-center justify-center text-2xl font-semibold">
                    No vendors found.
                  </div>
                )}
              </div>
              {state.isLoading && (
                <div className="w-full flex items-center justify-center pt-16">
                  <div className="w-20 h-20 rounded-full border-4 border-text border-t-text/50 animate-spin" />
                </div>
              )}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
