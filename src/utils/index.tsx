type dateTypes = {
  date: Date
  weekday?: 'long' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
  month?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit'
  day?: 'numeric' | '2-digit'
}

export const dateToString = ({
  date,
  weekday = 'long',
  year = 'numeric',
  month = 'long',
  day = 'numeric'
}: dateTypes) => {
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday,
    year,
    month,
    day
  }

  return date.toLocaleDateString(undefined, dateFormat)
}

export const classNames = (...classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(' ')
}
