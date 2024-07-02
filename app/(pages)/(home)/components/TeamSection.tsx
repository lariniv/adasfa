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
          description={`Maciej is a strategic advisor and technology investor. At Bain & Company, he advised large US funds on investments in pre-IPO technology companies. He served as an investment manager at ffVC, one of the oldest venture capital funds in New York, focusing on startups utilising artificial intelligence in their products. Maciej holds a master's degree from the Warsaw School of Economics, where he lectured on startup valuations. He also studied at MCI in Innsbruck, Austria.`}
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
          description={`Mateusz is an experienced advisor to technology and energy companies, lawyer, investor with over 10 years of experience. He was a Head of Fintech at ffVC, one of the oldest venture capital funds in New York. He invested in and managed Wolf 3D, one of Poland's largest 3D printing companies. Mateusz teaches AI in business at Kozminski University (ALK) and Politecnico di Milano. He holds a PhD in law and is a graduate of Cambridge University and UW. Mateusz has been a long-time advisor to the president of the WSE and chairman of the supervisory board of the Armenian Securities Exchange.`}
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
