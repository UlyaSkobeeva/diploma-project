import { BirthdaySlider } from '../../../entities/birthday-slider'
import { InfoCalendar } from '../../../widgets/info-calendar'
import { News } from '../../../widgets/news'

import styles from './home-page.module.css'

export const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <div className={styles['info']}>
        <div className={styles['info__container']}>
          <InfoCalendar />

          <div className={styles['info__birthday-container']}>
            <BirthdaySlider />
          </div>
        </div>
      </div>
      <News />
    </div>
  )
}
