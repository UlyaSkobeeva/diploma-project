import { changeStatus } from '../../../../app/store/ideas/ideas-slice'
import { useAppDispatch } from '../../../../shared/lib/utils/use-app'
import { OPTIONS } from '../lib/constants/options'

import styles from './status-switcher.module.css'

export const StatusSwitcher = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles['status-switcher']}>
      <span>статус</span>
      <select
        name="status"
        onChange={(e) => dispatch(changeStatus(e.target.value))}
      >
        {OPTIONS.map((option, index) => (
          <option value={option.value} label={option.label} key={index} />
        ))}
      </select>
    </div>
  )
}
