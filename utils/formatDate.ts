export default function formatDate(date: Date, locale?: string): string {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();

  let str;

  if (locale === "en") {
    str = `${month}/${day}`;
  } else {
    str = `${day}/${month}`;
  }

  if (year !== new Date().getFullYear()) {
    str += `${String(year).slice(2)}`;
  }

  return str
}
