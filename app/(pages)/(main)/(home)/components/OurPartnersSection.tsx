"use client";
import Partner from "@/app/components/Partner";

export default function OurPartners() {
  return (
    <div className="w-full max-w-7xl my-8">
      <h3 className="w-full text-center text-white mt-8 font-bold text-3xl">
        Our Partners
      </h3>

      <div className="grid max-md:grid-cols-1 w-full max-md:gap-16 md:gap-y-16 mt-16 grid-cols-3">
        <Partner image="roosh.png" />
        <Partner image="muffintech.png" />
        <Partner image="founder-institute.png" />
      </div>
    </div>
  );
}
