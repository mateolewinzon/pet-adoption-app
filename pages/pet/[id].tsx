import {
  Container,
  Heading,
  ImageCarousel,
  Span,
  SubHeading,
} from "components";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import type { PetWithUser } from "prisma/types";
import capitalize from "utils/capitalize";

type Props = { pet: PetWithUser };

const TableRow = ({ title, info }: { title: string; info: string }) => (
  <tr>
    <td className="border outline-slate-300 pl-4 font-semibold">{title}</td>
    <td className="border outline-slate-300 pl-4">{info}</td>
  </tr>
);
const ViewPost = ({ pet }: Props) => {
  return (
    <Container title={`Pets Adoption - ${pet.title}`}>
      <div className="sm:grid grid-cols-2 gap-3 width-full">
        <ImageCarousel images={pet.images} />
        <div className="flex flex-col">
          <Heading>{pet.title}</Heading>
          <Span>{pet.description}</Span>
        </div>
      </div>
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
      <table className="mt-5">
        <thead>
          <tr>
            <th className="pb-5 text-start">
              <SubHeading>Contact Information</SubHeading>
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
          <TableRow title="Country" info={pet.country} />
          <TableRow title="Region" info={pet.region} />
          <TableRow
            title="Has been adopted"
            info={pet.adopted ? "Yes" : "No"}
          />
        </tbody>
      </table>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pet = await prisma.pet
    .findUnique({
      where: { id: query.id as string },
      include: { animal: true, breed: true, user: true },
    })
    .catch(() => null);

  if (!pet) {
    return { notFound: true };
  }

  return {
    props: { pet: JSON.parse(JSON.stringify(pet)) },
  };
};

export default ViewPost;
