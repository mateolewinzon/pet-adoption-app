import { useField } from "formik";

type Props = {
  name: string;
  id?: string;
  label: string;
  children: React.ReactNode;
};

export const Field = ({ name, id = name, label, children }: Props) => {
  const { 1: field } = useField(id);

  return (
    <div className="my-3">
      <label
        className="block text-gray-700 uppercase font-semibold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      <p className="italic text-red-500">{field.touched && field.error}</p>
    </div>
  );
};
