import Image from "next/image";
import Link from "next/link";

export default function TeamSection() {
  return (
    <section id="section" className="!px-4 !pb-20 sm:!px-[4.5rem]">
      <h1 className="text-primary mb-16 font-bold text-3xl">Team</h1>

      <div className="flex flex-col gap-20">
        <Card
          image="Chojecki"
          name="Przemysław Chojecki, PhD"
          title="Chief Technology Officer"
          description={
            <>
              Przemek is an AI entrepreneur with a PhD in mathematics and a
              member of Forbes 30 under 30 list in Poland. He did his PhD in
              Paris at Universite Pierre et Marie Curie, then became a Research
              Fellow and a lecturer at the University of Oxford. After returning
              to Poland, he took up research on artificial intelligence and
              mathematics, and founded{" "}
              <Link
                target="_blank"
                href={"https://ulam.ai/"}
                className="underline"
              >
                ulam.ai
              </Link>
              . Within the group he co-founded multiple AI ventures ranging from
              logistics to the fashion market, and using cutting-edge
              technologies.
            </>
          }
        />

        <Card
          image="Dabrowski"
          title="Chief Operating Officer"
          name="Maciej Dąbrowski"
          description={`Prior to joining ffVC, Maciej worked at Bain & Company for 2 years on Due Diligence projects for the biggest Private Equity funds in the US. He advised on projects focused on Ecommerce, enterprise software and gaming sectors. At JLL, he advised Fortune 500 companies on their real estate strategy within Europe. He helped them in seamless transition of their real estate footprint from long-term leases to solutions based on flexible workspaces. Maciej graduated from Warsaw School of Economics and studied at Management Center Innsbruck in Austria.`}
        />

        <Card
          image="Wilk-Tryjanowska"
          title="Chief Ecosystem Officer"
          name="Karolina Wilk-Tryjanowska"
          description={`Karolina is an expert in building ecosystems and VC platforms, with significant roles at Demium, and Innovation Nest. She has managed pan-European startup programs such as Founder Institute and ReaktorX. Co-founded see.community. Recognized as one of the Top 100 Women in the VC and Startup Ecosystem in Poland. An early employee at CardioCube (med-tech, US exit), also successfully exited her own ed-tech company. Karolina lectures on Startup Management at Kozminski University and holds an MBA from the Warsaw School of Economics.`}
        />
        <Card
          image="Zawistowski"
          title="Chief Executive Officer"
          name="Mateusz Zawistowski, PhD"
          description={`Mateusz has over 9 years of experience in M&A, commercial, financial and banking law. He spent last 8 years at White&Case and previously worked for a “club of nine” British law firm and one of the biggest Polish law firms. Mateusz successfully advised on numerous transactions in Europe of over $15bn value, in particular in regulated sectors: telecoms, energy and financial services. Prior to joining ffVC, he has also been involved in numerous early stage tech projects, both related to incubating start-ups, creating JV’s and launching new business lines.`}
        />
      </div>
    </section>
  );
}

function Card({
  name,
  description,
  title,
  image,
}: {
  name: string;
  description: string | React.ReactNode;
  image: string;
  title: string;
}) {
  return (
    <div className="max-lg:flex max-lg:flex-col grid grid-cols-[176px,1fr]  max-lg:items-center gap-[2.25rem]">
      <div className="w-[176px] max-w-[176px] flex items-center justify-center">
        <Image
          className="w-[176px] h-[176px]"
          src={`/team/${image}.png`}
          alt={image}
          width={176}
          height={176}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="text-start flex flex-col">
          <div className="text-2xl">
            <span className="clip-gradient font-bold ">{name}</span>
          </div>
          <div className="text-primary font-bold text-base">{title}</div>
        </div>

        <div className="bg-zenith-gradient pl-0.5">
          <article className="bg-white text-start pl-8 font-medium text-sm lg:text-base  text-primary">
            {description}
          </article>
        </div>
      </div>
    </div>
  );
}
