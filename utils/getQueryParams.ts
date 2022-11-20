export const getQueryParams = (body: { [key: string]: string }): string =>
  new URLSearchParams(body).toString();
