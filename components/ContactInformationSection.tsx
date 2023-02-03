import { SubHeading, TableRow } from "components";
import { useI18n } from "next-localization";
import type { Pet } from "prisma/types";

export const ContactInformationSection = ({ pet }: { pet: Pet }) => {
  const i18n = useI18n();

  return (
    <div>
      <SubHeading className="">{i18n.t("pet.contact_information")}</SubHeading>
      <table className="mt-5">
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
