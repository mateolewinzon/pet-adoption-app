import Link from "next/link";
import { SpanSecondary } from "components";
import footerLinks from "config/footerLinks";
import { useI18n } from "next-localization";

export const Footer = () => {
  const i18n = useI18n();
  return (
    <div className="bg-purple-800 min-h-[100px] flex justify-center">
      <div className="m-2 max-w-sm md:max-w-xl flex flex-col items-center justify-evenly">
        <ul className="flex w-full justify-between">
          {footerLinks.map((item, key) => (
            <li key={key}>
              <Link href={item.href}>
                <a className="text-white text-sm md:text-normal hover:underline">
                  {item.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <SpanSecondary className="text-white text-sm">
          {i18n.t("footer.developed_by")}

          <Link href="https://lewinzon.vercel.app">
            <a target={"_blank"} className="font-semibold hover:underline">
              {i18n.t("footer.personal_page")}
            </a>
          </Link>
        </SpanSecondary>{" "}
      </div>
    </div>
  );
};
