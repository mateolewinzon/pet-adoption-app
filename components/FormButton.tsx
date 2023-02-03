import { Span } from "components";
import { useI18n } from "next-localization";

type Props = {
  textId: string;
  isLoading: boolean;
};

export const FormButton = ({ isLoading, textId }: Props) => {
  const i18n = useI18n();
  return (
    <button
      type="submit"
      className={`px-4 py-1 ${
        isLoading ? "bg-gray-400" : "bg-gray-600"
      } font-semibold rounded-lg text-white`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Span>{i18n.t("form.loading")}</Span>
      ) : (
        <Span>{i18n.t(textId)}</Span>
      )}
    </button>
  );
};
