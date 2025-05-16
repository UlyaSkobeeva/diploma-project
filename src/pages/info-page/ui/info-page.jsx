import styles from './info-page.module.css'

import {
  InfoPageAccordion,
  InfoPageHeaderContent,
} from '../../../widgets/info-page'

export const InfoPage = () => {
  return (
    <div className={styles['container']}>
      <InfoPageHeaderContent />
      <InfoPageAccordion />
    </div>
  )
}
