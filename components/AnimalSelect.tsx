import { useEffect } from "react";
import { FormSelectField } from "components";
import { useFormikContext } from "formik";
import type { AnimalWithBreeds } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";

type Props = {
  animals: AnimalWithBreeds[];
};

export const AnimalSelect = ({ animals }: Props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  useEffect(() => {
    if (
      !animals
        .filter((a) => a.id === values.animalId)[0]
        .breeds.filter((b) => b.id === values.breedId).length
    )
      setFieldValue("breedId", "");
  }, [values.animalId]);

  return (
    <>
      <FormSelectField
        name="animalId"
        label="Animal"
        options={animals.map((a) => {
          const text = a.name.charAt(0).toUpperCase() + a.name.slice(1);

          return {
            value: a.id,
            text,
          };
        })}
      />
      <FormSelectField
        name="breedId"
        label="Breed"
        options={[
          {
            value: "",
            text: "Select one",
          },
          ...animals
            .filter((a) => a.id === values.animalId)[0]
            .breeds.map((b) => {
              const text =
                b.name.charAt(0).toUpperCase() +
                b.name.slice(1).replaceAll("_", " ");

              return {
                value: b.id,
                text,
              };
            }),
        ]}
      />
    </>
  );
};
