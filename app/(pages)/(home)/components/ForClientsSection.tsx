import Image from "next/image";

export default function ForClientsSection() {
  return (
    <>
      <section id="section">
        <div
          id="forClients"
          className="flex justify-between gap-36 items-center"
        >
          <div className="flex flex-col gap-7 text-primary px-2">
            <h2 className="font-bold text-3xl max-sm:text-center max-sm:text-2xl">
              Why should you use Zenith AI Platform?
            </h2>
            <div className="text-2xl flex flex-col gap-7">
              <p className="font-bold max-sm:text-center max-sm:text-xl">
                {`Our Platform is your gateway to the world of AI solutions.`}
              </p>
              <p className="w-full max-sm:text-center max-sm:text-base">
                We connect proprietary data submitted by vendors with our
                data-driven scorecards that assess the products. So you can make
                sense of an increasingly fragmented, messy and noisy AI
                technology landscape.
              </p>
            </div>
          </div>
          <div className="flex w-1/3 h-[200px] max-md:hidden">
            <Image
              className="w-[130px] h-[200px]"
              alt="vertical-icon"
              src={"/vertical-icon.svg"}
              width={130}
              height={200}
            />
          </div>
        </div>
      </section>
      <div className="max-w-5xl mt-20 w-full gap-16 flex flex-col font-bold text-2xl text-white">
        <div className="flex justify-between items-start gap-1 max-md:flex-col">
          <div className="flex items-center justify-center flex-col gap-6 max-md:mx-auto max-md:w-full">
            <Image alt="map" src={"/map.svg"} width={120} height={120} />
            <p className="text-center max-w-[240px]">
              Get access to exclusive lists and maps of AI products
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6 max-md:mx-auto max-md:w-full">
            <Image alt="laptop" src={"/laptop.svg"} width={120} height={120} />
            <p className="text-center max-w-[240px]">
              Discover AI use cases for your organization
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6 max-md:mx-auto max-md:w-full">
            <Image
              alt="strategy"
              src={"/strategy.svg"}
              width={120}
              height={120}
            />
            <p className="text-center max-w-[240px]">
              Learn how industry leaders implement AI
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-6 max-md:mx-auto max-md:w-full">
            <Image alt="db" src={"/db.svg"} width={120} height={120} />
            <p className="text-center max-w-[240px]">
              Use our proprietary data on AI products and implement with
              confidence
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
