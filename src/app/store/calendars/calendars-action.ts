import { createAsyncThunk } from '@reduxjs/toolkit'
import { Calendar } from '../../../shared/types'
import { addData, fetchData, removeData, updateData } from '../fetch'

export const fetchCalendars = createAsyncThunk<Calendar[]>(
  'calendars/fetchCalendars',
  async () => await fetchData('/api/calendar/'),
)

export const fetchCalendarById = createAsyncThunk(
  'calendars/fetchCalendar/id',
  async (id: number) => await fetchData<Calendar>(`/api/calendar/${id}`),
)

export const addCalendar = createAsyncThunk(
  'calendars/addCalendar',
  async (calendarData: Omit<Calendar, 'id'>) =>
    await addData('/api/calendar/', calendarData),
)

export const removeCalendar = createAsyncThunk(
  'calendars/removeCalendar',
  async (id: number) => removeData(`/api/calendar/${id}`, id),
)

export const updateCalendar = createAsyncThunk(
  'calendars/updateCalendar',
  async (calendarData: Calendar) =>
    await updateData<Calendar>(
      `/api/calendar/${calendarData.id}`,
      calendarData,
    ),
)
