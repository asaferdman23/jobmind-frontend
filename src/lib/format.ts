export function formatCount(value: number, locale = "en") {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDateTime(value: string | null, locale = "en") {
  if (!value) {
    return "Just now";
  }
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatPercent(value: number, locale = "en") {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)}%`;
}
