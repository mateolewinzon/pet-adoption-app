import { useI18n } from "next-localization";

const useTranslate = () => {
  const { t } = useI18n();
  return t;
};

export default useTranslate;
