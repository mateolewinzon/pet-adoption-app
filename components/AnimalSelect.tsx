import { useEffect } from "react";
import { FormSelectField } from "components";
import { useFormikContext } from "formik";
import type { Animal } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";

type Props = {
  animals: Animal[];
};

export const AnimalSelect = ({ animals }: Props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const currentAnimal = animals.filter((a) => a.id === values.animalId)[0];
  
  useEffect(() => {
    if (!currentAnimal.breeds.some((breed) => breed.id === values.breedId))
      setFieldValue("breedId", currentAnimal.breeds.find(b=>b.name.includes('unknown'))?.id);
  }, [values.animalId, currentAnimal.breeds, setFieldValue, values.breedId]);

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <FormSelectField
        name="animalId"
        labelId="pet.animal"
        options={animals.map((a) => {
          return {
            value: a.id,
            textId: `animals.${a.name}`,
          };
        })}
      />
      <FormSelectField
        name="breedId"
        labelId="pet.breed"
        options={[
         
          ...animals
            .find((a) => a.id === values.animalId)!
            .breeds.map((b) => {
              return {
                value: b.id,
                textId: `breeds.${b.name}`,
              };
            }),
        ]}
      />
    </div>
  );
};
