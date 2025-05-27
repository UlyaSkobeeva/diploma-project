import { BirthdaySlider } from '../../../widgets/birthday'
import { InfoCalendar } from '../../../widgets/info-calendar'
import { News } from '../../../widgets/news'

import { HomePageProps } from '../types'

import styles from './home-page.module.css'

export const HomePage = (props: HomePageProps) => {
  const { user } = props

  //TODO сделать запрос к сотрудникам
  //сохранить в редаксе
  //выводить где надо через useSelector

  return (
    <div className={styles['home-page']}>
      <div className={styles['info']}>
        <div className={styles['info__container']}>
          {/* Ближайшие события */}
          <InfoCalendar user={user} />

          <div className={styles['info__birthday-container']}>
            <BirthdaySlider />
          </div>
        </div>
      </div>
      <News user={user} />
    </div>
  )
}
