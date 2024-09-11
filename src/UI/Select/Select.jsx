import styles from './Select.module.css'

const Select = (props) => {
  return (
    <div className={styles['element__select']}>
      <label>{props.label}</label>
      <select value={props.value} onChange={props.onChange}>
        {props.optionMonth.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
