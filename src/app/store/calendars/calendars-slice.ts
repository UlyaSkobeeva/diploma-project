import { createSelector, createSlice } from '@reduxjs/toolkit'

import { Calendar } from '../../../shared/types'
import {
  addCalendar,
  fetchCalendarById,
  fetchCalendars,
  removeCalendar,
  updateCalendar,
} from './calendars-action'
import { RootState } from '../types'
import { ADD_ERROR, GET_ERROR, REMOVE_ERROR, UPDATE_ERROR } from '../error'

export interface CalendarState {
  data: Calendar[]
  error: string
  dataById?: Omit<Calendar, 'id'>
}

const initialState: CalendarState = {
  data: [],
  error: '',
}

export const calendarsSlice = createSlice({
  name: 'calendars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendars.fulfilled, (state, action) => {
        state.data = action.payload //пробрасываются в массив data
        state.dataById = { date: '', title: '', description: '', details: '' }
      })
      .addCase(fetchCalendars.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(fetchCalendarById.fulfilled, (state, action) => {
        state.dataById = action.payload
      })
      .addCase(fetchCalendarById.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(addCalendar.fulfilled, (state, action) => {
        state.data.push(action.payload as Calendar)
      })
      .addCase(addCalendar.rejected, (state, action) => {
        state.error = ADD_ERROR
      })
      .addCase(removeCalendar.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (calendar) => calendar.id !== action.payload,
        )
      })
      .addCase(removeCalendar.rejected, (state, action) => {
        state.error = REMOVE_ERROR
      })
      .addCase(updateCalendar.fulfilled, (state, action) => {
        state.data = state.data.map((calendar) =>
          calendar.id === action.payload.id ? action.payload : calendar,
        )
        state.dataById = action.payload
      })
      .addCase(updateCalendar.rejected, (state, action) => {
        state.error = UPDATE_ERROR
      })
  },
})

const getCalendarsState = (state: RootState) => state.calendars

export const CalendarSelector = createSelector(
  getCalendarsState,
  (state) => state.data,
)

export const CalendarByIdSelector = createSelector(
  getCalendarsState,
  (state) => state.dataById,
)
