import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = {
  images: { url: string }[];
  alt: string;
};

export const ImageCarousel = ({ images, alt }: Props) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex items-center relative display-inline-block h-[500px]">
        <Image
          alt={alt}
          style={{ objectFit: "cover" }}
          className="rounded-b-xl shadow-xl"
          src={images[index].url}
          fill
        />
        <button
          className="absolute left-0"
          onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        >
          <i className="bi bi-chevron-compact-left text-6xl text-orange-500"></i>
        </button>
        <button
          className="absolute right-0"
          onClick={() => setIndex(index + 1 === images.length ? 0 : index + 1)}
        >
          <i className="bi bi-chevron-compact-right text-6xl text-orange-500"></i>
        </button>
      </div>
      {images.length > 0 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((image, key) => (
            <div
              key={key}
              onClick={() => setIndex(key)}
              className={twMerge(
                "h-4 w-4 bg-gray-300 rounded-full cursor-pointer",
                key === index && "bg-orange-500"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
