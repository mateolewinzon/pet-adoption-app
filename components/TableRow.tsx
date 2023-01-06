export const TableRow = ({ title, info }: { title: string; info: string }) => (
  <tr>
    <td className="border outline-slate-300 pl-4 font-semibold">{title}</td>
    <td className="border outline-slate-300 pl-4">{info}</td>
  </tr>
);