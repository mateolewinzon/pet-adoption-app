import Image from "next/image";
import { User } from "@prisma/client";

type Props = {
  user: User;
  size?: number;
};

export const ProfilePicture = ({ user, size = 40 }: Props) => {
  return (
    <div className={`relative h-[${size}px] w-[${size}px]`}>
      <Image
        alt={user.name}
        height={size}
        width={size}
        className="rounded-full"
        style={{ objectFit: "cover" }}
        src={user.image || "/pp_placeholder.png"}
      />
    </div>
  );
};
