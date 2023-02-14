import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import type { SetStateAction } from "react";
import countries from "config/countries";
import useTranslate from "hooks/useTranslate";

type Props = {
  filters: {
    setFilters: SetStateAction<any>;
    filters: { country: string; region: string } | null
  };
};

export const PetFilters = ({ filters: { setFilters, filters } }: Props) => {
  const t = useTranslate()
  
  return (
    <div className="flex flex-row">
      <CountryDropdown
      whitelist={countries}
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        value={filters?.country || ""}
        onChange={(value) =>
          setFilters({ ...filters, country: value, region: "" })
        }
        defaultOptionLabel={t('browse.select_country')}
      />
      <RegionDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        blankOptionLabel={t('browse.select_region')}
        disableWhenEmpty
        value={filters?.region || ""}
        onChange={(value) => setFilters({ ...filters, region: value })}
        country={filters?.country || ""}
        defaultOptionLabel={t('browse.select_region')}
      />
    </div>
  );
};
