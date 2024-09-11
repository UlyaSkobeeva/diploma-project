//контейнер для кнопок добавления и реадактирования

import styles from './CardContainerControls.module.css'

const CardContainerControls = (props) => {
  return (
    <div className={styles['card-container__controls']}>{props.children}</div>
  )
}

export default CardContainerControls
