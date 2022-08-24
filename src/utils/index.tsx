const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const dateToString = (date: Date) =>
  date?.toLocaleDateString(undefined, dateFormat)

export function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(' ')
}
