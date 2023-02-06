import Image from "next/image";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export const ProfilePicture = ({ user }: Props) => {
  return (
    <div className="relative h-[40px] w-[40px]">
      <Image
        alt={user.name}
        className="rounded-3xl"
        fill
        style={{ objectFit: "cover" }}
        src={user.image || "/pp_placeholder.png"}
      />
    </div>
  );
};
