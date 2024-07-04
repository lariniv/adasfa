import { useState } from "react";

type VendorRow = {
  name: string;
  location: string;
  foundedDate: string;
  industry: string;
  useCase: string;
  hqLocation: string;
};

export default function VendorRow({
  name,
  location,
  foundedDate,
  industry,
  useCase,
  hqLocation,
}: VendorRow) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center">
        <form>
          <input type="checkbox" className="hidden" checked />
          <div
            className={`w-6 h-6 rounded-md cursor-pointer flex items-center border-2 justify-center ${
              isChecked ? "bg-accent" : "bg-white"
            }`}
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </form>
      </div>
      <div className="table-content">{name}</div>
      <div className="table-content">{location}</div>
      <div className="table-content">{foundedDate}</div>
      <div className="table-content">{industry}</div>
      <div className="table-content">{useCase}</div>
      <div className="table-content">{hqLocation}</div>
    </>
  );
}
