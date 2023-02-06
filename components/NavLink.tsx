import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Span } from "components";
import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  text: string;
};

export const NavLink = ({ href, text }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div>
      <Link href={href}>
          <Span
            className={twMerge(
              "px-3 py-1 font-normal text-white rounded-xl hover:bg-purple-800",
              isActive ? "font-semibold" : null
            )}
          >
            {text}
          </Span>
      </Link>
    </div>
  );
};
