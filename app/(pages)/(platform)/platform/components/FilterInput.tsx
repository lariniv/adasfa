import CheckBox from "@/app/components/CheckBox";
import useOutsideClick from "@/app/hooks/use-outside-click";
import { useAppDispatch } from "@/app/store/hooks";
import {
  getAllVendors,
  searchVendors,
  searchVendorsByMultipleOptions,
} from "@/app/store/vendors/vendor-thunks";
import {
  capitalizeString,
  transformUnderscoreString,
} from "@/app/utils/string-helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function FilterInput({
  label,
  field,
  hints,
}: {
  label: string;
  field:
    | "location"
    | "useCase"
    | "name"
    | "industry"
    | "category"
    | "description";
  hints?: string[];
}) {
  const [inputValue, setInputValue] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [activeHints, setActiveHints] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputValue.length > 1) {
      if (field === "useCase" || field === "category")
        dispatch(
          searchVendors({
            field,
            search: inputValue.trim().replace(/\s+/g, "_"),
          })
        );
      else dispatch(searchVendors({ field, search: inputValue.trim() }));
    } else dispatch(getAllVendors());
  }, [inputValue, dispatch, field]);

  useEffect(() => {
    console.log(field);
    if (activeHints.length > 0)
      dispatch(searchVendorsByMultipleOptions({ options: activeHints, field }));
    else dispatch(getAllVendors());
  }, [activeHints, field, dispatch]);

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
            {hints.map((hint) => {
              let formattedHint: string;
              if (field === "category" || field === "useCase")
                formattedHint = transformUnderscoreString(hint);
              else if (field === "industry")
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
          src={"search.svg"}
          width={24}
          height={24}
          alt="search"
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
}
