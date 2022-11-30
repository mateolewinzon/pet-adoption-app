export type Response = {
  data?: any;
  error?: unknown;
};

export default async function (path: string, config?: object): Promise<any> {
  const res = await fetch(path, config);
  const { data, error } = await res.json();

  if (!res.ok) {
    const errorData: any = new Error('An error occurred')
    errorData.info = error || 'Unkown server error'
    errorData.status = res.status
    throw errorData
  }

  return data
}
