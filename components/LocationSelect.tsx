import { useFormikContext } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Field, FormTextField } from "components";
import type { PetFormValues } from "utils/formTypes";
import { useI18n } from "next-localization";

export const LocationSelect = () => {
  const { setFieldValue, values, setFieldError, setFieldTouched } =
    useFormikContext<PetFormValues>();
  function handleChange(field: keyof PetFormValues, value: string): void {
    setFieldValue(field, value);
    setFieldTouched(field, false);
    setFieldError(field, "");
  }
  const i18n = useI18n()

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <Field name="country" labelId="pet.country">
        <CountryDropdown
          classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          value={values.country}
          onChange={(value) => handleChange("country", value)}
          defaultOptionLabel={i18n.t('browse.select_country')}
        />
      </Field>
      <Field name="region" labelId="pet.region">
        <RegionDropdown
          classes="w-full bg-gray-50 p-2 mr-2 rounded focus:bg-white"
          country={values.country}
          value={values.region}
          onChange={(value) => {
            handleChange("region", value);
          }}
        />
      </Field>
      <FormTextField name="city" labelId="pet.city" />
    </div>
  );
};
