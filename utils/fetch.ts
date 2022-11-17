export type Response = {
  success: boolean;
  data?: any;
  error?: unknown;
};
console.log(process.env.NEXT_PUBLIC_URL)
export default async function (
  path: string,
  config?: object
): Promise<any> {
  try {
    const res = await fetch(path, config);
    const data = await res.json() 
    console.log(path, data)
    return data
  } catch (error) {
    return {
      error: "Unable to connect with the server. Check your internt connection",
      success: false,
    };
  }
}
