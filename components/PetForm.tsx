import { Formik, Form } from "formik";
import {
  FormFileField,
  FormTextField,
  AnimalSelect,
  LocationSelect,
  Span,
  FormButton,
  FormSelectField,
} from "components";
import type { PetFormValues as FormValues } from "utils/formTypes";
import type { AnimalWithBreeds } from "prisma/types";

type Props = {
  animals: AnimalWithBreeds[];
  error: string | null;
  isLoading: boolean;
  handleSubmit: (values: FormValues) => any;
  initialValues: FormValues;
  validationSchema: any;
};

export const PetForm = ({
  animals,
  error,
  isLoading,
  handleSubmit,
  initialValues,
  validationSchema,
}: Props) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      <Form>
        <fieldset
          className={isLoading ? "text-gray-400" : ""}
          disabled={isLoading}
        >
          <div className="grid grid-cols-2 gap-2">
            <FormTextField
              name="title"
              label="Title / Name"
              placeholder="Fluffy"
            />
            <FormFileField label="Images" name="images" />
          </div>
          <FormTextField
            name="description"
            label="Description"
            placeholder="Please include health information, personality traits, and anything you consider relevant."
            isTextarea
          />
          <div className="grid grid-cols-2 gap-2">
            <FormTextField
              name="birthYear"
              label="Birth year"
              placeholder="2022"
            />
            <FormSelectField
              label="Sex"
              name="sex"
              options={[
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
              ]}
            />
          </div>
          <AnimalSelect animals={animals} />
          <LocationSelect />
          <div className="flex my-4">
            <FormButton text="Post" isLoading={isLoading} />
            {error && <Span className="my-1 mx-4 text-red-500">{error}</Span>}
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
};
