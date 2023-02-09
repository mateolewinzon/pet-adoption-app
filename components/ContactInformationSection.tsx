import { SubHeading, TableRow } from "components";
import { useI18n } from "next-localization";
import type { Pet } from "prisma/types";

export const ContactInformationSection = ({ pet }: { pet: Pet }) => {
  const i18n = useI18n();

  return (
    <div className="flex flex-col">
      <SubHeading className="my-3">{i18n.t("pet.contact_information")}</SubHeading>
      <table>
        <tbody>
          <TableRow titleId="pet.email" info={pet.user.email} />
          <TableRow titleId="pet.phone" info={pet.user.phone || "-"} />
          <TableRow
            titleId="pet.additional_contact"
            info={pet.user.contactInfo || "-"}
          />
        </tbody>
      </table>
    </div>
  );
};
