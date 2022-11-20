import { Formik, Form } from "formik";
import { FormFileField, FormTextField, Span, FormButton } from "components";
import type { ProfileFormValues as FormValues } from "utils/formTypes";

type Props = {
  error: string | null;
  isLoading: boolean;
  handleSubmit: (values: FormValues) => any;
  initialValues: FormValues;
  validationSchema: any;
};

export const ProfileForm = ({
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
            <FormTextField name="name" label="Name" />
            <FormTextField name="phone" label="Phone" />
            <FormTextField
              name="contactInfo"
              label="Contact Info"
              placeholder="Consider adding any additional contact information in this field"
              isTextarea
            />

            <FormFileField label="Image" name="image" />
            <div className="flex my-4">
              <FormButton text="Post" isLoading={isLoading} />
              {error && <Span className="my-1 mx-4 text-red-500">{error}</Span>}
            </div>
          </fieldset>
        </Form>
    </Formik>
  );
};
