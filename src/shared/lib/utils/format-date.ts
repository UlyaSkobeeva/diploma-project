import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { FormatType } from '../../types'

// Приводит дату к виду - 10 ноября

export const formatDate = (date: string): string => {
  return dayjs(date).locale('ru').format(FormatType.date)
}

// Приводит дату к виду - 10 нояб

export const formatShortDate = (date: string): string => {
  return dayjs(date).locale('ru').format(FormatType.shortDate)
}

// Приводит дату к виду - 10 ноября 2024

export const formatLongDate = (date: string): string => {
  return dayjs(date).locale('ru').format(FormatType.longDate)
}
