import TextingAnimation from "@/app/components/TextingAnimation";
import Image from "next/image";
import Link from "next/link";
export default function HeroSection() {
  return (
    <div className="h-full mt-28 text-white max-w-5xl max-md:px-2 w-[95%] xl:w-full flex flex-col xl:mx-auto gap-12 md:gap-2 mx-5">
      <div className="w-full">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-16 items-start">
            <div className="flex items-start justify-center gap-3">
              <Image
                src={"/chat.svg"}
                width={30}
                height={30}
                alt="chat-picture"
              />
              <div className="font-medium text">
                <TextingAnimation
                  initialTimeout={0}
                  text="There are over 50,000 AI companies. How can I find the one I need?"
                />
              </div>
            </div>

            <div className="flex items-start justify-center gap-3">
              <Image
                src={"/ai.svg"}
                width={30}
                height={30}
                alt="chat-picture"
              />
              <div className="font-bold text">
                <TextingAnimation initialTimeout={3500} text="Use Zenith AI!" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-center pl-[22px] lg:pl-[42px]">
            <Image
              src={"/documents.svg"}
              alt="documents"
              width={16}
              height={16}
            />
            <Image
              src={"/document.svg"}
              alt="document"
              width={16}
              height={16}
            />
            <Image
              src={"/arrow-undo.svg"}
              alt="arrow-undo"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <div className="w-full md:w-1/2 flex flex-col gap-9">
          <h1 className="text-4xl font-bold max-md:text-center">
            Closing the AI adoption gap with an AI-native{" "}
            <span className="lg:text-accent text-4xl font-bold text-primary ">
              market intelligence platform
            </span>
          </h1>
          <Link
            target="_blank"
            href={
              "https://ien3r4fhpkk.typeform.com/to/tzSoVio1?typeform-source=www.linkedin.com"
            }
            className="flex bg-white w-full max-md:mx-auto duration-300 hover:opacity-80 max-w-[400px] rounded-md py-5 items-center justify-center"
          >
            <span className="clip-gradient font-bold text-2xl">
              Sign up to join our Platform!
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
