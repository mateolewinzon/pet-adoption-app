import { NavLink } from "./NavLink";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Span } from "components";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row justify-center px-8">
      <div className="flex items-center justify-between w-full max-w-3xl">
        <nav className="flex">
          <NavLink href="/" text="Browse" />
          <NavLink href="/post" text="Post" />
        </nav>
        <nav className="flex">
          {session ? (
            <>
              <NavLink href="/profile" text="Profile" />
              <Span className="px-4"><a onClick={()=>signOut()} href="#"> Sign out</a></Span>
            </>
          ) : (
            <NavLink href="/login" text="Sign in" />
          )}
        </nav>
      </div>
    </div>
  );
};