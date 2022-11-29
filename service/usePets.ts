import useSWR from "swr";
import fetcher from "utils/fetch";
import { getQueryParams } from "utils/getQueryParams";
import type { PetFields, PetWithUser } from "prisma/types";

const usePets = (
  query: { [key in PetFields]?: string } | null,
  initialPets: PetWithUser[]
) => {
  let url = "/api/pets";

  if (query) {
    url += getQueryParams(query);
  }

  const { data, error } = useSWR(url, fetcher, { fallbackData: initialPets });

  return {
    pets: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePets;
