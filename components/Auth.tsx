import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthSettings } from "types";
import { Container } from ".";

type Props = {
  children: React.ReactElement;
  auth: AuthSettings;
};

export const Auth = ({ children, auth }: Props) => {
  const { requiredStatus, message } = auth;
  const router = useRouter();
  const { status } = useSession();

  const redirect = (to: string, message?: string) =>
    router.push({ pathname: to, query: message && { message } });

  useEffect(() => {
    if (requiredStatus === "authenticated" && status === "unauthenticated") {
      redirect("/signin", message);
    }

    if (requiredStatus === "unauthenticated" && status === "authenticated") {
      redirect("/", message);
    }
  }, [status, requiredStatus]);

  if (status !== requiredStatus) {
    return <Container> </Container>;
  }

  return children;
};
