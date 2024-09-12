import Button from '../../../UI/Button/Button'

const InfoCalendarList = (props) => {
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
    <div className="info-calendar__list">
      {/* вывод отфильтрованного массива */}
      {props.filteredCalendars.map((calendar) => (
        <div key={calendar.id}>
          <div className="info-calendar__item">
            <div className="info-calendar__date">
              <p className="day">{calendar.day}</p>
              <p className="month">{calendar.month}</p>
            </div>
            <p className="info-calendar__text">{calendar.title}</p>
            <a
              onClick={() => {
                getIdByDetail(calendar.id)
              }}
              className="plus__btn"
            >
              +
            </a>
          </div>

          {props.user?.isAdmin && (
            <div>
              <Button
                onClick={() => {
                  getIdByEdit(calendar.id)
                }}
              >
                Изменить
              </Button>
              <Button onClick={() => getIdByRemove(calendar.id)}>
                Удалить
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default InfoCalendarList
