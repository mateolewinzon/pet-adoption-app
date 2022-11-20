import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getPets } from "service/pets";
import type { SetStateAction } from "react";
import type { PetFields } from "prisma/types";

type Props = {
  setResults: SetStateAction<any>;
};

export const BrowseFilters = ({ setResults }: Props) => {
  const initialFilters = {
    country: "",
    region: "",
  };
  const [filters, setFiltrs] =
    useState<{ [key in PetFields]?: string }>(initialFilters);

  useEffect(() => {
    const getFilteredPets = async () => {
      const { data } = await getPets(filters);
      setResults(data);
    };

    if (Object.values(filters).filter((item) => item)[0]) {
      getFilteredPets();
    }
  }, [filters]);

  return (
    <div className="flex flex-row">
      <CountryDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        value={filters.country!}
        onChange={(value) =>
          setFiltrs({ ...filters, country: value, region: "" })
        }
      />
      <RegionDropdown
        classes="w-full bg-gray-50 p-2 mb-2 rounded focus:bg-white"
        blankOptionLabel="Select a Region"
        disableWhenEmpty
        value={filters.region!}
        onChange={(value) => setFiltrs({ ...filters, region: value })}
        country={filters.country!}
      />
    </div>
  );
};
