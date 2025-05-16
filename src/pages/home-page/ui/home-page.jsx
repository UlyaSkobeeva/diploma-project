// import "../../App.css"
import PropTypes from 'prop-types'

import styles from './home-page.module.css'
import { BirthdaySlider } from '../../../widgets/birthday'
import { InfoCalendar } from '../../../widgets/info-calendar'
import { News } from '../../../widgets/news'

export const HomePage = (props) => {
  return (
    <div className={styles['home-page']}>
      <div className={styles['info']}>
        <div className={styles['info__container']}>
          {/* Ближайшие события */}
          <InfoCalendar user={props.user} />

          <div className={styles['info__birthday-container']}>
            <BirthdaySlider />
          </div>
        </div>
      </div>
      <News user={props.user} />
    </div>
  )
}

HomePage.propTypes = {
  user: PropTypes.object,
}
