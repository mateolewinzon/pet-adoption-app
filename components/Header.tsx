import { NavLink } from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { Span } from "components";
import { useI18n } from "next-localization";
import { useState } from "react";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const i18n = useI18n();
  const { data: session } = useSession();

  return (
    <nav className="bg-purple-900 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <Span className="text-white font-semibold hidden sm:inline">PetAdopters</Span>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            onClick={() => setToggleMenu((prev) => !prev)}
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            toggleMenu ? "flex order-2 sm:order-1 my-3" : "hidden"
          } sm:flex sm:my-0 flex-col w-[100vw] sm:w-auto sm:flex-row`}
        >
          <NavLink href="/" text={i18n.t("nav.browse")} />
          <NavLink href="/post" text={i18n.t("nav.post")} />
        </div>

        <div className="items-center order-1 sm:order-2">
          {session ? (
            <div className="flex flex-row w-full">
              <NavLink href="/profile" text={i18n.t("nav.profile")} />
              <Span className="mx-3  text-white">
                <a onClick={() => signOut()} href="#">
                  {i18n.t("nav.sign_out")}
                </a>
              </Span>
            </div>
          ) : (
            <NavLink href="/api/auth/signin" text={i18n.t("nav.sign_in")} />
          )}
        </div>
      </div>
    </nav>
  );
};
