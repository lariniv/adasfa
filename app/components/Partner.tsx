import Image from "next/image";

export default function Partner({ image }: { image: string }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        alt={image.split(".")[0]}
        src={`/partners/${image}`}
        width={200}
        height={40}
      />
    </div>
  );
}
