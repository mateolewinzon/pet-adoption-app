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
          className="rounded-xl"
          src={images[index].url}
          fill
        />
        <a
          className="absolute left-0"
          onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </a>
        <a
          className="absolute right-0"
          onClick={() => setIndex(index + 1 === images.length ? 0 : index + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </a>
      </div>
      {images.length > 0 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((image, key) => (
            <div
              key={key}
              onClick={() => setIndex(key)}
              className={twMerge(
                "h-4 w-4 bg-gray-300 rounded-full cursor-pointer",
                key === index && "bg-blue-500"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
