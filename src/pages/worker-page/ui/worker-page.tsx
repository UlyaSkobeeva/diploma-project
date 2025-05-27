import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Button } from '../../../shared/ui/button'

import styles from './worker-page.module.css'

import { SearchWorkerComponent } from '../../../features/worker/search-form'

import { WorkerData } from '../../../shared/types'

import { WorkerPageProps } from '../types'
import { WorkersList } from '../../../features/worker/worker-list'
import { RoutePath } from '../../../shared/types/route-path'

export const WorkerPage = (props: WorkerPageProps) => {
  const { user } = props

  // TODO переделать на редакс
  const [workers, setWorkers] = useState<WorkerData[]>([])

  const [searchInput, setSearchInput] = useState<string>('')

  const navigate = useNavigate()

  //получение данных с сервера
  const getWorkerData = () =>
    fetch('/api/worker')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setWorkers(resp)
      })
      .catch((err) => {
        console.error(err)
      })

  useEffect(() => {
    getWorkerData()
  }, [])

  // Фильтрация списка работников при изменении searchInput и workers
  //Object.values(worker) - берет все значения без ключей и складывает в массив
  const filteredWorkers = workers.filter((worker) =>
    Object.values(worker).some((value) =>
      String(value).toLowerCase().includes(searchInput.toLowerCase()),
    ),
  )

  return (
    <>
      {/* поиск */}
      <SearchWorkerComponent setSearchInput={setSearchInput} />

      {/* кнопка добавления */}

      {user?.isAdmin && (
        <div className={styles['button']}>
          <Button onClick={() => navigate(RoutePath.workerCreate)}>
            Добавить нового сотрудника
          </Button>
        </div>
      )}

      {/* карточки сотрудников */}
      <WorkersList
        user={user}
        filteredWorkers={filteredWorkers}
        getWorkerData={getWorkerData}
      />
    </>
  )
}
