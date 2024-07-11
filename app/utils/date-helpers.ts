import dayjs from "dayjs";

export function ISOStringToLL(iso: string) {
  const date = new Date(iso);
  return dayjs(date).format("MMMM D, YYYY");
}
