import { useField } from "formik";
import { Field } from "components";

type Props = {
  name: string;
  id?: string;
  label: string;
  isTextarea?: boolean;
};

export const FormFileField = ({ name, id = name, label }: Props) => {
  
  const {
    2: { setValue },
  } = useField(id);

  return (
    <Field name={name} label={label}>
      <input
        multiple={true}
        type="file"
        onChange={(e) => setValue(e.target.files)}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      />
    </Field>
  );
};
