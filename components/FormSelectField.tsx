import { Field, useField } from "formik";

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
  const { 1: field } = useField(id);

  return (
    <div className="my-3">
      <label
        className=" block text-gray-700 uppercase font-semibold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <Field
        type={type}
        component={'select'}
        className="w-[80vw] md:w-[30vw] bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      >
        {options.map((option: Option, key) => (
          <option key={key} value={option.value}>{option.text}</option>
        ))}
      </Field>
      <p className="italic text-red-500">{field.touched && field.error}</p>
    </div>
  );
};
