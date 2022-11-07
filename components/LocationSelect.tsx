import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useField } from "formik";
import { Field } from "components";

export const LocationSelect = () => {
  const {
    1: country,
    2: { setValue: setCountry },
  } = useField("country");
  const {
    1: region,
    2: { setValue: setRegion },
  } = useField("region");

  return (
    <>
      <Field name="country" label="Country">
        <CountryDropdown
          classes="w-[80vw] md:w-[30vw] bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          value={country.value}
          onChange={(value) => setCountry(value)}
        />
      </Field>
      <Field name="region" label="Region">
        <RegionDropdown
          classes="w-[80vw] md:w-[30vw] bg-gray-50 p-2 mb-2 rounded focus:bg-white"
          country={country.value}
          value={region.value}
          onChange={(value) => setRegion(value)}
        />
      </Field>
    </>
  );
};
