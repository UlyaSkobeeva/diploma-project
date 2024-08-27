import { useState } from 'react'
import './InfoPage.css'

const data = [
  {
    q: 'Каково официальное время работы офиса Компании?',
    a: 'Официальное рабочее время: с 10:00 до 19:00, перерыв на обед — 1 час, c 13:00 до 14:00. При отклонении от официального времени необходимо проинформировать исполнительного директора и/или вышестоящего руководителя. ',
  },
  {
    q: 'При каких моих действиях меня могут уволить из компании?',
    a: 'Использование данных с портала для своих личных целей или целей третьих лиц',
  },
  {
    q: 'Могу ли я работать удалённо в отдельных случаях (приболел, семейные обстоятельства и т.д.)?',
    a: 'Да, такая возможность есть. Необходимо заранее согласовать с непосредственным начальником и исполнительным директором',
  },
  {
    q: 'Какая система компенсаций принята в компании?',
    a: 'При поездке по рабочим вопросам: на общественном транспорте, на личном транспорте. Мобильная связь.',
  },
  {
    q: 'Когда выплачивается зарплата?',
    a: 'За текущий месяц — в первый рабочий день следующего месяца (Пример: за “СЕНТЯБРЬ” зарплата выплачивается в первый рабочий день “ОКТЯБРЯ”.',
  },
  {
    q: 'Как выплачивается мне зарплата?',
    a: 'Официальная зарплата за текущий месяц перечисляется на банковскую карту Сотрудника ориентировочно в последний рабочий день текущего месяца (или 2 раза в месяц, разделённая на 2 части)',
  },
]

export default function Info() {
  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  }

  return (
    <div className="input-container accordion-container">
      <h2 className="input-logo">Часто задаваемые вопросы</h2>
      <p className="adesc">
        Предлагаем Вам ответы на вопросы, которые нам задают чаще всего. Если у
        Вас появятся другие вопросы,
        <a className="adesc-link" href="mailto:ourteam@mail.ru">
          напишите нам
        </a>
        , и мы непременно ответим.
      </p>
      <div className="accordion" style={{ marginBottom: '30px' }}>
        {data.map((item, i) => (
          <div className="accordion-item" key={i}>
            <div className="Atitle" onClick={() => toggle(i)}>
              <h2 className="Alogo">{item.q}</h2>
              <span className="more-btn">{selected === i ? '▲' : 'ᐁ'}</span>
            </div>
            <div className={selected === i ? 'content show' : 'content'}>
              {item.a}
            </div>
          </div>
        ))}
        {/* {data.map((item, i) => {
          ;<div className="accordion-item">
            <div className="accordion-header">gdfg</div>
            <div className="accordion-body">fdgdgd</div>
          </div>
        })} */}
      </div>
    </div>
  )
}
