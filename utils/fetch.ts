export type Response = {
  success: boolean;
  data?: any;
  error?: unknown;
};

export default async function (
  path: string,
  config?: object
): Promise<any> {
  try {
    const res = await fetch(path, config);
    console.log(res)
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error)
    return {
      
      error: "Unable to connect with the server. Check your internt connection",
      success: false,
    };
  }
}
