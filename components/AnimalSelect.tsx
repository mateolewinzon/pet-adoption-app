import { useEffect } from "react";
import { FormSelectField } from "components";
import { useFormikContext } from "formik";
import type { AnimalWithBreeds } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";
import capitalize from "utils/capitalize";

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
    <div className="grid grid-cols-2 gap-2">
      <FormSelectField
        name="animalId"
        label="Animal"
        options={animals.map((a) => {
          return {
            value: a.id,
            text: capitalize(a.name),
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
              return {
                value: b.id,
                text: capitalize(b.name),
              };
            }),
        ]}
      />
    </div>
  );
};
