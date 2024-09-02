import CheckBox from '@/app/components/CheckBox';
import useOutsideClick from '@/app/hooks/use-outside-click';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setCurrentFilter, VendorType } from '@/app/store/vendors/vendor-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setCurrentFilter, VendorType } from '@/app/store/vendors/vendor-slice';
import {
  getVendorsAmount,
  getVendorsByPage,
  searchVendorsByMultipleOptions,
} from '@/app/store/vendors/vendor-thunks';
import { capitalizeString } from '@/app/utils/string-helpers';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

export default function FilterInput({
  label,
  field,
}: {
  label: string;
  field: keyof VendorType;
}) {
  const [inputValue, setInputValue] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [activeHints, setActiveHints] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { filter: currentField, value } = useAppSelector(
    (state) => state.vendor.currentFilter
  );

  const { hints: vendorHints, state } = useAppSelector((state) => state.vendor);

  useEffect(() => {
    if (
      currentField === field &&
      value &&
      (field === 'applicableTasks' || field === 'primaryTask')
    )
      if (Array.isArray(value)) {
        setActiveHints(value);
        dispatch(getVendorsAmount(null));
      } else {
        setActiveHints([value]);
        dispatch(getVendorsAmount(null));
      }
  }, [currentField, field, value, dispatch]);

  useEffect(() => {
    if (activeHints.length > 0) {
      dispatch(searchVendorsByMultipleOptions({ options: activeHints, field }));
      dispatch(getVendorsAmount(null));
    } else {
      dispatch(setCurrentFilter({ filter: null, value: null }));
      dispatch(getVendorsByPage({ page: 1 }));
      dispatch(getVendorsAmount(null));
    }
  }, [activeHints, field, dispatch]);

  useEffect(() => {
    if (field === 'name' && inputValue.length >= 3) {
      dispatch(searchVendors({ search: inputValue, field }));
      dispatch(setCurrentFilter({ filter: field, value: inputValue }));
    }
  }, [inputValue, field, dispatch]);

  useOutsideClick(`.${field}`, () => setShowHints(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.length >= 3) {
      dispatch(
        getVendorsByPage({
          page: 1,
          filter: { filter: field, value: inputValue },
        })
      );
      dispatch(getVendorsAmount({ filter: field, value: inputValue }));
    } else if (inputValue.length === 0) {
      dispatch(setCurrentFilter({ filter: null, value: null }));
      dispatch(getVendorsByPage({ page: 1 }));
      dispatch(getVendorsAmount(null));
    }
  }, [inputValue, field]);

  const filteredHints = useMemo(() => {
    if (field === 'applicableTasks') {
      return vendorHints.applicableTasks.filter((hint) =>
        hint.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else if (field === 'primaryTask') {
      return vendorHints.primaryTasks.filter((hint) =>
        hint.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return [];
  }, [inputValue, field, vendorHints]);

  return (
    <div key={field} className="flex flex-col gap-2 w-full">
      <label htmlFor={field} className="text-xs font-bold">
        {label}
      </label>
      <div className="w-full h-full relative">
        <input
          type="text"
          className={`${field} outline-none p-2 group placeholder:text-xs border-primary w-full border rounded`}
          placeholder="Search Zenith AI"
          onChange={handleInputChange}
          onFocus={() => setShowHints(true)}
        />
        {showHints &&
          (field === 'applicableTasks' || field === 'primaryTask') && (
            <div
              className={`absolute flex flex-col gap-2 top-full left-0 bg-white w-full z-50 max-h-[200px] h-auto overflow-y-auto border p-3 rounded-b-lg border-primary border-t-0 ${field}`}
            >
              <List
                height={200}
                itemCount={filteredHints.length}
                itemSize={35}
                width="100%"
              >
                {({ index, style }) => {
                  const hint = filteredHints[index];
                  return (
                    <div
                      key={hint}
                      style={style}
                      className={`flex items-center gap-2 text-xs ${field}`}
                    >
                      <CheckBox
                        isChecked={activeHints.includes(hint)}
                        onChange={() => {
                          if (activeHints.includes(hint))
                            setActiveHints((prev) =>
                              prev.filter((item) => item !== hint)
                            );
                          else if (!activeHints.includes(hint))
                            setActiveHints((prev) => [...prev, hint]);
                        }}
                        isDisabled={state.isLoading}
                      />
                      {capitalizeString(hint)}
                    </div>
                  );
                }}
              </List>
            </div>
          )}
        <Image
          src={'search.svg'}
          width={24}
          height={24}
          alt="search"
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
      {activeHints.length > 0 && (
        <div className="pt-2 flex flex-col gap-2">
          {activeHints.map((hint) => {
            return (
              <div
                key={hint}
                onClick={() => {
                  setActiveHints((prev) =>
                    prev.filter((item) => item !== hint)
                  );
                  setInputValue('');
                }}
                className="bg-accent/20 text-text w-fit px-3 py-1 text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {capitalizeString(hint)}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="black"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
