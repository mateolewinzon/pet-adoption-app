import { Formik, Form } from "formik";
import { FormTextField, Span, FormButton, ImageUploader } from "components";
import type { ProfileFormValues as FormValues } from "utils/formTypes";
import { uploadProfilePicture } from "service/profile";

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
      {({ values, setFieldValue }) => (
        <Form>
          <fieldset
            className={isLoading ? "text-gray-400" : ""}
            disabled={isLoading}
          >
            <FormTextField name="name" labelId="profile.name" />
            <ImageUploader
              uploadImages={uploadProfilePicture}
              limit={1}
              setUploads={(values) => setFieldValue("image", values)}
              uploads={values.image}
            />
            <FormTextField name="phone" labelId="profile.phone" />
            <FormTextField
              name="contactInfo"
              labelId="profile.contact_info"
              placeholderId="profile.contact_info_placeholder"
              isTextarea
            />

            <div className="flex my-4">
              <FormButton textId="profile.save" isLoading={isLoading} />
              {error && <Span className="my-1 mx-4 text-red-500">{error}</Span>}
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};
