import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useFormikContext } from "formik";
import { Field } from "components";
import type { FormValues } from "pages/post";

export const LocationSelect = () => {
  const { setFieldValue, values, setFieldError, setFieldTouched } =
    useFormikContext<FormValues>();

  function handleChange(field: keyof FormValues, value: string): void {
    setFieldValue(field, value);
    setFieldTouched(field, false);
    setFieldError(field, "");
  }

  return (
    <>
      <Field name="country" label="Country">
        <CountryDropdown
          classes="w-[80vw] md:w-[30vw] bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          value={values.country}
          onChange={(value) => handleChange("country", value)}
        />
      </Field>
      <Field name="region" label="Region">
        <RegionDropdown
          classes="w-[80vw] md:w-[30vw] bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          country={values.country}
          value={values.region}
          onChange={(value) => {
            handleChange("region", value);
          }}
        />
      </Field>
    </>
  );
};
