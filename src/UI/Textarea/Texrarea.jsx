import styles from './Textarea.module.css'

const Textarea = (props) => {
  return (
    <div className={`${styles['element__textarea']} ${props.className}`}>
      <label>{props.label}</label>
      <textarea
        value={props.value}
        onChange={props.onChange}
        //   style={{ height: '100px' }}
        //   className="input-inp"
      />
    </div>
  )
}

export default Textarea
