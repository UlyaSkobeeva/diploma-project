import NewsItem from './NewsItem'
import styles from './NewsList.module.css'

const NewsList = (props) => {
  return (
    <div className={styles['news__list']}>
      {props.news.map((newElem) => (
        <NewsItem
          key={newElem.id}
          newElem={newElem}
          onClickDetail={props.onClickDetail}
          onClickRemove={props.onClickRemove}
          onClickEdit={props.onClickEdit}
          user={props.user}
        />
      ))}
    </div>
  )
}

export default NewsList
