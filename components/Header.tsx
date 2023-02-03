import { NavLink } from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { Span } from "components";
import { useI18n } from "next-localization";

export const Header = () => {
  const i18n = useI18n()
  const { data: session } = useSession();

  return (
    <div className="flex flex-row justify-center py-2 px-4 md:px-8 bg-purple-900 text-white">
      <div className="flex items-center justify-center md:justify-between w-full max-w-5xl">
        <nav className="flex">
          <NavLink href="/" text={i18n.t('nav.browse')}  />
          <NavLink href="/post" text={i18n.t('nav.post')} />
        </nav>
        <nav className="flex">
          {session ? (
            <>
              <NavLink href="/profile" text="Profile" />
              <Span className="font-semibold px-3">
                <a onClick={() => signOut()} href="#">
                  {i18n.t('nav.logout')}
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
