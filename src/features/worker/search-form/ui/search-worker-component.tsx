import { SearchWorkerComponentProps } from '../types'

import styles from './search-worker-component.module.css'

export const SearchWorkerComponent = (props: SearchWorkerComponentProps) => {
  const { setSearchInput } = props

  return (
    <div className={styles['search-worker-component']}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/751/751463.png"
        alt=""
        className={styles['search-worker-component__img']}
      />
      <input
        className={styles['search-worker-component__input']}
        type="text"
        placeholder="Начните поиск"
        onChange={(e) => setSearchInput(e.target.value)}
        autoComplete="off"
      />
    </div>
  )
}
