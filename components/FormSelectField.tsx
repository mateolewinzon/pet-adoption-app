import { Field as FormikField } from "formik";
import { Field } from "components";
import useTranslate from "hooks/useTranslate";

type Props = {
  name: string;
  id?: string;
  labelId: string;
  type?: string;
  options: Option[];
};

type Option = {
  value: string;
  textId: string;
};

export const FormSelectField = ({
  name,
  id = name,
  labelId,
  type = "text",
  options,
}: Props) => {
  const t = useTranslate();

  return (
    <Field labelId={labelId} name={name}>
      <FormikField
        type={type}
        component={"select"}
        className="w-full rounded p-2 mb-2 shadow"
        id={id}
        name={name}
      >
        {options.map((option: Option, key) => (
          <option key={key} value={option.value}>
            {t(option.textId)}
          </option>
        ))}
      </FormikField>
    </Field>
  );
};
