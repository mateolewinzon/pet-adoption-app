import { SubHeading, TableRow } from "components";
import type { Pet } from "prisma/types";

export const ContactInformationSection = ({ pet }: { pet: Pet }) => (
  <table className="mt-5">
    <thead>
      <tr>
        <th className="pb-5 text-start">
          <SubHeading className="">Contact Information</SubHeading>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow title="Email" info={pet.user.email} />
      <TableRow title="Phone" info={pet.user.phone || "-"} />
      <TableRow
        title="Additional contact information"
        info={pet.user.contactInfo || "-"}
      />
    </tbody>
  </table>
);
