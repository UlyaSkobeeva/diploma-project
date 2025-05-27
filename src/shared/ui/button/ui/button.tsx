import classNames from 'classnames'
import styles from './button.module.css'
import { ButtonProps } from '../types'

export const Button = (props: ButtonProps) => {
  const { className, type, onClick, children } = props

  return (
    <button
      className={classNames(styles['button'], className)}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
