export const getQueryParams = (body: { [key: string]: string }): string => {
  let params: { [key: string]: string } = {};
  
  for (let key in body) {
    if (body[key]) {
      params[key] = body[key];
    }
  }

  return new URLSearchParams(params).toString();
};
