import { Formik, Form } from "formik";
import {
  FormTextField,
  AnimalSelect,
  LocationSelect,
  Span,
  FormButton,
  FormSelectField,
  ImageUploader,
} from "components";
import type { PetFormValues as FormValues } from "utils/formTypes";
import type { Animal } from "prisma/types";
import { savePetImages } from "service/pets";

type Props = {
  animals: Animal[];
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
      {({ setFieldValue, values }) => (
        <Form>
          <fieldset
            className={`${isLoading ? "text-gray-400" : ""}`}
            disabled={isLoading}
          >
            <FormTextField name="title" labelId="pet.title" />
            <ImageUploader
              uploadImages={savePetImages}
              limit={5}
              setUploads={(value) => setFieldValue("images", value)}
              uploads={values.images}
            />
              <FormTextField
                name="description"
                labelId="pet.description"
                placeholderId="pet.description_placeholder"
                isTextarea
              />
          

            <div className="grid md:grid-cols-2 md:gap-2">
              <FormTextField
                name="birthYear"
                labelId="pet.birth"
                placeholderId="pet.birth_placeholder"
              />
              <FormSelectField
                labelId="pet.sex"
                name="sex"
                options={[
                  { textId: "sex.male", value: "male" },
                  { textId: "sex.female", value: "female" },
                ]}
              />
            </div>
            <AnimalSelect animals={animals} />
            <LocationSelect />
            <div className="flex my-4">
              <FormButton textId="pet.post" isLoading={isLoading} />
              {error && <Span className="my-1 mx-4 text-red-500">{error}</Span>}
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};
