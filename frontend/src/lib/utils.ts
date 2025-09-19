export function formateDate(date: string): string {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
