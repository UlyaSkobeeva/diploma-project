import { createSelector, createSlice } from '@reduxjs/toolkit'
import { WorkerData } from '../../../shared/types'
import {
  addWorker,
  fetchWorkerById,
  fetchWorkers,
  removeWorker,
  updateWorker,
} from './workers-action'
import { RootState } from '../types'
import { ADD_ERROR, GET_ERROR, REMOVE_ERROR, UPDATE_ERROR } from '../error'

export interface WorkerState {
  data: WorkerData[]
  error: string
  dataById?: Omit<WorkerData, 'id'>
}

const initialState: WorkerState = {
  data: [],
  error: '',
}

export const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.data = action.payload
        state.dataById = {
          name: '',
          job: '',
          number: '',
          mail: '',
          date: '',
          img: '',
        }
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.dataById = action.payload
      })
      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(addWorker.fulfilled, (state, action) => {
        state.data.push(action.payload as WorkerData)
      })
      .addCase(addWorker.rejected, (state, action) => {
        state.error = ADD_ERROR
      })
      .addCase(removeWorker.fulfilled, (state, action) => {
        state.data = state.data.filter((data) => data.id !== action.payload)
      })
      .addCase(removeWorker.rejected, (state, action) => {
        state.error = REMOVE_ERROR
      })
      .addCase(updateWorker.fulfilled, (state, action) => {
        state.data = state.data.map((data) =>
          data.id === action.payload.id ? action.payload : data,
        )
        state.dataById = action.payload
      })
      .addCase(updateWorker.rejected, (state, action) => {
        state.error = UPDATE_ERROR
      })
  },
})

const getWorkerState = (state: RootState) => state.workers

export const workerSelector = createSelector(
  getWorkerState,
  (state) => state.data,
)

export const workerByIdSelector = createSelector(
  getWorkerState,
  (state) => state.dataById,
)
