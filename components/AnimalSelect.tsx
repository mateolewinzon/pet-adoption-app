import { useEffect } from "react";
import { FormSelectField } from "components";
import { useFormikContext } from "formik";
import type { Animal } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";
import capitalize from "utils/capitalize";

type Props = {
  animals: Animal[];
};

export const AnimalSelect = ({ animals }: Props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const currentAnimal = animals.filter((a) => a.id === values.animalId)[0];
  console.log(values);
  useEffect(() => {
    if (!currentAnimal.breeds.some((breed) => breed.id === values.breedId))
      setFieldValue("breedId", "");
  }, [values.animalId, currentAnimal.breeds, setFieldValue, values.breedId]);

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
