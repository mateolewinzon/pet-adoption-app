import fetcher from "utils/fetch";

const baseURL = process.env.NEXT_PUBLIC_URL + "/api/";

export const get = async (url: string) => {
  const data = await fetcher(baseURL + url);
  return data;
};

export const post = async (url: string, body: { [key: string]: any} | undefined) => {
  const data = await fetcher(baseURL + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
