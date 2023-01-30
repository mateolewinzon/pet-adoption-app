import Image from "next/image";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export const ProfilePicture = ({ user }: Props) => {
  return (
    <Image
      alt={user.name}
      className="rounded-3xl"
      width={40}
      height={40}
      src={user.image || "/pp_placeholder.png"}
    />
  );
};
