//function formats a number as money
import dayjs from "dayjs";

// Formats a number as currency (e.g., 1234.56 -> "$1,234.56")
export function formatCurrency(
  value: number,
  currency: string = "USD",
): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    // Fallback: format as US dollars manually
    const formattedValue = value.toFixed(2);
    return `$${formattedValue}`;
  }
}

// Formats a date time string to MM/DD/YYYY (e.g., "2025-10-15T10:30:00Z" -> "10/15/2025")
export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid()
    ? parsedDate.format("MM/DD/YYYY")
    : "Not provided";
};

// Formats a status label to title case (e.g., "active" -> "Active")
export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// export const formatCurrency = (value: number, currency = "USD"): string => {
//   try {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   } catch {
//     return value.toFixed(2);
//   }
// };

// export const formatSubscriptionDateTime = (value?: string): string => {
//   if (!value) return "Not provided";
//   const parsedDate = dayjs(value);
//   return parsedDate.isValid()
//     ? parsedDate.format("MM/DD/YYYY")
//     : "Not provided";
// };
