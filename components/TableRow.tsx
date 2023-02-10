import { useI18n } from "next-localization";

export const TableRow = ({
  titleId,
  info,
}: {
  titleId: string;
  info: string;
}) => {
  const i18n = useI18n();
  return (
    <div className="flex flex-col justify-between sm:flex-row py-2">
      <div className="text-purple-900 font-semibold">{i18n.t(titleId)}</div>
      <div className="text-purple-900">{info}</div>
    </div>
  );
};
