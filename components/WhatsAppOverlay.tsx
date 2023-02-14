import useTranslate from "hooks/useTranslate";
import { Span } from "./Span";

type Props = {
  phone: string;
};

export const WhatsAppOverlay = ({ phone }: Props) => {
  const t = useTranslate();

  return (
    <a rel="noreferrer" target="_blank" href={`https://wa.me/${phone}`}>
      <div className="fixed bottom-[40px] right-[40px]">
        <div className="flex bg-purple-200 rounded-full items-center">
          <Span className="mx-3 hidden md:inline">{t("pet.contact_owner")}</Span>
          <div className="w-[60px] h-[60px] bg-[#25d366] text-[30px] text-white rounded-full flex items-center justify-center z-[100]">
            <i className="bi-whatsapp" />
          </div>
        </div>
      </div>
    </a>
  );
};
