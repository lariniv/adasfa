import { useState } from "react";
import {
  capitalizeString,
  transformUnderscoreString,
} from "@/app/utils/string-helpers";
import { ISOStringToLL } from "@/app/utils/date-helpers";
import CheckBox from "@/app/components/CheckBox";

type VendorRow = {
  name: string;
  location: string;
  foundedDate: string;
  industries: string[];
  useCases: string[];
  categories: string[];
};

export default function VendorRow({
  name,
  location,
  foundedDate,
  industries,
  useCases,
  categories,
}: VendorRow) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center">
        <form>
          <CheckBox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </form>
      </div>
      <div className="table-content">{name}</div>
      <div className="table-content">{location}</div>
      <div className="table-content">{ISOStringToLL(foundedDate)}</div>
      <div className="table-content text-[#183444] font-medium">
        {industries.map((industry) => capitalizeString(industry)).join(", ")}
      </div>
      <div className="table-content text-[#183444] font-medium">
        {useCases
          .map((useCase) => transformUnderscoreString(useCase))
          .join(", ")}
      </div>
      <div className="table-content text-[#183444] font-medium">
        {categories
          .map((category) => transformUnderscoreString(category))
          .join(", ")}
      </div>
    </>
  );
}
