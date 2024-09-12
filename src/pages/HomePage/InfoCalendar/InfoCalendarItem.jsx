import Button from '../../../UI/Button/Button'
import styles from './InfoCalendarItem.module.css'

const InfoCalendarItem = (props) => {
  const { calendar } = props

  //передать данные для описания
  const getIdByDetail = (id) => {
    props.onClickDetail(id)
  }

  //для редактирования
  const getIdByEdit = (id) => {
    props.onClickEdit(id)
  }

  //для удаления
  const getIdByRemove = (id) => {
    props.onClickRemove(id)
  }

  return (
    <div className={styles['info-calendar__item']}>
      <div className={styles['info-calendar__description']}>
        <div className={styles['info-calendar__date']}>
          <p className={styles.day}>{calendar.day}</p>
          <p className={styles.month}>{calendar.month}</p>
        </div>
        <p className={styles['info-calendar__text']}>{calendar.title}</p>
        <a
          className={styles['plus__btn']}
          onClick={() => {
            getIdByDetail(calendar.id)
          }}
        >
          +
        </a>
      </div>

      {props.user?.isAdmin && (
        <div className={styles['button-section']}>
          <Button
            onClick={() => {
              getIdByEdit(calendar.id)
            }}
          >
            Изменить
          </Button>
          <Button onClick={() => getIdByRemove(calendar.id)}>Удалить</Button>
        </div>
      )}
    </div>
  )
}

export default InfoCalendarItem
