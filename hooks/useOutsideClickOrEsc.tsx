import { RefObject, useEffect } from "react";

export default function useOutsideClickOrEsc(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    function handleEscKeydown(event: KeyboardEvent): void {
      if (event.code === "Escape") {
        callback();
      }
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [ref, callback]);
}
