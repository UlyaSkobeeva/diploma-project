import { useNavigate } from 'react-router-dom'

import styles from './workers-list.module.css'

import { WorkersListProps } from '../types'
import { Button } from '../../../../shared/ui/button'
import { RoutePath } from '../../../../shared/types/route-path'

export const WorkersList = (props: WorkersListProps) => {
  const { filteredWorkers, user, getWorkerData } = props

  const navigate = useNavigate()

  const removeWorker = (id?: number) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/worker/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          // alert("Данные были удалены")
          getWorkerData()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }
  return (
    <div className={styles['workers-list']}>
      {!filteredWorkers.length && <p> информация отствует </p>}

      {filteredWorkers.map(({ id, img, name, job, number, mail, birthday }) => {
        return (
          <div className={styles['workers-list__item']} key={id}>
            <div className={styles['workers-list__item-img']}>
              <img src={img} alt="" />
            </div>
            <div className={styles['workers-list__item-info']}>
              <h3>{name}</h3>
              <h4>Должность: {job}</h4>
              <h4>Телефон: {number}</h4>
              <h4>Эл. почта: {mail}</h4>
              <h4>Дата рождения: {birthday}</h4>

              {user?.isAdmin && (
                <>
                  <Button onClick={() => navigate(RoutePath.workerEdit + id)}>
                    Изменить
                  </Button>
                  <Button onClick={() => removeWorker(id)}>Удалить</Button>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
