import NewsItem from './NewsItem'

const NewsList = (props) => {
  return (
    <div className="news__inner">
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
