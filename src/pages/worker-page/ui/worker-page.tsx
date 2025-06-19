import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { Button } from '../../../shared/ui/button'
import { SearchWorkerComponent } from '../../../features/worker/search-form'
import { WorkersList } from '../../../features/worker/worker-list'
import { RoutePath } from '../../../shared/types/route-path'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/utils/use-app'

import styles from './worker-page.module.css'
import { fetchWorkers } from '../../../app/store/workers/workers-action'
import { workerSelector } from '../../../app/store/workers/workers-slice'
import { Context } from '../../../app/App'
import { formatDate } from '../../../shared/lib/utils/format-date'

export const WorkerPage = () => {
  const user = useContext(Context)

  const workers = useAppSelector(workerSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    !workers.length && dispatch(fetchWorkers())
  }, [])

  const workersWithModifiedDate = workers.map((worker) => {
    return {
      ...worker,
      date: worker.date === '' ? '' : formatDate(worker.date),
    }
  })

  const filteredWorkers = workersWithModifiedDate.filter((worker) =>
    Object.values(worker).some((value) =>
      String(value).toLowerCase().includes(searchInput.toLowerCase()),
    ),
  )

  return (
    <>
      <SearchWorkerComponent setSearchInput={setSearchInput} />

      {user?.isAdmin && (
        <div className={styles['button']}>
          <Button onClick={() => navigate(RoutePath.workerCreate)}>
            Добавить нового сотрудника
          </Button>
        </div>
      )}

      <WorkersList user={user} filteredWorkers={filteredWorkers} />
    </>
  )
}
