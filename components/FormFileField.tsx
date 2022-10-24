import { useField } from "formik";

type Props = {
  name: string;
  id?: string;
  label: string;
  isTextarea?: boolean;
};

export const FormFileField = ({
  name,
  id = name,
  label,
}: Props) => {

  const { 1: {touched, error}, 2: {setValue} } = useField(id);

  return (
    <div className="my-3">
      <label
        className=" block text-gray-700 uppercase font-semibold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type='file'
        onChange={(e)=>setValue(e.target.files)}
        className="w-[80vw] md:w-[30vw] bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      />
      <p className="italic text-red-500">{touched && error}</p>
    </div>
  );
};
