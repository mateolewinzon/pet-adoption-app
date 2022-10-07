import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AuthSettings } from "types";

type Props = {
  children: React.ReactElement;
  auth: AuthSettings;
};

export const Auth = ({ children, auth }: Props) => {
  const { requiredStatus, message } = auth;
  const router = useRouter();
  const { status } = useSession();
  console.log(status);

  const redirect = (to: string, message?: string) =>
    router.push({ pathname: to, query: message && { message } });

  if (status === "loading") {
    return null;
  }

  if (requiredStatus === "authenticated" && status === "unauthenticated") {
    redirect("/signin", message);
    return null;
  }

  if (requiredStatus === "unauthenticated" && status === "authenticated") {
    redirect("/", message);
    return null;
  }

  return children;
};
