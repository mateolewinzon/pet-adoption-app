import { useEffect } from "react";
import { Formik, Form } from "formik";
import {
  FormFileField,
  FormTextField,
  AnimalSelect,
  LocationSelect,
  Span,
  FormButton,
} from "components";
import type { FormValues } from "pages/post";
import { AnimalWithBreeds } from "prisma/types";

type Props = {
  animals: AnimalWithBreeds[];
  error: string | null;
  isLoading: boolean;
  handleSubmit: (values: FormValues) => any;
  initialValues: FormValues;
  validationSchema: any
};

export const PostPetForm = ({
  animals,
  error,
  isLoading,
  handleSubmit,
  initialValues,
  validationSchema
}: Props) => {
  useEffect(() => {});

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
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
              <AnimalSelect animals={animals} />
              <FormFileField label="Image" name="images" />
              <LocationSelect />
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
    </Formik>
  );
};
