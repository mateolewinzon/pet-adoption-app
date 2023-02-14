import useTranslate from "hooks/useTranslate";

export const TableRow = ({
  titleId,
  info,
}: {
  titleId: string;
  info: string;
}) => {
  const t = useTranslate()
  return (
    <div className="flex flex-col justify-between sm:flex-row py-2 sm:gap-3">
      <div className="text-purple-900 font-semibold">{t(titleId)}</div>
      <div className="text-purple-900">{info}</div>
    </div>
  );
};
