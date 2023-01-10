export const TableRow = ({ title, info }: { title: string; info: string }) => (
  <tr className="odd:bg-purple-50">
    <td className="border outline-slate-300 pl-4 font-semibold">{title}</td>
    <td className="border outline-slate-300 pl-4">{info}</td>
  </tr>
);