import Image from "next/image";
import Link from "next/link";

export default function ForVendorsSection() {
  return (
    <>
      <section id="section">
        <div
          id="forVendors"
          className="flex justify-between items-center md:pr-12"
        >
          <div className="flex max-lg:hidden">
            <div className="flex overflow-hidden">
              <div className="relative">
                <div className="w-[140px] rotate-90 z-40 aspect-square bg-zenith-gradient-to-t rounded-full"></div>
                <div className="w-[140px] h-[140px] absolute left-0 top-0 -translate-x-1/2 z-50 bg-white"></div>
              </div>
              <div className="relative">
                <div className="w-[140px] rotate-90 z-40 aspect-square bg-zenith-gradient-to-t rounded-full"></div>
                <div className="w-[140px] h-[140px] absolute left-0 top-0 translate-x-1/2 z-50 bg-white"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 text-primary px-2">
            <h2 className="font-bold text-2xl max-lg:text-center">
              Why should you join our Platform?
            </h2>
            <div className="text-xl flex flex-col gap-7">
              <p className="font-bold max-lg:text-center">
                {`There’s no better way to gain visibility and engage with tech
  	            buyers.`}
              </p>
              <div className="flex max-lg:flex-col max-lg:gap-6 justify-between items-center">
                <p className="w-1/2 max-lg:w-full max-md:text-center">
                  Sign up for our Platform and get the access to hot leads
                  looking for AI products and services!
                </p>
                <Link
                  target="_blank"
                  href={
                    "https://ien3r4fhpkk.typeform.com/to/tzSoVio1?typeform-source=www.linkedin.com"
                  }
                  className="flex w-fit text-center border-2 rounded-md font-bold items-center justify-center px-2 py-5 border-primary max-sm:text-xl"
                >
                  Become verified AI Vendor!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-5xl max-lg:px-5 w-full md:gap-16 gap-4 flex flex-col font-bold text-xl text-white mt-24">
        <div className="flex justify-between max-md:flex-col">
          <div className="flex items-center justify-center flex-col gap-6">
            <Image
              alt="handshake"
              src={"/handshake.svg"}
              width={100}
              height={100}
            />
            <p className="text-center">
              Get access to clients <br /> seeing AI products
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6">
            <Image
              alt="contract"
              src={"/contract.svg"}
              width={100}
              height={100}
            />
            <p className="text-center">
              Be seen in RFPs among <br /> hundreds of buyers
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6">
            <Image alt="geo" src={"/geo.svg"} width={100} height={100} />
            <p className="text-center">
              Get visibility in the <br /> AI ecosystem
            </p>
          </div>
        </div>
        <div className="flex mx-auto md:gap-40 max-md:flex-col">
          <div className="flex items-center justify-center flex-col gap-6">
            <Image alt="trophy" src={"/trophy.svg"} width={100} height={100} />
            <p className="text-center">
              Get access to clients <br /> seeing AI products
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6">
            <Image alt="table" src={"/table.svg"} width={100} height={100} />
            <p className="text-center">
              Be seen in RFPs among <br /> hundreds of buyers
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
