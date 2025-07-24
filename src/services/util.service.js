export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  randomPastTime,
  debounce,
  saveToStorage,
  loadFromStorage,
  capitalizeStr,
  getAvgRating,
  roundToDecimals,
}
// consider use npm for id maker
export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function randomFutureTime(){
  const millisecondsInADay = 86400000
  getRandomIntInclusive(1, 365)
  return new Date().getTime() + getRandomIntInclusive(1, 365) * millisecondsInADay
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function capitalizeStr(str) {
  if (!str) return
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getExistingProperties(obj) {
  const truthyObj = {}
  for (const key in obj) {
    const val = obj[key]
    if (val || typeof val === 'boolean') {
      truthyObj[key] = val
    }
  }
  return truthyObj
}
export function getAvgRating(home) {
  if (!home || !home.reviews || home.reviews.length === 0) return 0
  const total = home.reviews.reduce((acc, review) => acc + review.rate, 0)
  const average = total / home.reviews.length
  return roundToDecimals(average, 1)
}

export function roundToDecimals(num, decimals = 2) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export function getStayDatesStr() {
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1)
    const shortStrThisMonth = today.toLocaleString('en-US', { month: 'short' })
    const shortStrNextMonth = nextMonth.toLocaleString('en-US', {
      month: 'short',
    })
    return today.getDate() < 26 && today.getMonth !== 1 ?
        `${shortStrThisMonth} ${today.getDate() + 1}-${today.getDate() + 4}`
      : 
        `${shortStrNextMonth} 1&thinsp;-&thinsp;4`
}

export function getRandom3NightsStayDatesStr() {
  const today = new Date()
  const year = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDate = today.getDate()

  let startDay, endDay, month

  if (currentDate > 26 || currentMonth === 1) {
      month = currentMonth + 1
      startDay = 1
      endDay = 4
  } else {
      month = currentMonth
      startDay = currentDate + 1
      endDay = currentDate + 4
  }

  const startDateObj = new Date(year, month, startDay)
  const endDateObj = new Date(year, month, endDay)

  const format = (date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  return {
    startDate: format(startDateObj),
    endDate: format(endDateObj),
  }
}

export function strDateToTimestamp(strDate){
    const [day, month, year] = strDate.split('/').map(Number)
    return new Date(year, month - 1, day).getTime()
}