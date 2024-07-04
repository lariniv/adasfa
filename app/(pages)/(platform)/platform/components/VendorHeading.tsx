import Image from "next/image";

export default function VendorHeading({
  title,
  isSelected,
  onClick,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="table-heading" onClick={onClick}>
      <span>{title}</span>
      <Image
        src={"chevron-down.svg"}
        width={16}
        height={16}
        alt="chevron"
        className={`duration-300 transition-transform ${
          isSelected ? "rotate-180" : ""
        }`}
      />
    </div>
  );
}
