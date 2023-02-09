import Image from "next/image";

export const ImageThumbnail = ({
    src,
    onClick,
  }: {
    src: string;
    onClick: () => void;
  }) => (
    <div className="relative">
      <Image alt='thumbnail' src={src} style={{objectFit:"cover"}} fill />
      <div className="relative flex justify-center w-[70px] h-[74px]">
        <div className="flex bg-neutral-800 bg-opacity-50 w-full opacity-0 hover:opacity-100">
          <i onClick={onClick} className="bi bi-x-circle text-white text-4xl flex items-center justify-center w-full cursor-pointer"></i>
        </div>
      </div>
    </div>
  );