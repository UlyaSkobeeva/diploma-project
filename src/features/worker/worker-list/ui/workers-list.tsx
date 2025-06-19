import { useNavigate } from 'react-router-dom'

import styles from './workers-list.module.css'

import { WorkersListProps } from '../types'
import { Button } from '../../../../shared/ui/button'
import { RoutePath } from '../../../../shared/types/route-path'
import { formatDate } from '../../../../shared/lib/utils/format-date'
import { useAppDispatch } from '../../../../shared/lib/utils/use-app'
import { removeWorker } from '../../../../app/store/workers/workers-action'

export const WorkersList = (props: WorkersListProps) => {
  const { filteredWorkers, user } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRemoveWorker = (id: number) => {
    //TODO модальное окно
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      dispatch(removeWorker(id))
    }
  }

  return (
    <div className={styles['workers-list']}>
      {!filteredWorkers.length && <p> информация отствует </p>}

      {filteredWorkers.map(({ id, img, name, job, number, mail, date }) => {
        return (
          <div className={styles['workers-list__item']} key={id}>
            <div className={styles['workers-list__img']}>
              <img
                src={
                  img || 'https://cdn-icons-png.flaticon.com/128/847/847969.png'
                }
                alt="фото сотрудника"
              />
            </div>
            <div className={styles['workers-list__info']}>
              <h3>{name}</h3>
              <h4>Должность: {job}</h4>
              <h4>Телефон: {number}</h4>
              <h4>Эл. почта: {mail}</h4>
              <h4>Дата рождения: {date}</h4>

              {user?.isAdmin && (
                <>
                  <Button onClick={() => navigate(RoutePath.workerEdit + id)}>
                    Изменить
                  </Button>
                  <Button onClick={() => handleRemoveWorker(id)}>
                    Удалить
                  </Button>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
