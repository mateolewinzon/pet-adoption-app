export default function (text: string): string {
  const result =
    text.charAt(0).toUpperCase() + text.slice(1).replaceAll("_", " ");
  return result;
}
