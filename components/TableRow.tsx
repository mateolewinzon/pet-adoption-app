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
    <tr className="odd:bg-purple-50">
      <td className="border outline-slate-300 pl-4 font-semibold">{i18n.t(titleId)}</td>
      <td className="border outline-slate-300 pl-4">{info}</td>
    </tr>
  );
};
