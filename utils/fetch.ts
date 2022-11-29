export type Response = {
  success: boolean;
  data?: any;
  error?: unknown;
};

export default async function (path: string, config?: object): Promise<any> {
  const res = await fetch(path, config);
  const data = await res.json();
  return data;
}
