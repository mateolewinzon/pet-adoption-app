import { useFormikContext } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Field } from "components";
import type { PetFormValues } from "utils/formTypes";

export const LocationSelect = () => {
  const { setFieldValue, values, setFieldError, setFieldTouched, touched } =
    useFormikContext<PetFormValues>();

  function handleChange(field: keyof PetFormValues, value: string): void {
    setFieldValue(field, value);
    setFieldTouched(field, false);
    setFieldError(field, "");
  }
  
  return (
    <div className="grid grid-cols-2 gap-2">
      <Field name="country" label="Country">
        <CountryDropdown
          classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          value={values.country}
          onChange={(value) => handleChange("country", value)}
        />
      </Field>
      <Field name="region" label="Region">
        <RegionDropdown
          classes="w-full bg-gray-50 p-2 mr-2 rounded focus:bg-white"
          country={values.country}
          value={values.region}
          onChange={(value) => {
            handleChange("region", value);
          }}
        />
      </Field>
    </div>
  );
};
