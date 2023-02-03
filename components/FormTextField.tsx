import { Field as FormikField } from "formik";
import { Field } from "components";
import { useI18n } from "next-localization";

type Props = {
  name: string;
  id?: string;
  labelId: string;
  isTextarea?: boolean;
  type?: string;
  placeholderId?: string;
};

export const FormTextField = ({
  name,
  id = name,
  labelId,
  isTextarea = false,
  type = "text",
  placeholderId,
}: Props) => {
  const i18n = useI18n();
  return (
    <Field name={name} labelId={labelId}>
      <FormikField
        type={type}
        as={isTextarea && "textarea"}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
        {...(placeholderId ? { placeholder: i18n.t(placeholderId) } : {})}
      />
    </Field>
  );
};
