import Button from '../../../UI/Button/Button'
import styles from './News.module.css'

const NewsItem = (props) => {
  const { newElem } = props
  const LoadDetailHandler = (id) => {
    props.onClickDetail(id)
  }

  const LoadEditHandler = (id) => {
    props.onClickEdit(id)
  }

  const RemoveFunctionHandler = (id) => {
    props.onClickRemove(id)
  }

  return (
    <div className="news__item">
      <div className="news__foto">
        <img className="picture" src={newElem.smallImg} alt="" />
      </div>
      <div className="news__text">
        <p className="news__paragraph">{newElem.smallTitle}</p>
        <a onClick={() => LoadDetailHandler(newElem.id)} className="news__link">
          Читать больше →
        </a>
      </div>

      {props.user?.isAdmin && (
        <div className="input-button-section">
          <Button
            className={styles['news-controls__button']}
            onClick={() => {
              LoadEditHandler(newElem.id)
            }}
          >
            Изменить
          </Button>
          <Button
            className={styles['news-controls__button']}
            onClick={() => RemoveFunctionHandler(newElem.id)}
          >
            Удалить
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewsItem
