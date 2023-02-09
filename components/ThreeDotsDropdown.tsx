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
      <i className="bi bi-three-dots text-neutral-500 text-3xl"></i>
      </button>
      {showMenu && (
        <div
          id="dropdown"
          className="absolute right-0 xl:right-auto z-10 bg-white divide-y divide-gray-100 rounded shadow w-40"
        >
          <ul
            className="text-sm text-gray-700 "
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item, key) => (
              <li key={key}>
                <a
                  onClick={() => item.onClick()}
                  href="#"
                  className={twMerge(
                    `block font-semibold px-4 py-2 hover:bg-gray-100 `,
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
