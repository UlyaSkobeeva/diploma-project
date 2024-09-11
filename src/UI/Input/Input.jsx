import styles from './Input.module.css'

const Input = (props) => {
  return (
    <div className={styles['element__input']}>
      <label>{props.label}</label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onMouseDown={props.onMouseDown}
        required={props.required || false}
      />
      {props.children}
    </div>
  )
}

export default Input
