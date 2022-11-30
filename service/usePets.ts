import useSWR from "swr";
import fetcher from "utils/fetch";
import { getQueryParams } from "utils/getQueryParams";
import type { PetFields, PetWithUser } from "prisma/types";

const usePets = (
  query: { [key in PetFields]?: string } | null,
) => {
  let url = "/api/pets";

  if (query) {
    url += getQueryParams(query);
  }

  const { data, error } = useSWR(url, fetcher);

  return {
    pets: data,
    error
  };
};

export default usePets;
