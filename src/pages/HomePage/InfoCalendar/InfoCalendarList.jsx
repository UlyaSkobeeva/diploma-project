import InfoCalendarItem from './InfoCalendarItem'
import styles from './InfoCalendarList.module.css'

const InfoCalendarList = (props) => {
  return (
    <div className={styles['info-calendar__list']}>
      {/* вывод отфильтрованного массива */}
      {props.filteredCalendars.map((calendar) => (
        <InfoCalendarItem
          key={calendar.id}
          calendar={calendar}
          onClickDetail={props.onClickDetail}
          onClickEdit={props.onClickEdit}
          onClickRemove={props.onClickRemove}
          user={props.user}
        />
      ))}
    </div>
  )
}

export default InfoCalendarList
