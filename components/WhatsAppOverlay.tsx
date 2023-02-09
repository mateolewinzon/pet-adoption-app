import { useI18n } from "next-localization";
import { Span } from "./Span";

type Props = {
  phone: string;
};

export const WhatsAppOverlay = ({ phone }: Props) => {
  const i18n = useI18n();

  return (
    <a rel="noreferrer" target="_blank" href={`https://wa.me/${phone}`}>
      <div className="fixed bottom-[40px] right-[40px]">
        <div className="flex bg-purple-200 rounded-full items-center outline outline-purple-800">
          <Span className="mx-3 hidden md:inline">{i18n.t("pet.contact_owner")}</Span>
          <div className="w-[60px] h-[60px] bg-[#25d366] text-[30px] text-white rounded-full flex items-center justify-center z-100">
            <i className="bi-whatsapp" />
          </div>
        </div>
      </div>
    </a>
  );
};
