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
    <tr className="odd:bg-purple-200 even:bg-purple-100">
      <td className="border text-purple-900 px-4 font-semibold">{i18n.t(titleId)}</td>
      <td className="border text-purple-900 px-4">{info}</td>
    </tr>
  );
};
