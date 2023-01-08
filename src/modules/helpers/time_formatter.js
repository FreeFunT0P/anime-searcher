//все методы принимают timestamp

const dataParams = (timestamp, offset) => {
  if (!([-1, 0, 1].includes(offset))) {
    return 'Incorrect offset'
  }

  const dateBase = new Date(timestamp)
  const tzOffset = offset * dateBase.getTimezoneOffset() * 60000
  const date = new Date(dateBase.getTime() - tzOffset)

  const formatDate = val => {
    const newVal = '0' + val

    const date = newVal.length === 5 ? newVal.substring(newVal.length - 4) : newVal.substring(newVal.length - 2)

    return {
      always: date,
      isNotNull: delimiter => val ? `${date}${delimiter}` : '',
    }
  }

  return {
    year: formatDate(date.getFullYear()),
    month: formatDate(date.getMonth() + 1),
    day: formatDate(date.getDate()),
    hours: formatDate(date.getHours()),
    minutes: formatDate(date.getMinutes()),
    seconds: formatDate(date.getSeconds()),
  }
}

//возвращает час:минута:секунда
export const formatDateDots = (timestamp, offset = 0) => {
  const dates = dataParams(timestamp, offset)

  if (typeof dates === 'string') {
    return dates
  } else {
    const { hours, minutes, seconds } = dataParams(timestamp, offset)
    return `${hours.isNotNull(':')}${minutes.always}:${seconds.always}`
  }
}

//возвращает дата.месяц.год час:минута:секунда
export const formatDateHyphen = (timestamp, offset = 0) => {
  const dates = dataParams(timestamp, offset)

  if (typeof dates === 'string') {
    return dates
  } else {
    const { day, month, year, hours, minutes, seconds } = dataParams(timestamp, offset)
    return `${day.always}.${month.always}.${year.always} ${hours.always}:${minutes.always}:${seconds.always}`
  }
}

//возвращает дата.месяц.год час:минута
export const formatDateHyphenShort = (timestamp, offset = 0) => {
  const dates = dataParams(timestamp, offset)

  if (typeof dates === 'string') {
    return dates
  } else {
    const { day, month, year, hours, minutes } = dataParams(timestamp, offset)
    return `${day.always}.${month.always}.${year.always} ${hours.always}:${minutes.always}`
  }
}

//возвращает час:минута
export const formatDateTimeOnly = (timestamp, offset = 0) => {
  const dates = dataParams(timestamp, offset)

  if (typeof dates === 'string') {
    return dates
  } else {
    const { hours, minutes } = dataParams(timestamp, offset)
    return `${hours.always}:${minutes.always}`
  }
}

//возвращает дата.месяц.год
export const formatDateDayOnly = (timestamp, offset = 0) => {
  const dates = dataParams(timestamp, offset)

  if (typeof dates === 'string') {
    return dates
  } else {
    const { day, month, year } = dataParams(timestamp, offset)
    return `${day.always}.${month.always}.${year.always}`
  }
}

//принимает обьект с ключами begin и end возвращает дата.месяц.год час:минута:секунда - дата.месяц.год час:минута:секунда
export const formatDatePair = ({ begin, end }) => {
  return `${formatDateHyphen(begin)} - ${formatDateHyphen(end)}`
}
