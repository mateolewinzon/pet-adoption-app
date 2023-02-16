import { SubHeading, TableRow } from "components";
import useTranslate from "hooks/useTranslate";
import type { Pet } from "prisma/types";

export const ContactInformationSection = ({ pet }: { pet: Pet }) => {
  const t = useTranslate()

  return (
    <div className="flex flex-col">
      <SubHeading className="my-3  text-xl">
        {t("pet.contact_information")}
      </SubHeading>
      <TableRow titleId="pet.phone" info={pet.phone || "-"} />
      <TableRow
        titleId="pet.additional_contact"
        info={pet.user.contactInfo || "-"}
      />
    </div>
  );
};
