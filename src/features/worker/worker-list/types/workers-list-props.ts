import { User, WorkerData } from '../../../../shared/types'

export interface WorkersListProps {
  user: User | null
  filteredWorkers: WorkerData[]
  getWorkerData(): void
}
