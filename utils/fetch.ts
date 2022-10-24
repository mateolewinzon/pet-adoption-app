type Response = {
  data: { success?: boolean };
  error: unknown;
};

export default async function (
  path: string,
  config?: RequestInit
): Promise<any> {
  const response: Response = {
    data: {},
    error: null,
  };

  try {
    const res = await fetch(path, config);
    const data = await res.json();
    response.data = data;
  } catch (error) {
    response.error = error;
  }

  return response;
}
