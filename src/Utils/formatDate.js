import { format } from "date-fns";

export const formatDate = (dateStr) => {
  if (!dateStr) return "TBD";
  return format(new Date(dateStr), "MMM dd, yyyy");
};