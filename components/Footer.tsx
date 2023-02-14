import Link from "next/link";
import { SpanSecondary } from "components";
import footerLinks from "config/footerLinks";
import useTranslate from "hooks/useTranslate";

export const Footer = () => {
  const t = useTranslate();
  return (
    <div className="bg-purple-900 min-h-[100px] flex justify-center">
      <div className="m-2 max-w-sm md:max-w-xl flex flex-col items-center justify-evenly">
        <ul className="flex w-full justify-between">
          {footerLinks.map((item, key) => (
            <li key={key}>
              <Link
                className="text-white text-sm md:text-normal hover:underline"
                href={item.href}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <SpanSecondary className="text-white text-sm">
          {t("footer.developed_by")}
 {" "}
          <Link
            target={"_blank"}
            className="font-semibold hover:underline"
            href="https://lewinzon.vercel.app"
          >
            {t("footer.personal_page")}
          </Link>
        </SpanSecondary>
      </div>
    </div>
  );
};
