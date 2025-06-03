import dayjs from 'dayjs'
import { WorkerData } from '../../../../shared/types'

/**
 * Функция выводит дни рождения сотрудников на ближайшие 30 дней,
 * начиная с текущего дня.
 * Необходимо сравнивать только день и месяц, не затрагивая год
 *
 * @param elements массив объектов
 * @returns отфильтрованный массив объектов
 *
 */

export const getUpcomingBirthdayDates = (
  elements: WorkerData[],
): WorkerData[] => {
  const todayDate = dayjs().startOf('day')
  const nextDate = todayDate.add(30, 'day').endOf('day')

  let filteredElements: WorkerData[] = []

  elements.forEach((element) => {
    const birthdayDate = dayjs(element.date).startOf('day')

    const isCurrentMonth =
      birthdayDate.month() === todayDate.month() &&
      birthdayDate.date() >= todayDate.date()

    const isNextMonth =
      birthdayDate.month() === nextDate.month() &&
      birthdayDate.date() <= nextDate.date()

    if (isCurrentMonth || isNextMonth) {
      filteredElements.push(element)
    }
  })

  return filteredElements
}
