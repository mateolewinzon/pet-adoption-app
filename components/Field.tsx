import { useField } from "formik";
import { useI18n } from "next-localization";
import capitalize from "utils/capitalize";

type Props = {
  name: string;
  id?: string;
  labelId: string;
  children: React.ReactNode;
};

export const Field = ({ name, id = name, labelId, children }: Props) => {
  const { 1: field } = useField(id);
  const i18n = useI18n();

  return (
    <div className="my-3 max-w-[90vw]">
      <label
        className="block text-gray-700 uppercase font-semibold mb-2"
        htmlFor={id}
      >
        {i18n.t(labelId)}
      </label>
      {children}

      {field.touched && field.error ? (
        <p className="italic text-red-500"> {capitalize(field.error)} </p>
      ) : null}
    </div>
  );
};
