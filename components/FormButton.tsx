import { Span } from "components";
import useTranslate from "hooks/useTranslate";

type Props = {
  textId: string;
  isLoading: boolean;
};

export const FormButton = ({ isLoading, textId }: Props) => {
  const t = useTranslate();
  return (
    <button
      type="submit"
      className={`px-4 py-1 ${
        isLoading ? "bg-gray-400" : "bg-gray-600"
      } font-semibold rounded-lg text-white`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Span>{t("form.loading")}</Span>
      ) : (
        <Span>{t(textId)}</Span>
      )}
    </button>
  );
};
