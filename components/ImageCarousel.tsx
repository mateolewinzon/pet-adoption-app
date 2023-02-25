import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  images: { url: string }[];
  alt: string;
};

const options = {
  dots: true,
  speed: 500,
};

export const ImageCarousel = ({ images, alt }: Props) => {
  return (
    <Slider {...options}>
      {images.map((image, key) => (
        <li key={key}>
          <div className="h-[500px] relative">
            <Image
              src={image.url}
              alt={alt}
              style={{ objectFit: "cover" }}
              fill
              className="shadow"
            />
          </div>
        </li>
      ))}
    </Slider>
  );
};
