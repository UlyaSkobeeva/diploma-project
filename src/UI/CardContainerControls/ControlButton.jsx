//кнопка в секциях добавления и редактирования
import styles from './ControlButton.module.css'

const ControlButton = (props) => {
  return (
    <button
      className={styles['control-button']}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default ControlButton
