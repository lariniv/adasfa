import Image from "next/image";
import Link from "next/link";

export default function HeaderDashboard() {
  return (
    <header className="w-full h-fit grid grid-cols-[1fr_4fr_3fr] p-3 gap-4 bg-zenith-gradient-to-t">
      <div className="flex gap-2 items-center justify-start w-full">
        <div className="w-10 h-10 bg-zenith-gradient-to-t rounded-full" />
        <div className="text-white font-bold text-3xl">
          <span className="drop-shadow-2xl">Zenith AI</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center relative">
        <input
          type="text"
          className="placeholder:text-[#737373]/50 text-[#737373]/50 bg-white w-full h-full py-2 pr-9 pl-6 outline-none rounded-sm"
          placeholder="Search Zenith AI"
        />
        <Image
          src={"search.svg"}
          width={24}
          height={24}
          alt="search"
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
      <div className="text-sm text-white flex w-full items-center justify-between">
        <div className="font-bold cursor-not-allowed">Explore Platform</div>
        <div className="cursor-not-allowed">Ask AI consultant</div>
        <Link
          href="mailto:maciej@zenithstrategy.ai"
          className="font-medium"
          target="_blank"
        >
          Support
        </Link>
        <div className="font-medium cursor-not-allowed">Account</div>
      </div>
    </header>
  );
}
