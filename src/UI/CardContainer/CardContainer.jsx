//секции добавления и редактирования

import styles from './CardContainer.module.css'

const CardContainer = (props) => {
  return (
    <div className={styles['card-container']}>
      <h2>{props.logo}</h2>
      {props.children}
    </div>
  )
}

export default CardContainer
