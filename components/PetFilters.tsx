import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getPets } from "service/pets";
import type { SetStateAction } from "react";
import type { PetFields } from "prisma/types";
import { useI18n } from "next-localization";
import countries from "config/countries";

type Props = {
  filters: {
    setFilters: SetStateAction<any>;
    filters: { country: string; region: string } | null
  };
};

export const PetFilters = ({ filters: { setFilters, filters } }: Props) => {
  const i18n = useI18n()
  
  return (
    <div className="flex flex-row">
      <CountryDropdown
      whitelist={countries}
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        value={filters?.country || ""}
        onChange={(value) =>
          setFilters({ ...filters, country: value, region: "" })
        }
        defaultOptionLabel={i18n.t('browse.select_country')}
      />
      <RegionDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        blankOptionLabel={i18n.t('browse.select_region')}
        disableWhenEmpty
        value={filters?.region || ""}
        onChange={(value) => setFilters({ ...filters, region: value })}
        country={filters?.country || ""}
        defaultOptionLabel={i18n.t('browse.select_region')}
      />
    </div>
  );
};
