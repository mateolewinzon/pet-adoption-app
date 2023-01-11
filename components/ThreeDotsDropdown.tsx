import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useOutsideClickOrEsc from "hooks/useOutsideClickOrEsc";

type Props = {
  items: { text: string; onClick: () => void; className?: string }[];
};

export const ThreeDotsDropdown = ({ items }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClickOrEsc(wrapperRef, () => {
    console.log('reaadas')
      setShowMenu(false);
  });

  return (
    <div ref={wrapperRef} tabIndex={1}>
      <button
        onClick={() => setShowMenu(showMenu ? false : true)}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        type="button"
      >
        <svg
          className="h-9 w-9 text-neutral-500"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </button>
      {showMenu && (
        <div
          id="dropdown"
          className="absolute right-0 xl:right-auto z-10 bg-white divide-y divide-gray-100 rounded shadow w-40 dark:bg-gray-700"
        >
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item, key) => (
              <li key={key}>
                <a
                  onClick={() => item.onClick()}
                  href="#"
                  className={twMerge(
                    `block font-semibold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`,
                    item.className
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
