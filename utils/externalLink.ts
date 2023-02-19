export default function externalLink(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
}
