import { useFormikContext } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Field, FormTextField } from "components";
import type { PetFormValues } from "utils/formTypes";
import countries from "config/countries";
import useTranslate from "hooks/useTranslate";

export const LocationSelect = () => {
  const { setFieldValue, values, setFieldError, setFieldTouched } =
    useFormikContext<PetFormValues>();
  function handleChange(field: keyof PetFormValues, value: string): void {
    setFieldValue(field, value);
    setFieldTouched(field, false);
    setFieldError(field, "");
  }
  const t = useTranslate();

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <Field name="country" labelId="pet.country">
        <CountryDropdown
          whitelist={countries}
          classes="w-full bg-gray-50 p-2 mb-2 rounded bg-white shadow"
          value={values.country}
          onChange={(value) => handleChange("country", value)}
          defaultOptionLabel={t("browse.select_country")}
        />
      </Field>
      <Field name="region" labelId="pet.region">
        <RegionDropdown
          classes="w-full bg-gray-50 p-2 mr-2 rounded bg-white shadow"
          country={values.country}
          value={values.region}
          onChange={(value) => {
            handleChange("region", value);
          }}
        />
      </Field>
      <FormTextField name="city" labelId="pet.city" />
      <FormTextField name="phone" labelId="pet.phone" />
    </div>
  );
};
