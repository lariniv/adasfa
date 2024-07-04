import capitalizeString from "@/app/helpers/capitalize-string";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Filter({
  icon,
  label,
  inputs,
}: {
  icon: string;
  label: string;
  inputs: string[];
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
              className="overflow-hidden bg-secondary"
            >
              <div className="w-full h-full px-3 py-4 flex flex-col gap-4">
                {inputs.map((name) => {
                  let title: string;
                  if (name.split(" ").length > 1)
                    title = name
                      .split(" ")
                      .map((word) => capitalizeString(word))
                      .join(" ");
                  else title = capitalizeString(name);
                  return (
                    <div key={name} className="flex flex-col gap-2 w-full">
                      <label htmlFor={name} className="text-xs font-bold">
                        {title}
                      </label>
                      <div className="w-full h-full relative">
                        <input
                          type="text"
                          id={name}
                          className="outline-none p-2 placeholder:text-xs border-primary w-full border rounded"
                          placeholder="Search Zenith AI"
                        />
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
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
