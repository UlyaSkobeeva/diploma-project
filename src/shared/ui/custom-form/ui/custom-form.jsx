import { Button } from '../../button'
import styles from './custom-form.module.css'
import classNames from 'classnames'

export const CustomForm = ({
  fields, //поля
  onSubmit, //отправка формы
  onCancel, //кнопка отмена
  title, //заголовок
  submitBtn, //текст кнопки сохранить
  containerClassName, //стили для контейнера
  titleClassName, //стили для заголовка
  buttonsClassName, //стили для кнопок
}) => {
  return (
    <div className={classNames(styles['custom-form'], containerClassName)}>
      <h2 className={classNames(styles['custom-form__title'], titleClassName)}>
        {title}
      </h2>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className={styles['custom-form__item']}>
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className={styles['custom-form__textarea']}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                className={styles['custom-form__input']}
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                autoComplete="off"
                required={field.required}
              />
            )}
          </div>
        ))}
        <div
          className={classNames(
            styles['custom-form__control-buttons'],
            buttonsClassName,
          )}
        >
          <Button type="submit">{submitBtn ?? 'Сохранить'}</Button>
          {onCancel && <Button onClick={onCancel}>Отмена</Button>}
        </div>
      </form>
    </div>
  )
}
