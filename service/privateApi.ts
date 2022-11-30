import fetcher, { Response } from "utils/fetch";

const baseURL = process.env.NEXT_PUBLIC_URL + "/api/";
const headers = { "Content-Type": "application/json" };

const privateApi = async (
  method: string,
  url: string,
  body?: { [key: string]: any },
  headers?: { [key: string]: string }
) => {

  const response: Response = {
    data: null,
    error: null,
  };

  try {
    const data = await fetcher(baseURL+url, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    response.data = data;
  } catch (error: any) {
    response.error = error;
  }

  return response;
};

export const get = async (url: string) => await privateApi("GET", url);

export const post = async (url: string, body?: { [key: string]: any }) =>
  await privateApi("POST", url, body, headers);

export const patch = async (url: string, body: { [key: string]: any }) =>
  await privateApi("PATCH", url, body, headers);
