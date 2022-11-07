import { Field as FormikField } from "formik";
import { Field } from 'components'

type Props = {
  name: string;
  id?: string;
  label: string;
  isTextarea?: boolean;
  type?: string;
};

export const FormTextField = ({
  name,
  id = name,
  label,
  isTextarea = false,
  type = "text",
}: Props) => {

  return (
    <Field name={name} label={label}>
      <FormikField
        type={type}
        as={isTextarea && "textarea"}
        className="w-[80vw] md:w-[30vw] bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      />
    </Field>
  );
};
