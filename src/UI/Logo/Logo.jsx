import styles from './Logo.module.css'

const Logo = (props) => {
  return (
    <div className={`${styles.logo} ${props.className}`}>{props.children}</div>
  )
}

export default Logo
