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
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[40px] h-[40px] color-gray-200"
            viewBox="0 0 119.72 122.88"
            fill="white"
          >
            <g>
              <path d="M40.06,0.37c9.4,0,17.03,11.69,17.03,26.1s-7.63,26.1-17.03,26.1c-9.4,0-17.03-11.68-17.03-26.1 C23.04,12.06,30.66,0.37,40.06,0.37L40.06,0.37z M61.71,63.55c19.94,0.04,22.42,13.25,39.23,35.86 c8.38,16.45-2.5,26.82-21.15,22.38c-8.46-4.31-14.41-5.83-20.38-5.63c-10.34,0.36-12.95,7.18-24.98,6.7 c-9.28-0.25-13.46-4.14-14.27-10.07c-0.87-6.3,1.56-10.28,4.52-15.49C36.18,77.02,48.07,61.01,61.71,63.55L61.71,63.55L61.71,63.55 z M7.17,39.08C0.14,41.86-2.1,52.85,2.16,63.62C6.42,74.39,15.57,80.87,22.6,78.09c7.03-2.78,9.27-13.77,5.01-24.54 C23.35,42.78,14.2,36.3,7.17,39.08L7.17,39.08z M112.55,39.08c7.03,2.78,9.27,13.77,5.01,24.54 c-4.26,10.77-13.42,17.25-20.44,14.47c-7.03-2.78-9.27-13.77-5.01-24.54C96.37,42.78,105.52,36.3,112.55,39.08L112.55,39.08z M79.35,0c9.4,0,17.03,11.69,17.03,26.1s-7.63,26.1-17.03,26.1c-9.4,0-17.03-11.68-17.03-26.1C62.33,11.69,69.95,0,79.35,0L79.35,0 z" />
            </g>
          </svg>
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
