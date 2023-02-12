import { SubHeading, TableRow } from "components";
import capitalize from "utils/capitalize";
import type { Pet } from "prisma/types";
import { useI18n } from "next-localization";

export const PetInformationSection = ({ pet }: { pet: Pet }) => {
  const i18n = useI18n();
  return (
    <div className="flex flex-col">
      <SubHeading className="mt-3 text-xl">
        {i18n.t("pet.pet_information")}
      </SubHeading>
      <TableRow titleId="pet.animal" info={capitalize(pet.animal.name)} />
      <TableRow titleId="pet.breed" info={capitalize(pet.breed.name)} />
      <TableRow titleId="pet.sex" info={capitalize(pet.sex)} />
      <TableRow titleId="pet.birth" info={pet.birthYear} />
      <TableRow titleId="pet.country" info={pet.country} />
      <TableRow titleId="pet.region" info={pet.region} />
      <TableRow titleId="pet.city" info={pet.city} />
      <TableRow
        titleId="pet.has_been_adopted"
        info={pet.adopted ? "Yes" : "No"}
      />
    </div>
  );
};
