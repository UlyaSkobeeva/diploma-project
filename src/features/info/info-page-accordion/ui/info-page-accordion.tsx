import { useState } from 'react'
import { ACCORDION_DATA } from '../lib/contants/accordion-data'
import styles from './info-page-accordion.module.css'
import classNames from 'classnames'

export const InfoPageAccordion = () => {
  const [selected, setSelected] = useState<number | null>(null)

  const toggle = (index: number) => {
    if (selected === index) {
      return setSelected(null)
    }
    setSelected(index)
  }
  return (
    <div className={styles['accordion']}>
      {ACCORDION_DATA.map((item, index) => (
        <div className={styles['accordion__list']} key={index}>
          <div
            className={styles['accordion__item']}
            onClick={() => toggle(index)}
          >
            <h2 className={styles['accordion__item-title']}>{item.question}</h2>
            <span className={styles['accordion__item-btn']}>
              {selected === index ? '▲' : '▽'}
            </span>
          </div>
          <div
            className={classNames(
              styles['content'],
              selected === index && styles['content--show'],
            )}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}
