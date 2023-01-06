import { SubHeading, TableRow } from "components";
import capitalize from "utils/capitalize";
import type { PetWithUser } from "prisma/types";

export const PetInformationSection = ({ pet }: { pet: PetWithUser }) => 

<table className="mt-5">
<thead>
  <tr>
    <th className="pb-5 text-start">
      <SubHeading>Pet Information</SubHeading>
    </th>
  </tr>
</thead>
<tbody>
  <TableRow title="Animal" info={capitalize(pet.animal.name)} />
  <TableRow title="Breed" info={capitalize(pet.breed.name)} />
  <TableRow title="Sex" info={capitalize(pet.sex)} />
  <TableRow title="Birth Year" info={pet.birthYear} />
  <TableRow title="Country" info={pet.country} />
  <TableRow title="Region" info={pet.region} />
  <TableRow
    title="Has been adopted"
    info={pet.adopted ? "Yes" : "No"}
  />
</tbody>
</table>