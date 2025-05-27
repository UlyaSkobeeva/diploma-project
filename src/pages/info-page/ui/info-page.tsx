import styles from './info-page.module.css'

import { InfoPageHeader } from '../../../entities/info/info-page-header'
import { InfoPageAccordion } from '../../../features/info/info-page-accordion'

export const InfoPage = () => {
  return (
    <div className={styles['container']}>
      <InfoPageHeader />
      <InfoPageAccordion />
    </div>
  )
}
