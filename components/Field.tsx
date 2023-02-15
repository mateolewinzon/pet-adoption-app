import { useField } from "formik";
import useTranslate from "hooks/useTranslate";

type Props = {
  name: string;
  id?: string;
  labelId: string;
  children: React.ReactNode;
  extraInfo?: React.ReactNode;
};

export const Field = ({
  name,
  id = name,
  labelId,
  extraInfo,
  children,
}: Props) => {
  const { 1: field } = useField(id);
  const t = useTranslate();

  return (
    <div className="my-3 max-w-[90vw]">
      <label
        className="block text-purple-900 uppercase font-semibold mb-2"
        htmlFor={id}
      >
        {t(labelId)}
      </label>
      {extraInfo && (
        <div className="bg-purple-50 text-neutral-500 text-sm rounded-xl p-3 my-2">{extraInfo}</div>
      )}
      {children}

      {field.touched && field.error ? (
        <p className="italic text-red-500"> {t(field.error)} </p>
      ) : null}
    </div>
  );
};
