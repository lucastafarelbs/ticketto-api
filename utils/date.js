const dateTimeToUTC = dateTime => {
  if (!dateTime) return 
  if (typeof dateTime !== 'string') return
  const dateTimeLowerCase = dateTime.toLowerCase()
  const dateTimeSeparator = dateTimeLowerCase.includes('t') 
    ? 't'
    :  dateTimeLowerCase.includes(' ') 
      ? ' ' 
      : null

  if (!dateTimeSeparator) return
  const splitted = dateTimeLowerCase.split(dateTimeSeparator)
  if (splitted.length !== 2 || splitted[0].length !== 10) return

  const dateSeparator = splitted[0].toUpperCase().includes('/')
    ? '/'
    : splitted[0].includes('-') 
      ? '-'
      : null

  const dateSplitted = splitted[0].split(dateSeparator)
  const timeSplitted = splitted[1].split(':')

  const year = dateSplitted[0]
  if (year.length !== 4) return

  const month = dateSplitted[1]
  const day = dateSplitted[2]
  const hours = timeSplitted[0] || 0
  const minutes = timeSplitted[1] || 0
  const seconds = timeSplitted[2] || 0

  const utcDate = new Date(year, month, day, hours, minutes, seconds)
  return utcDate
}

export default {
  dateTimeToUTC
}

export {
  dateTimeToUTC
}
