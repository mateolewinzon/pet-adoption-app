import { NavLink } from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { Span } from "components";
import { useState } from "react";
import Link from "next/link";
import useTranslate from "hooks/useTranslate";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const t = useTranslate();
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-700  px-4 lg:px-6 py-3">
      <div className="flex flex-wrap lg:px-4 justify-between items-center mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Span className="text-white font-semibold hidden sm:inline">
              PetAdopters
            </Span>
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            onClick={() => setToggleMenu((prev) => !prev)}
            className="inline-flex items-center p-2 text-sm text-purple-100 rounded-lg sm:hidden hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <i className="bi bi-list text-xl"></i>
          </button>
        </div>
        <div
          className={`${
            toggleMenu ? "flex order-2 sm:order-1 my-3" : "hidden"
          } sm:flex sm:my-0 flex-col w-[100vw] sm:w-auto sm:flex-row`}
        >
          <NavLink href="/" text={t("nav.browse")} />
          <NavLink href="/post" text={t("nav.post")} />
        </div>

        <div className="items-center order-1 sm:order-2">
          {session ? (
            <div className="flex flex-row w-full">
              <NavLink
                href="/profile"
                text={t("nav.profile")}
              />
              <Span className="mx-3  text-white">
                <a onClick={() => signOut()} href="#">
                  {t("nav.sign_out")}
                </a>
              </Span>
            </div>
          ) : (
            <NavLink href="/signin" text={t("nav.sign_in")} />
          )}
        </div>
      </div>
    </nav>
  );
};
