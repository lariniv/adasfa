import { cn } from "../utils/cn";

export default function CheckBox({
  isChecked,
  onChange,
  className,
}: {
  isChecked: boolean;
  onChange: () => void;
  className?: string;
}) {
  return (
    <>
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={onChange}
      />
      <div
        className={`w-6 h-6 rounded-md cursor-pointer flex items-center border-2 justify-center ${
          isChecked ? "bg-accent" : "bg-white"
        }`}
        onClick={onChange}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(`h-4 w-4 text-white`, className)}
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </>
  );
}
