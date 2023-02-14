import { Field as FormikField } from "formik";
import { Field } from "components";
import useTranslate from "hooks/useTranslate";

type Props = {
  name: string;
  id?: string;
  labelId: string;
  isTextarea?: boolean;
  type?: string;
  placeholderId?: string;
  extraInfo?: React.ReactNode
};

export const FormTextField = ({
  name,
  id = name,
  labelId,
  isTextarea = false,
  type = "text",
  placeholderId,
  extraInfo
}: Props) => {
  const t = useTranslate();
  return (
    <Field name={name} labelId={labelId} extraInfo={extraInfo}>
      <FormikField
        type={type}
        as={isTextarea && "textarea"}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
        {...(placeholderId ? { placeholder: t(placeholderId) } : {})}
      />
    </Field>
  );
};
