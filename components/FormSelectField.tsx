import { Field as FormikField } from "formik";
import { Field } from "components";

type Props = {
  name: string;
  id?: string;
  label: string;
  type?: string;
  options: Option[];
};

type Option = {
  value: string;
  text: string;
};

export const FormSelectField = ({
  name,
  id = name,
  label,
  type = "text",
  options,
}: Props) => {
  return (
    <Field label={label} name={name}>
      <FormikField
        type={type}
        component={"select"}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      >
        {options.map((option: Option, key) => (
          <option key={key} value={option.value}>
            {option.text}
          </option>
        ))}
      </FormikField>
    </Field>
  );
};
