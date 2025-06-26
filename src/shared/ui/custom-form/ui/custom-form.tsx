import classNames from 'classnames'

import { Button } from '../../button'
import { CustomFormProps } from '../types'
import styles from './custom-form.module.css'
import { ButtonType } from '../../../types'
import { ChangeEvent } from 'react'

export const CustomForm = (props: CustomFormProps) => {
  const {
    fields,
    onSubmit,
    onCancel,
    title,
    submitBtnTitle,
    containerClassName,
    titleClassName,
    buttonsClassName,
  } = props

  return (
    <div className={classNames(styles['custom-form'], containerClassName)}>
      <h2 className={classNames(styles['custom-form__title'], titleClassName)}>
        {title}
      </h2>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className={styles['custom-form__item']}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.needWarning && (
              <span className={styles['custom-form__span--required']}>*</span>
            )}
            <div className={styles['custom-form__wrapper']}>
              {field.type === 'textarea' ? (
                <textarea
                  className={styles['custom-form__textarea']}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  id={field.name}
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
                  id={field.name}
                />
              )}
              <button
                className={styles['custom-form__button--cleaning']}
                type="button"
                onClick={() =>
                  field.onChange({
                    target: {
                      name: field.name,
                      value: '',
                    },
                  } as ChangeEvent<HTMLInputElement>)
                }
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <div
          className={classNames(
            styles['custom-form__control-buttons'],
            buttonsClassName,
          )}
        >
          <Button type={ButtonType.submit}>{submitBtnTitle}</Button>
          {onCancel && <Button onClick={onCancel}>Отмена</Button>}
        </div>
      </form>
    </div>
  )
}
