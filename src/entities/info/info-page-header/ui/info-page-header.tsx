import styles from './info-page-header.module.css'

export const InfoPageHeader = () => {
  return (
    <div className={styles['info-page-header']}>
      <h2 className={styles['info-page-header__title']}>
        Часто задаваемые вопросы
      </h2>
      <p className={styles['info-page-header__description']}>
        Предлагаем Вам ответы на вопросы, которые нам задают чаще всего. Если у
        Вас появятся другие вопросы,
        <a
          className={styles['info-page-header__link']}
          href="mailto:ourteam@mail.ru"
        >
          напишите нам
        </a>
        , и мы непременно ответим.
      </p>
    </div>
  )
}
