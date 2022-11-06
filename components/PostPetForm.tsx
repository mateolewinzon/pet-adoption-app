import { Formik, Form } from "formik";
import { PetSchema } from "utils/formValidation";
import {
  FormFileField,
  FormTextField,
  FormSelectField,
  Span,
  FormButton,
} from "components";
import type { FormValues } from "pages/post";
import { AnimalWithBreeds } from "prisma/types";

type Props = {
  animals: AnimalWithBreeds[]
  error: string | null;
  isLoading: boolean;
  handleSubmit: (values: FormValues) => any;
  initialValues: FormValues;
};

export const PostPetForm = ({
  animals,
  error,
  isLoading,
  handleSubmit,
  initialValues,
}: Props) => {
  return (
    <Formik
      validationSchema={PetSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {({ values }) => (
        <div className="mx-auto my-10">
          <div className="w-full max-w-lg">
            <Form>
              <fieldset
                className={isLoading ? "text-gray-400" : ""}
                disabled={isLoading}
              >
                <FormTextField name="title" label="Title" />
                <FormTextField
                  name="description"
                  label="Description"
                  isTextarea
                />
                <FormTextField name="birthYear" label="Birth year" />
                <FormSelectField
                  name="animalId"
                  label="Animal"
                  options={animals.map((a) => ({ value: a.id, text: a.name }))}
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
                      .filter((a) => a.id === values["animalId"])[0].breeds
                      .map((b) => ({ value: b.id, text: b.name })),
                  ]}
                />
                <FormFileField label="Image" name="images" />
                <div className="flex my-4">
                  <FormButton text="Post" isLoading={isLoading} />
                  {error && (
                    <Span className="my-1 mx-4 text-red-500">{error}</Span>
                  )}
                </div>
              </fieldset>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};
