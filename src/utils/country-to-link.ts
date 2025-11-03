export default function (countryName: string) {
  return countryName.replace(/\s/gi, "_");
}
