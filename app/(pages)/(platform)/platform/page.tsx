"use client";
import Image from "next/image";
import Filter from "./components/Filter";
import VendorRow from "./components/VendorRow";
import VendorHeading from "./components/VendorHeading";
import { useState } from "react";

export default function LoginPage() {
  const [currentFilter, setCurrentFilter] = useState("");

  const handleFilterClick = (filter: string) => {
    if (filter === currentFilter) {
      setCurrentFilter("");
    } else {
      setCurrentFilter(filter);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex gap-0 pt-4 px-8 text-text font-medium border-b">
        <div className="py-4 px-8 rounded-t-lg bg-secondary cursor-pointer">
          Vendors
        </div>
        <div className="py-4 px-8 rounded-t-lg cursor-pointer">Use Cases</div>
        <div className="py-4 px-8 rounded-t-lg cursor-pointer">Industries</div>
        <div className="py-4 px-8 rounded-t-lg cursor-pointer">Categories</div>
      </div>
      <div className="flex gap-7 pt-3">
        <div className="w-1/6 pl-8 flex flex-col gap-5">
          <div className="font-bold text-xl">Filters</div>
          <div className="flex flex-col gap-8">
            <Filter
              label="Overview"
              icon="filter-search"
              inputs={["vendor name", "location", "keyword"]}
            />
            <Filter
              label="Use Cases"
              icon="filter-bookmark"
              inputs={["use case"]}
            />
            <Filter
              label="Industries"
              icon="filter-claw"
              inputs={["Industry"]}
            />
            <Filter
              label="Categories"
              icon="filter-corporate"
              inputs={["category"]}
            />
          </div>
        </div>
        <div className="w-5/6 h-full">
          <div className="text-text">1-20 of 20.000 results</div>
          <div className="dashboard-table">
            <div className="table-heading" />
            <VendorHeading
              title="Vendor Name"
              isSelected={currentFilter === "vendorName"}
              onClick={() => handleFilterClick("vendorName")}
            />
            <VendorHeading
              title="Location"
              isSelected={currentFilter === "location"}
              onClick={() => handleFilterClick("location")}
            />
            <VendorHeading
              title="Founded Date"
              isSelected={currentFilter === "foundedDate"}
              onClick={() => handleFilterClick("foundedDate")}
            />
            <VendorHeading
              title="Industry"
              isSelected={currentFilter === "industry"}
              onClick={() => handleFilterClick("industry")}
            />
            <VendorHeading
              title="Use Case"
              isSelected={currentFilter === "useCase"}
              onClick={() => handleFilterClick("useCase")}
            />
            <VendorHeading
              title="Headquarters Location"
              isSelected={currentFilter === "hqLocation"}
              onClick={() => handleFilterClick("hqLocation")}
            />

            <VendorRow
              name="Vendor Name"
              location="Location"
              foundedDate="Founded Date"
              industry="Industry"
              useCase="Use Case"
              hqLocation="Headquarters Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
