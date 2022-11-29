import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getPets } from "service/pets";
import type { SetStateAction } from "react";
import type { PetFields } from "prisma/types";

type Props = {
  filters: {
    setFilters: SetStateAction<any>;
    filters: { country: string; region: string } | null
  };
};

export const PetFilters = ({ filters: { setFilters, filters } }: Props) => {
  return (
    <div className="flex flex-row">
      <CountryDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        value={filters?.country || ""}
        onChange={(value) =>
          setFilters({ ...filters, country: value, region: "" })
        }
      />
      <RegionDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        blankOptionLabel="Select a Region"
        disableWhenEmpty
        value={filters?.region || ""}
        onChange={(value) => setFilters({ ...filters, region: value })}
        country={filters?.country || ""}
      />
    </div>
  );
};
