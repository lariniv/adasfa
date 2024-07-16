import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section id="section">
      <h1 id="aboutUs" className="text-primary font-bold text-3xl mb-6">
        About us
      </h1>

      <h2 className="mb-6">
        <span className="clip-gradient font-bold text-base">
          Experienced team with proven track record:
        </span>
      </h2>

      <div className="why-us-grid mb-6">
        <div>
          <span>
            Provided{" "}
            <strong className="inline">strategic advisory to S&P 500</strong>{" "}
            companies, European public companies and US investment funds
          </span>
        </div>

        <div>
          <span>
            <strong>Invested in 30+ tech companies</strong> as private and
            institutional investors
          </span>
        </div>

        <div>
          <span>
            <strong>Hired AI & IT</strong> teams and worked directly with
            software houses
          </span>
        </div>
        <div>
          <span>
            <strong>Built own tech companies</strong> in operator and technical
            roles
          </span>
        </div>
        <div>
          <span>
            <strong>Managed</strong> and optimized EUR 25M+ annual{" "}
            <strong>R&D budgets</strong>
          </span>
        </div>
      </div>

      <p className="text-center font-bold text-base mb-6">
        <span className="clip-gradient">We worked for</span>
      </p>

      <div className="w-3/4 flex max-md:flex-row md:flex-col gap-8 mx-auto mb-6">
        <div className="w-full flex max-md:flex-col items-center justify-center gap-5 xl:gap-16">
          <Image
            src={"/logos/bain-company.png"}
            alt="bain-company logo"
            width={220}
            height={24}
            className="h-fit"
          />

          <Image
            src={"/logos/venture-capital.png"}
            alt="venture-capital logo"
            width={80}
            height={40}
            className="h-fit"
          />

          <Image
            src={"/logos/philips.png"}
            alt="philips logo"
            width={120}
            height={24}
            className="h-fit"
          />

          <Image
            src={"/logos/dragoneer.png"}
            alt="dragoneer logo"
            width={140}
            height={80}
            className="h-fit"
          />

          <Image
            src={"/logos/orange.png"}
            alt="orange logo"
            width={80}
            height={80}
            className="h-fit"
          />
        </div>

        <div className="w-full flex max-md:flex-col items-center justify-center gap-5 xl:gap-16">
          <Image
            src={"/logos/coatue.png"}
            alt="orange logo"
            width={100}
            height={60}
            className="h-fit"
          />

          <Image
            src={"/logos/jll.png"}
            alt="jll logo"
            width={100}
            height={50}
            className="h-fit"
          />

          <Image
            src={"/logos/white-case.png"}
            alt="white-case logo"
            width={216}
            height={16}
            className="h-fit"
          />

          <Image
            src={"/logos/gpw.png"}
            alt="gpw logo"
            width={120}
            height={36}
            className="h-fit"
          />
        </div>
      </div>

      <div className="mx-auto">
        <span className="clip-gradient font-bold">
          We lecture at and graduated from
        </span>
      </div>

      <div className="11/12 md:flex max-md:grid max-md:grid-cols-2 gap-8 items-center justify-center">
        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/oxford.png"}
            alt="oxford logo"
            width={170}
            height={50}
            className="h-fit"
          />
        </div>

        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/cambridge.png"}
            alt="cambridge logo"
            width={250}
            height={60}
            className="h-fit"
          />
        </div>

        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/upmc.png"}
            alt="upmc logo"
            width={130}
            height={60}
            className="h-fit"
          />
        </div>

        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/politecnico.png"}
            alt="politecnico logo"
            width={110}
            height={80}
            className="h-fit"
          />
        </div>

        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/handlowa.png"}
            alt="handlowa logo"
            width={120}
            height={120}
            className="h-fit"
          />
        </div>

        <div className=" flex items-center justify-center">
          <Image
            src={"/logos/kozminskies-academy.png"}
            alt="kozminskies-academy logo"
            width={100}
            height={70}
            className="h-fit"
          />
        </div>
      </div>
    </section>
  );
}
