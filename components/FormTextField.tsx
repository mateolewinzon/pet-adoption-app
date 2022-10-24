import { Field, useField, useFormikContext } from "formik";

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
  const { 1: field } = useField(id);

  const { isSubmitting } = useFormikContext();

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
        as={isTextarea && "textarea"}
        className="w-[80vw] md:w-[30vw] bg-gray-50 rounded p-2 mb-2"
        id={id}
        disabled={isSubmitting}
        name={name}
      />
      <p className="italic text-red-500">{field.touched && field.error}</p>
    </div>
  );
};
