import { Formik, Form } from "formik";
import { PetSchema } from "utils/formValidation";
import {
  FormFileField,
  FormTextField,
  FormSelectField,
  Span,
  FormButton,
} from "components";
import type { DbData, FormValues } from "pages/post";

type Props = {
  data: { [key: string]: DbData[] };
  error: { error: string | null; setError: any };
  status: { status: string | null; setStatus: any };
  handleSubmit: (values: FormValues) => any;
  initialValues: FormValues;
};

export const PostPetForm = ({
  data: { animals, breeds },
  error: { error },
  status: { status },
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
                className={status !== "idle" ? "text-gray-400" : ""}
                disabled={status !== "idle"}
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
                    ...breeds
                      .filter((b) => b.animalId === values["animalId"])
                      .map((b) => ({ value: b.id, text: b.name })),
                  ]}
                />
                <FormFileField label="Image" name="image" />
                <div className="flex my-4">
                  <FormButton text="Post" isLoading={status === "loading"} />
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
