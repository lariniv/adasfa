import CheckBox from '@/app/components/CheckBox';
import useOutsideClick from '@/app/hooks/use-outside-click';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setCurrentFilter, VendorType } from '@/app/store/vendors/vendor-slice';
import {
  getAllVendors,
  searchVendors,
  searchVendorsByMultipleOptions,
} from '@/app/store/vendors/vendor-thunks';
import {
  capitalizeString,
  transformToUnderscoreString,
  transformUnderscoreString,
} from '@/app/utils/string-helpers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function FilterInput({
  label,
  field,
  hints,
}: {
  label: string;
  field: keyof VendorType;
  hints?: string[];
}) {
  const [inputValue, setInputValue] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [activeHints, setActiveHints] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { filter: currentField, value } = useAppSelector(
    (state) => state.vendor.currentFilter
  );

  useEffect(() => {
    if (currentField === field && value && field !== 'name')
      if (Array.isArray(value)) setActiveHints(value);
      else setActiveHints([value]);
  }, [currentField, field, value]);

  useEffect(() => {
    if (currentField === 'name') {
      setActiveHints([]);
    }
  }, [currentField, field]);

  useEffect(() => {
    if (activeHints.length > 0)
      dispatch(searchVendorsByMultipleOptions({ options: activeHints, field }));
    else {
      dispatch(setCurrentFilter({ filter: null, value: null }));
      dispatch(getAllVendors());
    }
  }, [activeHints, field, dispatch]);

  useEffect(() => {
    if (field === 'name' && inputValue.length >= 3) {
      dispatch(searchVendors({ search: inputValue, field }));
      dispatch(setCurrentFilter({ filter: field, value: inputValue }));
    }
  }, [inputValue, field, dispatch]);

  useOutsideClick(`.${field}`, () => setShowHints(false));

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowHints(true)}
        />
        {hints && showHints && (
          <div
            className={`absolute flex flex-col gap-2 top-full left-0 bg-white w-full z-50 max-h-[200px] h-auto overflow-y-auto border p-3 rounded-b-lg border-primary border-t-0 ${field}`}
          >
            {inputValue.length >= 3 &&
              field !== 'useCase' &&
              field !== 'category' &&
              field !== 'name' &&
              hints.filter((hint) =>
                hint.toLowerCase().includes(inputValue.toLowerCase())
              ).length !== 0 &&
              hints
                .filter((hint) =>
                  hint.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((hint) => {
                  let formattedHint: string;
                  if (field === 'industry')
                    formattedHint = capitalizeString(hint);
                  else formattedHint = hint;
                  return (
                    <div key={hint} className="flex items-center gap-2 text-xs">
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
                        className={field}
                      />
                      {formattedHint}
                    </div>
                  );
                })}
            {(inputValue.length >= 3 &&
              field !== 'name' &&
              field === 'useCase') ||
              (field === 'category' &&
                hints.filter((hint) =>
                  hint
                    .toLowerCase()
                    .includes(
                      transformToUnderscoreString(inputValue.toLowerCase())
                    )
                ).length !== 0 &&
                hints
                  .filter((hint) =>
                    hint
                      .toLowerCase()
                      .includes(
                        transformToUnderscoreString(inputValue.toLowerCase())
                      )
                  )
                  .map((hint) => {
                    let formattedHint: string;
                    if (field === 'category' || field === 'useCase')
                      formattedHint = transformUnderscoreString(hint);
                    else formattedHint = hint;
                    return (
                      <div
                        key={hint}
                        className="flex items-center gap-2 text-xs"
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
                          className={field}
                        />
                        {formattedHint}
                      </div>
                    );
                  }))}
            {inputValue.length < 3 &&
              field !== 'category' &&
              hints.map((hint) => {
                let formattedHint: string;
                if (field === 'useCase')
                  formattedHint = transformUnderscoreString(hint);
                else if (field === 'industry')
                  formattedHint = capitalizeString(hint);
                else formattedHint = hint;
                return (
                  <div key={hint} className="flex items-center gap-2 text-xs">
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
                      className={field}
                    />
                    {formattedHint}
                  </div>
                );
              })}
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
            let formattedHint: string;
            if (field === 'category' || field === 'useCase')
              formattedHint = transformUnderscoreString(hint);
            else if (field === 'industry')
              formattedHint = capitalizeString(hint);
            else formattedHint = hint;
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
                {formattedHint}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="black"
                    stroke-width="1"
                    stroke-linecap="round"
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
