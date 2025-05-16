import { useState } from 'react'
import { ACCORDION_DATA } from '../lib/contants/accordion-data'
import styles from './info-page-accordion.module.css'
import classNames from 'classnames'

export const InfoPageAccordion = () => {
  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  }
  return (
    <div className={styles['accordion']} style={{ marginBottom: '30px' }}>
      {ACCORDION_DATA.map((item, index) => (
        <div className={styles['accordion__list']} key={index}>
          <div
            className={styles['accordion__item']}
            onClick={() => toggle(index)}
          >
            <h2 className={styles['accordion__item-title']}>{item.q}</h2>
            <span className={styles['accordion__item-btn']}>
              {selected === index ? '▲' : 'ᐁ'}
            </span>
          </div>
          <div
            className={classNames(
              styles['content'],
              selected === index && styles['content--show'],
            )}
          >
            {item.a}
          </div>
        </div>
      ))}
    </div>
  )
}
