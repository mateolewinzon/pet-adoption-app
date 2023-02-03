import { Field as FormikField } from "formik";
import { Field } from "components";
import { useI18n } from "next-localization";

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
  const i18n = useI18n();

  return (
    <Field labelId={labelId} name={name}>
      <FormikField
        type={type}
        component={"select"}
        className="w-full bg-gray-50 rounded p-2 mb-2"
        id={id}
        name={name}
      >
        {options.map((option: Option, key) => (
          <option key={key} value={option.value}>
            {i18n.t(option.textId)}
          </option>
        ))}
      </FormikField>
    </Field>
  );
};
