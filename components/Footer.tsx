import Link from "next/link";
import { SpanSecondary } from "components";
import footerLinks from "config/footerLinks";

export const Footer = () => {
  return (
    <div className="bg-purple-800 min-h-[100px] flex justify-center">
      <div className="m-2 max-w-sm md:max-w-xl flex flex-col items-center justify-evenly">
          <ul className="flex w-full justify-between">
            {footerLinks.map((item, key) => (
              <li key={key}>
                <Link href={item.href}>
                  <a className="text-white text-sm md:text-normal hover:underline">{item.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        <SpanSecondary className="text-white text-sm">
          Developed by Mateo Lewinzon.{" "}
          <Link href="https://lewinzon.vercel.app">
            <a target={'_blank'} className="font-semibold hover:underline">
              Check my personal page
            </a>
          </Link>
        </SpanSecondary>{" "}
      </div>
    </div>
  );
};
