import Link from "next/link";
import { useRouter } from "next/router";
import { Span } from "components";
import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  text: string;
};

export const NavLink = ({ href, text }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <div>
      <Link href={href}>
        <a>
          <Span
            className={twMerge(
              "px-3 py-1 font-normal text-white rounded-xl hover:bg-purple-800",
              isActive ? "font-semibold" : null
            )}
          >
            {text}
          </Span>
        </a>
      </Link>
    </div>
  );
};
