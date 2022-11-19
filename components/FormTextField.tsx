import { Field as FormikField } from "formik";
import { Field } from 'components'

type Props = {
  name: string;
  id?: string;
  label: string;
  isTextarea?: boolean;
  type?: string;
  placeholder?: string
};

export const FormTextField = ({
  name,
  id = name,
  label,
  isTextarea = false,
  type = "text",
  placeholder
}: Props) => {

  return (
    <Field name={name} label={label}>
      <FormikField
        type={type}
        as={isTextarea && "textarea"}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </Field>
  );
};
