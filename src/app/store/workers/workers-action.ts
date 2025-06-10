import { createAsyncThunk } from '@reduxjs/toolkit'
import { addData, fetchData, removeData, updateData } from '../fetch'
import { WorkerData } from '../../../shared/types'

export const fetchWorkers = createAsyncThunk<WorkerData[]>(
  'workers/fetchWorkers',
  async () => await fetchData('/api/worker'),
)

export const fetchWorkerById = createAsyncThunk(
  'workers/fetchWorker/id',
  async (id: number) => await fetchData<WorkerData>(`/api/worker/${id}`),
)

export const addWorker = createAsyncThunk(
  'workers/addWorkers',
  async (data: Omit<WorkerData, 'id'>) => await addData('/api/worker/', data),
)

export const updateWorker = createAsyncThunk(
  'workers/updateWorker',
  async (data: WorkerData) =>
    await updateData<WorkerData>(`/api/worker/${data.id}`, data),
)

export const removeWorker = createAsyncThunk(
  'workers/removeWorker',
  async (id: number) => removeData(`/api/worker/${id}`, id),
)
