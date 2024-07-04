export default function capitalizeString(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}
