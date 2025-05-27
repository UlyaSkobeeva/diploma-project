import styles from './info-page-header.module.css'

export const InfoPageHeader = () => {
  return (
    <>
      <h2 className={styles['title']}>Часто задаваемые вопросы</h2>
      <p className={styles['description']}>
        Предлагаем Вам ответы на вопросы, которые нам задают чаще всего. Если у
        Вас появятся другие вопросы,
        <a className={styles['link']} href="mailto:ourteam@mail.ru">
          напишите нам
        </a>
        , и мы непременно ответим.
      </p>
    </>
  )
}
