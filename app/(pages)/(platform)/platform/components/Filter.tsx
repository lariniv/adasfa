import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterInput from "./FilterInput";
export default function Filter({
  icon,
  label,
  inputs,
}: {
  icon: string;
  label: string;
  inputs: {
    field:
      | "location"
      | "useCase"
      | "name"
      | "industry"
      | "category"
      | "description";
    label: string;
    hints?: string[];
  }[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-4 items-start justify-start">
      <Image src={`${icon}.svg`} alt={icon} width={36} height={36} />
      <div className="flex flex-col w-full">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full relative cursor-pointer rounded text-primary text-sm font-bold border-2 border-primary py-2 flex items-center justify-center"
        >
          <div>{label}</div>
          <Image
            className={`absolute right-2 top-1/2 transition-transform duration-300 -translate-y-1/2 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            src={"chevron-down.svg"}
            width={16}
            height={16}
            alt="chevron-down"
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-secondary"
            >
              <div className="w-full h-full px-3 py-4 flex flex-col gap-4">
                {inputs.map(({ field, label, hints }) => {
                  return (
                    <FilterInput
                      key={field}
                      field={field}
                      label={label}
                      hints={hints}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
