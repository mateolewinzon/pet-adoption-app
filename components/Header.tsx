import { NavLink } from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { Span } from "components";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row justify-center py-2 px-4 md:px-8 bg-orange-500 text-white">
      <div className="flex items-center justify-between w-full max-w-5xl">
        <nav className="flex">
          <NavLink href="/" text="Browse" />
          <NavLink href="/post" text="Post" />
        </nav>
        <nav className="flex">
          {session ? (
            <>
              <NavLink href="/profile" text="Profile" />
              <Span className="px-4 font-semibold">
                <a onClick={() => signOut()} href="#">
                  {" "}
                  Sign out
                </a>
              </Span>
            </>
          ) : (
            <NavLink href="/api/auth/signin" text="Sign in" />
          )}
        </nav>
      </div>
    </div>
  );
};
