import dayjs from 'dayjs'
import { Calendar } from '../../../../../shared/types'

/**
 * Функция выводит события на ближайшие 14 дней,
 * начиная с текущего дня.
 * В объекте должно обязательно содержаться поле date
 *
 * @param elements массив объектов
 * @returns отфильтрованный массив объектов
 */

export const getUpcomingCalendarDates = (elements: Calendar[]): Calendar[] => {
  const todayDate = dayjs().startOf('day')
  const nextDate = todayDate.add(14, 'day').endOf('day')

  let filteredElements: Calendar[] = []

  elements.forEach((element) => {
    const birthdayDate = dayjs(element.date).startOf('day')

    const hasElement =
      birthdayDate.isAfter(todayDate) && birthdayDate.isBefore(nextDate)

    hasElement && filteredElements.push(element)
  })

  return filteredElements
}
